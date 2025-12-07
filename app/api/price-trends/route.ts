import { NextRequest, NextResponse } from 'next/server'
import { PriceTrend, AreaAnalytics, ROICalculation, PriceDataPoint } from '@/lib/types/features'

// Lucknow area price data (simulated historical data)
// In production, this would come from database with actual transaction data
const areaData: Record<string, {
  currentPrice: number
  historicalPrices: { year: number; price: number }[]
  demandScore: number
  supplyScore: number
  avgRent: number
}> = {
  'gomti-nagar': {
    currentPrice: 7500,
    historicalPrices: [
      { year: 2019, price: 5200 },
      { year: 2020, price: 5500 },
      { year: 2021, price: 6000 },
      { year: 2022, price: 6500 },
      { year: 2023, price: 7000 },
      { year: 2024, price: 7500 }
    ],
    demandScore: 92,
    supplyScore: 75,
    avgRent: 18000
  },
  'gomti-nagar-extension': {
    currentPrice: 5500,
    historicalPrices: [
      { year: 2019, price: 3500 },
      { year: 2020, price: 3800 },
      { year: 2021, price: 4200 },
      { year: 2022, price: 4700 },
      { year: 2023, price: 5100 },
      { year: 2024, price: 5500 }
    ],
    demandScore: 88,
    supplyScore: 85,
    avgRent: 14000
  },
  'hazratganj': {
    currentPrice: 12000,
    historicalPrices: [
      { year: 2019, price: 9000 },
      { year: 2020, price: 9500 },
      { year: 2021, price: 10000 },
      { year: 2022, price: 10800 },
      { year: 2023, price: 11500 },
      { year: 2024, price: 12000 }
    ],
    demandScore: 85,
    supplyScore: 40,
    avgRent: 25000
  },
  'indira-nagar': {
    currentPrice: 6500,
    historicalPrices: [
      { year: 2019, price: 4800 },
      { year: 2020, price: 5100 },
      { year: 2021, price: 5500 },
      { year: 2022, price: 5900 },
      { year: 2023, price: 6200 },
      { year: 2024, price: 6500 }
    ],
    demandScore: 82,
    supplyScore: 65,
    avgRent: 15000
  },
  'aliganj': {
    currentPrice: 5000,
    historicalPrices: [
      { year: 2019, price: 3800 },
      { year: 2020, price: 4000 },
      { year: 2021, price: 4300 },
      { year: 2022, price: 4600 },
      { year: 2023, price: 4800 },
      { year: 2024, price: 5000 }
    ],
    demandScore: 78,
    supplyScore: 70,
    avgRent: 12000
  },
  'sushant-golf-city': {
    currentPrice: 6000,
    historicalPrices: [
      { year: 2019, price: 3800 },
      { year: 2020, price: 4200 },
      { year: 2021, price: 4700 },
      { year: 2022, price: 5200 },
      { year: 2023, price: 5600 },
      { year: 2024, price: 6000 }
    ],
    demandScore: 90,
    supplyScore: 80,
    avgRent: 16000
  },
  'vrindavan-yojna': {
    currentPrice: 4500,
    historicalPrices: [
      { year: 2019, price: 2800 },
      { year: 2020, price: 3100 },
      { year: 2021, price: 3500 },
      { year: 2022, price: 3900 },
      { year: 2023, price: 4200 },
      { year: 2024, price: 4500 }
    ],
    demandScore: 85,
    supplyScore: 90,
    avgRent: 11000
  },
  'jankipuram': {
    currentPrice: 4200,
    historicalPrices: [
      { year: 2019, price: 3000 },
      { year: 2020, price: 3200 },
      { year: 2021, price: 3500 },
      { year: 2022, price: 3800 },
      { year: 2023, price: 4000 },
      { year: 2024, price: 4200 }
    ],
    demandScore: 75,
    supplyScore: 72,
    avgRent: 10000
  },
  'lucknow-cantonment': {
    currentPrice: 9000,
    historicalPrices: [
      { year: 2019, price: 7000 },
      { year: 2020, price: 7300 },
      { year: 2021, price: 7700 },
      { year: 2022, price: 8200 },
      { year: 2023, price: 8600 },
      { year: 2024, price: 9000 }
    ],
    demandScore: 70,
    supplyScore: 30,
    avgRent: 22000
  },
  'butler-colony': {
    currentPrice: 18000,
    historicalPrices: [
      { year: 2019, price: 14000 },
      { year: 2020, price: 14800 },
      { year: 2021, price: 15500 },
      { year: 2022, price: 16500 },
      { year: 2023, price: 17200 },
      { year: 2024, price: 18000 }
    ],
    demandScore: 65,
    supplyScore: 15,
    avgRent: 50000
  }
}

// Calculate investment rating
function getInvestmentRating(appreciation: number, demandScore: number, supplyScore: number): 'Excellent' | 'Good' | 'Average' | 'Below Average' {
  const score = (appreciation * 2) + (demandScore / 10) + ((100 - supplyScore) / 20)
  if (score > 25) return 'Excellent'
  if (score > 18) return 'Good'
  if (score > 12) return 'Average'
  return 'Below Average'
}

// Get best time to buy insight
function getBestTimeToBuy(trend: 'up' | 'down' | 'stable'): string {
  if (trend === 'up') return 'Buy now - prices are rising steadily'
  if (trend === 'down') return 'Wait for further correction'
  return 'Good time to buy - stable market'
}

// GET - Get price trends for a location
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location')?.toLowerCase().replace(/\s+/g, '-')
    const period = searchParams.get('period') || 'yearly' // monthly, quarterly, yearly
    
    if (!location) {
      // Return all locations summary
      const summary = Object.entries(areaData).map(([slug, data]) => {
        const lastYearPrice = data.historicalPrices[data.historicalPrices.length - 2]?.price || data.currentPrice
        const appreciation = ((data.currentPrice - lastYearPrice) / lastYearPrice) * 100
        
        return {
          location: slug,
          currentPrice: data.currentPrice,
          appreciation: Math.round(appreciation * 10) / 10,
          demandScore: data.demandScore,
          trend: appreciation > 5 ? 'up' : appreciation < -2 ? 'down' : 'stable',
          investmentRating: getInvestmentRating(appreciation, data.demandScore, data.supplyScore)
        }
      }).sort((a, b) => b.appreciation - a.appreciation)
      
      return NextResponse.json({
        success: true,
        data: summary,
        insights: [
          'Gomti Nagar Extension showing highest appreciation at 9.6%',
          'Butler Colony remains most expensive but limited supply',
          'Vrindavan Yojna offers best value for first-time buyers',
          'IT corridor areas (Shaheed Path) seeing increased demand'
        ]
      })
    }
    
    // Get specific location data
    const data = areaData[location]
    
    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Location not found' },
        { status: 404 }
      )
    }
    
    // Calculate trends
    const lastYearPrice = data.historicalPrices[data.historicalPrices.length - 2]?.price || data.currentPrice
    const fiveYearPrice = data.historicalPrices[0]?.price || data.currentPrice
    const appreciation1Y = ((data.currentPrice - lastYearPrice) / lastYearPrice) * 100
    const appreciation5Y = ((data.currentPrice - fiveYearPrice) / fiveYearPrice) * 100
    const avgAnnualAppreciation = appreciation5Y / 5
    
    const trend: 'up' | 'down' | 'stable' = appreciation1Y > 5 ? 'up' : appreciation1Y < -2 ? 'down' : 'stable'
    
    // Generate price data points
    const priceData: PriceDataPoint[] = data.historicalPrices.map(hp => ({
      date: `${hp.year}-01-01`,
      avgPricePerSqft: hp.price,
      totalListings: Math.floor(Math.random() * 200) + 100,
      avgPropertyPrice: hp.price * 1200 // Assuming avg 1200 sqft
    }))
    
    // Price forecast (simple projection)
    const forecast = [
      { period: '6 months', predictedPrice: Math.round(data.currentPrice * 1.03), confidence: 85 },
      { period: '1 year', predictedPrice: Math.round(data.currentPrice * 1.07), confidence: 75 },
      { period: '2 years', predictedPrice: Math.round(data.currentPrice * 1.15), confidence: 60 },
      { period: '5 years', predictedPrice: Math.round(data.currentPrice * 1.45), confidence: 40 }
    ]
    
    // Comparable areas
    const comparableAreas = Object.entries(areaData)
      .filter(([slug]) => slug !== location)
      .map(([slug, aData]) => ({
        name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        avgPrice: aData.currentPrice,
        distance: Math.floor(Math.random() * 10) + 2,
        appreciation: Math.round(((aData.currentPrice - aData.historicalPrices[aData.historicalPrices.length - 2]?.price || aData.currentPrice) / (aData.historicalPrices[aData.historicalPrices.length - 2]?.price || aData.currentPrice)) * 1000) / 10
      }))
      .sort((a, b) => Math.abs(a.avgPrice - data.currentPrice) - Math.abs(b.avgPrice - data.currentPrice))
      .slice(0, 5)
    
    const analytics: AreaAnalytics = {
      location: location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      currentAvgPrice: data.currentPrice,
      lastYearAvgPrice: lastYearPrice,
      appreciation: Math.round(appreciation1Y * 10) / 10,
      demandScore: data.demandScore,
      supplyScore: data.supplyScore,
      investmentRating: getInvestmentRating(appreciation1Y, data.demandScore, data.supplyScore),
      bestTimeToBy: getBestTimeToBuy(trend),
      priceForcast: forecast,
      comparableAreas
    }
    
    const priceTrend: PriceTrend = {
      location: location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      period,
      data: priceData,
      averagePrice: data.currentPrice,
      priceChange: data.currentPrice - lastYearPrice,
      priceChangePercent: Math.round(appreciation1Y * 10) / 10,
      trend
    }
    
    return NextResponse.json({
      success: true,
      data: {
        priceTrend,
        analytics,
        insights: [
          `${Math.round(appreciation5Y)}% appreciation in last 5 years`,
          `Average annual growth: ${Math.round(avgAnnualAppreciation * 10) / 10}%`,
          `Demand score: ${data.demandScore}/100 - ${data.demandScore > 80 ? 'High demand' : 'Moderate demand'}`,
          `Supply score: ${data.supplyScore}/100 - ${data.supplyScore < 50 ? 'Limited supply' : 'Good availability'}`,
          `Average rent: ₹${data.avgRent.toLocaleString()}/month for 2BHK`
        ]
      }
    })
  } catch (error) {
    console.error('Price trends error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch price trends' },
      { status: 500 }
    )
  }
}

// POST - Calculate ROI
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      propertyPrice, 
      expectedRent, 
      appreciationRate = 8, 
      holdingPeriod = 5,
      maintenanceCost = 0,
      propertyTax = 0,
      vacancyRate = 5
    } = body
    
    if (!propertyPrice) {
      return NextResponse.json(
        { success: false, error: 'Property price is required' },
        { status: 400 }
      )
    }
    
    // Calculate rental yield
    const annualRent = expectedRent ? expectedRent * 12 : 0
    const effectiveRent = annualRent * (1 - vacancyRate / 100)
    const netRentalIncome = effectiveRent - maintenanceCost - propertyTax
    const grossYield = (annualRent / propertyPrice) * 100
    const netYield = (netRentalIncome / propertyPrice) * 100
    
    // Calculate appreciation
    const futureValue = propertyPrice * Math.pow(1 + appreciationRate / 100, holdingPeriod)
    const capitalGain = futureValue - propertyPrice
    
    // Total return
    const totalRentalIncome = netRentalIncome * holdingPeriod
    const totalReturn = capitalGain + totalRentalIncome
    const totalReturnPercent = (totalReturn / propertyPrice) * 100
    const annualizedReturn = Math.pow(1 + totalReturnPercent / 100, 1 / holdingPeriod) - 1
    
    // Break-even calculation
    const breakEvenYears = expectedRent > 0 
      ? propertyPrice / (netRentalIncome + (propertyPrice * appreciationRate / 100))
      : propertyPrice / (propertyPrice * appreciationRate / 100)
    
    const roi: ROICalculation = {
      propertyPrice,
      expectedRent: expectedRent || 0,
      appreciationRate,
      holdingPeriod,
      grossYield: Math.round(grossYield * 100) / 100,
      netYield: Math.round(netYield * 100) / 100,
      totalReturn: Math.round(totalReturn),
      annualizedReturn: Math.round(annualizedReturn * 10000) / 100,
      breakEvenYears: Math.round(breakEvenYears * 10) / 10
    }
    
    return NextResponse.json({
      success: true,
      data: {
        roi,
        breakdown: {
          capitalGain: Math.round(capitalGain),
          totalRentalIncome: Math.round(totalRentalIncome),
          futurePropertyValue: Math.round(futureValue),
          totalInvestmentValue: Math.round(futureValue + totalRentalIncome)
        },
        recommendation: totalReturnPercent > 50 
          ? 'Excellent investment opportunity' 
          : totalReturnPercent > 30 
            ? 'Good investment with moderate returns'
            : 'Consider other options for better returns',
        tips: [
          'Location appreciation varies - research specific area trends',
          'Factor in loan interest if using home loan',
          'Consider rental demand in the area',
          'Account for property maintenance and taxes',
          'Diversify across multiple properties for lower risk'
        ]
      }
    })
  } catch (error) {
    console.error('ROI calculation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to calculate ROI' },
      { status: 500 }
    )
  }
}
