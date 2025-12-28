'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { MapPin, Home, Building2, Users, Phone, MessageCircle, Star, CheckCircle, ArrowRight } from 'lucide-react'
import PropertyCard from '@/components/properties/PropertyCard'
import { Property } from '@/lib/supabase/types'
import { supabaseApi } from '@/lib/supabase-api'
import { getLocationBySlug, allLucknowLocations } from '@/lib/lucknow-locations'
import Link from 'next/link'

export default function LocationPage() {
  const params = useParams()
  const slug = params.slug as string
  const location = getLocationBySlug(slug)
  
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (location) {
      fetchProperties()
    }
  }, [location])

  const fetchProperties = async () => {
    try {
      const data = await supabaseApi.getProperties({ area: location?.name })
      setProperties(data)
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading(false)
  }

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Location Not Found</h1>
          <Link href="/locations" className="text-primary-600 mt-4 inline-block">
            View All Locations
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/locations">Locations</Link>
            <span>/</span>
            <span className="text-white">{location.name}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in {location.name} – Buy, Sell & Rent in {location.name}, Lucknow
          </h1>
          
          <p className="text-xl text-primary-100 max-w-3xl">
            {location.description}. Estato lists verified flats, rooms, rented accommodations, plots, & commercial spaces in {location.name}.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link href={`/properties?area=${location.name}&listing_type=sale`} 
              className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              Buy Property
            </Link>
            <Link href={`/properties?area=${location.name}&listing_type=rent`}
              className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              Rent Property
            </Link>
            <a href="https://wa.me/919872364476" target="_blank"
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Property Types Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Property Types in {location.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {location.propertyTypes.map((type) => (
            <Link key={type} href={`/properties?area=${location.name}&type=${type.toLowerCase()}`}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 text-center">
              <Building2 className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <span className="font-medium text-gray-800">{type}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Properties Listing */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Available Properties in {location.name} ({properties.length})
        </h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Properties Yet</h3>
            <p className="text-gray-600 mb-6">Be the first to list your property in {location.name}</p>
            <Link href="/properties/add" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold">
              List Your Property
            </Link>
          </div>
        )}
      </div>

      {/* Nearby Landmarks */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Nearby Landmarks</h2>
          <div className="flex flex-wrap gap-3">
            {location.nearbyLandmarks.map((landmark) => (
              <span key={landmark} className="bg-gray-100 px-4 py-2 rounded-full text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-600" />
                {landmark}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Estato */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Estato in {location.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: CheckCircle, title: 'Verified Listings', desc: '100% verified properties' },
            { icon: Users, title: 'Direct Owner', desc: 'Contact owners directly' },
            { icon: Star, title: 'Zero Brokerage', desc: 'No hidden charges' },
            { icon: Phone, title: 'WhatsApp Support', desc: 'Instant assistance' }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <item.icon className="w-10 h-10 text-primary-600 mb-3" />
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Find Your Dream Property in {location.name}
          </h2>
          <p className="text-primary-100 mb-8">Download Estato App or WhatsApp for instant listings</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              📱 Download App
            </a>
            <a href="https://wa.me/919872364476" className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              🟢 WhatsApp Now
            </a>
          </div>
        </div>
      </div>

      {/* Other Locations */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Other Locations</h2>
        <div className="flex flex-wrap gap-3">
          {allLucknowLocations.filter(l => l.id !== location.id).slice(0, 20).map((loc) => (
            <Link key={loc.id} href={`/locations/${loc.slug}`}
              className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition">
              {loc.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
