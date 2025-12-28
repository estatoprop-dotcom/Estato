import { Router, Request, Response } from 'express'

const router = Router()

// Base prices per sqft by location
const basePrices: Record<string, number> = {
  'gomti-nagar': 7500,
  'hazratganj': 9500,
  'gomti-nagar-extension': 5500,
  'aliganj': 5200,
  'indira-nagar': 5800,
  'jankipuram': 4000,
  'sushant-golf-city': 6800,
  'mahanagar': 6000,
  'ashiyana': 4500,
  'rajajipuram': 4200,
  'alambagh': 4800,
  'chinhat': 3800,
  'kursi-road': 3500,
  'vrindavan-yojna': 4200,
  'telibagh': 3200
}

// Valuation factors
const factors = {
  propertyType: {
    'flat': 1.0,
    'apartment': 1.0,
    'house': 1.15,
    'villa': 1.35,
    'penthouse': 1.5,
    'plot': 0.7
  },
  furnishing: {
    'unfurnished': 1.0,
    'semi-furnished': 1.08,
    'fully-furnished': 1.15
  },
  facing: {
    'east': 1.05,
    'north': 1.03,
    'north-east': 1.06,
    'south': 0.98,
    'west': 0.97,
    'south-west': 0.95
  },
  floor: {
    'ground': 1.02,
    'low': 1.0,
    'mid': 1.03,
    'high': 1.05,
    'top': 1.0
  },
  age: {
    '0-2': 1.0,
    '2-5': 0.95,
    '5-10': 0.88,
    '10-15': 0.80,
    '15+': 0.70
  }
}

// Amenity values
const amenityValues: Record<string, number> = {
  'swimming-pool': 50000,
  'gym': 30000,
  'clubhouse': 40000,
  'parking': 100000,
  'power-backup': 25000,
  'security': 20000,
  'lift': 35000,
  'garden': 25000,
  'play-area': 20000,
  'sports-facility': 35000,
  'cctv': 15000,
  'intercom': 10000,
  'fire-safety': 20000,
  'rainwater-harvesting': 15000,
  'solar-panels': 40000,
  'ev-charging': 25000
}

// POST - Calculate property valuation
router.post('/calculate', (req: Request, res: Response) => {
  try {
    const {
      location,
      propertyType = 'flat',
      area,
      bedrooms,
      bathrooms,
      furnishing = 'unfurnished',
      facing = 'east',
      floor = 'mid',
      age = '0-2',
      amenities = []
    } = req.body
    
    if (!location || !area) {
      return res.status(400).json({
        success: false,
        error: 'Location and area are required'
      })
    }
    
    const locationSlug = location.toLowerCase().replace(/\s+/g, '-')
    const basePrice = basePrices[locationSlug] || 5000
    
    // Calculate base value
    let estimatedValue = basePrice * area
    
    // Apply factors
    const propertyTypeFactor = factors.propertyType[propertyType as keyof typeof factors.propertyType] || 1
    const furnishingFactor = factors.furnishing[furnishing as keyof typeof factors.furnishing] || 1
    const facingFactor = factors.facing[facing as keyof typeof factors.facing] || 1
    const floorFactor = factors.floor[floor as keyof typeof factors.floor] || 1
    const ageFactor = factors.age[age as keyof typeof factors.age] || 1
    
    estimatedValue *= propertyTypeFactor * furnishingFactor * facingFactor * floorFactor * ageFactor
    
    // Add amenity values
    let amenityValue = 0
    const amenityBreakdown: { name: string; value: number }[] = []
    
    for (const amenity of amenities) {
      const value = amenityValues[amenity.toLowerCase().replace(/\s+/g, '-')] || 0
      amenityValue += value
      if (value > 0) {
        amenityBreakdown.push({ name: amenity, value })
      }
    }
    
    estimatedValue += amenityValue
    
    // Calculate range (±10%)
    const minValue = Math.round(estimatedValue * 0.9)
    const maxValue = Math.round(estimatedValue * 1.1)
    
    // Confidence score based on data completeness
    let confidence = 70
    if (bedrooms) confidence += 5
    if (bathrooms) confidence += 5
    if (amenities.length > 0) confidence += 10
    if (basePrices[locationSlug]) confidence += 10
    confidence = Math.min(confidence, 95)
    
    res.json({
      success: true,
      data: {
        input: {
          location: location.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
          propertyType,
          area,
          bedrooms,
          bathrooms,
          furnishing,
          facing,
          floor,
          age,
          amenities
        },
        valuation: {
          estimatedValue: Math.round(estimatedValue),
          minValue,
          maxValue,
          pricePerSqft: Math.round(estimatedValue / area),
          confidence
        },
        breakdown: {
          baseValue: basePrice * area,
          basePrice,
          factors: {
            propertyType: { factor: propertyTypeFactor, impact: `${((propertyTypeFactor - 1) * 100).toFixed(0)}%` },
            furnishing: { factor: furnishingFactor, impact: `${((furnishingFactor - 1) * 100).toFixed(0)}%` },
            facing: { factor: facingFactor, impact: `${((facingFactor - 1) * 100).toFixed(0)}%` },
            floor: { factor: floorFactor, impact: `${((floorFactor - 1) * 100).toFixed(0)}%` },
            age: { factor: ageFactor, impact: `${((ageFactor - 1) * 100).toFixed(0)}%` }
          },
          amenityValue,
          amenityBreakdown
        },
        marketInsights: {
          areaAvgPrice: basePrice,
          cityAvgPrice: 5500,
          priceVsArea: ((basePrice - 5500) / 5500 * 100).toFixed(1),
          demandLevel: basePrice > 6000 ? 'High' : basePrice > 4500 ? 'Medium' : 'Growing'
        },
        disclaimer: 'This is an estimated valuation based on market data. Actual prices may vary based on specific property conditions, negotiations, and market fluctuations.'
      }
    })
  } catch (error) {
    console.error('Valuation error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to calculate valuation'
    })
  }
})

// GET - Get base prices for all locations
router.get('/base-prices', (req: Request, res: Response) => {
  const prices = Object.entries(basePrices).map(([slug, price]) => ({
    slug,
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    pricePerSqft: price
  })).sort((a, b) => b.pricePerSqft - a.pricePerSqft)
  
  res.json({
    success: true,
    data: {
      prices,
      cityAverage: 5500,
      lastUpdated: new Date().toISOString()
    }
  })
})

// GET - Get valuation factors
router.get('/factors', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      factors,
      amenities: Object.entries(amenityValues).map(([name, value]) => ({
        name: name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        value
      }))
    }
  })
})

export default router
