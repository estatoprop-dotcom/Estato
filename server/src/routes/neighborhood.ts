import { Router, Request, Response } from 'express'

const router = Router()

// Neighborhood data for Lucknow
const neighborhoodData: Record<string, any> = {
  'gomti-nagar': {
    name: 'Gomti Nagar',
    overallScore: 92,
    categories: {
      education: {
        score: 95,
        places: [
          { name: 'City Montessori School', type: 'school', distance: 500, rating: 4.5 },
          { name: 'DPS Eldeco', type: 'school', distance: 2000, rating: 4.6 },
          { name: 'Lucknow Public School', type: 'school', distance: 1500, rating: 4.3 }
        ]
      },
      healthcare: {
        score: 90,
        places: [
          { name: 'Sahara Hospital', type: 'hospital', distance: 3000, rating: 4.4 },
          { name: 'Medanta Hospital', type: 'hospital', distance: 5000, rating: 4.7 },
          { name: 'Apollo Clinic', type: 'clinic', distance: 1000, rating: 4.2 }
        ]
      },
      shopping: {
        score: 95,
        places: [
          { name: 'Lulu Mall', type: 'mall', distance: 4000, rating: 4.6 },
          { name: 'Phoenix Palassio', type: 'mall', distance: 3500, rating: 4.5 },
          { name: 'Wave Mall', type: 'mall', distance: 2000, rating: 4.3 }
        ]
      },
      dining: {
        score: 93,
        places: [
          { name: 'Tunday Kababi', type: 'restaurant', distance: 800, rating: 4.5 },
          { name: 'Moti Mahal', type: 'restaurant', distance: 1200, rating: 4.3 }
        ]
      },
      banking: {
        score: 98,
        places: [
          { name: 'SBI Branch', type: 'bank', distance: 300, rating: 4.0 },
          { name: 'HDFC Bank', type: 'bank', distance: 500, rating: 4.2 },
          { name: 'ICICI Bank ATM', type: 'atm', distance: 200, rating: 4.1 }
        ]
      },
      recreation: {
        score: 88,
        places: [
          { name: 'Gomti Riverfront', type: 'park', distance: 1500, rating: 4.4 },
          { name: 'Janeshwar Mishra Park', type: 'park', distance: 6000, rating: 4.6 }
        ]
      }
    },
    connectivity: {
      nearestMetro: { name: 'IT Chauraha Metro (Upcoming)', distance: 2000 },
      nearestBusStop: { name: 'Gomti Nagar Bus Stand', distance: 500 },
      nearestRailway: { name: 'Lucknow Junction', distance: 8000 },
      nearestAirport: { name: 'Chaudhary Charan Singh Airport', distance: 15000 },
      majorRoads: ['Shaheed Path', 'Faizabad Road', 'Gomti Nagar Ring Road'],
      commuteTime: { toCityCenter: 20, toAirport: 25, toRailway: 15 }
    },
    environment: {
      airQualityIndex: 58,
      airQualityStatus: 'Moderate',
      greenCover: 25,
      noiseLevel: 55,
      waterQuality: 'Good',
      floodRisk: 'Low'
    },
    demographics: {
      population: '5,00,000+',
      avgAge: 32,
      familyType: 'Nuclear families, Young professionals',
      incomeLevel: 'Upper Middle Class'
    },
    lifestyle: {
      restaurants: 150,
      cafes: 45,
      gyms: 25,
      parks: 8,
      malls: 4,
      nightlife: 'Active',
      familyFriendly: true,
      petFriendly: true
    }
  },
  'hazratganj': {
    name: 'Hazratganj',
    overallScore: 88,
    categories: {
      shopping: {
        score: 98,
        places: [
          { name: 'Hazratganj Market', type: 'market', distance: 0, rating: 4.5 },
          { name: 'Sahara Ganj Mall', type: 'mall', distance: 1500, rating: 4.4 }
        ]
      },
      heritage: {
        score: 95,
        places: [
          { name: 'La Martiniere College', type: 'landmark', distance: 2000, rating: 4.8 },
          { name: 'Vidhan Sabha', type: 'landmark', distance: 1000, rating: 4.3 }
        ]
      }
    },
    connectivity: {
      nearestBusStop: { name: 'Hazratganj Bus Stop', distance: 200 },
      nearestRailway: { name: 'Lucknow Junction', distance: 3000 },
      nearestAirport: { name: 'Chaudhary Charan Singh Airport', distance: 12000 },
      majorRoads: ['MG Road', 'Shahnajaf Road', 'Vidhan Sabha Marg'],
      commuteTime: { toCityCenter: 0, toAirport: 20, toRailway: 8 }
    },
    environment: {
      airQualityIndex: 72,
      airQualityStatus: 'Moderate',
      greenCover: 15,
      noiseLevel: 70,
      waterQuality: 'Good',
      floodRisk: 'Low'
    },
    demographics: {
      population: '2,00,000+',
      avgAge: 38,
      familyType: 'Mixed',
      incomeLevel: 'Upper Class'
    },
    lifestyle: {
      restaurants: 200,
      cafes: 60,
      gyms: 15,
      parks: 3,
      malls: 2,
      nightlife: 'Moderate',
      familyFriendly: true,
      petFriendly: false
    }
  }
}

// GET - Get neighborhood insights
router.get('/', (req: Request, res: Response) => {
  try {
    const { locality, category, radius = '5000' } = req.query
    
    if (!locality) {
      // Return all localities
      const localities = Object.entries(neighborhoodData).map(([slug, data]) => ({
        slug,
        name: data.name,
        overallScore: data.overallScore
      }))
      
      return res.json({
        success: true,
        data: localities
      })
    }
    
    const locationSlug = (locality as string).toLowerCase().replace(/\s+/g, '-')
    const data = neighborhoodData[locationSlug]
    
    if (!data) {
      return res.json({
        success: true,
        data: {
          name: (locality as string).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          overallScore: 70,
          message: 'Detailed data not available for this locality',
          categories: {},
          connectivity: {
            nearestBusStop: { name: 'Local Bus Stop', distance: 500 },
            nearestRailway: { name: 'Lucknow Junction', distance: 10000 },
            nearestAirport: { name: 'Chaudhary Charan Singh Airport', distance: 15000 },
            commuteTime: { toCityCenter: 30, toAirport: 30, toRailway: 20 }
          },
          environment: {
            airQualityIndex: 65,
            airQualityStatus: 'Moderate',
            greenCover: 20,
            noiseLevel: 60,
            waterQuality: 'Good',
            floodRisk: 'Low'
          }
        }
      })
    }
    
    // Filter by category if specified
    if (category && data.categories[category as string]) {
      return res.json({
        success: true,
        data: {
          locality: data.name,
          category: category,
          ...data.categories[category as string]
        }
      })
    }
    
    // Get all nearby places within radius
    const radiusNum = parseInt(radius as string)
    const allPlaces: any[] = []
    
    Object.entries(data.categories).forEach(([catName, catData]: [string, any]) => {
      catData.places?.forEach((place: any) => {
        if (place.distance <= radiusNum) {
          allPlaces.push({ ...place, category: catName })
        }
      })
    })
    
    allPlaces.sort((a, b) => a.distance - b.distance)
    
    res.json({
      success: true,
      data: {
        ...data,
        nearbyPlaces: allPlaces,
        insights: [
          `Overall livability score: ${data.overallScore}/100`,
          `Air Quality: ${data.environment.airQualityStatus} (AQI ${data.environment.airQualityIndex})`,
          `Green Cover: ${data.environment.greenCover}%`,
          `${data.lifestyle.familyFriendly ? 'Family-friendly neighborhood' : 'Urban lifestyle area'}`,
          `${data.connectivity.commuteTime.toCityCenter} mins to city center`
        ]
      }
    })
  } catch (error) {
    console.error('Neighborhood error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch neighborhood insights'
    })
  }
})

// POST - Calculate commute time
router.post('/commute', (req: Request, res: Response) => {
  try {
    const { fromLocality, toAddress, mode = 'driving' } = req.body
    
    if (!fromLocality || !toAddress) {
      return res.status(400).json({
        success: false,
        error: 'From locality and to address required'
      })
    }
    
    // Mock calculation (in production use Google Maps API)
    const baseTime = Math.floor(Math.random() * 30) + 10
    const distance = Math.floor(Math.random() * 15) + 2
    
    const modeMultipliers: Record<string, number> = {
      driving: 1,
      transit: 1.5,
      walking: 4,
      bicycling: 2
    }
    
    const adjustedTime = Math.round(baseTime * (modeMultipliers[mode] || 1))
    
    res.json({
      success: true,
      data: {
        from: fromLocality,
        to: toAddress,
        mode,
        duration: adjustedTime,
        durationText: `${adjustedTime} mins`,
        distance,
        distanceText: `${distance} km`,
        trafficCondition: adjustedTime > 25 ? 'Heavy' : adjustedTime > 15 ? 'Moderate' : 'Light'
      }
    })
  } catch (error) {
    console.error('Commute error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to calculate commute'
    })
  }
})

export default router
