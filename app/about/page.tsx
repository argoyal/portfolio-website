"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download } from "lucide-react"
import FloatingContact from "@/components/FloatingContact"
import Image from "next/image"
import { 
  fetchSkills, 
  fetchExperiences, 
  fetchEducation, 
  fetchAboutContent,
  fetchPersonalDetails,
  Skill,
  Experience,
  Education,
  AboutContent,
  PersonalDetails
} from "@/lib/firebase-services"

export default function AboutPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [aboutContent, setAboutContent] = useState<AboutContent[]>([])
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails | null>(null)
  const [animateBars, setAnimateBars] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      console.log('Loading about page data...')
      const [skillsData, experiencesData, educationData, aboutData, personalData] = await Promise.all([
        fetchSkills(),
        fetchExperiences(),
        fetchEducation(),
        fetchAboutContent(),
        fetchPersonalDetails()
      ])
      
      console.log('About content fetched:', aboutData)
      console.log('About content length:', aboutData.length)
      if (aboutData.length > 0) {
        console.log('First about content item:', aboutData[0])
      }
      
      setSkills(skillsData)
      setExperiences(experiencesData)
      setEducation(educationData)
      setAboutContent(aboutData)
      setPersonalDetails(personalData)
      
      // Trigger proficiency bar animation after data loads
      setTimeout(() => setAnimateBars(true), 500)
    }
    
    loadData()
  }, [])

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  // Get proficiency color based on level
  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return "bg-gradient-to-r from-green-500 to-emerald-600"
    if (proficiency >= 80) return "bg-gradient-to-r from-blue-500 to-cyan-600"
    if (proficiency >= 70) return "bg-gradient-to-r from-yellow-500 to-orange-600"
    if (proficiency >= 60) return "bg-gradient-to-r from-orange-500 to-red-600"
    return "bg-gradient-to-r from-gray-400 to-gray-500"
  }

  // Get proficiency label
  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= 90) return "Expert"
    if (proficiency >= 80) return "Advanced"
    if (proficiency >= 70) return "Intermediate"
    if (proficiency >= 60) return "Beginner"
    return "Novice"
  }

  return (
    <div className="pt-20 min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column - Profile Information */}
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center lg:text-left animate-fadeInUp">
              <div className="w-40 h-40 mx-auto lg:mx-0 mb-6 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <Image
                  src={personalDetails?.profile_picture_url || "/me.jpg"}
                  alt="Arpit Goyal"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                  style={{ objectPosition: 'center' }}
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                About Me
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto lg:mx-0 mb-6">
                Passionate tech leader driving innovation through scalable solutions and emerging technologies
              </p>
              <button
                onClick={() => {
                  // Download resume PDF from Google Drive
                  const resumeUrl = "https://drive.google.com/file/d/1Bp_rSPQfQ0EHv6NtFqU7AxJu1c13NtS3/view?usp=sharing"
                  const downloadUrl = resumeUrl.replace('/view?usp=sharing', '/preview')
                  
                  // Create a temporary link element to trigger download
                  const link = document.createElement('a')
                  link.href = downloadUrl
                  link.target = '_blank'
                  link.download = 'Arpit_Goyal_Resume.pdf'
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Download className="w-4 h-4" />
                Download Resume PDF
              </button>
            </div>

            {/* Skills & Technologies */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Skills & Technologies
              </h2>
              
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <div key={category} className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {skills.map((skill, index) => (
                      <div key={skill.id} 
                           className="bg-gray-50 rounded-xl p-4 border border-gray-200 
                                      hover:border-indigo-300 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {/* Skill Icon from skill-icons.dev or fallback */}
                            {skill.icon ? (
                              <img 
                                src={`https://skillicons.dev/icons?i=${skill.icon}`}
                                alt={`${skill.name} icon`}
                                className="w-8 h-8 rounded-lg"
                                onError={(e) => {
                                  // Fallback to a default icon if the skill icon fails to load
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            ) : (
                              // Fallback icons based on category
                              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                                {category === 'Behavioural' ? (
                                  // Brain icon for behavioural skills
                                  <img 
                                    src="https://cdn-icons-png.flaticon.com/512/4616/4616734.png"
                                    alt="Brain icon"
                                    className="w-5 h-5"
                                    onError={(e) => {
                                      // Fallback to SVG if CDN fails
                                      e.currentTarget.style.display = 'none';
                                      const fallback = e.currentTarget.parentElement?.querySelector('.brain-fallback') as HTMLElement;
                                      if (fallback) fallback.style.display = 'flex';
                                    }}
                                  />
                                ) : (
                                  // Lightning bolt for all other categories
                                  <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
                                  </svg>
                                )}
                              </div>
                            )}
                            <span className="font-medium text-gray-800">
                              {skill.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                             ${getProficiencyColor(skill.proficiency)}`}>
                              {getProficiencyLabel(skill.proficiency)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {skill.proficiency}%
                            </span>
                          </div>
                        </div>
                        
                        {/* Proficiency Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 
                                       ${getProficiencyColor(skill.proficiency)} ${animateBars ? 'animate-fill-bar' : ''}`}
                            style={{ 
                              width: animateBars ? `${skill.proficiency}%` : '0%',
                              '--target-width': `${skill.proficiency}%`,
                              '--animation-delay': index
                            } as React.CSSProperties}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            {/* Bio */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  My Story
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  {aboutContent.length > 0 ? (
                    aboutContent.map((content) => (
                      <div key={content.id} className="mb-6">
                        <h3 className="text-xl font-semibold mb-3 text-gray-800 capitalize">
                          {content.section}
                        </h3>
                        <div 
                          className="prose prose-gray max-w-none"
                          dangerouslySetInnerHTML={{ __html: content.content }}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        {aboutContent === null ? 'Loading content...' : 'No content available yet.'}
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Debug: aboutContent length = {aboutContent.length}
                      </p>
                      {aboutContent.length > 0 && (
                        <div className="mt-4 p-4 bg-gray-100 rounded text-left">
                          <p className="text-sm font-mono text-gray-600">
                            Raw data received: {JSON.stringify(aboutContent, null, 2)}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Experience
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp, index) => {
                    // Format dates for display
                    const formatDate = (dateString: string) => {
                      const date = new Date(dateString)
                      return date.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long' 
                      })
                    }
                    
                    const startDateFormatted = exp.startDate ? formatDate(exp.startDate) : ''
                    const endDateFormatted = exp.endDate ? formatDate(exp.endDate) : 'Present'
                    const dateRange = exp.current ? `${startDateFormatted} - Present` : `${startDateFormatted} - ${endDateFormatted}`
                    
                    return (
                      <div key={exp.id} className="border-l-4 border-indigo-200 pl-6 pb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-indigo-600" />
                          <span className="text-sm font-medium text-indigo-600">{dateRange}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                        <p className="text-lg text-gray-600 mb-2">{exp.company}</p>
                        {exp.description && exp.description.length > 0 && (
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-2">
                            {exp.description.map((point, pointIndex) => (
                              <li key={pointIndex} className="text-gray-700">
                                {point}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Education
                </h2>
                <div className="space-y-6">
                  {education
                    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
                    .map((edu) => (
                    <div key={edu.id} className="border-l-4 border-green-200 pl-6">
                      <h3 className="text-xl font-bold text-gray-900">{edu.institution}</h3>
                      <p className="text-lg text-gray-600 mb-2">{edu.degree} in {edu.field}</p>
                      <p className="text-sm text-gray-500 mb-2">{edu.period}</p>
                      {edu.description && <p className="text-sm text-gray-600">{edu.description}</p>}
                      {edu.gpa && <p className="text-sm text-gray-500 mt-1">GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Get In Touch Icon */}
      <FloatingContact />
    </div>
  )
}
