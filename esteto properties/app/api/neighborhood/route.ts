import { NextRequest, NextResponse } from 'next/server'
import { NeighborhoodInsights, NearbyPlace, NeighborhoodCategory } from '@/lib/types/features'

// Lucknow neighborhood data (in production, from database + Google Places API)
const neighborhoodData: Record<string, NeighborhoodInsights> = {
  'gomti-nagar': {
    locality: 'Gomti Nagar',
    city: 'Lucknow',
    overallScore: 92,
    categories: [
      {
        name: 'Education',
        score: 95,
        icon: 'school',
        places: [
          { id: '1', name: 'City Montessori School', type: 'school', distance: 500, rating: 4.5, address: 'Sector 12, Gomti Nagar', coordinates: { lat: 26.8505, lng: 80.9910 } },
          { id: '2', name: 'DPS Eldeco', type: 'school', distance: 2000, rating: 4.6, address: 'Eldeco Udyan', coordinates: { lat: 26.8400, lng: 80.9800 } },
          { id: '3', name: 'Lucknow Public School', type: 'school', distance: 1500, rating: 4.3, address: 'Sector 6, Gomti Nagar', coordinates: { lat: 26.8520, lng: 80.9850 } }
        ]
      },
      {
        name: 'Healthcare',
        score: 90,
        icon: 'hospital',
        places: [
          { id: '4', name: 'Sahara Hospital', type: 'hospital', distance: 3000, rating: 4.4, address: 'Sahara States', coordinates: { lat: 26.8600, lng: 80.9700 } },
          { id: '5', name: 'Medanta Hospital', type: 'hospital', distance: 5000, rating: 4.7, address: 'Shaheed Path', coordinates: { lat: 26.8300, lng: 81.0100 } },
          { id: '6', name: 'Apollo Clinic', type: 'hospital', distance: 1000, rating: 4.2, address: 'Vibhuti Khand', coordinates: { lat: 26.8510, lng: 80.9920 } }
        ]
      },
      {
        name: 'Shopping',
        score: 95,
        icon: 'shopping',
        places: [
          { id: '7', name: 'Lulu Mall', type: 'mall', distance: 4000, rating: 4.6, address: 'Amar Shaheed Path', coordinates: { lat: 26.8350, lng: 81.0050 } },
          { id: '8', name: 'Phoenix Palassio', type: 'mall', distance: 3500, rating: 4.5, address: 'Shaheed Path', coordinates: { lat: 26.8380, lng: 81.0000 } },
          { id: '9', name: 'Wave Mall', type: 'mall', distance: 2000, rating: 4.3, address: 'Vibhuti Khand', coordinates: { lat: 26.8490, lng: 80.9880 } }
        ]
      },
      {
        name: 'Food & Dining',
        score: 93,
        icon: 'restaurant',
        places: [
          { id: '10', name: 'Tunday Kababi', type: 'restaurant', distance: 800, rating: 4.5, address: 'Gomti Nagar', coordinates: { lat: 26.8515, lng: 80.9905 } },
          { id: '11', name: 'Moti Mahal', type: 'restaurant', distance: 1200, rating: 4.3, address: 'Vibhuti Khand', coordinates: { lat: 26.8500, lng: 80.9890 } }
        ]
      },
      {
        name: 'Banking',
        score: 98,
        icon: 'bank',
        places: [
          { id: '12', name: 'SBI Branch', type: 'bank', distance: 300, rating: 4.0, address: 'Sector 11', coordinates: { lat: 26.8508, lng: 80.9915 } },
          { id: '13', name: 'HDFC Bank', type: 'bank', distance: 500, rating: 4.2, address: 'Vibhuti Khand', coordinates: { lat: 26.8512, lng: 80.9908 } },
          { id: '14', name: 'ICICI Bank ATM', type: 'atm', distance: 200, rating: 4.1, address: 'Sector 12', coordinates: { lat: 26.8505, lng: 80.9912 } }
        ]
      },
      {
        name: 'Recreation',
        score: 88,
        icon: 'park',
        places: [
          { id: '15', name: 'Gomti Riverfront', type: 'park', distance: 1500, rating: 4.4, address: 'Gomti River', coordinates: { lat: 26.8550, lng: 80.9950 } },
          { id: '16', name: 'Janeshwar Mishra Park', type: 'park', distance: 6000, rating: 4.6, address: 'Gomti Nagar Extension', coordinates: { lat: 26.8200, lng: 81.0200 } }
        ]
      }
    ],
    nearbyPlaces: [],
    demographics: {
      population: '5,00,000+',
      avgAge: 32,
      familyType: 'Nuclear families, Young professionals',
      incomeLevel: 'Upper Middle Class',
      educationLevel: 'Graduate and above'
    },
    connectivity: {
      nearestMetro: {
        name: 'IT Chauraha Metro (Upcoming)',
        distance: 2000,
        line: 'North-South Corridor'
      },
      nearestBusStop: {
        name: 'Gomti Nagar Bus Stand',
        distance: 500
      },
      nearestRailway: {
        name: 'Lucknow Junction',
        distance: 8000
      },
      nearestAirport: {
        name: 'Chaudhary Charan Singh Airport',
        distance: 15000
      },
      majorRoads: ['Shaheed Path', 'Faizabad Road', 'Gomti Nagar Ring Road'],
      commuteTime: {
        toCityCenter: 20,
        toAirport: 25,
        toRailway: 15
      }
    },
    environment: {
      airQualityIndex: 58,
      airQualityStatus: 'Moderate',
      greenCover: 25,
      noiseLevel: 55,
      waterQuality: 'Good (Municipal + Borewell)',
      floodRisk: 'Low'
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
    locality: 'Hazratganj',
    city: 'Lucknow',
    overallScore: 88,
    categories: [
      {
        name: 'Shopping',
        score: 98,
        icon: 'shopping',
        places: [
          { id: '1', name: 'Hazratganj Market', type: 'mall', distance: 0, rating: 4.5, address: 'Hazratganj', coordinates: { lat: 26.8500, lng: 80.9500 } },
          { id: '2', name: 'Sahara Ganj Mall', type: 'mall', distance: 1500, rating: 4.4, address: 'Shahnajaf Road', coordinates: { lat: 26.8520, lng: 80.9480 } }
        ]
      },
      {
        name: 'Heritage',
        score: 95,
        icon: 'landmark',
        places: [
          { id: '3', name: 'La Martiniere College', type: 'school', distance: 2000, rating: 4.8, address: 'La Martiniere Road', coordinates: { lat: 26.8480, lng: 80.9550 } },
          { id: '4', name: 'Vidhan Sabha', type: 'park', distance: 1000, rating: 4.3, address: 'Vidhan Sabha Marg', coordinates: { lat: 26.8510, lng: 80.9520 } }
        ]
      }
    ],
    nearbyPlaces: [],
    demographics: {
      population: '2,00,000+',
      avgAge: 38,
      familyType: 'Mixed - Families and Businesses',
      incomeLevel: 'Upper Class',
      educationLevel: 'Graduate and above'
    },
    connectivity: {
      nearestBusStop: {
        name: 'Hazratganj Bus Stop',
        distance: 200
      },
      nearestRailway: {
        name: 'Lucknow Junction',
        distance: 3000
      },
      nearestAirport: {
        name: 'Chaudhary Charan Singh Airport',
        distance: 12000
      },
      majorRoads: ['MG Road', 'Shahnajaf Road', 'Vidhan Sabha Marg'],
      commuteTime: {
        toCityCenter: 0,
        toAirport: 20,
        toRailway: 8
      }
    },
    environment: {
      airQualityIndex: 72,
      airQualityStatus: 'Moderate',
      greenCover: 15,
      noiseLevel: 70,
      waterQuality: 'Good (Municipal)',
      floodRisk: 'Low'
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
  },
  'lucknow-cantonment': {
    locality: 'Lucknow Cantonment',
    city: 'Lucknow',
    overallScore: 95,
    categories: [
      {
        name: 'Security',
        score: 100,
        icon: 'shield',
        places: []
      },
      {
        name: 'Environment',
        score: 98,
        icon: 'tree',
        places: []
      }
    ],
    nearbyPlaces: [],
    demographics: {
      population: '50,000+',
      avgAge: 40,
      familyType: 'Defense families, Senior citizens',
      incomeLevel: 'Upper Middle Class',
      educationLevel: 'Graduate and above'
    },
    connectivity: {
      nearestBusStop: {
        name: 'Cantonment Bus Stop',
        distance: 500
      },
      nearestRailway: {
        name: 'Lucknow Cantonment Station',
        distance: 1000
      },
      nearestAirport: {
        name: 'Chaudhary Charan Singh Airport',
        distance: 10000
      },
      majorRoads: ['Mall Road', 'Cantonment Road'],
      commuteTime: {
        toCityCenter: 15,
        toAirport: 18,
        toRailway: 3
      }
    },
    environment: {
      airQualityIndex: 45,
      airQualityStatus: 'Good',
      greenCover: 40,
      noiseLevel: 35,
      waterQuality: 'Excellent (Army supply)',
      floodRisk: 'Low'
    },
    lifestyle: {
      restaurants: 20,
      cafes: 5,
      gyms: 8,
      parks: 5,
      malls: 0,
      nightlife: 'Quiet',
      familyFriendly: true,
      petFriendly: true
    }
  }
}

// GET - Get neighborhood insights
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const locality = searchParams.get('locality')?.toLowerCase().replace(/\s+/g, '-')
    const category = searchParams.get('category') // education, healthcare, shopping, etc.
    const radius = parseInt(searchParams.get('radius') || '5000') // in meters
    
    if (!locality) {
      // Return list of available localities
      const localities = Object.keys(neighborhoodData).map(key => ({
        slug: key,
        name: neighborhoodData[key].locality,
        overallScore: neighborhoodData[key].overallScore
      }))
      
      return NextResponse.json({
        success: true,
        data: localities
      })
    }
    
    const data = neighborhoodData[locality]
    
    if (!data) {
      // Return generic data for unknown localities
      return NextResponse.json({
        success: true,
        data: {
          locality: locality.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          city: 'Lucknow',
          overallScore: 70,
          message: 'Detailed data not available for this locality. Contact us for more information.',
          categories: [],
          nearbyPlaces: [],
          demographics: {
            population: 'Data not available',
            avgAge: 0,
            familyType: 'Mixed',
            incomeLevel: 'Middle Class',
            educationLevel: 'Mixed'
          },
          connectivity: {
            nearestBusStop: { name: 'Local Bus Stop', distance: 500 },
            nearestRailway: { name: 'Lucknow Junction', distance: 10000 },
            nearestAirport: { name: 'Chaudhary Charan Singh Airport', distance: 15000 },
            majorRoads: [],
            commuteTime: { toCityCenter: 30, toAirport: 30, toRailway: 20 }
          },
          environment: {
            airQualityIndex: 65,
            airQualityStatus: 'Moderate',
            greenCover: 20,
            noiseLevel: 60,
            waterQuality: 'Good',
            floodRisk: 'Low'
          },
          lifestyle: {
            restaurants: 0,
            cafes: 0,
            gyms: 0,
            parks: 0,
            malls: 0,
            nightlife: 'Quiet',
            familyFriendly: true,
            petFriendly: true
          }
        }
      })
    }
    
    // Filter by category if specified
    if (category) {
      const categoryData = data.categories.find(
        c => c.name.toLowerCase() === category.toLowerCase()
      )
      
      if (categoryData) {
        return NextResponse.json({
          success: true,
          data: {
            locality: data.locality,
            category: categoryData,
            nearbyPlaces: categoryData.places.filter(p => p.distance <= radius)
          }
        })
      }
    }
    
    // Flatten all nearby places
    const allNearbyPlaces = data.categories
      .flatMap(c => c.places)
      .filter(p => p.distance <= radius)
      .sort((a, b) => a.distance - b.distance)
    
    return NextResponse.json({
      success: true,
      data: {
        ...data,
        nearbyPlaces: allNearbyPlaces,
        insights: [
          `Overall livability score: ${data.overallScore}/100`,
          `Air Quality: ${data.environment.airQualityStatus} (AQI ${data.environment.airQualityIndex})`,
          `Green Cover: ${data.environment.greenCover}%`,
          `${data.lifestyle.familyFriendly ? 'Family-friendly neighborhood' : 'Urban lifestyle area'}`,
          `${data.connectivity.commuteTime.toCityCenter} mins to city center`,
          `${allNearbyPlaces.length} amenities within ${radius/1000}km radius`
        ]
      }
    })
  } catch (error) {
    console.error('Neighborhood insights error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch neighborhood insights' },
      { status: 500 }
    )
  }
}

// POST - Calculate commute time (mock - in production use Google Maps API)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fromLocality, toAddress, mode = 'driving' } = body
    
    if (!fromLocality || !toAddress) {
      return NextResponse.json(
        { success: false, error: 'From locality and to address required' },
        { status: 400 }
      )
    }
    
    // Mock commute calculation (in production, use Google Maps Distance Matrix API)
    const baseTime = Math.floor(Math.random() * 30) + 10 // 10-40 mins
    const distance = Math.floor(Math.random() * 15) + 2 // 2-17 km
    
    const modeMultipliers: Record<string, number> = {
      driving: 1,
      transit: 1.5,
      walking: 4,
      bicycling: 2
    }
    
    const adjustedTime = Math.round(baseTime * (modeMultipliers[mode] || 1))
    
    return NextResponse.json({
      success: true,
      data: {
        from: fromLocality,
        to: toAddress,
        mode,
        duration: adjustedTime,
        durationText: `${adjustedTime} mins`,
        distance: distance,
        distanceText: `${distance} km`,
        trafficCondition: adjustedTime > 25 ? 'Heavy' : adjustedTime > 15 ? 'Moderate' : 'Light',
        bestTimeToTravel: '10:00 AM - 11:00 AM or 2:00 PM - 4:00 PM',
        note: 'Commute times are estimates and may vary based on traffic conditions'
      }
    })
  } catch (error) {
    console.error('Commute calculation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to calculate commute' },
      { status: 500 }
    )
  }
}
