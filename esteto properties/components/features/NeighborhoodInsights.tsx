'use client'

import { useState } from 'react'
import { MapPin, GraduationCap, Cross, ShoppingBag, Utensils, Train, Leaf, Shield, Users, Volume2, Droplets, Wind } from 'lucide-react'
import Button from '@/components/ui/Button'

interface Place {
  name: string
  type: string
  distance: number
  rating?: number
}

interface Category {
  name: string
  icon: any
  score: number
  places: Place[]
}

interface NeighborhoodData {
  name: string
  overallScore: number
  categories: Category[]
  connectivity: {
    metro?: { name: string; distance: number }
    bus: { name: string; distance: number }
    railway: { name: string; distance: number }
    airport: { name: string; distance: number }
  }
  environment: {
    airQuality: number
    airQualityStatus: string
    greenCover: number
    noiseLevel: number
    waterQuality: string
  }
  demographics: {
    population: string
    avgAge: number
    familyType: string
    incomeLevel: string
  }
}

const neighborhoodData: Record<string, NeighborhoodData> = {
  'gomti-nagar': {
    name: 'Gomti Nagar',
    overallScore: 92,
    categories: [
      {
        name: 'Education',
        icon: GraduationCap,
        score: 95,
        places: [
          { name: 'City Montessori School', type: 'School', distance: 500, rating: 4.5 },
          { name: 'DPS Eldeco', type: 'School', distance: 2000, rating: 4.6 },
          { name: 'Lucknow Public School', type: 'School', distance: 1500, rating: 4.3 }
        ]
      },
      {
        name: 'Healthcare',
        icon: Cross,
        score: 90,
        places: [
          { name: 'Sahara Hospital', type: 'Hospital', distance: 3000, rating: 4.4 },
          { name: 'Medanta Hospital', type: 'Hospital', distance: 5000, rating: 4.7 },
          { name: 'Apollo Clinic', type: 'Clinic', distance: 1000, rating: 4.2 }
        ]
      },
      {
        name: 'Shopping',
        icon: ShoppingBag,
        score: 95,
        places: [
          { name: 'Lulu Mall', type: 'Mall', distance: 4000, rating: 4.6 },
          { name: 'Phoenix Palassio', type: 'Mall', distance: 3500, rating: 4.5 },
          { name: 'Wave Mall', type: 'Mall', distance: 2000, rating: 4.3 }
        ]
      },
      {
        name: 'Dining',
        icon: Utensils,
        score: 93,
        places: [
          { name: 'Tunday Kababi', type: 'Restaurant', distance: 800, rating: 4.5 },
          { name: 'Moti Mahal', type: 'Restaurant', distance: 1200, rating: 4.3 }
        ]
      }
    ],
    connectivity: {
      metro: { name: 'IT Chauraha Metro (Upcoming)', distance: 2000 },
      bus: { name: 'Gomti Nagar Bus Stand', distance: 500 },
      railway: { name: 'Lucknow Junction', distance: 8000 },
      airport: { name: 'Chaudhary Charan Singh Airport', distance: 15000 }
    },
    environment: {
      airQuality: 58,
      airQualityStatus: 'Moderate',
      greenCover: 25,
      noiseLevel: 55,
      waterQuality: 'Good'
    },
    demographics: {
      population: '5,00,000+',
      avgAge: 32,
      familyType: 'Nuclear families, Young professionals',
      incomeLevel: 'Upper Middle Class'
    }
  }
}

interface NeighborhoodInsightsProps {
  locality?: string
}

export default function NeighborhoodInsights({ locality = 'gomti-nagar' }: NeighborhoodInsightsProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const data = neighborhoodData[locality] || neighborhoodData['gomti-nagar']

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'text-green-600'
    if (aqi <= 100) return 'text-yellow-600'
    if (aqi <= 150) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Neighborhood Insights</h2>
              <p className="text-teal-100">{data.name}, Lucknow</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full ${getScoreColor(data.overallScore)}`}>
            <span className="text-2xl font-bold">{data.overallScore}</span>
            <span className="text-sm">/100</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Category Scores */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {data.categories.map(category => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(activeCategory === category.name ? null : category.name)}
              className={`p-4 rounded-xl border-2 transition-all ${
                activeCategory === category.name
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-teal-300'
              }`}
            >
              <category.icon className={`w-6 h-6 mx-auto mb-2 ${
                activeCategory === category.name ? 'text-teal-600' : 'text-gray-600'
              }`} />
              <p className="text-sm font-medium">{category.name}</p>
              <p className={`text-lg font-bold ${
                category.score >= 80 ? 'text-green-600' : category.score >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {category.score}/100
              </p>
            </button>
          ))}
        </div>

        {/* Active Category Details */}
        {activeCategory && (
          <div className="mb-8 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold mb-4">{activeCategory} Nearby</h3>
            <div className="space-y-3">
              {data.categories.find(c => c.name === activeCategory)?.places.map((place, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div>
                    <p className="font-medium">{place.name}</p>
                    <p className="text-sm text-gray-500">{place.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{place.distance < 1000 ? `${place.distance}m` : `${(place.distance / 1000).toFixed(1)}km`}</p>
                    {place.rating && (
                      <p className="text-sm text-yellow-600">★ {place.rating}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Connectivity */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Train className="w-5 h-5 text-teal-600" />
            Connectivity
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.connectivity.metro && (
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">Metro</p>
                <p className="font-medium text-sm">{data.connectivity.metro.name}</p>
                <p className="text-blue-600 font-semibold">{(data.connectivity.metro.distance / 1000).toFixed(1)} km</p>
              </div>
            )}
            <div className="p-4 bg-green-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Bus Stand</p>
              <p className="font-medium text-sm">{data.connectivity.bus.name}</p>
              <p className="text-green-600 font-semibold">{data.connectivity.bus.distance}m</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Railway</p>
              <p className="font-medium text-sm">{data.connectivity.railway.name}</p>
              <p className="text-orange-600 font-semibold">{(data.connectivity.railway.distance / 1000).toFixed(1)} km</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Airport</p>
              <p className="font-medium text-sm">{data.connectivity.airport.name}</p>
              <p className="text-purple-600 font-semibold">{(data.connectivity.airport.distance / 1000).toFixed(1)} km</p>
            </div>
          </div>
        </div>

        {/* Environment */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-teal-600" />
            Environment
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <Wind className={`w-6 h-6 mx-auto mb-2 ${getAQIColor(data.environment.airQuality)}`} />
              <p className="text-xs text-gray-500">Air Quality</p>
              <p className={`font-bold ${getAQIColor(data.environment.airQuality)}`}>
                AQI {data.environment.airQuality}
              </p>
              <p className="text-xs">{data.environment.airQualityStatus}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <Leaf className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-xs text-gray-500">Green Cover</p>
              <p className="font-bold text-green-600">{data.environment.greenCover}%</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <Volume2 className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
              <p className="text-xs text-gray-500">Noise Level</p>
              <p className="font-bold text-yellow-600">{data.environment.noiseLevel} dB</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <Droplets className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-xs text-gray-500">Water Quality</p>
              <p className="font-bold text-blue-600">{data.environment.waterQuality}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <Shield className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <p className="text-xs text-gray-500">Safety</p>
              <p className="font-bold text-purple-600">Good</p>
            </div>
          </div>
        </div>

        {/* Demographics */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-600" />
            Demographics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Population</p>
              <p className="font-bold">{data.demographics.population}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Average Age</p>
              <p className="font-bold">{data.demographics.avgAge} years</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Family Type</p>
              <p className="font-bold text-sm">{data.demographics.familyType}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Income Level</p>
              <p className="font-bold">{data.demographics.incomeLevel}</p>
            </div>
          </div>
        </div>

        {/* Insights Summary */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4">
          <h4 className="font-semibold mb-2">Key Insights</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Overall livability score: {data.overallScore}/100
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Air Quality: {data.environment.airQualityStatus} (AQI {data.environment.airQuality})
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Ideal for: {data.demographics.familyType}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
