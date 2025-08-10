"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { fetchAchievements, Achievement } from "@/lib/firebase-services"
import FloatingContact from "@/components/FloatingContact"

export default function HomePage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [visibleItems, setVisibleItems] = useState<string[]>([])

  useEffect(() => {
    const loadAchievements = async () => {
      const data = await fetchAchievements()
      setAchievements(data)
      
      // Animate items in sequence
      data.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, data[index].id])
        }, index * 200)
      })
    }
    
    loadAchievements()
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Blog":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Career":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-2xl animate-float">
            <Image
              src="/me.jpg"
              alt="Arpit Goyal"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ARPIT GOYAL
          </h1>
          <p className="text-xl text-gray-600 mb-2"><a href="mailto:arpitgoyal.iitkgp@gmail.com">arpitgoyal.iitkgp@gmail.com</a></p>
        </div>

        {/* About Section */}
        <div className="mb-16 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <p className="text-gray-700 leading-relaxed mb-6">
                I am a tech leader with expertise in DevOps, cloud, and Python, skilled in scaling startups and leading
                teams. An IIT Kharagpur graduate, I design scalable solutions, optimize systems, and mentor teams,
                driven by a passion for solving real-world problems through impactful technology.
              </p>
              <Link href="/about">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                  LEARN MORE
                </button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Timeline Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            My Journey
          </h2>

          <div className="relative">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className={`timeline-item transition-all duration-700 ${
                  visibleItems.includes(achievement.id) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
              >
                <Card className="ml-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-medium text-indigo-600">{achievement.date}</span>
                      <Badge className={`ml-auto ${getCategoryColor(achievement.category)}`}>
                        {achievement.category}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      {achievement.title}
                      {achievement.link && (
                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-indigo-600 cursor-pointer transition-colors" />
                      )}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Get in touch component */}
        <FloatingContact />
      </div>
    </div>
  )
}
