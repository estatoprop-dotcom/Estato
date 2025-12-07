'use client'

import { useState } from 'react'
import { Star, Crown, Zap, Eye, MousePointer, Users, TrendingUp, Check, MapPin, Bed, Bath } from 'lucide-react'
import Button from '@/components/ui/Button'

interface FeaturedPackage {
  id: string
  name: string
  price: number
  duration: number
  features: string[]
  badge?: string
  isPopular?: boolean
}

interface FeaturedProperty {
  id: string
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  badge: string
  impressions: number
  clicks: number
  leads: number
}

const packages: FeaturedPackage[] = [
  {
    id: 'basic',
    name: 'Basic Boost',
    price: 999,
    duration: 7,
    features: ['Priority in search results', 'Basic badge', 'Email support']
  },
  {
    id: 'premium',
    name: 'Premium Spotlight',
    price: 2499,
    duration: 15,
    features: ['Top position in search', 'Premium badge', 'Featured on homepage', 'Social media promotion', 'Priority support'],
    badge: 'Premium',
    isPopular: true
  },
  {
    id: 'spotlight',
    name: 'Spotlight Pro',
    price: 4999,
    duration: 30,
    features: ['Top position everywhere', 'Spotlight badge', 'Homepage carousel', 'Social media', 'WhatsApp broadcast', 'Dedicated manager', 'Analytics dashboard'],
    badge: 'Spotlight'
  }
]

const featuredProperties: FeaturedProperty[] = [
  {
    id: '1',
    title: 'Premium 3BHK in Gomti Nagar',
    location: 'Gomti Nagar, Lucknow',
    price: 8500000,
    bedrooms: 3,
    bathrooms: 3,
    area: 1650,
    image: '/property1.jpg',
    badge: 'Premium',
    impressions: 12500,
    clicks: 450,
    leads: 28
  },
  {
    id: '2',
    title: 'Luxury Villa in Sushant Golf City',
    location: 'Sushant Golf City, Lucknow',
    price: 15000000,
    bedrooms: 4,
    bathrooms: 4,
    area: 2800,
    image: '/property2.jpg',
    badge: 'Spotlight',
    impressions: 18000,
    clicks: 720,
    leads: 45
  },
  {
    id: '3',
    title: 'Modern 2BHK Apartment',
    location: 'Hazratganj, Lucknow',
    price: 6500000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    image: '/property3.jpg',
    badge: 'Premium',
    impressions: 8500,
    clicks: 320,
    leads: 18
  }
]

interface FeaturedListingsProps {
  view?: 'packages' | 'listings' | 'dashboard'
}

export default function FeaturedListings({ view = 'listings' }: FeaturedListingsProps) {
  const [activeView, setActiveView] = useState(view)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`
    return `₹${(price / 100000).toFixed(2)} L`
  }

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'Spotlight':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
      case 'Premium':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
      default:
        return 'bg-blue-500 text-white'
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Featured Listings</h2>
              <p className="text-amber-100">Boost your property visibility</p>
            </div>
          </div>
          <div className="flex gap-2">
            {['listings', 'packages', 'dashboard'].map(v => (
              <button
                key={v}
                onClick={() => setActiveView(v as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeView === v
                    ? 'bg-white text-orange-600'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Featured Listings View */}
        {activeView === 'listings' && (
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProperties.map(property => (
              <div key={property.id} className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white text-6xl">
                    🏠
                  </div>
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${getBadgeStyle(property.badge)}`}>
                    {property.badge === 'Spotlight' && <Star className="w-3 h-3 inline mr-1" />}
                    {property.badge}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">{property.title}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                    <MapPin className="w-3 h-3" />
                    {property.location}
                  </p>
                  <p className="text-xl font-bold text-orange-600 mb-3">{formatPrice(property.price)}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      {property.bedrooms}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      {property.bathrooms}
                    </span>
                    <span>{property.area} sq.ft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Packages View */}
        {activeView === 'packages' && (
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <div
                key={pkg.id}
                className={`relative border-2 rounded-2xl p-6 transition-all ${
                  selectedPackage === pkg.id
                    ? 'border-orange-500 bg-orange-50'
                    : pkg.isPopular
                      ? 'border-orange-300'
                      : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                {pkg.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </span>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">{pkg.name}</h3>
                  <p className="text-3xl font-bold text-orange-600 mt-2">
                    ₹{pkg.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">for {pkg.duration} days</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={pkg.isPopular ? 'gradient' : 'outline'}
                  className="w-full"
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  {selectedPackage === pkg.id ? 'Selected' : 'Choose Plan'}
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Dashboard View */}
        {activeView === 'dashboard' && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Impressions</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">39,000</p>
                <p className="text-xs text-green-600">+12% this week</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MousePointer className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-600">Clicks</span>
                </div>
                <p className="text-2xl font-bold text-purple-600">1,490</p>
                <p className="text-xs text-green-600">+8% this week</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">Leads</span>
                </div>
                <p className="text-2xl font-bold text-green-600">91</p>
                <p className="text-xs text-green-600">+15% this week</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <span className="text-sm text-gray-600">CTR</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">3.8%</p>
                <p className="text-xs text-green-600">Above average</p>
              </div>
            </div>

            {/* Property Performance */}
            <h3 className="font-semibold mb-4">Property Performance</h3>
            <div className="space-y-4">
              {featuredProperties.map(property => (
                <div key={property.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-lg flex items-center justify-center text-white text-2xl">
                    🏠
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{property.title}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${getBadgeStyle(property.badge)}`}>
                      {property.badge}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <p className="text-sm text-gray-500">Views</p>
                      <p className="font-bold">{property.impressions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Clicks</p>
                      <p className="font-bold">{property.clicks}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Leads</p>
                      <p className="font-bold text-green-600">{property.leads}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
