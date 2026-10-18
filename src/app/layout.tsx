import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { pageMetadata } from "@/lib/metadata";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  ...pageMetadata(
    "Desenvolvedor de Software",
    "Gustavo Jesus, desenvolvedor em Brasília. Oracle APEX, SQL, PL/SQL e projetos web e mobile.",
  ),
  title: {
    default: "Gustavo Jesus — Desenvolvedor de Software",
    template: "%s | Gustavo Jesus",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${manrope.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Pular para o conteúdo
        </a>
        <ScrollProgress />
        <Header />
        {children}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
