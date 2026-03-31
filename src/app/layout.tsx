import type { Metadata } from "next";
import { Lora, Geist_Mono, Public_Sans, Noto_Serif } from "next/font/google";
import "./globals.css";
import { cn } from "@/shared/lib/utils";
import { QueryProvider } from "@/shared/ui/query-provider";

const notoSerifHeading = Noto_Serif({subsets:['latin'],variable:'--font-heading'});

const publicSans = Public_Sans({subsets:['latin'],variable:'--font-sans'});

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

const lora = Lora({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "What can I read today?",
  description: "What can I read today?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
              "h-full",
              "antialiased",
              lora.variable,
              geistMono.variable,
            , "font-sans", publicSans.variable, notoSerifHeading.variable)}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
