"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ExternalLink } from "lucide-react"
import Image from "next/image"
import { fetchProducts, Product } from "@/lib/firebase-services"
import FloatingContact from "@/components/FloatingContact"
import { useContact } from "@/contexts/ContactContext"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [visibleCards, setVisibleCards] = useState<string[]>([])
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

  return (
    <div className="pt-20 min-h-screen">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
            <Card
              key={product.id}
              className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden ${
                visibleCards.includes(product.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Featured Badge */}
              {product.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                  {product.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors duration-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

              </CardContent>
              
              {/* Bottom Button */}
              {product.project_url && (
                <div className="p-6 pt-0">
                  <a
                    href={product.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Project
                  </a>
                </div>
              )}
            </Card>
          ))}
          </div>
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
