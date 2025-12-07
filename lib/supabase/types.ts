export interface Property {
  id: string
  title: string
  description: string
  type: 'flat' | 'house' | 'villa' | 'office' | 'shop' | 'plot'
  listing_type: 'rent' | 'sale'
  price: number
  location: string
  city: string
  area: string
  bedrooms: number
  bathrooms: number
  sqft: number
  images: string[]
  amenities: string[]
  latitude?: number
  longitude?: number
  owner_id: string
  owner_name: string
  owner_email: string
  owner_phone: string
  status: 'active' | 'pending' | 'approved' | 'rejected' | 'needs_revision' | 'sold' | 'rented'
  admin_comment?: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  full_name?: string
  phone?: string
  role: 'user' | 'admin'
  avatar_url?: string
  created_at: string
}

export interface SavedProperty {
  id: string
  user_id: string
  property_id: string
  created_at: string
  property?: Property
}

export interface FilterParams {
  city?: string
  area?: string
  type?: string
  listing_type?: 'rent' | 'sale'
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  amenities?: string[]
  search?: string
}
