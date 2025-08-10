"use client"

import { useEffect } from "react"
import { ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BlogPage() {
  const router = useRouter()

  useEffect(() => {
    // Open Medium blog in new tab after a short delay
    const timer = setTimeout(() => {
      window.open("https://arpitgoyalkgp.medium.com/", "_blank")
      
      // Redirect back to home page after opening Medium blog
      setTimeout(() => {
        router.push("/")
      }, 500)
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Redirecting to Medium...
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Opening my Medium blog in a new tab
        </p>
        <a
          href="https://arpitgoyalkgp.medium.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          Go to Medium Blog
          <ExternalLink className="w-4 h-4" />
        </a>
        <p className="text-sm text-gray-500 mt-4">
          If the new tab doesn't open automatically, click the button above
        </p>
      </div>
    </div>
  )
}
