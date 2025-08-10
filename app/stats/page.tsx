"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Code, Award, Calendar, Target } from "lucide-react"

import FloatingContact from "@/components/FloatingContact"

export default function StatsPage() {
  // TODO: Replace with API calls to Django backend
  // const stats = await fetch('/api/stats').then(res => res.json())

  const stats = {
    overview: [
      { label: "Years of Experience", value: "5+", icon: Calendar, color: "text-blue-600" },
      { label: "Projects Completed", value: "50+", icon: Target, color: "text-green-600" },
      { label: "Team Members Led", value: "25+", icon: Users, color: "text-purple-600" },
      { label: "Technologies Mastered", value: "20+", icon: Code, color: "text-orange-600" },
    ],
    achievements: [
      {
        title: "Digital Transformation Projects",
        count: 20,
        description: "Successfully delivered enterprise solutions",
      },
      { title: "Cost Optimization", count: 40, description: "Percentage reduction in cloud infrastructure costs" },
      { title: "Deployment Speed", count: 60, description: "Percentage improvement in deployment time" },
      { title: "Platform Users", count: 10000, description: "Users served by Spotmentor platform" },
    ],
    technologies: {
      "Cloud Platforms": ["AWS", "Azure", "GCP"],
      Programming: ["Python", "JavaScript", "Go", "SQL"],
      "DevOps Tools": ["Docker", "Kubernetes", "Jenkins", "Terraform"],
      Frameworks: ["Django", "React", "FastAPI", "Next.js"],
    },
    timeline: [
      { year: "2024-2025", milestone: "Leading Digital Innovation at Calance" },
      { year: "2021-2024", milestone: "Scaling Emerging Technologies Practice" },
      { year: "2020-2021", milestone: "Building Spotmentor at Ernst & Young" },
      { year: "2016-2020", milestone: "Engineering Studies at IIT Kharagpur" },
    ],
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Career Statistics
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A data-driven overview of my professional journey and achievements
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.overview.map((stat, index) => (
            <Card
              key={stat.label}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Achievements */}
        <Card className="mb-12 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
              <Award className="w-6 h-6 text-indigo-600" />
              Key Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.achievements.map((achievement, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-bold text-indigo-600">
                      {achievement.count.toLocaleString()}
                      {achievement.count < 100 ? "%" : "+"}
                    </span>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                  <p className="text-gray-600 text-sm">{achievement.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="mb-12 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
              <Code className="w-6 h-6 text-indigo-600" />
              Technology Expertise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(stats.technologies).map(([category, techs]) => (
                <div key={category}>
                  <h4 className="font-semibold text-gray-900 mb-3">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech) => (
                      <Badge
                        key={tech}
                        className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors cursor-default"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Timeline */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
              <Calendar className="w-6 h-6 text-indigo-600" />
              Career Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {stats.timeline.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-indigo-600 flex-shrink-0">{item.year}</div>
                  <div className="w-4 h-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 text-gray-700">{item.milestone}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Floating Get in touch component */}
        <FloatingContact />
      </div>
    </div>
  )
}
