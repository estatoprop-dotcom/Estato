// Lucknow Location Types

export interface LucknowLocation {
  id: string
  name: string
  slug: string
  type: 'area' | 'colony' | 'landmark' | 'road'
  parent?: string
  description: string
  propertyTypes: string[]
  nearbyLandmarks: string[]
  pincode?: string
  popular: boolean
}
