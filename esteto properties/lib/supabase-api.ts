// Real Supabase API - Fetches data from Supabase database
import { createClient } from '@supabase/supabase-js'
import { Property, FilterParams } from './supabase/types'
import { allLucknowLocations } from './lucknow-locations'

// Get related location names for a search (e.g., "Gomti Nagar" returns all khands)
const getRelatedLocationNames = (searchArea: string): string[] => {
  const search = searchArea.toLowerCase()
  const related: string[] = [searchArea]
  
  // Find locations that have this as parent or in nearbyLandmarks
  allLucknowLocations.forEach(loc => {
    if (loc.parent?.toLowerCase().includes(search) || 
        loc.nearbyLandmarks.some(l => l.toLowerCase().includes(search))) {
      related.push(loc.name)
    }
  })
  
  return related
}

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper to map database property to frontend Property type
const mapDbProperty = (p: any): Property => ({
  id: p.id,
  title: p.title || '',
  description: p.description || '',
  type: p.property_type || p.type || 'flat',
  listing_type: p.transaction_type === 'Buy' ? 'sale' : (p.transaction_type === 'Rent' ? 'rent' : (p.listing_type || 'sale')),
  price: p.price || 0,
  location: p.location || '',
  city: p.city || p.area || 'Lucknow',
  area: p.area || '',
  bedrooms: p.bedrooms || 0,
  bathrooms: p.bathrooms || 0,
  sqft: p.size || p.sqft || 0,
  images: p.images || [],
  amenities: p.amenities || [],
  latitude: p.latitude,
  longitude: p.longitude,
  owner_id: p.owner_id || '',
  owner_name: p.owner_name || '',
  owner_email: p.owner_email || '',
  owner_phone: p.owner_phone || '',
  status: p.status || 'pending',
  admin_comment: p.admin_comment,
  featured: p.is_featured || p.featured || false,
  created_at: p.created_at,
  updated_at: p.updated_at,
})

export const supabaseApi = {
  // Get all properties with filters
  getProperties: async (filters?: FilterParams): Promise<Property[]> => {
    try {
      let query = supabase
        .from('properties')
        .select('*')
        .in('status', ['approved', 'active', 'pending'])  // Show approved, active, and pending properties
        .order('created_at', { ascending: false })

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,location.ilike.%${filters.search}%,area.ilike.%${filters.search}%`)
      }

      if (filters?.city) {
        query = query.ilike('area', `%${filters.city}%`)  // city is stored in area field
      }

      if (filters?.area) {
        query = query.ilike('area', `%${filters.area}%`)
      }

      if (filters?.type) {
        query = query.eq('property_type', filters.type)  // Use property_type
      }

      if (filters?.listing_type) {
        // Map sale/rent to Buy/Rent
        const transactionType = filters.listing_type === 'sale' ? 'Buy' : 'Rent'
        query = query.eq('transaction_type', transactionType)
      }

      if (filters?.minPrice) {
        query = query.gte('price', filters.minPrice)
      }

      if (filters?.maxPrice) {
        query = query.lte('price', filters.maxPrice)
      }

      if (filters?.bedrooms) {
        query = query.gte('bedrooms', filters.bedrooms)
      }

      if (filters?.bathrooms) {
        query = query.gte('bathrooms', filters.bathrooms)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching properties:', error)
        return []
      }

      return (data || []).map(mapDbProperty)
    } catch (error) {
      console.error('Error in getProperties:', error)
      return []
    }
  },

  // Get property by ID
  getPropertyById: async (id: string): Promise<Property | null> => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching property:', error)
        return null
      }

      return data ? mapDbProperty(data) : null
    } catch (error) {
      console.error('Error in getPropertyById:', error)
      return null
    }
  },

  // Get featured properties
  getFeaturedProperties: async (): Promise<Property[]> => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .in('status', ['approved', 'active', 'pending'])
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(6)

      if (error) {
        console.error('Error fetching featured properties:', error)
        return []
      }

      return (data || []).map(mapDbProperty)
    } catch (error) {
      console.error('Error in getFeaturedProperties:', error)
      return []
    }
  },

  // Get trending/recent properties
  getTrendingProperties: async (): Promise<Property[]> => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .in('status', ['approved', 'active', 'pending'])
        .order('created_at', { ascending: false })
        .limit(8)

      if (error) {
        console.error('Error fetching trending properties:', error)
        return []
      }

      return (data || []).map(mapDbProperty)
    } catch (error) {
      console.error('Error in getTrendingProperties:', error)
      return []
    }
  },

  // Get user's properties
  getUserProperties: async (userId: string): Promise<Property[]> => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('owner_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching user properties:', error)
        return []
      }

      return (data || []).map(mapDbProperty)
    } catch (error) {
      console.error('Error in getUserProperties:', error)
      return []
    }
  },

  // Get saved/favorite properties
  getSavedProperties: async (userId: string): Promise<Property[]> => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('property_id, properties(*)')
        .eq('user_id', userId)

      if (error) {
        console.error('Error fetching saved properties:', error)
        return []
      }

      return (data?.map((item: any) => item.properties).filter(Boolean) || []).map(mapDbProperty)
    } catch (error) {
      console.error('Error in getSavedProperties:', error)
      return []
    }
  },

  // Check if property is saved
  isPropertySaved: async (userId: string, propertyId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('property_id', propertyId)
        .single()

      return !!data && !error
    } catch (error) {
      return false
    }
  },

  // Save/unsave property
  toggleSaveProperty: async (userId: string, propertyId: string): Promise<boolean> => {
    try {
      const isSaved = await supabaseApi.isPropertySaved(userId, propertyId)

      if (isSaved) {
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', userId)
          .eq('property_id', propertyId)
        return false
      } else {
        await supabase
          .from('favorites')
          .insert({ user_id: userId, property_id: propertyId })
        return true
      }
    } catch (error) {
      console.error('Error toggling save:', error)
      return false
    }
  },

  // Create property
  createProperty: async (property: Partial<Property>): Promise<Property | null> => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert(property)
        .select()
        .single()

      if (error) {
        console.error('Error creating property:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in createProperty:', error)
      return null
    }
  },

  // Update property
  updateProperty: async (id: string, updates: Partial<Property>): Promise<Property | null> => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating property:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in updateProperty:', error)
      return null
    }
  },

  // Delete property
  deleteProperty: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id)

      return !error
    } catch (error) {
      console.error('Error in deleteProperty:', error)
      return false
    }
  },

  // Get property stats for admin
  getPropertyStats: async () => {
    try {
      const { count: totalProperties } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })

      const { count: activeListings } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active')

      const { count: pendingListings } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')

      const { count: totalUsers } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })

      return {
        totalProperties: totalProperties || 0,
        activeListings: activeListings || 0,
        pendingListings: pendingListings || 0,
        totalUsers: totalUsers || 0,
      }
    } catch (error) {
      console.error('Error getting stats:', error)
      return {
        totalProperties: 0,
        activeListings: 0,
        pendingListings: 0,
        totalUsers: 0,
      }
    }
  },
}

export default supabaseApi
