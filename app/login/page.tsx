"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, User, Eye, EyeOff } from "lucide-react"
import { Mail, MapPin, Github, Linkedin } from "lucide-react"
import FloatingContact from "@/components/FloatingContact"

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // TODO: Replace with actual Django authentication API call
      // const response = await fetch('/api/auth/login/', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials)
      // })
      // const data = await response.json()
      // if (response.ok) {
      //   localStorage.setItem('authToken', data.token)
      //   router.push('/admin')
      // } else {
      //   setError(data.message || 'Login failed')
      // }

      // Mock authentication for now
      if (credentials.username === "admin" && credentials.password === "password") {
        localStorage.setItem("authToken", "mock-token")
        router.push("/admin")
      } else {
        setError("Invalid credentials. Use admin/password for demo.")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Admin Login
          </CardTitle>
          <p className="text-gray-600">Access your portfolio dashboard</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                  className="pl-10"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                  className="pl-10 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Demo Credentials:</strong>
              <br />
              Username: admin
              <br />
              Password: password
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Floating Get in touch component */}
      <div className="fixed bottom-6 right-6 z-50 group">
        {/* Main floating icon */}
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer">
          <Mail className="w-7 h-7 text-white" />
        </div>
        
        {/* Expanded contact info on hover */}
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Get In Touch</h3>
            <div className="space-y-3 mb-4">
              <a 
                href="mailto:arpitgoyal.iitkgp@gmail.com"
                className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                <Mail className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span className="text-sm">arpitgoyal.iitkgp@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span className="text-sm">Gurugram, India</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <a 
                href="https://github.com/argoyal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/arpitgoyaliitkgp/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com/arpitgoyal.iitkgp/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/_._appy_._/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                title="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
                </svg>
              </a>
              <a 
                href="https://stackoverflow.com/users/4719293/arpit-goyal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                title="Stack Overflow"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15 21h-10v-2h10v2zm6-11.665l-1.621-9.335h-18.758l-1.621 9.335 18.758 0zm-5.939 7.955l-3.031-3.031h-2.969v-2.969h2.969l3.031-3.031v2.969h2.969v2.969h-2.969v2.969z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com/_arpitgoyal_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                title="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Arrow pointing to the icon */}
          <div className="absolute bottom-0 right-6 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45 translate-y-2"></div>
        </div>
      </div>
    </div>
  )
}
