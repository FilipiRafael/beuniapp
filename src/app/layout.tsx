import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/contexts/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeUni Tecnologia",
  description: "BeUni Tecnologia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <meta name="theme-color" content="#FE5E04" />
      </head>
      <body
        className={cn(
          "h-screen bg-background font-sans antialiased",
          inter.className,
        )}
        suppressHydrationWarning={true}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
