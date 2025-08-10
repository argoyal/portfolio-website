// API utilities for Django backend integration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken")
  }
  return null
}

// Helper function to make authenticated requests
const authenticatedFetch = (url: string, options: RequestInit = {}) => {
  const token = getAuthToken()
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Token ${token}` }),
      ...options.headers,
    },
  })
}

export interface Achievement {
  id: string
  date: string
  title: string
  description: string
  category: string
  link?: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  github_url?: string
  live_url?: string
  featured: boolean
  created_at: string
  updated_at: string
}

// Achievement API calls
export const achievementAPI = {
  getAll: async (): Promise<Achievement[]> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/achievements/`)
    if (!response.ok) throw new Error("Failed to fetch achievements")
    return response.json()
  },

  create: async (data: Omit<Achievement, "id" | "created_at" | "updated_at">): Promise<Achievement> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/achievements/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create achievement")
    return response.json()
  },

  update: async (id: string, data: Partial<Achievement>): Promise<Achievement> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/achievements/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update achievement")
    return response.json()
  },

  delete: async (id: string): Promise<void> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/achievements/${id}/`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete achievement")
  },
}

// Product API calls
export const productAPI = {
  getAll: async (): Promise<Product[]> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/products/`)
    if (!response.ok) throw new Error("Failed to fetch products")
    return response.json()
  },

  create: async (data: Omit<Product, "id" | "created_at" | "updated_at">): Promise<Product> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/products/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create product")
    return response.json()
  },

  update: async (id: string, data: Partial<Product>): Promise<Product> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/products/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update product")
    return response.json()
  },

  delete: async (id: string): Promise<void> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/products/${id}/`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete product")
  },
}

// Auth API calls
export const authAPI = {
  login: async (username: string, password: string): Promise<{ token: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
    if (!response.ok) throw new Error("Failed to login")
    const data = await response.json()
    localStorage.setItem("authToken", data.token)
    return data
  },

  logout: async (): Promise<void> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/auth/logout/`, {
      method: "POST",
    })
    if (!response.ok) throw new Error("Failed to logout")
    localStorage.removeItem("authToken")
  },
}

// BlogPost API calls
export const blogPostAPI = {
  getAll: async (): Promise<any[]> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/blog/posts/`)
    if (!response.ok) throw new Error("Failed to fetch blog posts")
    return response.json()
  },

  create: async (data: any): Promise<any> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/blog/posts/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create blog post")
    return response.json()
  },

  update: async (id: string, data: any): Promise<any> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/blog/posts/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update blog post")
    return response.json()
  },

  delete: async (id: string): Promise<void> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/blog/posts/${id}/`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete blog post")
  },
}

// Resume API calls
export const resumeAPI = {
  download: async (): Promise<Blob> => {
    const response = await fetch(`${API_BASE_URL}/resume/download/`)
    if (!response.ok) throw new Error("Failed to download resume")
    return response.blob()
  },
}

// Stats API calls
export const statsAPI = {
  get: async (): Promise<any> => {
    const response = await authenticatedFetch(`${API_BASE_URL}/stats/`)
    if (!response.ok) throw new Error("Failed to fetch stats")
    return response.json()
  },
}
