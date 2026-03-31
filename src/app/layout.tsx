import type { Metadata } from "next";
import { Lora, Geist_Mono, Noto_Serif, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/shared/lib/utils";
import { Providers } from "@/shared/ui/providers";

const notoSerifHeading = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-heading",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

const lora = Lora({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: {
    default: "What can I read today?",
    template: "%s | What can I read today?",
  },
  description:
    "Discover your next book to read with personalized recommendations.",

  icons: {
    icon: "/book.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        lora.variable,
        geistMono.variable,
        notoSerifHeading.variable,
        "font-sans",
        ibmPlexSans.variable,
      )}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
