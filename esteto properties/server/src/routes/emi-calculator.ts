import { Router, Request, Response } from 'express'

const router = Router()

// Bank offers data
const bankOffers = [
  {
    id: 'sbi',
    name: 'State Bank of India',
    logo: '/banks/sbi.png',
    interestRate: 8.50,
    processingFee: 0.35,
    maxLoanAmount: 50000000,
    maxTenure: 30,
    features: ['No prepayment charges', 'Doorstep service', 'Quick approval'],
    specialOffer: '0.05% rate discount for women borrowers'
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    logo: '/banks/hdfc.png',
    interestRate: 8.70,
    processingFee: 0.50,
    maxLoanAmount: 100000000,
    maxTenure: 30,
    features: ['Part prepayment allowed', 'Balance transfer facility', 'Top-up loan available'],
    specialOffer: 'Free property insurance for 1 year'
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    logo: '/banks/icici.png',
    interestRate: 8.75,
    processingFee: 0.50,
    maxLoanAmount: 100000000,
    maxTenure: 30,
    features: ['Instant approval', 'Flexible EMI options', 'Online account management'],
    specialOffer: '50% off on processing fee'
  },
  {
    id: 'pnb',
    name: 'Punjab National Bank',
    logo: '/banks/pnb.png',
    interestRate: 8.45,
    processingFee: 0.35,
    maxLoanAmount: 50000000,
    maxTenure: 30,
    features: ['Low interest rate', 'No hidden charges', 'Easy documentation'],
    specialOffer: 'Special rates for government employees'
  },
  {
    id: 'axis',
    name: 'Axis Bank',
    logo: '/banks/axis.png',
    interestRate: 8.75,
    processingFee: 1.00,
    maxLoanAmount: 75000000,
    maxTenure: 30,
    features: ['Quick disbursement', 'Flexible repayment', 'Dedicated relationship manager'],
    specialOffer: 'Cashback on first EMI'
  },
  {
    id: 'bob',
    name: 'Bank of Baroda',
    logo: '/banks/bob.png',
    interestRate: 8.40,
    processingFee: 0.25,
    maxLoanAmount: 50000000,
    maxTenure: 30,
    features: ['Lowest processing fee', 'No prepayment penalty', 'Easy balance transfer'],
    specialOffer: 'Waiver on processing fee for existing customers'
  },
  {
    id: 'kotak',
    name: 'Kotak Mahindra Bank',
    logo: '/banks/kotak.png',
    interestRate: 8.85,
    processingFee: 0.50,
    maxLoanAmount: 75000000,
    maxTenure: 25,
    features: ['Digital process', 'Doorstep service', 'Flexible tenure'],
    specialOffer: 'Free credit card with home loan'
  },
  {
    id: 'lic',
    name: 'LIC Housing Finance',
    logo: '/banks/lic.png',
    interestRate: 8.50,
    processingFee: 0.50,
    maxLoanAmount: 100000000,
    maxTenure: 30,
    features: ['Trusted brand', 'Transparent process', 'Wide network'],
    specialOffer: 'Special rates for LIC policyholders'
  }
]

// Calculate EMI
function calculateEMI(principal: number, annualRate: number, tenureYears: number) {
  const monthlyRate = annualRate / 12 / 100
  const tenureMonths = tenureYears * 12
  
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / 
              (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  
  const totalAmount = emi * tenureMonths
  const totalInterest = totalAmount - principal
  
  return {
    emi: Math.round(emi),
    totalAmount: Math.round(totalAmount),
    totalInterest: Math.round(totalInterest),
    principal
  }
}

// Generate year-wise breakdown
function generateYearWiseBreakdown(principal: number, annualRate: number, tenureYears: number) {
  const monthlyRate = annualRate / 12 / 100
  const { emi } = calculateEMI(principal, annualRate, tenureYears)
  
  const breakdown = []
  let balance = principal
  let totalPrincipalPaid = 0
  let totalInterestPaid = 0
  
  for (let year = 1; year <= tenureYears; year++) {
    let yearPrincipal = 0
    let yearInterest = 0
    
    for (let month = 1; month <= 12; month++) {
      if (balance <= 0) break
      
      const interestPayment = balance * monthlyRate
      const principalPayment = Math.min(emi - interestPayment, balance)
      
      yearPrincipal += principalPayment
      yearInterest += interestPayment
      balance -= principalPayment
    }
    
    totalPrincipalPaid += yearPrincipal
    totalInterestPaid += yearInterest
    
    breakdown.push({
      year,
      principalPaid: Math.round(yearPrincipal),
      interestPaid: Math.round(yearInterest),
      totalPaid: Math.round(yearPrincipal + yearInterest),
      remainingBalance: Math.max(0, Math.round(balance)),
      cumulativePrincipal: Math.round(totalPrincipalPaid),
      cumulativeInterest: Math.round(totalInterestPaid)
    })
    
    if (balance <= 0) break
  }
  
  return breakdown
}

// GET - Get bank offers
router.get('/banks', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: bankOffers
  })
})

// POST - Calculate EMI
router.post('/calculate', (req: Request, res: Response) => {
  try {
    const { loanAmount, interestRate, tenure, bankId } = req.body
    
    if (!loanAmount || !tenure) {
      return res.status(400).json({
        success: false,
        error: 'Loan amount and tenure are required'
      })
    }
    
    // Use bank rate if bankId provided, otherwise use provided rate or default
    let rate = interestRate
    let selectedBank = null
    
    if (bankId) {
      selectedBank = bankOffers.find(b => b.id === bankId)
      if (selectedBank) {
        rate = selectedBank.interestRate
      }
    }
    
    if (!rate) {
      rate = 8.5 // Default rate
    }
    
    const emiResult = calculateEMI(loanAmount, rate, tenure)
    const yearWiseBreakdown = generateYearWiseBreakdown(loanAmount, rate, tenure)
    
    // Calculate for all banks for comparison
    const bankComparison = bankOffers.map(bank => {
      const bankEmi = calculateEMI(loanAmount, bank.interestRate, tenure)
      return {
        bankId: bank.id,
        bankName: bank.name,
        interestRate: bank.interestRate,
        emi: bankEmi.emi,
        totalInterest: bankEmi.totalInterest,
        totalAmount: bankEmi.totalAmount,
        processingFee: Math.round(loanAmount * bank.processingFee / 100),
        specialOffer: bank.specialOffer
      }
    }).sort((a, b) => a.emi - b.emi)
    
    res.json({
      success: true,
      data: {
        input: {
          loanAmount,
          interestRate: rate,
          tenure,
          selectedBank: selectedBank?.name || null
        },
        result: {
          ...emiResult,
          monthlyEMI: emiResult.emi,
          interestRate: rate
        },
        yearWiseBreakdown,
        bankComparison,
        bestOffer: bankComparison[0],
        tips: [
          'Consider making part prepayments to reduce interest burden',
          'Compare processing fees across banks',
          'Check for special offers for women borrowers or government employees',
          'Maintain a good credit score (750+) for better rates'
        ]
      }
    })
  } catch (error) {
    console.error('EMI calculation error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to calculate EMI'
    })
  }
})

// GET - Get eligibility estimate
router.get('/eligibility', (req: Request, res: Response) => {
  try {
    const monthlyIncome = parseInt(req.query.income as string) || 0
    const existingEMI = parseInt(req.query.existingEMI as string) || 0
    const tenure = parseInt(req.query.tenure as string) || 20
    
    if (!monthlyIncome) {
      return res.status(400).json({
        success: false,
        error: 'Monthly income is required'
      })
    }
    
    // FOIR (Fixed Obligation to Income Ratio) - typically 50-60%
    const maxEMI = (monthlyIncome * 0.5) - existingEMI
    
    if (maxEMI <= 0) {
      return res.json({
        success: true,
        data: {
          eligible: false,
          message: 'Your existing EMIs exceed the eligible limit',
          maxEMI: 0,
          estimatedLoanAmount: 0
        }
      })
    }
    
    // Calculate max loan amount based on max EMI
    const avgRate = 8.5
    const monthlyRate = avgRate / 12 / 100
    const tenureMonths = tenure * 12
    
    const maxLoanAmount = maxEMI * (Math.pow(1 + monthlyRate, tenureMonths) - 1) / 
                          (monthlyRate * Math.pow(1 + monthlyRate, tenureMonths))
    
    res.json({
      success: true,
      data: {
        eligible: true,
        monthlyIncome,
        existingEMI,
        maxEMI: Math.round(maxEMI),
        estimatedLoanAmount: Math.round(maxLoanAmount),
        tenure,
        assumedRate: avgRate,
        note: 'This is an estimate. Actual eligibility depends on credit score, employment type, and other factors.'
      }
    })
  } catch (error) {
    console.error('Eligibility error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to calculate eligibility'
    })
  }
})

export default router
