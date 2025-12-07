'use client'

import { useState } from 'react'
import { Search, MapPin, Building2, Home, TrendingUp, Star } from 'lucide-react'
import { topLocations, microLocations, landmarkLocations, searchLocations, LucknowLocation, allLucknowLocations } from '@/lib/lucknow-locations'
import { coloniesAndSectors } from '@/lib/lucknow-colonies'
import { centralMohallas, eastMohallas, northMohallas, southMohallas, westMohallas } from '@/lib/lucknow-mohallas'
import Link from 'next/link'

export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<string>('all')

  const getFilteredLocations = () => {
    if (searchQuery) return searchLocations(searchQuery)
    switch(activeTab) {
      case 'popular': return topLocations
      case 'landmarks': return landmarkLocations
      case 'colonies': return coloniesAndSectors
      case 'central': return centralMohallas
      case 'east': return eastMohallas
      case 'north': return northMohallas
      case 'south': return southMohallas
      case 'west': return westMohallas
      default: return allLucknowLocations.slice(0, 100) // Show first 100 for performance
    }
  }
  
  const filteredLocations = getFilteredLocations()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Lucknow's No.1 Real Estate Marketplace
          </h1>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Buy, Sell & Rent Properties in Every Locality of Lucknow. 
            Explore <strong>300+ areas, colonies, mohallas, and landmarks</strong> for complete SEO coverage.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search locations... (e.g., Gomti Nagar, Hazratganj)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-primary-300"
            />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Services Covered</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'Buy Property', icon: Home, href: '/properties?listing_type=sale' },
            { name: 'Rent Property', icon: Building2, href: '/properties?listing_type=rent' },
            { name: 'PG/Rooms', icon: Building2, href: '/properties?type=pg' },
            { name: 'Commercial', icon: Building2, href: '/properties?type=commercial' },
            { name: 'Plots', icon: MapPin, href: '/properties?type=plot' },
            { name: 'New Projects', icon: TrendingUp, href: '/properties?type=new-project' }
          ].map((service) => (
            <Link key={service.name} href={service.href}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition text-center border border-gray-100">
              <service.icon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <span className="font-medium text-gray-800 text-sm">{service.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Why Estato */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Why Estato is Lucknow's #1 PropTech App</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Hyper-local search (Area + Mohalla + Landmark)',
              'WhatsApp leads',
              '3D property walkthroughs',
              'Direct owner contact',
              'Zero brokerage options',
              'AI property suggestions',
              'Verified listings',
              'Instant location filter'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-primary-50 rounded-lg">
                <Star className="w-4 h-4 text-primary-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Total: <strong>{allLucknowLocations.length}+ locations</strong> for SEO domination</p>
        </div>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Locations' },
            { id: 'popular', label: '⭐ Top 20 Areas' },
            { id: 'colonies', label: '🏘️ 100 Colonies' },
            { id: 'central', label: '📍 Central Lucknow' },
            { id: 'east', label: '📍 East (Gomti Nagar)' },
            { id: 'north', label: '📍 North (Aliganj)' },
            { id: 'south', label: '📍 South (Ashiyana)' },
            { id: 'west', label: '📍 West (Rajajipuram)' },
            { id: 'landmarks', label: '🏛️ Near Landmarks' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${
                activeTab === tab.id 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <p className="text-sm text-gray-500 mb-4">Showing {filteredLocations.length} locations</p>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLocations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>

        {filteredLocations.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">No locations found</h3>
            <p className="text-gray-600">Try a different search term</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Can't Find Your Location?
          </h2>
          <p className="text-primary-100 mb-8">WhatsApp us and we'll help you find properties in any area of Lucknow</p>
          <a href="https://wa.me/919872364476" 
            className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
            🟢 WhatsApp Now
          </a>
        </div>
      </div>
    </div>
  )
}

function LocationCard({ location }: { location: LucknowLocation }) {
  return (
    <Link href={`/locations/${location.slug}`}
      className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition">
              {location.name}
            </h3>
            <span className="text-xs text-gray-500 capitalize">{location.type}</span>
          </div>
        </div>
        {location.popular && (
          <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-medium">
            Popular
          </span>
        )}
      </div>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{location.description}</p>
      
      <div className="flex flex-wrap gap-1">
        {location.propertyTypes.slice(0, 4).map((type) => (
          <span key={type} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
            {type}
          </span>
        ))}
        {location.propertyTypes.length > 4 && (
          <span className="text-xs text-gray-500">+{location.propertyTypes.length - 4} more</span>
        )}
      </div>
    </Link>
  )
}
