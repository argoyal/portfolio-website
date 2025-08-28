"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ExternalLink } from "lucide-react"
import Image from "next/image"
import { fetchProducts, Product } from "@/lib/firebase-services"
import FloatingContact from "@/components/FloatingContact"
import { useContact } from "@/contexts/ContactContext"

// Custom CSS for hiding scrollbars
const scrollbarHideStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [visibleCards, setVisibleCards] = useState<string[]>([])
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set())
  const [carouselRef, setCarouselRef] = useState<HTMLDivElement | null>(null)
  const [featuredCarouselRef, setFeaturedCarouselRef] = useState<HTMLDivElement | null>(null)
  const [canScrollLeftState, setCanScrollLeftState] = useState(false)
  const [canScrollRightState, setCanScrollRightState] = useState(false)
  const { openContact } = useContact()

  useEffect(() => {
    const loadProducts = async () => {
      console.log('Loading products...')
      const data = await fetchProducts()
      console.log('Products loaded:', data)
      setProducts(data)
      
      // Animate cards in sequence
      data.forEach((product, index) => {
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, product.id])
        }, index * 150)
      })
    }
    
    loadProducts()
  }, [])

  // Add scroll event listener to update button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef) {
        setCanScrollLeftState(carouselRef.scrollLeft > 0)
        setCanScrollRightState(carouselRef.scrollLeft < (carouselRef.scrollWidth - carouselRef.clientWidth))
      }
    }

    if (carouselRef) {
      carouselRef.addEventListener('scroll', handleScroll)
      // Initial check
      handleScroll()
      
      return () => {
        carouselRef.removeEventListener('scroll', handleScroll)
      }
    }
  }, [carouselRef])

  const toggleDescription = (productId: string) => {
    setExpandedDescriptions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  const truncateDescription = (description: string, maxLength: number = 120) => {
    if (description.length <= maxLength) return description
    return description.substring(0, maxLength).trim() + '...'
  }

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef) {
      const scrollAmount = 350 // Card width + gap
      const currentScroll = carouselRef.scrollLeft
      
      if (direction === 'left') {
        carouselRef.scrollTo({
          left: currentScroll - scrollAmount,
          behavior: 'smooth'
        })
      } else {
        carouselRef.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: 'smooth'
        })
      }
    }
  }

  const scrollFeaturedCarousel = (direction: 'left' | 'right') => {
    if (featuredCarouselRef) {
      // Responsive scroll amount based on screen size
      const isMobile = window.innerWidth < 768
      const isTablet = window.innerWidth < 1024
      
      let scrollAmount = 520 // Default for desktop
      if (isMobile) {
        scrollAmount = 280 // Mobile card width + gap
      } else if (isTablet) {
        scrollAmount = 400 // Tablet card width + gap
      }
      
      const currentScroll = featuredCarouselRef.scrollLeft
      
      if (direction === 'left') {
        featuredCarouselRef.scrollTo({
          left: currentScroll - scrollAmount,
          behavior: 'smooth'
        })
      } else {
        featuredCarouselRef.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: 'smooth'
        })
      }
    }
  }

  const canScrollLeft = () => canScrollLeftState
  const canScrollRight = () => canScrollRightState

  return (
    <div className="pt-20 min-h-screen">
      <style jsx>{scrollbarHideStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            My Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing some of my best work in DevOps, cloud computing, and emerging technologies
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h3>
              <p className="text-gray-500 mb-4">
                {products === null ? 'Loading products...' : 'No products have been added yet.'}
              </p>
              <div className="text-sm text-gray-400">
                Check the browser console for debugging information.
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Products Section */}
            {products.filter(p => p.featured).length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Featured Projects
                </h2>
                <div className="relative">
                  {/* Left Navigation Button */}
                  {products.filter(p => p.featured).length > 1 && (
                    <button
                      onClick={() => scrollFeaturedCarousel('left')}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 -ml-2 md:-ml-6"
                      aria-label="Scroll featured projects left"
                    >
                      <svg className="w-4 h-4 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}

                  {/* Right Navigation Button */}
                  {products.filter(p => p.featured).length > 1 && (
                    <button
                      onClick={() => scrollFeaturedCarousel('right')}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 -mr-2 md:-mr-6"
                      aria-label="Scroll featured projects right"
                    >
                      <svg className="w-4 h-4 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}

                  <div 
                    ref={setFeaturedCarouselRef}
                    className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-4 scrollbar-hide scroll-smooth px-2 md:px-0"
                  >
                    {products
                      .filter(p => p.featured)
                      .sort((a, b) => {
                        if (!a.startDate || !b.startDate) return 0;
                        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
                      })
                      .map((product, index) => (
                      <Card
                        key={product.id}
                        className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden flex-shrink-0 flex flex-col ${
                          visibleCards.includes(product.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                        style={{ 
                          transitionDelay: `${index * 100}ms`,
                          minWidth: '280px',
                          width: '100%',
                          maxWidth: '500px'
                        }}
                      >
                        {/* Featured Badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 text-xs md:text-sm">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>

                        {/* Image */}
                        <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <CardHeader className="pb-3 px-4 md:px-6">
                          <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                            {product.title}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="pt-0 flex-1 px-4 md:px-6">
                          <div className="mb-4">
                            <div className={`text-gray-600 leading-relaxed text-sm md:text-base ${
                              expandedDescriptions.has(product.id) 
                                ? 'min-h-0' 
                                : 'h-16 md:h-20'
                            }`}>
                              {expandedDescriptions.has(product.id) ? product.description : truncateDescription(product.description)}
                            </div>
                            {product.description.length > 120 && (
                              <button
                                onClick={() => toggleDescription(product.id)}
                                className="text-indigo-600 hover:text-indigo-700 hover:underline text-sm font-medium mt-2 transition-colors duration-200"
                              >
                                {expandedDescriptions.has(product.id) ? 'Read less' : 'Read more'}
                              </button>
                            )}
                          </div>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {product.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors duration-200 text-xs md:text-sm"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        
                        {/* Bottom Button - Always at bottom */}
                        <div className="mt-auto p-4 md:p-6 pt-0">
                          {product.project_url ? (
                            <a
                              href={product.project_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium text-sm md:text-base"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Visit Project
                            </a>
                          ) : (
                            <div className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-300 text-gray-500 rounded-lg font-medium text-sm md:text-base cursor-not-allowed">
                              <ExternalLink className="w-4 h-4" />
                              No Link Available
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Other Projects Carousel */}
            {products.filter(p => !p.featured).length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Other Projects
                </h2>
                <div className="relative">
                  {/* Left Navigation Button */}
                  {canScrollLeft() && (
                    <button
                      onClick={() => scrollCarousel('left')}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 -ml-6"
                      aria-label="Scroll left"
                    >
                      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}

                  {/* Right Navigation Button */}
                  {canScrollRight() && (
                    <button
                      onClick={() => scrollCarousel('right')}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 -mr-6"
                      aria-label="Scroll right"
                    >
                      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}

                  <div 
                    ref={setCarouselRef}
                    className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
                  >
                    {products
                      .filter(p => !p.featured)
                      .sort((a, b) => {
                        if (!a.startDate || !b.startDate) return 0;
                        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
                      })
                      .map((product, index) => (
                      <Card
                        key={product.id}
                        className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden flex-shrink-0 flex flex-col ${
                          visibleCards.includes(product.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                        style={{ 
                          transitionDelay: `${index * 100}ms`,
                          width: '320px'
                        }}
                      >
                        {/* Image */}
                        <div className="relative h-40 overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                            {product.title}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="pt-0 flex-1 flex flex-col">
                          {/* Description Area - Fixed Height in Collapsed Mode */}
                          <div className="mb-3 flex-1">
                            <div className={`text-gray-600 leading-relaxed text-sm ${
                              expandedDescriptions.has(product.id) 
                                ? 'min-h-0' 
                                : 'h-16'
                            }`}>
                              {expandedDescriptions.has(product.id) ? product.description : truncateDescription(product.description, 80)}
                            </div>
                            {product.description.length > 80 && (
                              <button
                                onClick={() => toggleDescription(product.id)}
                                className="text-indigo-600 hover:text-indigo-700 hover:underline text-xs font-medium mt-1 transition-colors duration-200"
                              >
                                {expandedDescriptions.has(product.id) ? 'Read less' : 'Read more'}
                              </button>
                            )}
                          </div>

                          {/* Technologies - Fixed Height for Consistent Alignment */}
                          <div className="h-16 flex flex-wrap gap-1 mb-3">
                            {product.technologies.slice(0, 3).map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors duration-200 text-xs px-2 py-1"
                              >
                                {tech}
                              </Badge>
                            ))}
                            {product.technologies.length > 3 && (
                              <Badge
                                variant="secondary"
                                className="bg-gray-100 text-gray-600 text-xs px-2 py-1"
                              >
                                +{product.technologies.length - 3}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                        
                        {/* Bottom Button - Always at bottom */}
                        <div className="mt-auto p-4 pt-0">
                          {product.project_url ? (
                            <a
                              href={product.project_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium text-sm"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Visit Project
                            </a>
                          ) : (
                            <div className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-300 text-gray-500 rounded-lg font-medium text-sm cursor-not-allowed">
                              <ExternalLink className="w-3 h-3" />
                              No Link Available
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-0 shadow-xl max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Interested in collaborating?
              </h2>
              <p className="text-gray-600 mb-6">
                I'm always open to discussing new opportunities and innovative projects.
              </p>
              <button 
                onClick={openContact}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Get In Touch
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Get in touch component */}
      <FloatingContact />
    </div>
  )
}
