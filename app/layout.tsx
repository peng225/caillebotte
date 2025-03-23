import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Caillebotte",
  description: "The Mathematical Art Gallery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
          <div className="headerContainer">
            <h1>
              <Link href={"/"}>Caillebotte</Link>
            </h1>
            <nav>
              <Link href={"/"}>Home</Link>
              <Link href={"https://github.com/peng225/caillebotte"} target="_blank">
                GitHub
              </Link>
            </nav>
          </div>
        </header>
        {children}
        <footer>
          <p>&copy; 2025 Caillebotte - Mathematical Art Gallery</p>
        </footer>
      </body>
    </html>
  );
}
