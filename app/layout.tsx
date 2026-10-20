import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Cursor from "./components/cursor";
import GlobalBackground from "./components/background animations/globalBackground";
import ThemeProvider from "./components/themeProvider";
import AOSInit from "./components/aosInit";
import ChatWidget from "./components/chat/chatWidget";
import siteContent from "@/data/site-content.json";
import { liveProjectCount, certificationCount } from "@/lib/siteStats";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Ayesha Iqbal | Full-Stack AI Engineer",
  description:
    "Portfolio of Ayesha Iqbal — Full-Stack AI Engineer specializing in autonomous AI agents, Model Context Protocol (MCP), Next.js, TypeScript, Python, and Supabase. " + `${liveProjectCount} live shipped projects & ${certificationCount} verified certifications.`,
  keywords: [
    "Ayesha Iqbal",
    "Full-Stack AI Engineer",
    "AI Agents",
    "OpenAI Agents SDK",
    "Model Context Protocol",
    "MCP",
    "Next.js",
    "TypeScript",
    "Supabase",
    "Three.js",
  ],
  authors: [{ name: "Ayesha Iqbal", url: "https://github.com/Ayesha1130" }],
  creator: "Ayesha Iqbal",
  openGraph: {
    title: "Ayesha Iqbal | Full-Stack AI Engineer",
    description:
      "Full-Stack AI Engineer specializing in autonomous AI agents, Model Context Protocol (MCP), Next.js, TypeScript, and Supabase.",
    type: "website",
    images: [siteContent.profile.image],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayesha Iqbal | Full-Stack AI Engineer",
    description:
      "Full-Stack AI Engineer specializing in autonomous AI agents, Model Context Protocol (MCP), Next.js, TypeScript, and Supabase.",
    images: [siteContent.profile.image],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${dmSans.variable} font-sans bg-[#0a1128] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black`}>
        <ThemeProvider>
          <GlobalBackground />
          <AOSInit />
          <Navbar />
          {children}
          <Footer />
          <Cursor />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
