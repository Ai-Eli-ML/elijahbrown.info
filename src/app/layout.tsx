import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ParticleBackground from "@/components/effects/ParticleBackground";
import CursorLight from "@/components/effects/CursorLight";
import AmbientSound from "@/components/effects/AmbientSound";
import EasterEggs from "@/components/effects/EasterEggs";
import PageTransition from "@/components/PageTransition";
import { Analytics } from "@vercel/analytics/react";
import CommandPalette from "@/components/CommandPalette";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import ThemeToggle from "@/components/ThemeToggle";
import ScrollProgress from "@/components/ScrollProgress";
import WebVitals from "@/components/WebVitals";

export const metadata: Metadata = {
  metadataBase: new URL('https://elijahbrown.info'),
  title: {
    default: "Elijah Brown | AI Solopreneur",
    template: "%s | Elijah Brown",
  },
  description: "Building gods from silicon. Where consciousness meets code in the quiet darkness. AI engineer, creator, and architect of autonomous intelligence systems.",
  keywords: [
    "Elijah Brown",
    "AI Solopreneur",
    "Artificial Intelligence",
    "AI Engineer",
    "Machine Learning",
    "Autonomous Systems",
    "Advancing Technology",
    "AI Development",
    "Deep Learning",
    "AI Research",
    "Independent Developer",
  ],
  authors: [{ name: "Elijah Brown", url: "https://elijahbrown.info" }],
  creator: "Elijah Brown",
  publisher: "Elijah Brown",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elijahbrown.info",
    siteName: "Elijah Brown",
    title: "Elijah Brown | AI Solopreneur",
    description: "Building gods from silicon. Where consciousness meets code in the quiet darkness.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elijah Brown - AI Solopreneur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elijah Brown | AI Solopreneur",
    description: "Building gods from silicon. Where consciousness meets code in the quiet darkness.",
    creator: "@x_0___0_x",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://elijahbrown.info",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Visual Effects */}
        <CursorLight />
        <ParticleBackground />
        <EasterEggs />
        <AmbientSound enabled={false} />

        {/* UI Components */}
        <Navigation />
        <CommandPalette />
        <KeyboardShortcuts />
        <ThemeToggle />
        <ScrollProgress />

        {/* Performance Monitoring */}
        <WebVitals />

        <main style={{ paddingTop: '64px', position: 'relative', zIndex: 1 }}>
          <PageTransition>
            {children}
          </PageTransition>
        </main>

        {/* Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
