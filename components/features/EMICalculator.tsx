'use client'

import { useState, useEffect } from 'react'
import { Calculator, Building2, Percent, Calendar, TrendingUp, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface BankOffer {
  id: string
  name: string
  logo: string
  interestRate: number
  processingFee: string
  maxTenure: number
  maxLoanAmount: number
  specialOffer?: string
}

interface EMIBreakdown {
  year: number
  principal: number
  interest: number
  balance: number
}

const bankOffers: BankOffer[] = [
  { id: 'sbi', name: 'State Bank of India', logo: '🏦', interestRate: 8.50, processingFee: '0.35%', maxTenure: 30, maxLoanAmount: 50000000, specialOffer: 'No processing fee for women' },
  { id: 'hdfc', name: 'HDFC Bank', logo: '🏛️', interestRate: 8.70, processingFee: '0.50%', maxTenure: 30, maxLoanAmount: 100000000, specialOffer: '50% off on processing fee' },
  { id: 'icici', name: 'ICICI Bank', logo: '🔵', interestRate: 8.75, processingFee: '0.50%', maxTenure: 30, maxLoanAmount: 50000000 },
  { id: 'axis', name: 'Axis Bank', logo: '🟣', interestRate: 8.75, processingFee: '1.00%', maxTenure: 30, maxLoanAmount: 50000000 },
  { id: 'kotak', name: 'Kotak Mahindra', logo: '🔴', interestRate: 8.85, processingFee: '0.50%', maxTenure: 20, maxLoanAmount: 50000000 },
  { id: 'pnb', name: 'Punjab National Bank', logo: '🟠', interestRate: 8.45, processingFee: '0.35%', maxTenure: 30, maxLoanAmount: 50000000, specialOffer: 'Lowest rate for govt employees' },
]

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(5000000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)
  const [selectedBank, setSelectedBank] = useState<BankOffer | null>(null)
  const [showBanks, setShowBanks] = useState(false)
  const [emi, setEmi] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [breakdown, setBreakdown] = useState<EMIBreakdown[]>([])

  useEffect(() => {
    calculateEMI()
  }, [loanAmount, interestRate, tenure])

  const calculateEMI = () => {
    const principal = loanAmount
    const monthlyRate = interestRate / 12 / 100
    const months = tenure * 12

    if (monthlyRate === 0) {
      const monthlyEmi = principal / months
      setEmi(monthlyEmi)
      setTotalInterest(0)
      setTotalPayment(principal)
      return
    }

    const emiValue = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
    const totalPay = emiValue * months
    const totalInt = totalPay - principal

    setEmi(Math.round(emiValue))
    setTotalInterest(Math.round(totalInt))
    setTotalPayment(Math.round(totalPay))

    // Generate yearly breakdown
    const yearlyBreakdown: EMIBreakdown[] = []
    let balance = principal
    
    for (let year = 1; year <= tenure; year++) {
      let yearlyPrincipal = 0
      let yearlyInterest = 0
      
      for (let month = 1; month <= 12; month++) {
        const monthInterest = balance * monthlyRate
        const monthPrincipal = emiValue - monthInterest
        yearlyInterest += monthInterest
        yearlyPrincipal += monthPrincipal
        balance -= monthPrincipal
      }
      
      yearlyBreakdown.push({
        year,
        principal: Math.round(yearlyPrincipal),
        interest: Math.round(yearlyInterest),
        balance: Math.max(0, Math.round(balance))
      })
    }
    
    setBreakdown(yearlyBreakdown)
  }

  const selectBank = (bank: BankOffer) => {
    setSelectedBank(bank)
    setInterestRate(bank.interestRate)
    setShowBanks(false)
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`
    }
    return `₹${amount.toLocaleString('en-IN')}`
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
        <div className="flex items-center gap-3">
          <Calculator className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">EMI Calculator</h2>
            <p className="text-purple-100">Calculate your home loan EMI instantly</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Inputs */}
          <div className="space-y-6">
            {/* Bank Selection */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Bank</label>
              <button
                onClick={() => setShowBanks(!showBanks)}
                className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedBank?.logo || '🏦'}</span>
                  <span className="font-medium">{selectedBank?.name || 'Choose a bank'}</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${showBanks ? 'rotate-180' : ''}`} />
              </button>
              
              {showBanks && (
                <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto">
                  {bankOffers.map(bank => (
                    <button
                      key={bank.id}
                      onClick={() => selectBank(bank)}
                      className="w-full flex items-center justify-between p-4 hover:bg-purple-50 transition-colors border-b last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{bank.logo}</span>
                        <div className="text-left">
                          <p className="font-medium">{bank.name}</p>
                          {bank.specialOffer && (
                            <p className="text-xs text-green-600">{bank.specialOffer}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-purple-600">{bank.interestRate}%</p>
                        <p className="text-xs text-gray-500">p.a.</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Loan Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount: {formatCurrency(loanAmount)}
              </label>
              <input
                type="range"
                min={500000}
                max={50000000}
                step={100000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹5 L</span>
                <span>₹5 Cr</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate: {interestRate}% p.a.
              </label>
              <input
                type="range"
                min={6}
                max={15}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>6%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Tenure */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Tenure: {tenure} Years
              </label>
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>
          </div>

          {/* Right - Results */}
          <div className="space-y-6">
            {/* EMI Display */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center">
              <p className="text-gray-600 mb-2">Your Monthly EMI</p>
              <p className="text-4xl font-bold text-purple-600">₹{emi.toLocaleString('en-IN')}</p>
              <p className="text-sm text-gray-500 mt-2">for {tenure} years at {interestRate}% p.a.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Principal</span>
                </div>
                <p className="text-xl font-bold text-blue-600">{formatCurrency(loanAmount)}</p>
              </div>
              
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="w-5 h-5 text-orange-600" />
                  <span className="text-sm text-gray-600">Total Interest</span>
                </div>
                <p className="text-xl font-bold text-orange-600">{formatCurrency(totalInterest)}</p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4 col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">Total Payment</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPayment)}</p>
              </div>
            </div>

            {/* Pie Chart Visualization */}
            <div className="flex items-center justify-center gap-8">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="3"
                    strokeDasharray={`${(loanAmount / totalPayment) * 100}, 100`}
                  />
                </svg>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                  <span className="text-sm">Principal ({Math.round((loanAmount / totalPayment) * 100)}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <span className="text-sm">Interest ({Math.round((totalInterest / totalPayment) * 100)}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Year-wise Breakdown */}
        {breakdown.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Year-wise Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Year</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-600">Principal</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-600">Interest</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-600">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {breakdown.slice(0, 5).map((row) => (
                    <tr key={row.year} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">Year {row.year}</td>
                      <td className="px-4 py-3 text-right text-green-600">₹{row.principal.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-right text-orange-600">₹{row.interest.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-right">₹{row.balance.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {breakdown.length > 5 && (
                <p className="text-center text-sm text-gray-500 mt-2">
                  + {breakdown.length - 5} more years...
                </p>
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button variant="gradient" className="flex-1">
            Check Loan Eligibility
          </Button>
          <Button variant="outline" className="flex-1">
            Compare Bank Offers
          </Button>
        </div>
      </div>
    </div>
  )
}
