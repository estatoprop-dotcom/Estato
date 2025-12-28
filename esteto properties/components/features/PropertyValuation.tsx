'use client'

import { useState } from 'react'
import { Home, MapPin, Ruler, Calendar, Sofa, Compass, Building, Sparkles, TrendingUp, AlertCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface ValuationResult {
  estimatedValue: number
  minValue: number
  maxValue: number
  pricePerSqft: number
  confidence: number
  breakdown: {
    baseValue: number
    locationFactor: number
    typeFactor: number
    ageFactor: number
    amenityValue: number
  }
}

const locations = [
  'Gomti Nagar', 'Hazratganj', 'Gomti Nagar Extension', 'Aliganj', 
  'Indira Nagar', 'Jankipuram', 'Sushant Golf City', 'Mahanagar',
  'Ashiyana', 'Rajajipuram', 'Alambagh', 'Chinhat', 'Kursi Road'
]

const propertyTypes = ['Flat', 'Apartment', 'House', 'Villa', 'Penthouse', 'Plot']
const furnishingOptions = ['Unfurnished', 'Semi-Furnished', 'Fully Furnished']
const facingOptions = ['East', 'North', 'North-East', 'South', 'West', 'South-West']
const ageOptions = ['0-2 years', '2-5 years', '5-10 years', '10-15 years', '15+ years']

const amenitiesList = [
  'Swimming Pool', 'Gym', 'Club House', 'Parking', 'Power Backup',
  'Security', 'Lift', 'Garden', 'Play Area', 'Sports Facility'
]

export default function PropertyValuation() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ValuationResult | null>(null)
  
  const [formData, setFormData] = useState({
    location: '',
    propertyType: 'Flat',
    area: '',
    bedrooms: '2',
    bathrooms: '2',
    furnishing: 'Unfurnished',
    facing: 'East',
    floor: '',
    age: '0-2 years',
    amenities: [] as string[]
  })

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const calculateValuation = async () => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock calculation
    const basePrices: Record<string, number> = {
      'Gomti Nagar': 7500,
      'Hazratganj': 9500,
      'Gomti Nagar Extension': 5500,
      'Aliganj': 5200,
      'Indira Nagar': 5800,
      'Jankipuram': 4000,
      'Sushant Golf City': 6800,
      'Mahanagar': 6000,
      'Ashiyana': 4500,
      'Rajajipuram': 4200,
      'Alambagh': 4800,
      'Chinhat': 3800,
      'Kursi Road': 3500
    }

    const basePrice = basePrices[formData.location] || 5000
    const area = parseInt(formData.area) || 1000
    
    let value = basePrice * area
    
    // Type factor
    const typeFactors: Record<string, number> = {
      'Flat': 1, 'Apartment': 1, 'House': 1.15, 'Villa': 1.35, 'Penthouse': 1.5, 'Plot': 0.7
    }
    value *= typeFactors[formData.propertyType] || 1
    
    // Furnishing factor
    const furnishFactors: Record<string, number> = {
      'Unfurnished': 1, 'Semi-Furnished': 1.08, 'Fully Furnished': 1.15
    }
    value *= furnishFactors[formData.furnishing] || 1
    
    // Age factor
    const ageFactors: Record<string, number> = {
      '0-2 years': 1, '2-5 years': 0.95, '5-10 years': 0.88, '10-15 years': 0.80, '15+ years': 0.70
    }
    value *= ageFactors[formData.age] || 1
    
    // Amenity value
    const amenityValue = formData.amenities.length * 30000
    value += amenityValue

    setResult({
      estimatedValue: Math.round(value),
      minValue: Math.round(value * 0.9),
      maxValue: Math.round(value * 1.1),
      pricePerSqft: Math.round(value / area),
      confidence: 75 + formData.amenities.length * 2,
      breakdown: {
        baseValue: basePrice * area,
        locationFactor: basePrice,
        typeFactor: typeFactors[formData.propertyType] || 1,
        ageFactor: ageFactors[formData.age] || 1,
        amenityValue
      }
    })
    
    setLoading(false)
    setStep(4)
  }

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`
    return `₹${(price / 100000).toFixed(2)} L`
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              Property Location & Type
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <select
                value={formData.location}
                onChange={(e) => updateForm('location', e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              >
                <option value="">Select Location</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
              <div className="grid grid-cols-3 gap-3">
                {propertyTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => updateForm('propertyType', type)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      formData.propertyType === type
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq.ft) *</label>
                <Input
                  type="number"
                  value={formData.area}
                  onChange={(e) => updateForm('area', e.target.value)}
                  placeholder="e.g., 1200"
                  icon={<Ruler className="w-4 h-4" />}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
                <Input
                  type="text"
                  value={formData.floor}
                  onChange={(e) => updateForm('floor', e.target.value)}
                  placeholder="e.g., 5th"
                  icon={<Building className="w-4 h-4" />}
                />
              </div>
            </div>

            <Button
              variant="gradient"
              className="w-full"
              onClick={() => setStep(2)}
              disabled={!formData.location || !formData.area}
            >
              Continue
            </Button>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Home className="w-5 h-5 text-purple-600" />
              Property Details
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select
                  value={formData.bedrooms}
                  onChange={(e) => updateForm('bedrooms', e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500"
                >
                  {[1, 2, 3, 4, 5, '6+'].map(n => (
                    <option key={n} value={n}>{n} BHK</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                <select
                  value={formData.bathrooms}
                  onChange={(e) => updateForm('bathrooms', e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500"
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing</label>
              <div className="grid grid-cols-3 gap-3">
                {furnishingOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => updateForm('furnishing', opt)}
                    className={`p-3 rounded-xl border-2 transition-all text-sm ${
                      formData.furnishing === opt
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <Sofa className="w-4 h-4 mx-auto mb-1" />
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Facing</label>
              <div className="grid grid-cols-3 gap-3">
                {facingOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => updateForm('facing', opt)}
                    className={`p-3 rounded-xl border-2 transition-all text-sm ${
                      formData.facing === opt
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <Compass className="w-4 h-4 mx-auto mb-1" />
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Age</label>
              <div className="grid grid-cols-5 gap-2">
                {ageOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => updateForm('age', opt)}
                    className={`p-2 rounded-lg border-2 transition-all text-xs ${
                      formData.age === opt
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button variant="gradient" className="flex-1" onClick={() => setStep(3)}>
                Continue
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Amenities
            </h3>

            <p className="text-gray-600 text-sm">Select all amenities available in your property</p>

            <div className="grid grid-cols-2 gap-3">
              {amenitiesList.map(amenity => (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    formData.amenities.includes(amenity)
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {formData.amenities.includes(amenity) ? '✓' : '○'} {amenity}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button variant="gradient" className="flex-1" onClick={calculateValuation} loading={loading}>
                Get Valuation
              </Button>
            </div>
          </div>
        )

      case 4:
        return result && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Estimated Property Value</h3>
              <p className="text-gray-500">{formData.location} • {formData.propertyType} • {formData.area} sq.ft</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center">
              <p className="text-gray-600 mb-2">Market Value</p>
              <p className="text-4xl font-bold text-purple-600">{formatPrice(result.estimatedValue)}</p>
              <p className="text-sm text-gray-500 mt-2">
                Range: {formatPrice(result.minValue)} - {formatPrice(result.maxValue)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600">Price per Sq.ft</p>
                <p className="text-xl font-bold text-blue-600">₹{result.pricePerSqft.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600">Confidence</p>
                <p className="text-xl font-bold text-green-600">{result.confidence}%</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold mb-3">Valuation Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Value ({formData.area} sq.ft × ₹{result.breakdown.locationFactor})</span>
                  <span className="font-medium">{formatPrice(result.breakdown.baseValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type Factor</span>
                  <span className="font-medium">×{result.breakdown.typeFactor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Age Factor</span>
                  <span className="font-medium">×{result.breakdown.ageFactor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amenities Value</span>
                  <span className="font-medium text-green-600">+{formatPrice(result.breakdown.amenityValue)}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800">
                This is an estimated valuation based on market data. Actual prices may vary based on specific property conditions and negotiations.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => { setStep(1); setResult(null); }}>
                New Valuation
              </Button>
              <Button variant="gradient" className="flex-1">
                Get Expert Opinion
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
        <div className="flex items-center gap-3">
          <Home className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Property Valuation</h2>
            <p className="text-green-100">Get instant property value estimate</p>
          </div>
        </div>
      </div>

      {/* Progress */}
      {step < 4 && (
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  s <= step ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-20 h-1 mx-2 ${s < step ? 'bg-purple-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Location</span>
            <span>Details</span>
            <span>Amenities</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {renderStep()}
      </div>
    </div>
  )
}
