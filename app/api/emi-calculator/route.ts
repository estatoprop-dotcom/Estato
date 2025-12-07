import { NextRequest, NextResponse } from 'next/server'
import { EMICalculatorInput, EMIResult, BankOffer, YearlyBreakdown } from '@/lib/types/features'

// Bank offers data - In production, this would come from database
const bankOffers: BankOffer[] = [
  {
    id: 'sbi',
    bankName: 'State Bank of India',
    bankLogo: '/banks/sbi.png',
    interestRate: 8.50,
    processingFee: '0.35% (Min ₹2,000, Max ₹10,000)',
    maxLoanAmount: 100000000, // 10 Cr
    maxTenure: 30,
    specialOffer: '0.05% discount for women borrowers',
    features: [
      'No prepayment charges',
      'Doorstep service',
      'Quick disbursement',
      'Flexible repayment options'
    ],
    isPopular: true
  },
  {
    id: 'hdfc',
    bankName: 'HDFC Bank',
    bankLogo: '/banks/hdfc.png',
    interestRate: 8.70,
    processingFee: '0.50% (Max ₹3,000)',
    maxLoanAmount: 100000000,
    maxTenure: 30,
    specialOffer: 'Special rates for salaried professionals',
    features: [
      'Part prepayment allowed',
      'Balance transfer facility',
      'Top-up loan available',
      'Online account management'
    ],
    isPopular: true
  },
  {
    id: 'icici',
    bankName: 'ICICI Bank',
    bankLogo: '/banks/icici.png',
    interestRate: 8.75,
    processingFee: '0.50% (Min ₹3,000)',
    maxLoanAmount: 50000000,
    maxTenure: 30,
    features: [
      'Instant approval',
      'Minimal documentation',
      'Flexible tenure',
      'EMI holiday option'
    ]
  },
  {
    id: 'axis',
    bankName: 'Axis Bank',
    bankLogo: '/banks/axis.png',
    interestRate: 8.75,
    processingFee: '1% (Max ₹10,000)',
    maxLoanAmount: 50000000,
    maxTenure: 30,
    features: [
      'Quick processing',
      'Competitive rates',
      'Easy documentation',
      'Online tracking'
    ]
  },
  {
    id: 'pnb',
    bankName: 'Punjab National Bank',
    bankLogo: '/banks/pnb.png',
    interestRate: 8.45,
    processingFee: '0.35% (Max ₹15,000)',
    maxLoanAmount: 100000000,
    maxTenure: 30,
    specialOffer: 'Lowest interest rate for government employees',
    features: [
      'Low processing fee',
      'No hidden charges',
      'Doorstep service',
      'Quick sanction'
    ]
  },
  {
    id: 'bob',
    bankName: 'Bank of Baroda',
    bankLogo: '/banks/bob.png',
    interestRate: 8.40,
    processingFee: '0.25% (Min ₹8,500)',
    maxLoanAmount: 100000000,
    maxTenure: 30,
    features: [
      'Attractive interest rates',
      'Simple documentation',
      'Fast processing',
      'No prepayment penalty'
    ]
  },
  {
    id: 'kotak',
    bankName: 'Kotak Mahindra Bank',
    bankLogo: '/banks/kotak.png',
    interestRate: 8.85,
    processingFee: '0.50%',
    maxLoanAmount: 50000000,
    maxTenure: 20,
    features: [
      'Digital process',
      'Quick disbursement',
      'Flexible EMI options',
      'Balance transfer'
    ]
  },
  {
    id: 'lic',
    bankName: 'LIC Housing Finance',
    bankLogo: '/banks/lic.png',
    interestRate: 8.50,
    processingFee: '0.50% (Max ₹15,000)',
    maxLoanAmount: 100000000,
    maxTenure: 30,
    specialOffer: 'Special rates for LIC policyholders',
    features: [
      'Trusted brand',
      'Wide network',
      'Flexible tenure',
      'Easy documentation'
    ],
    isPopular: true
  }
]

// Calculate EMI using standard formula
function calculateEMI(principal: number, annualRate: number, tenureYears: number): number {
  const monthlyRate = annualRate / 12 / 100
  const tenureMonths = tenureYears * 12
  
  if (monthlyRate === 0) return principal / tenureMonths
  
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / 
              (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  
  return Math.round(emi)
}

// Calculate year-wise breakdown
function calculateYearlyBreakdown(
  principal: number, 
  annualRate: number, 
  tenureYears: number,
  monthlyEMI: number
): YearlyBreakdown[] {
  const monthlyRate = annualRate / 12 / 100
  const breakdown: YearlyBreakdown[] = []
  let balance = principal
  
  for (let year = 1; year <= tenureYears; year++) {
    let yearlyPrincipal = 0
    let yearlyInterest = 0
    
    for (let month = 1; month <= 12; month++) {
      if (balance <= 0) break
      
      const interestForMonth = balance * monthlyRate
      const principalForMonth = Math.min(monthlyEMI - interestForMonth, balance)
      
      yearlyInterest += interestForMonth
      yearlyPrincipal += principalForMonth
      balance -= principalForMonth
    }
    
    breakdown.push({
      year,
      principalPaid: Math.round(yearlyPrincipal),
      interestPaid: Math.round(yearlyInterest),
      balance: Math.max(0, Math.round(balance))
    })
    
    if (balance <= 0) break
  }
  
  return breakdown
}

// GET - Get bank offers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const loanAmount = searchParams.get('loanAmount')
    const tenure = searchParams.get('tenure')
    
    let filteredOffers = [...bankOffers]
    
    // Filter by loan amount eligibility
    if (loanAmount) {
      const amount = parseFloat(loanAmount)
      filteredOffers = filteredOffers.filter(offer => offer.maxLoanAmount >= amount)
    }
    
    // Filter by tenure eligibility
    if (tenure) {
      const years = parseInt(tenure)
      filteredOffers = filteredOffers.filter(offer => offer.maxTenure >= years)
    }
    
    // Sort by interest rate (lowest first)
    filteredOffers.sort((a, b) => a.interestRate - b.interestRate)
    
    return NextResponse.json({
      success: true,
      data: filteredOffers,
      count: filteredOffers.length
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bank offers' },
      { status: 500 }
    )
  }
}

// POST - Calculate EMI
export async function POST(request: NextRequest) {
  try {
    const body: EMICalculatorInput = await request.json()
    
    const { propertyPrice, downPayment, loanAmount, interestRate, loanTenure, bankId } = body
    
    // Validation
    if (!loanAmount || !interestRate || !loanTenure) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: loanAmount, interestRate, loanTenure' },
        { status: 400 }
      )
    }
    
    // Get bank-specific rate if bankId provided
    let rate = interestRate
    if (bankId) {
      const bank = bankOffers.find(b => b.id === bankId)
      if (bank) {
        rate = bank.interestRate
      }
    }
    
    // Calculate EMI
    const monthlyEMI = calculateEMI(loanAmount, rate, loanTenure)
    const totalPayment = monthlyEMI * loanTenure * 12
    const totalInterest = totalPayment - loanAmount
    const interestPercentage = (totalInterest / loanAmount) * 100
    
    // Calculate year-wise breakdown
    const yearWiseBreakdown = calculateYearlyBreakdown(loanAmount, rate, loanTenure, monthlyEMI)
    
    const result: EMIResult = {
      monthlyEMI,
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalAmount: loanAmount,
      interestPercentage: Math.round(interestPercentage * 100) / 100,
      yearWiseBreakdown
    }
    
    // Get recommended banks for this loan
    const recommendedBanks = bankOffers
      .filter(bank => bank.maxLoanAmount >= loanAmount && bank.maxTenure >= loanTenure)
      .sort((a, b) => a.interestRate - b.interestRate)
      .slice(0, 3)
      .map(bank => ({
        ...bank,
        calculatedEMI: calculateEMI(loanAmount, bank.interestRate, loanTenure),
        totalInterest: Math.round(
          calculateEMI(loanAmount, bank.interestRate, loanTenure) * loanTenure * 12 - loanAmount
        )
      }))
    
    return NextResponse.json({
      success: true,
      data: {
        input: {
          propertyPrice,
          downPayment,
          loanAmount,
          interestRate: rate,
          loanTenure
        },
        result,
        recommendedBanks,
        tips: [
          'A higher down payment reduces your EMI and total interest',
          'Compare offers from multiple banks before finalizing',
          'Check for prepayment charges before choosing a bank',
          'Consider your job stability before choosing tenure',
          'Women borrowers often get 0.05% lower interest rates'
        ]
      }
    })
  } catch (error) {
    console.error('EMI calculation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to calculate EMI' },
      { status: 500 }
    )
  }
}
