"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { fetchPersonalDetails, PersonalDetails } from "@/lib/firebase-services"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails | null>(null)

  useEffect(() => {
    const loadPersonalDetails = async () => {
      const data = await fetchPersonalDetails()
      setPersonalDetails(data)
    }
    
    loadPersonalDetails()
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "My Products", href: "/products" },
    { name: "My Blog", href: "/blog" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 hover:border-white/40 transition-all duration-300">
              <Image
                src={personalDetails?.logo_picture_url || "/professional-headshot.png"}
                alt="Arpit Goyal"
                width={40}
                height={40}
                className="object-cover w-full h-full"
                style={{ objectPosition: 'center' }}
              />
            </div>
            <span className="text-white font-bold text-lg tracking-wide">ARPIT GOYAL</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/90 hover:text-white font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-sm rounded-lg m-4 p-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-white/90 hover:text-white font-medium py-2 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
