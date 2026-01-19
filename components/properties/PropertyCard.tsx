'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react'
import { Property } from '@/lib/supabase/types'
import { formatPrice } from '@/lib/utils'
import Card from '@/components/ui/Card'
import { useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import { useMockData } from '@/lib/mock-api'
import toast from 'react-hot-toast'

interface PropertyCardProps {
  property: Property
  onSaveToggle?: () => void
  isSaved?: boolean
}

export default function PropertyCard({ property, onSaveToggle, isSaved = false }: PropertyCardProps) {
  const [saving, setSaving] = useState(false)
  const supabase = createSupabaseClient()

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (saving) return
    
    if (useMockData()) {
      toast('Please configure Supabase to save properties', { icon: 'ℹ️' })
      return
    }
    
    setSaving(true)
    
    try {
      const supabase = createSupabaseClient()
      if (!supabase) {
        toast.info('Please configure Supabase to save properties')
        setSaving(false)
        return
      }

      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast.error('Please login to save properties')
        return
      }

      if (isSaved) {
        // Remove from saved
        await supabase
          .from('saved_properties')
          .delete()
          .eq('user_id', user.id)
          .eq('property_id', property.id)
        toast.success('Removed from saved')
      } else {
        // Add to saved
        await supabase
          .from('saved_properties')
          .insert({
            user_id: user.id,
            property_id: property.id,
          })
        toast.success('Saved property')
      }
      
      onSaveToggle?.()
    } catch (error) {
      toast.error('Failed to save property')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Link 
      href={`/properties/${property.id}`} 
      className="block h-full no-underline"
    >
      <Card 
        hover={false} 
        className="group bg-gradient-to-br from-white via-primary-50/30 to-white border border-gray-100/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full"
      >
        <div className="relative w-full aspect-video overflow-hidden">
          {property.images && property.images[0] ? (
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
          {property.featured && (
            <span className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
              Featured
            </span>
          )}
          <button
            onClick={handleSave}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-20 ${
              isSaved 
                ? 'bg-primary-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-primary-600 hover:text-white'
            }`}
            disabled={saving}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block bg-white px-3 py-1 rounded-full text-primary-600 font-semibold">
              {property.listing_type === 'rent' ? 'For Rent' : 'For Sale'}
            </span>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-b from-transparent to-primary-50/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
            {property.title}
          </h3>
          <p className="text-2xl font-bold text-primary-600 mb-3">
            {formatPrice(property.price)}
            {property.listing_type === 'rent' && <span className="text-sm text-gray-500 font-normal">/month</span>}
          </p>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{property.area}, {property.city}</span>
          </div>
          <div className="flex items-center gap-4 text-gray-600 text-sm pt-3 border-t border-gray-200/50">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Square className="w-4 h-4" />
              <span>{property.sqft} sqft</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
