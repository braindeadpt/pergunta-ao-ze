import type { Metadata } from "next";
import { Archivo_Black, Inter, Newsreader, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "optional",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "optional",
});

const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "optional",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "optional",
});

export const metadata: Metadata = {
  title: {
    default: "Pergunta ao Zé — Os serviços públicos, sem fila nem senha",
    template: "%s — Pergunta ao Zé",
  },
  description:
    "O Zé responde a perguntas sobre serviços públicos portugueses e indica as páginas oficiais por onde começar. Projeto independente.",
  metadataBase: new URL("https://perguntaaoze.vercel.app"),
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "Pergunta ao Zé",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <body
        className={`${inter.variable} ${newsreader.variable} ${display.variable} ${mono.variable} flex min-h-screen flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
