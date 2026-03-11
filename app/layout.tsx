import { Geist_Mono, Noto_Sans } from "next/font/google"

import "@/app/global.css"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const notoSans = Noto_Sans({ variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        notoSans.variable
      )}
    >
      <body>
          <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
