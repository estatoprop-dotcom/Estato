import { NextRequest, NextResponse } from 'next/server'
import { ValuationInput, ValuationResult, ValuationFactor } from '@/lib/types/features'

// Base prices per sqft for different locations (in production, from database)
const locationBasePrices: Record<string, number> = {
  'gomti nagar': 7500,
  'gomti nagar extension': 5500,
  'hazratganj': 12000,
  'indira nagar': 6500,
  'aliganj': 5000,
  'jankipuram': 4200,
  'mahanagar': 5800,
  'ashiyana': 4800,
  'sushant golf city': 6000,
  'vrindavan yojna': 4500,
  'rajajipuram': 4000,
  'alambagh': 4500,
  'charbagh': 5500,
  'aminabad': 6000,
  'chowk': 5000,
  'kaiserbagh': 7000,
  'vikas nagar': 4800,
  'nirala nagar': 5200,
  'husainganj': 6500,
  'telibagh': 4000,
  'chinhat': 3800,
  'faizabad road': 4200,
  'kanpur road': 4000,
  'sitapur road': 3800,
  'raebareli road': 4200,
  'shaheed path': 5000,
  'transport nagar': 4500,
  'lda colony': 4200,
  'lucknow cantonment': 9000,
  'butler colony': 18000,
  'eldeco udyan': 5500,
  'it city': 5500,
  'amausi': 4500,
  'kursi road': 3200,
  'para': 2800
}

// Property type multipliers
const propertyTypeMultipliers: Record<string, number> = {
  'flat': 1.0,
  'house': 1.1,
  'villa': 1.3,
  'plot': 0.7,
  'commercial': 1.4
}

// Age depreciation factors
const ageDepreciation: Record<string, number> = {
  'under construction': 0.95,
  'new': 1.05,
  '0-1 years': 1.0,
  '1-3 years': 0.98,
  '3-5 years': 0.95,
  '5-10 years': 0.90,
  '10+ years': 0.82
}

// Furnishing premiums
const furnishingPremiums: Record<string, number> = {
  'unfurnished': 1.0,
  'semi-furnished': 1.05,
  'fully-furnished': 1.12
}

// Floor premiums (for apartments)
function getFloorPremium(floor: number, totalFloors: number): number {
  if (totalFloors <= 4) {
    // Low-rise: ground floor less preferred
    if (floor === 0) return 0.95
    if (floor === totalFloors) return 1.02 // Top floor
    return 1.0
  } else {
    // High-rise: middle-upper floors preferred
    const ratio = floor / totalFloors
    if (ratio < 0.2) return 0.95 // Lower floors
    if (ratio > 0.8) return 1.0 // Top floors (maintenance concerns)
    if (ratio > 0.5) return 1.05 // Upper-middle floors
    return 1.02 // Middle floors
  }
}

// Facing premiums
const facingPremiums: Record<string, number> = {
  'east': 1.03,
  'north': 1.02,
  'north-east': 1.04,
  'south': 0.98,
  'west': 0.97,
  'south-west': 0.96
}

// Amenity values (additional value per amenity)
const amenityValues: Record<string, number> = {
  'swimming pool': 50,
  'gym': 30,
  'clubhouse': 40,
  'parking': 25,
  'security': 20,
  'power backup': 15,
  'lift': 20,
  'garden': 25,
  'play area': 15,
  'cctv': 10,
  'intercom': 5,
  'water supply': 10,
  'gas pipeline': 10,
  'rainwater harvesting': 10,
  'fire safety': 15,
  'visitor parking': 10,
  'maintenance staff': 15
}

// POST - Get property valuation
export async function POST(request: NextRequest) {
  try {
    const body: ValuationInput = await request.json()
    
    const {
      location,
      locality,
      propertyType,
      area,
      bedrooms,
      bathrooms,
      floor,
      totalFloors,
      ageOfProperty,
      facing,
      furnishing,
      amenities,
      parking,
      balcony
    } = body
    
    // Validation
    if (!location || !propertyType || !area) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: location, propertyType, area' },
        { status: 400 }
      )
    }
    
    // Get base price for location
    const locationKey = (locality || location).toLowerCase()
    let basePrice = locationBasePrices[locationKey] || 4500 // Default if location not found
    
    // Apply property type multiplier
    const typeMultiplier = propertyTypeMultipliers[propertyType] || 1.0
    
    // Apply age depreciation
    const ageKey = (ageOfProperty || '1-3 years').toLowerCase()
    const ageFactor = ageDepreciation[ageKey] || 0.95
    
    // Apply furnishing premium
    const furnishingKey = (furnishing || 'unfurnished').toLowerCase()
    const furnishingFactor = furnishingPremiums[furnishingKey] || 1.0
    
    // Apply floor premium (for flats)
    let floorFactor = 1.0
    if (propertyType === 'flat' && floor !== undefined && totalFloors) {
      floorFactor = getFloorPremium(floor, totalFloors)
    }
    
    // Apply facing premium
    const facingKey = (facing || 'east').toLowerCase()
    const facingFactor = facingPremiums[facingKey] || 1.0
    
    // Calculate amenity bonus
    let amenityBonus = 0
    if (amenities && amenities.length > 0) {
      amenities.forEach(amenity => {
        const amenityKey = amenity.toLowerCase()
        amenityBonus += amenityValues[amenityKey] || 5
      })
    }
    
    // Parking bonus
    if (parking) amenityBonus += 30
    
    // Balcony bonus
    if (balcony && balcony > 0) amenityBonus += balcony * 15
    
    // BHK adjustment (more bedrooms = slight premium per sqft for larger units)
    let bhkFactor = 1.0
    if (bedrooms) {
      if (bedrooms >= 4) bhkFactor = 1.05
      else if (bedrooms === 3) bhkFactor = 1.02
    }
    
    // Calculate final price per sqft
    const adjustedPricePerSqft = Math.round(
      basePrice * 
      typeMultiplier * 
      ageFactor * 
      furnishingFactor * 
      floorFactor * 
      facingFactor * 
      bhkFactor +
      amenityBonus
    )
    
    // Calculate estimated value
    const estimatedValue = adjustedPricePerSqft * area
    
    // Calculate range (±10%)
    const valueRange = {
      min: Math.round(estimatedValue * 0.90),
      max: Math.round(estimatedValue * 1.10)
    }
    
    // Build valuation factors
    const factors: ValuationFactor[] = [
      {
        factor: 'Location',
        impact: basePrice >= 6000 ? 'positive' : basePrice <= 4000 ? 'negative' : 'neutral',
        weight: 35,
        description: `${locality || location} - Base price ₹${basePrice}/sqft`
      },
      {
        factor: 'Property Type',
        impact: typeMultiplier > 1 ? 'positive' : typeMultiplier < 1 ? 'negative' : 'neutral',
        weight: 15,
        description: `${propertyType} - ${typeMultiplier > 1 ? 'Premium' : typeMultiplier < 1 ? 'Lower' : 'Standard'} valuation`
      },
      {
        factor: 'Property Age',
        impact: ageFactor >= 1 ? 'positive' : ageFactor < 0.9 ? 'negative' : 'neutral',
        weight: 15,
        description: `${ageOfProperty || 'Not specified'} - ${ageFactor >= 1 ? 'New property premium' : 'Age depreciation applied'}`
      },
      {
        factor: 'Furnishing',
        impact: furnishingFactor > 1 ? 'positive' : 'neutral',
        weight: 10,
        description: `${furnishing || 'Unfurnished'} - ${furnishingFactor > 1 ? 'Premium added' : 'Standard'}`
      },
      {
        factor: 'Amenities',
        impact: amenityBonus > 50 ? 'positive' : amenityBonus > 0 ? 'neutral' : 'negative',
        weight: 15,
        description: `${amenities?.length || 0} amenities - ₹${amenityBonus}/sqft bonus`
      },
      {
        factor: 'Facing',
        impact: facingFactor > 1 ? 'positive' : facingFactor < 1 ? 'negative' : 'neutral',
        weight: 5,
        description: `${facing || 'Not specified'} facing - ${facingFactor > 1 ? 'Preferred direction' : facingFactor < 1 ? 'Less preferred' : 'Standard'}`
      },
      {
        factor: 'Floor',
        impact: floorFactor > 1 ? 'positive' : floorFactor < 1 ? 'negative' : 'neutral',
        weight: 5,
        description: propertyType === 'flat' ? `Floor ${floor}/${totalFloors} - ${floorFactor > 1 ? 'Premium floor' : 'Standard'}` : 'N/A for this property type'
      }
    ]
    
    // Generate comparable properties (mock data - in production from database)
    const comparableProperties = [
      {
        id: 'comp1',
        title: `${bedrooms || 2} BHK ${propertyType} in ${locality || location}`,
        price: Math.round(estimatedValue * (0.95 + Math.random() * 0.1)),
        area: Math.round(area * (0.9 + Math.random() * 0.2)),
        location: locality || location,
        soldDate: '2024-10-15',
        similarity: 92
      },
      {
        id: 'comp2',
        title: `${bedrooms || 2} BHK ${propertyType} near ${locality || location}`,
        price: Math.round(estimatedValue * (0.9 + Math.random() * 0.15)),
        area: Math.round(area * (0.85 + Math.random() * 0.25)),
        location: locality || location,
        soldDate: '2024-09-20',
        similarity: 85
      },
      {
        id: 'comp3',
        title: `${(bedrooms || 2) + 1} BHK ${propertyType} in ${locality || location}`,
        price: Math.round(estimatedValue * (1.1 + Math.random() * 0.15)),
        area: Math.round(area * (1.1 + Math.random() * 0.2)),
        location: locality || location,
        soldDate: '2024-11-05',
        similarity: 78
      }
    ]
    
    // Market insights
    const marketInsights = [
      `${locality || location} has seen 8-12% appreciation in the last year`,
      `Average price in this area: ₹${basePrice.toLocaleString()}/sqft`,
      `${propertyType === 'flat' ? 'Apartments' : propertyType === 'villa' ? 'Villas' : 'Properties'} in this area are in ${basePrice > 5000 ? 'high' : 'moderate'} demand`,
      `Best time to sell: ${basePrice > 6000 ? 'Market is favorable now' : 'Wait for 6-12 months for better rates'}`,
      `Rental yield potential: ${((basePrice * 0.004) * 12 / basePrice * 100).toFixed(1)}% annually`
    ]
    
    // Calculate confidence score
    const confidence = Math.min(95, 70 + 
      (amenities?.length || 0) * 2 + 
      (bedrooms ? 3 : 0) + 
      (floor !== undefined ? 3 : 0) + 
      (facing ? 3 : 0) + 
      (ageOfProperty ? 5 : 0)
    )
    
    const result: ValuationResult = {
      estimatedValue,
      valueRange,
      pricePerSqft: adjustedPricePerSqft,
      confidence,
      factors,
      comparableProperties,
      marketInsights,
      lastUpdated: new Date()
    }
    
    return NextResponse.json({
      success: true,
      data: result,
      disclaimer: 'This is an estimated valuation based on market data and property characteristics. Actual market value may vary. For accurate valuation, please consult our property experts.'
    })
  } catch (error) {
    console.error('Valuation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to calculate valuation' },
      { status: 500 }
    )
  }
}

// GET - Get location base prices
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location')?.toLowerCase()
    
    if (location) {
      const basePrice = locationBasePrices[location]
      if (basePrice) {
        return NextResponse.json({
          success: true,
          data: {
            location,
            basePrice,
            priceRange: {
              min: Math.round(basePrice * 0.8),
              max: Math.round(basePrice * 1.3)
            }
          }
        })
      }
      return NextResponse.json(
        { success: false, error: 'Location not found' },
        { status: 404 }
      )
    }
    
    // Return all locations with prices
    const locations = Object.entries(locationBasePrices)
      .map(([name, price]) => ({
        name: name.replace(/\b\w/g, l => l.toUpperCase()),
        basePrice: price,
        category: price >= 8000 ? 'Premium' : price >= 5000 ? 'Mid-Range' : 'Affordable'
      }))
      .sort((a, b) => b.basePrice - a.basePrice)
    
    return NextResponse.json({
      success: true,
      data: locations
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch location prices' },
      { status: 500 }
    )
  }
}
