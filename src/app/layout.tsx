import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ParticleBackground from "@/components/effects/ParticleBackground";
import CursorLight from "@/components/effects/CursorLight";

export const metadata: Metadata = {
  title: "Elijah Brown | AI Solopreneur",
  description: "Building gods from silicon. Where consciousness meets code in the quiet darkness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CursorLight />
        <ParticleBackground />
        <Navigation />
        <main style={{ paddingTop: '64px', position: 'relative', zIndex: 1 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
