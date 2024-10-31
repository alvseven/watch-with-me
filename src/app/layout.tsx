import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Watch with me",
  description:
    "Convide facilmente amigos para assistir filmes juntos. Descubra, planeje e desfrute de seus programas favoritos com amigos através da plataforma Watch with me.",
  keywords: [
    "Watch with Me",
    "convites para filmes",
    "assistir juntos",
    "noites de cinema online",
    "convide amigos para assistir filmes",
    "sessão de cinema",
  ],
  openGraph: {
    title: "Watch with Me",
    description:
      "Convide seus amigos para assistirem filmes online. Planeje sua próxima noite de cinema com facilidade!",
    url: "https://watch-with-me-five.vercel.app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Watch with me",
    description:
      "Reúna amigos para uma divertida noite de cinema online. Envie convites e aproveite os programas juntos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950`}
      >
        {children}
      </body>
    </html>
  );
}
