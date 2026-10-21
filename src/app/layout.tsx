import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";
import { ReactNode } from "react";
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { cn } from "@/lib/utils";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "Donate Red | Connect with Blood Donors & Donation Camps",
  description: "Find verified blood donors in seconds, organize donation camps, and locate emergency blood banks nationwide.",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html
      lang="en"
      className={cn(
        inter.variable,
        plusJakartaSans.variable,
        "font-sans scroll-smooth antialiased"
      )}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <ClerkProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
          <Toaster theme="dark" richColors />
        </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

export default RootLayout;
