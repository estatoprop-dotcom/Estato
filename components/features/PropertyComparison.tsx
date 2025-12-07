'use client'

import { useState } from 'react'
import { Scale, Plus, X, Share2, Download, Check, AlertCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import Image from 'next/image'

interface Property {
  id: string
  title: string
  price: number
  area: number
  bedrooms: number
  bathrooms: number
  location: string
  propertyType: string
  furnishing: string
  floor: string
  facing: string
  amenities: string[]
  image: string
  pricePerSqft: number
}

interface ComparisonHighlight {
  category: string
  winner: string
  value: string
}

// Mock properties for demo
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury 3BHK in Gomti Nagar',
    price: 8500000,
    area: 1650,
    bedrooms: 3,
    bathrooms: 3,
    location: 'Gomti Nagar',
    propertyType: 'Apartment',
    furnishing: 'Semi-Furnished',
    floor: '12th Floor',
    facing: 'East',
    amenities: ['Swimming Pool', 'Gym', 'Parking', 'Security', 'Club House', 'Power Backup'],
    image: '/property1.jpg',
    pricePerSqft: 5151
  },
  {
    id: '2',
    title: 'Modern 3BHK in Hazratganj',
    price: 9200000,
    area: 1500,
    bedrooms: 3,
    bathrooms: 2,
    location: 'Hazratganj',
    propertyType: 'Apartment',
    furnishing: 'Fully Furnished',
    floor: '8th Floor',
    facing: 'North',
    amenities: ['Gym', 'Parking', 'Security', 'Lift', 'Garden'],
    image: '/property2.jpg',
    pricePerSqft: 6133
  },
  {
    id: '3',
    title: 'Spacious 4BHK Villa',
    price: 12500000,
    area: 2200,
    bedrooms: 4,
    bathrooms: 4,
    location: 'Sushant Golf City',
    propertyType: 'Villa',
    furnishing: 'Unfurnished',
    floor: 'Ground + 1',
    facing: 'North-East',
    amenities: ['Garden', 'Parking', 'Security', 'Power Backup', 'Servant Room'],
    image: '/property3.jpg',
    pricePerSqft: 5681
  }
]

export default function PropertyComparison() {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([mockProperties[0], mockProperties[1]])
  const [showPropertyPicker, setShowPropertyPicker] = useState(false)
  const [pickerSlot, setPickerSlot] = useState<number>(0)

  const addProperty = (slot: number) => {
    setPickerSlot(slot)
    setShowPropertyPicker(true)
  }

  const selectProperty = (property: Property) => {
    const newSelected = [...selectedProperties]
    newSelected[pickerSlot] = property
    setSelectedProperties(newSelected)
    setShowPropertyPicker(false)
  }

  const removeProperty = (index: number) => {
    const newSelected = selectedProperties.filter((_, i) => i !== index)
    setSelectedProperties(newSelected)
  }

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`
    return `₹${(price / 100000).toFixed(2)} L`
  }

  const getBestValue = (field: keyof Property, type: 'min' | 'max') => {
    if (selectedProperties.length < 2) return null
    const values = selectedProperties.map(p => p[field] as number)
    const bestValue = type === 'min' ? Math.min(...values) : Math.max(...values)
    return selectedProperties.find(p => p[field] === bestValue)?.id
  }

  const highlights: ComparisonHighlight[] = [
    { category: 'Lowest Price', winner: getBestValue('price', 'min') || '', value: 'price' },
    { category: 'Best Value (₹/sqft)', winner: getBestValue('pricePerSqft', 'min') || '', value: 'pricePerSqft' },
    { category: 'Largest Area', winner: getBestValue('area', 'max') || '', value: 'area' },
    { category: 'Most Bedrooms', winner: getBestValue('bedrooms', 'max') || '', value: 'bedrooms' },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Compare Properties</h2>
              <p className="text-blue-100">Compare up to 4 properties side by side</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="!text-white !border-white hover:!bg-white/20">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="!text-white !border-white hover:!bg-white/20">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Highlights */}
      {selectedProperties.length >= 2 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 border-b">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Highlights</h3>
          <div className="flex flex-wrap gap-3">
            {highlights.map((h, i) => {
              const winner = selectedProperties.find(p => p.id === h.winner)
              return winner ? (
                <div key={i} className="bg-white rounded-lg px-3 py-2 shadow-sm flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm">
                    <strong>{h.category}:</strong> {winner.title.split(' ').slice(0, 2).join(' ')}
                  </span>
                </div>
              ) : null
            })}
          </div>
        </div>
      )}

      {/* Comparison Table */}
      <div className="p-6 overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr>
              <th className="text-left p-4 bg-gray-50 rounded-tl-xl w-48">Features</th>
              {selectedProperties.map((property, index) => (
                <th key={property.id} className="p-4 bg-gray-50 relative">
                  <button
                    onClick={() => removeProperty(index)}
                    className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-4xl">
                      🏠
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm">{property.title}</h4>
                  <p className="text-xs text-gray-500">{property.location}</p>
                </th>
              ))}
              {selectedProperties.length < 4 && (
                <th className="p-4 bg-gray-50 rounded-tr-xl">
                  <button
                    onClick={() => addProperty(selectedProperties.length)}
                    className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-purple-500 hover:bg-purple-50 transition-colors"
                  >
                    <Plus className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500 mt-2">Add Property</span>
                  </button>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {/* Price */}
            <tr className="border-b">
              <td className="p-4 font-medium text-gray-700">Price</td>
              {selectedProperties.map(p => (
                <td key={p.id} className={`p-4 text-center ${getBestValue('price', 'min') === p.id ? 'bg-green-50' : ''}`}>
                  <span className={`text-lg font-bold ${getBestValue('price', 'min') === p.id ? 'text-green-600' : 'text-gray-800'}`}>
                    {formatPrice(p.price)}
                  </span>
                  {getBestValue('price', 'min') === p.id && (
                    <span className="block text-xs text-green-600 mt-1">Lowest Price</span>
                  )}
                </td>
              ))}
              {selectedProperties.length < 4 && <td className="p-4"></td>}
            </tr>

            {/* Price per sqft */}
            <tr className="border-b bg-gray-50">
              <td className="p-4 font-medium text-gray-700">Price/Sq.ft</td>
              {selectedProperties.map(p => (
                <td key={p.id} className={`p-4 text-center ${getBestValue('pricePerSqft', 'min') === p.id ? 'bg-green-100' : ''}`}>
                  <span className={`font-semibold ${getBestValue('pricePerSqft', 'min') === p.id ? 'text-green-600' : ''}`}>
                    ₹{p.pricePerSqft.toLocaleString('en-IN')}
                  </span>
                  {getBestValue('pricePerSqft', 'min') === p.id && (
                    <span className="block text-xs text-green-600 mt-1">Best Value</span>
                  )}
                </td>
              ))}
              {selectedProperties.length < 4 && <td className="p-4 bg-gray-50"></td>}
            </tr>

            {/* Area */}
            <tr className="border-b">
              <td className="p-4 font-medium text-gray-700">Area</td>
              {selectedProperties.map(p => (
                <td key={p.id} className={`p-4 text-center ${getBestValue('area', 'max') === p.id ? 'bg-blue-50' : ''}`}>
                  <span className={`font-semibold ${getBestValue('area', 'max') === p.id ? 'text-blue-600' : ''}`}>
                    {p.area} sq.ft
                  </span>
                  {getBestValue('area', 'max') === p.id && (
                    <span className="block text-xs text-blue-600 mt-1">Largest</span>
                  )}
                </td>
              ))}
              {selectedProperties.length < 4 && <td className="p-4"></td>}
            </tr>

            {/* Bedrooms */}
            <tr className="border-b bg-gray-50">
              <td className="p-4 font-medium text-gray-700">Bedrooms</td>
              {selectedProperties.map(p => (
                <td key={p.id} className="p-4 text-center">
                  <span className="font-semibold">{p.bedrooms} BHK</span>
                </td>
              ))}
              {selectedProperties.length < 4 && <td className="p-4 bg-gray-50"></td>}
            </tr>

            {/* Bathrooms */}
            <tr className="border-b">
              <td className="p-4 font-medium text-gray-700">Bathrooms</td>
              {selectedProperties.map(p => (
                <td key={p.id} className="p-4 text-center">{p.bathrooms}</td>
              ))}
              {selectedProperties.length < 4 && <td className="p-4"></td>}
            </tr>

            {/* Property Type */}
            <tr className="border-b bg-gray-50">
              <td className="p-4 font-medium text-gray-700">Type</td>
              {selectedProperties.map(p => (
                <td key={p.id} className="p-4 text-center">{p.propertyType}</td>
              ))}
              {selectedProperties.length < 4 && <td className="p-4 bg-gray-50"></td>}
            </tr>

            {/* Furnishing */}
            <tr className="border-b">
              <td className="p-4 font-medium text-gray-700">Furnishing</td>
              {selectedProperties.map(p => (
                <td key={p.id} className="p-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    p.furnishing === 'Fully Furnished' ? 'bg-green-100 text-green-700' :
                    p.furnishing === 'Semi-Furnished' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {p.furnishing}
                  </span>
                </td>
              ))}
              {selectedProperties.length < 4 && <td className="p-4"></td>}
            </tr>

            {/* Floor */}
            <tr className="border-b bg-gray-50">
              <td className="p-4 font-medium text-gray-700">Floor</td>
              {selectedProperties.map(p => (
                <td key={p.id} className="p-4 text-center">{p.floor}</td>
              ))}
              {selectedProperties.length < 4 && <td className="p-4 bg-gray-50"></td>}
            </tr>

            {/* Facing */}
            <tr className="border-b">
              <td className="p-4 font-medium text-gray-700">Facing</td>
              {selectedProperties.map(p => (
                <td key={p.id} className="p-4 text-center">{p.facing}</td>
              ))}
              {selectedProperties.length < 4 && <td className="p-4"></td>}
            </tr>

            {/* Amenities */}
            <tr>
              <td className="p-4 font-medium text-gray-700">Amenities</td>
              {selectedProperties.map(p => (
                <td key={p.id} className="p-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {p.amenities.slice(0, 4).map((amenity, i) => (
                      <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                        {amenity}
                      </span>
                    ))}
                    {p.amenities.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{p.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                </td>
              ))}
              {selectedProperties.length < 4 && <td className="p-4"></td>}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Property Picker Modal */}
      {showPropertyPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Select Property to Compare</h3>
              <button onClick={() => setShowPropertyPicker(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <div className="space-y-3">
                {mockProperties.filter(p => !selectedProperties.find(s => s.id === p.id)).map(property => (
                  <button
                    key={property.id}
                    onClick={() => selectProperty(property)}
                    className="w-full flex items-center gap-4 p-4 border rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-colors text-left"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white text-2xl">
                      🏠
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{property.title}</h4>
                      <p className="text-sm text-gray-500">{property.location}</p>
                      <p className="text-lg font-bold text-purple-600 mt-1">{formatPrice(property.price)}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>{property.area} sq.ft</p>
                      <p>{property.bedrooms} BHK</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
