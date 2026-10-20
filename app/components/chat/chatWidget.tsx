"use client";

import { useEffect, useRef, useState } from "react";
import { FaRobot, FaXmark, FaPaperPlane } from "react-icons/fa6";
import siteContent from "@/data/site-content.json";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_PROMPTS = [
  "Who is Ayesha Iqbal?",
  "What AI agents has Ayesha built?",
  "Which projects are live?",
  "What are her educational qualifications?",
  "What certifications does she have?",
  "How can I contact her?",
  "Download CV",
];

/** Client-side cap, slightly above the server's 20s OpenAI timeout. */
const REQUEST_TIMEOUT_MS = 30_000;

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi! I'm Ayesha's AI portfolio assistant. Ask me about her skills, live projects, education, certifications, or how to contact her. I can reply in English, Urdu or Roman Urdu.",
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen]);

  async function sendMessage(text: string, isRetry = false) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    if (!isRetry && trimmed.toLowerCase() === "download cv") {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: trimmed },
        {
          role: "assistant",
          content:
            "Here you go — you can download Ayesha's verified CV as a PDF below:",
        },
      ]);
      setInput("");
      return;
    }

    // On retry the visitor's message is already in the list; don't add it twice.
    const nextMessages: Message[] = isRetry ? messages : [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setError(null);
    setFailedMessage(null);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: nextMessages.slice(0, -1),
        }),
        signal: controller.signal,
      });

      // The API returns non-200 statuses with a friendly { message, retryable } body.
      let data: { reply?: string; message?: string; retryable?: boolean } | null = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok || !data?.reply) {
        setError(data?.message || "Couldn't reach the assistant. Please try again.");
        // Offer Retry unless the server said retrying won't help (e.g. no API key configured).
        setFailedMessage(data?.retryable === false ? null : trimmed);
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data!.reply as string }]);
    } catch (err) {
      const aborted = err instanceof DOMException && err.name === "AbortError";
      setError(
        aborted
          ? "The assistant took too long to respond. Please try again."
          : "Couldn't reach the assistant. Check your connection and try again."
      );
      setFailedMessage(trimmed);
    } finally {
      clearTimeout(timer);
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        className="fixed bottom-6 right-6 z-[9998] w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-glow-violet flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {isOpen ? <FaXmark size={20} /> : <FaRobot size={22} />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Ayesha's Portfolio Assistant"
          className="fixed bottom-24 right-6 z-[9998] w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[580px] bg-slate-950/95 border border-violet-500/30 rounded-2xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/60">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-violet-600/20 text-cyan-400 border border-violet-500/30 flex items-center justify-center">
                <FaRobot size={16} />
              </span>
              <div>
                <p className="text-sm font-bold text-white">AI Assistant</p>
                <p className="text-[11px] text-cyan-400 font-mono">Ayesha Iqbal Knowledge Base</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <FaXmark size={16} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-br-sm"
                    : "mr-auto bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-sm"
                }`}
              >
                {m.content}
                {m.role === "assistant" && m.content.toLowerCase().includes("cv") && (
                  <a
                    href={siteContent.profile.cvUrl}
                    download={siteContent.profile.cvFileName}
                    className="mt-2.5 inline-block text-xs font-bold text-cyan-300 hover:underline"
                  >
                    Download CV (PDF) →
                  </a>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="mr-auto bg-slate-900 border border-slate-800 rounded-2xl rounded-bl-sm px-4 py-2.5 text-xs text-cyan-400 animate-pulse font-mono">
                Thinking…
              </div>
            )}

            {error && (
              <div role="alert" className="mr-auto max-w-[85%] rounded-2xl rounded-bl-sm border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-xs text-rose-200">
                <p>{error}</p>
                {failedMessage && (
                  <button
                    type="button"
                    onClick={() => sendMessage(failedMessage, true)}
                    disabled={isLoading}
                    className="mt-2 inline-flex items-center rounded-full border border-cyan-400/50 px-3 py-1 text-[11px] font-semibold text-cyan-300 hover:bg-cyan-500/10 transition-colors disabled:opacity-50"
                  >
                    Try again
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Suggested prompts */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTED_PROMPTS.slice(0, 4).map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-[11px] bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 rounded-full px-3 py-1 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-2 border-t border-slate-800 p-3 bg-slate-900/60"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Ayesha's projects..."
              aria-label="Chat message"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-full px-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="w-9 h-9 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-40"
            >
              <FaPaperPlane size={13} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
