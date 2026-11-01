import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { site } from "@/content/site";
import { author } from "@/content/author";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
// Only the Journal uses JetBrains Mono, so don't preload it on every page.
const jetbrains = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jetbrains", preload: false });
const pressStart = Press_Start_2P({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-press-start" });
const vt323 = VT323({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-vt323" });

export const metadata: Metadata = {
  title: `${author.name} | Machine Learning Engineer`,
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${pressStart.variable} ${vt323.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
