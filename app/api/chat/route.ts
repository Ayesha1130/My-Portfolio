import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { buildSystemPrompt } from "@/lib/chatContext";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const MAX_HISTORY = 10;
const MAX_MESSAGE_LENGTH = 1000;
/** Fail fast instead of leaving the visitor waiting on a dead connection. */
const OPENAI_TIMEOUT_MS = 20_000;

type ErrorCode =
  | "ASSISTANT_NOT_CONFIGURED"
  | "INVALID_REQUEST"
  | "NETWORK_UNREACHABLE"
  | "UPSTREAM_TIMEOUT"
  | "ASSISTANT_MISCONFIGURED"
  | "RATE_LIMITED"
  | "UPSTREAM_ERROR"
  | "INTERNAL_ERROR";

/** Visitor-facing text only. Never contains stack traces, keys or raw upstream messages. */
const PUBLIC_MESSAGES: Record<ErrorCode, string> = {
  ASSISTANT_NOT_CONFIGURED:
    "The AI assistant isn't available right now. You can still browse the portfolio or contact Ayesha directly by email or phone.",
  INVALID_REQUEST: "Please send a short question (up to 1000 characters).",
  NETWORK_UNREACHABLE:
    "The assistant can't reach its AI service at the moment. Please try again in a little while.",
  UPSTREAM_TIMEOUT: "The assistant took too long to respond. Please try again.",
  ASSISTANT_MISCONFIGURED:
    "The AI assistant is temporarily unavailable. You can contact Ayesha directly by email or phone.",
  RATE_LIMITED: "The assistant is receiving a lot of requests right now. Please wait a moment and try again.",
  UPSTREAM_ERROR: "The AI service returned an error. Please try again shortly.",
  INTERNAL_ERROR: "Something went wrong on our side. Please try again shortly.",
};

const STATUS: Record<ErrorCode, number> = {
  ASSISTANT_NOT_CONFIGURED: 503,
  INVALID_REQUEST: 400,
  NETWORK_UNREACHABLE: 503,
  UPSTREAM_TIMEOUT: 504,
  ASSISTANT_MISCONFIGURED: 503,
  RATE_LIMITED: 429,
  UPSTREAM_ERROR: 502,
  INTERNAL_ERROR: 500,
};

const RETRYABLE: Record<ErrorCode, boolean> = {
  ASSISTANT_NOT_CONFIGURED: false,
  INVALID_REQUEST: false,
  NETWORK_UNREACHABLE: true,
  UPSTREAM_TIMEOUT: true,
  ASSISTANT_MISCONFIGURED: false,
  RATE_LIMITED: true,
  UPSTREAM_ERROR: true,
  INTERNAL_ERROR: true,
};

function errorResponse(code: ErrorCode, headers?: Record<string, string>) {
  return NextResponse.json(
    { ok: false, code, message: PUBLIC_MESSAGES[code], retryable: RETRYABLE[code] },
    { status: STATUS[code], headers }
  );
}

/** Walks the `cause` chain of an error to find a Node network error code (ENOTFOUND, ...). */
function findNetworkCode(error: unknown): string | undefined {
  let current: unknown = error;
  for (let depth = 0; depth < 5 && current; depth++) {
    const code = (current as { code?: unknown }).code;
    if (typeof code === "string" && /^(ENOTFOUND|EAI_AGAIN|ECONNREFUSED|ECONNRESET|ETIMEDOUT|ENETUNREACH|EHOSTUNREACH)$/.test(code)) {
      return code;
    }
    current = (current as { cause?: unknown }).cause;
  }
  return undefined;
}

/** Maps any thrown error to a safe public error code, and logs the details server-side. */
function classifyError(error: unknown): { code: ErrorCode; headers?: Record<string, string> } {
  const networkCode = findNetworkCode(error);

  if (error instanceof OpenAI.APIConnectionTimeoutError) {
    return { code: "UPSTREAM_TIMEOUT" };
  }
  if (error instanceof OpenAI.APIConnectionError || networkCode) {
    // DNS failures (ENOTFOUND / EAI_AGAIN) and refused/reset connections end up here.
    return { code: networkCode === "ETIMEDOUT" ? "UPSTREAM_TIMEOUT" : "NETWORK_UNREACHABLE" };
  }
  if (error instanceof OpenAI.AuthenticationError || error instanceof OpenAI.PermissionDeniedError) {
    return { code: "ASSISTANT_MISCONFIGURED" };
  }
  if (error instanceof OpenAI.RateLimitError) {
    const retryAfter = (error as { headers?: Record<string, string | null | undefined> }).headers?.["retry-after"];
    return { code: "RATE_LIMITED", headers: retryAfter ? { "Retry-After": String(retryAfter) } : undefined };
  }
  if (error instanceof OpenAI.APIError) {
    return { code: "UPSTREAM_ERROR" };
  }
  return { code: "INTERNAL_ERROR" };
}

function logServerError(code: ErrorCode, error: unknown) {
  const e = error as { name?: string; message?: string; status?: number; cause?: { code?: string; message?: string } };
  // Detailed server-side log for debugging. Never includes the API key or the visitor's message.
  console.error("[chat-api] request failed", {
    code,
    name: e?.name,
    status: e?.status,
    message: e?.message,
    networkCode: findNetworkCode(error),
    cause: e?.cause?.message,
  });
}

/** Lightweight health check: tells you if the key is configured, without revealing it. */
export async function GET() {
  return NextResponse.json({
    configured: Boolean(process.env.OPENAI_API_KEY),
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
  });
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error("[chat-api] OPENAI_API_KEY is not set. Add it to .env (see .env.example) and restart the server.");
    return errorResponse("ASSISTANT_NOT_CONFIGURED");
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return errorResponse("INVALID_REQUEST");
  }

  const raw = body as { message?: unknown; history?: unknown };
  const message = typeof raw?.message === "string" ? raw.message.trim() : "";
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return errorResponse("INVALID_REQUEST");
  }

  const history: ChatMessage[] = Array.isArray(raw?.history)
    ? (raw.history as unknown[]).filter(
        (m): m is ChatMessage =>
          typeof m === "object" &&
          m !== null &&
          ((m as ChatMessage).role === "user" || (m as ChatMessage).role === "assistant") &&
          typeof (m as ChatMessage).content === "string"
      )
    : [];

  const trimmedHistory = history.slice(-MAX_HISTORY).map((m) => ({
    role: m.role,
    content: m.content.slice(0, MAX_MESSAGE_LENGTH),
  }));

  try {
    // maxRetries: 0 so a dead network fails immediately; the visitor can press Retry.
    const client = new OpenAI({ apiKey, timeout: OPENAI_TIMEOUT_MS, maxRetries: 0 });
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const response = await client.chat.completions.create(
      {
        model,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...trimmedHistory,
          { role: "user", content: message },
        ],
        max_completion_tokens: 700,
      },
      { timeout: OPENAI_TIMEOUT_MS, maxRetries: 0 }
    );

    const reply = response.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      logServerError("UPSTREAM_ERROR", new Error("Empty completion returned by OpenAI"));
      return errorResponse("UPSTREAM_ERROR");
    }

    return NextResponse.json({ ok: true, reply });
  } catch (error) {
    const { code, headers } = classifyError(error);
    logServerError(code, error);
    return errorResponse(code, headers);
  }
}
