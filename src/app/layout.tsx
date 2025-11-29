import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "demoBot · Agente AI conectado a n8n";
const description =
  "Landing page lista para Vercel que demuestra un agente de atención al cliente orquestado con n8n y enfoque security-first.";

export const metadata: Metadata = {
  metadataBase: new URL("https://demobot.ai"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://demobot.ai",
    siteName: "demoBot",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@demobot",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
