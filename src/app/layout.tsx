import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SW Wanted | PS5 Portfolio",
  description: "Portfólio interativo inspirado na interface do PlayStation 5 desenvolvido por SW Wanted.",
  keywords: ["Web Design", "Next.js", "PS5 UI", "Front-end Developer", "SW Wanted"],
  openGraph: {
    title: "SW Wanted - PS5 Portfolio",
    description: "Explore meus projetos através de uma experiência de console imersiva.",
    images: [{ url: '/sw_wanted.png' }], // Imagem que aparece no link compartilhado
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}