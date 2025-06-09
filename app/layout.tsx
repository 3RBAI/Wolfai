import type React from "react"
import "./globals.css" // Ensure this is imported
import { Inter, Noto_Sans_Arabic } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { cn } from "@/lib/utils"
import { Toaster as SonnerToaster } from "@/components/ui/sonner" // For AI SDK UI
import { Toaster as ShadcnToaster } from "@/components/ui/toaster" // For general toasts

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap", // Improves font loading
  weight: ["300", "400", "500", "700"], // Added more weights
})

export const metadata: Metadata = {
  title: "الذئب الكوني - بوابة الوجود الرقمي",
  description: "كائن معرفي ذاتي التطور يدمج الذكاء الاصطناعي بالإدراك البشري.",
  generator: "WOLF-AI & v0",
  themeColor: "#000000", // Cosmic Void
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-arabic text-foreground antialiased", // Default to Arabic font
          inter.variable, // Keep inter for potential specific use
          notoSansArabic.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="golden-fog" />
          {children}
          <SonnerToaster />
          <ShadcnToaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
