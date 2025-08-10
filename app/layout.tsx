import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { ContactProvider } from "@/contexts/ContactContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Arpit Goyal - Portfolio",
  description: "Tech leader with expertise in DevOps, cloud, and Python",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <ContactProvider>
          <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">{children}</main>
        </ContactProvider>
      </body>
    </html>
  )
}
