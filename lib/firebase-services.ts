import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  where,
  limit 
} from 'firebase/firestore'
import { db } from './firebase'

export interface Achievement {
  id: string
  date: string
  title: string
  description: string
  category: string
  link?: string
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  description: string[]
  startDate: string
  endDate?: string
  current: boolean
}

export interface Skill {
  id: string
  name: string
  category: string
  proficiency: number
  icon?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  period: string
  description?: string
  gpa?: string
  startDate: string
}

export interface Product {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  project_url?: string
  featured: boolean
  category: string
  startDate?: string
}

export interface AboutContent {
  id: string
  section: string
  content: string
  lastUpdated: string
  order: number
}

export interface PersonalDetails {
  id: string
  email: string
  location: string
  profile_picture_url?: string
  logo_picture_url?: string
  github?: string
  twitter?: string
  facebook?: string
  linkedin?: string
  instagram?: string
  stackoverflow?: string
}

// Fetch achievements for home page
export const fetchAchievements = async (): Promise<Achievement[]> => {
  try {
    const q = query(collection(db, 'achievements'))
    const querySnapshot = await getDocs(q)
    const achievements = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Achievement[]
    
    // Sort achievements by date (latest first)
    // Convert MM, YYYY format to Date objects for proper sorting
    return achievements.sort((a, b) => {
      const parseDate = (dateStr: string) => {
        // Handle "MM, YYYY" format (e.g., "January, 2024")
        const [month, year] = dateStr.split(', ')
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ]
        const monthIndex = monthNames.indexOf(month)
        return new Date(parseInt(year), monthIndex)
      }
      
      const dateA = parseDate(a.date)
      const dateB = parseDate(b.date)
      
      // Sort in descending order (latest first)
      return dateB.getTime() - dateA.getTime()
    })
  } catch (error) {
    console.error('Error fetching achievements:', error)
    return []
  }
}

// Fetch experiences for about page
export const fetchExperiences = async (): Promise<Experience[]> => {
  try {
    const q = query(
      collection(db, 'experiences'),
      orderBy('startDate', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Experience[]
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return []
  }
}

// Fetch skills for about page
export const fetchSkills = async (): Promise<Skill[]> => {
  try {
    const q = query(
      collection(db, 'skills'),
      orderBy('proficiency', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Skill[]
  } catch (error) {
    console.error('Error fetching skills:', error)
    return []
  }
}

// Fetch education for about page
export const fetchEducation = async (): Promise<Education[]> => {
  try {
    const q = query(
      collection(db, 'education'),
      orderBy('startDate', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Education[]
  } catch (error) {
    console.error('Error fetching education:', error)
    return []
  }
}

// Fetch products for products page
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    console.log('Fetching products from Firebase...')
    
    // Try to fetch with ordering first
    let q
    try {
      q = query(
        collection(db, 'products'),
        orderBy('startDate', 'desc')
      )
    } catch (orderError) {
      console.log('Ordering failed, fetching without order:', orderError)
      // If ordering fails, fetch without order
      q = query(collection(db, 'products'))
    }
    
    const querySnapshot = await getDocs(q)
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[]
    console.log('Products fetched:', products)
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Fetch about content sections
export const fetchAboutContent = async (): Promise<AboutContent[]> => {
  try {
    console.log('Fetching about content from Firebase...')
    const q = query(
      collection(db, 'aboutContent'),
      orderBy('order')
    )
    console.log('Query created for aboutContent collection')
    const querySnapshot = await getDocs(q)
    console.log('Query snapshot received:', querySnapshot)
    console.log('Number of documents:', querySnapshot.docs.length)
    
    const aboutContent = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as AboutContent[]
    
    console.log('About content processed:', aboutContent)
    return aboutContent
  } catch (error) {
    console.error('Error fetching about content:', error)
    return []
  }
}

// Fetch featured products for home page
export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, 'products'),
      where('featured', '==', true),
      limit(3)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[]
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

// Fetch personal details for contact information
export const fetchPersonalDetails = async (): Promise<PersonalDetails | null> => {
  try {
    const q = query(collection(db, 'personal_details'), limit(1))
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) {
      return null
    }
    
    const doc = querySnapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data()
    } as PersonalDetails
  } catch (error) {
    console.error('Error fetching personal details:', error)
    return null
  }
}
