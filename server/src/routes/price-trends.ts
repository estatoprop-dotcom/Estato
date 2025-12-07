import { Router, Request, Response } from 'express'

const router = Router()

// Lucknow area price data (mock - in production from database)
const areaPriceData: Record<string, any> = {
  'gomti-nagar': {
    name: 'Gomti Nagar',
    currentPrice: 7500,
    priceHistory: [
      { year: 2020, price: 5500, growth: 0 },
      { year: 2021, price: 6000, growth: 9.1 },
      { year: 2022, price: 6500, growth: 8.3 },
      { year: 2023, price: 7000, growth: 7.7 },
      { year: 2024, price: 7500, growth: 7.1 }
    ],
    demandScore: 92,
    supplyScore: 65,
    investmentRating: 'Excellent',
    avgAppreciation: 8.05,
    rentalYield: 3.2,
    highlights: ['IT Hub', 'Metro Connectivity', 'Premium Malls']
  },
  'hazratganj': {
    name: 'Hazratganj',
    currentPrice: 9500,
    priceHistory: [
      { year: 2020, price: 7500, growth: 0 },
      { year: 2021, price: 8000, growth: 6.7 },
      { year: 2022, price: 8500, growth: 6.3 },
      { year: 2023, price: 9000, growth: 5.9 },
      { year: 2024, price: 9500, growth: 5.6 }
    ],
    demandScore: 88,
    supplyScore: 30,
    investmentRating: 'Good',
    avgAppreciation: 6.1,
    rentalYield: 2.8,
    highlights: ['City Center', 'Heritage Area', 'Commercial Hub']
  },
  'gomti-nagar-extension': {
    name: 'Gomti Nagar Extension',
    currentPrice: 5500,
    priceHistory: [
      { year: 2020, price: 3500, growth: 0 },
      { year: 2021, price: 4000, growth: 14.3 },
      { year: 2022, price: 4500, growth: 12.5 },
      { year: 2023, price: 5000, growth: 11.1 },
      { year: 2024, price: 5500, growth: 10.0 }
    ],
    demandScore: 95,
    supplyScore: 80,
    investmentRating: 'Excellent',
    avgAppreciation: 12.0,
    rentalYield: 3.5,
    highlights: ['High Growth', 'New Development', 'Affordable']
  },
  'aliganj': {
    name: 'Aliganj',
    currentPrice: 5200,
    priceHistory: [
      { year: 2020, price: 4200, growth: 0 },
      { year: 2021, price: 4500, growth: 7.1 },
      { year: 2022, price: 4800, growth: 6.7 },
      { year: 2023, price: 5000, growth: 4.2 },
      { year: 2024, price: 5200, growth: 4.0 }
    ],
    demandScore: 78,
    supplyScore: 55,
    investmentRating: 'Good',
    avgAppreciation: 5.5,
    rentalYield: 3.0,
    highlights: ['Established Area', 'Family Friendly', 'Good Schools']
  },
  'indira-nagar': {
    name: 'Indira Nagar',
    currentPrice: 5800,
    priceHistory: [
      { year: 2020, price: 4500, growth: 0 },
      { year: 2021, price: 4900, growth: 8.9 },
      { year: 2022, price: 5200, growth: 6.1 },
      { year: 2023, price: 5500, growth: 5.8 },
      { year: 2024, price: 5800, growth: 5.5 }
    ],
    demandScore: 82,
    supplyScore: 50,
    investmentRating: 'Good',
    avgAppreciation: 6.6,
    rentalYield: 3.1,
    highlights: ['Central Location', 'Metro Access', 'Commercial']
  },
  'jankipuram': {
    name: 'Jankipuram',
    currentPrice: 4000,
    priceHistory: [
      { year: 2020, price: 3000, growth: 0 },
      { year: 2021, price: 3300, growth: 10.0 },
      { year: 2022, price: 3500, growth: 6.1 },
      { year: 2023, price: 3800, growth: 8.6 },
      { year: 2024, price: 4000, growth: 5.3 }
    ],
    demandScore: 75,
    supplyScore: 70,
    investmentRating: 'Average',
    avgAppreciation: 7.5,
    rentalYield: 3.8,
    highlights: ['Affordable', 'Growing Area', 'Good Connectivity']
  },
  'sushant-golf-city': {
    name: 'Sushant Golf City',
    currentPrice: 6800,
    priceHistory: [
      { year: 2020, price: 5000, growth: 0 },
      { year: 2021, price: 5500, growth: 10.0 },
      { year: 2022, price: 6000, growth: 9.1 },
      { year: 2023, price: 6400, growth: 6.7 },
      { year: 2024, price: 6800, growth: 6.3 }
    ],
    demandScore: 85,
    supplyScore: 60,
    investmentRating: 'Excellent',
    avgAppreciation: 8.0,
    rentalYield: 2.9,
    highlights: ['Premium Township', 'Golf Course', 'Gated Community']
  }
}

// GET - Get price trends for an area
router.get('/', (req: Request, res: Response) => {
  try {
    const { location, propertyType } = req.query
    
    if (!location) {
      // Return all areas summary
      const allAreas = Object.entries(areaPriceData).map(([slug, data]) => ({
        slug,
        name: data.name,
        currentPrice: data.currentPrice,
        avgAppreciation: data.avgAppreciation,
        investmentRating: data.investmentRating,
        demandScore: data.demandScore
      }))
      
      return res.json({
        success: true,
        data: {
          areas: allAreas,
          cityAverage: {
            price: 6000,
            appreciation: 7.5,
            rentalYield: 3.2
          }
        }
      })
    }
    
    const locationSlug = (location as string).toLowerCase().replace(/\s+/g, '-')
    const areaData = areaPriceData[locationSlug]
    
    if (!areaData) {
      return res.status(404).json({
        success: false,
        error: 'Area not found'
      })
    }
    
    // Calculate insights
    const insights = generateInsights(areaData)
    
    res.json({
      success: true,
      data: {
        area: areaData,
        insights,
        forecast: {
          nextYear: Math.round(areaData.currentPrice * 1.07),
          threeYear: Math.round(areaData.currentPrice * 1.22),
          fiveYear: Math.round(areaData.currentPrice * 1.40)
        },
        comparison: {
          vsCityAverage: ((areaData.currentPrice - 6000) / 6000 * 100).toFixed(1),
          vsLastYear: areaData.priceHistory[areaData.priceHistory.length - 1].growth
        }
      }
    })
  } catch (error) {
    console.error('Price trends error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch price trends'
    })
  }
})

// POST - Calculate ROI
router.post('/roi', (req: Request, res: Response) => {
  try {
    const { 
      purchasePrice, 
      location, 
      holdingPeriod = 5,
      expectedRent,
      maintenanceCost = 0,
      loanAmount = 0,
      interestRate = 8.5
    } = req.body
    
    if (!purchasePrice || !location) {
      return res.status(400).json({
        success: false,
        error: 'Purchase price and location are required'
      })
    }
    
    const locationSlug = location.toLowerCase().replace(/\s+/g, '-')
    const areaData = areaPriceData[locationSlug]
    
    const appreciationRate = areaData?.avgAppreciation || 7
    const rentalYield = areaData?.rentalYield || 3
    
    // Calculate future value
    const futureValue = purchasePrice * Math.pow(1 + appreciationRate / 100, holdingPeriod)
    const capitalGain = futureValue - purchasePrice
    
    // Calculate rental income
    const monthlyRent = expectedRent || (purchasePrice * rentalYield / 100 / 12)
    const annualRent = monthlyRent * 12
    const totalRentalIncome = annualRent * holdingPeriod
    const netRentalIncome = totalRentalIncome - (maintenanceCost * holdingPeriod)
    
    // Calculate loan cost if applicable
    let totalInterestPaid = 0
    if (loanAmount > 0) {
      const monthlyRate = interestRate / 12 / 100
      const tenure = holdingPeriod * 12
      const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure) / 
                  (Math.pow(1 + monthlyRate, tenure) - 1)
      totalInterestPaid = (emi * tenure) - loanAmount
    }
    
    // Calculate total returns
    const totalReturns = capitalGain + netRentalIncome - totalInterestPaid
    const roi = (totalReturns / purchasePrice) * 100
    const annualizedRoi = Math.pow(1 + roi / 100, 1 / holdingPeriod) - 1
    
    res.json({
      success: true,
      data: {
        input: {
          purchasePrice,
          location: areaData?.name || location,
          holdingPeriod,
          loanAmount,
          interestRate
        },
        projections: {
          futureValue: Math.round(futureValue),
          capitalGain: Math.round(capitalGain),
          capitalGainPercent: ((capitalGain / purchasePrice) * 100).toFixed(1)
        },
        rentalIncome: {
          monthlyRent: Math.round(monthlyRent),
          annualRent: Math.round(annualRent),
          totalRentalIncome: Math.round(totalRentalIncome),
          netRentalIncome: Math.round(netRentalIncome)
        },
        costs: {
          totalInterestPaid: Math.round(totalInterestPaid),
          maintenanceCost: maintenanceCost * holdingPeriod
        },
        returns: {
          totalReturns: Math.round(totalReturns),
          roi: roi.toFixed(1),
          annualizedRoi: (annualizedRoi * 100).toFixed(1)
        },
        recommendation: roi > 50 ? 'Excellent Investment' : 
                        roi > 30 ? 'Good Investment' : 
                        roi > 15 ? 'Average Investment' : 'Consider Other Options'
      }
    })
  } catch (error) {
    console.error('ROI calculation error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to calculate ROI'
    })
  }
})

// Generate insights
function generateInsights(areaData: any) {
  const insights = []
  
  if (areaData.avgAppreciation > 8) {
    insights.push({
      type: 'positive',
      message: `High appreciation rate of ${areaData.avgAppreciation}% - above city average`
    })
  }
  
  if (areaData.demandScore > 85) {
    insights.push({
      type: 'positive',
      message: 'Very high demand area - properties sell quickly'
    })
  }
  
  if (areaData.supplyScore > 70) {
    insights.push({
      type: 'neutral',
      message: 'Good supply of properties - more options to choose from'
    })
  } else if (areaData.supplyScore < 40) {
    insights.push({
      type: 'warning',
      message: 'Limited supply - prices may be higher due to scarcity'
    })
  }
  
  if (areaData.rentalYield > 3.2) {
    insights.push({
      type: 'positive',
      message: `Good rental yield of ${areaData.rentalYield}% - suitable for rental investment`
    })
  }
  
  // Best time to buy insight
  const currentMonth = new Date().getMonth()
  if (currentMonth >= 9 && currentMonth <= 11) {
    insights.push({
      type: 'tip',
      message: 'Festival season - good time to negotiate deals'
    })
  } else if (currentMonth >= 3 && currentMonth <= 5) {
    insights.push({
      type: 'tip',
      message: 'Financial year end - builders may offer discounts'
    })
  }
  
  return insights
}

export default router
