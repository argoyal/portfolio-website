"use client"

import { Mail, MapPin, Github, Linkedin, Facebook, Instagram, MessageSquare, Twitter } from 'lucide-react'
import { useContact } from '@/contexts/ContactContext'
import { useEffect, useState } from 'react'
import { fetchPersonalDetails, PersonalDetails } from '@/lib/firebase-services'

export default function FloatingContact() {
  const { isContactOpen, toggleContact } = useContact()
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails | null>(null)

  useEffect(() => {
    const loadPersonalDetails = async () => {
      const data = await fetchPersonalDetails()
      setPersonalDetails(data)
    }
    
    loadPersonalDetails()
  }, [])

  // Don't render if personal details haven't loaded yet
  if (!personalDetails) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Main floating icon */}
      <div 
        className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
        onClick={toggleContact}
      >
        <Mail className="w-7 h-7 text-white" />
      </div>
      
      {/* Expanded contact info on hover or click */}
      <div className={`absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 transition-all duration-300 transform ${
        isContactOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
      }`}>
        <div className="p-6">
          <h3 className="text-lg font-bold mb-4 text-gray-900">Get In Touch</h3>
          <div className="space-y-3 mb-4">
            <a 
              href={`mailto:${personalDetails.email}`}
              className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <Mail className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <span className="text-sm">{personalDetails.email}</span>
            </a>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <span className="text-sm">{personalDetails.location}</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {personalDetails.github && (
              <a 
                href={personalDetails.github}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {personalDetails.linkedin && (
              <a 
                href={personalDetails.linkedin}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {personalDetails.facebook && (
              <a 
                href={personalDetails.facebook}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-700 transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {personalDetails.instagram && (
              <a 
                href={personalDetails.instagram}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {personalDetails.stackoverflow && (
              <a 
                href={personalDetails.stackoverflow}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                title="Stack Overflow"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 384 512"
                    fill="currentColor"
                >
                    <path d="M290.7 311l-1.8 35.6H100.9v-35.6h189.8zm25.7-85.6l-11.2 33.9-178.3-58.6 
                    11.2-33.9 178.3 58.6zm41.2-67.8l-20.4 29.3L168.8 88.5l20.4-29.3 
                    168.4 98.4zm26.3-69.1l-27.4 24.3-129.7-146 
                    27.4-24.3 129.7 146zM320 368v112H64V368h256zm-32 32H96v48h192v-48z"/>
                </svg>
              </a>
            )}
            {personalDetails.twitter && (
              <a 
                href={personalDetails.twitter}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
        
        {/* Arrow pointing to the icon */}
        <div className="absolute bottom-0 right-6 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45 translate-y-2"></div>
      </div>
    </div>
  )
}
