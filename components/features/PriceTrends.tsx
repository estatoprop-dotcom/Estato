'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, BarChart3, MapPin, Calendar, IndianRupee, Percent, Target } from 'lucide-react'
import Button from '@/components/ui/Button'

interface AreaData {
  slug: string
  name: string
  currentPrice: number
  avgAppreciation: number
  investmentRating: string
  demandScore: number
  supplyScore: number
  rentalYield: number
  priceHistory: { year: number; price: number; growth: number }[]
}

const areasData: AreaData[] = [
  {
    slug: 'gomti-nagar',
    name: 'Gomti Nagar',
    currentPrice: 7500,
    avgAppreciation: 8.05,
    investmentRating: 'Excellent',
    demandScore: 92,
    supplyScore: 65,
    rentalYield: 3.2,
    priceHistory: [
      { year: 2020, price: 5500, growth: 0 },
      { year: 2021, price: 6000, growth: 9.1 },
      { year: 2022, price: 6500, growth: 8.3 },
      { year: 2023, price: 7000, growth: 7.7 },
      { year: 2024, price: 7500, growth: 7.1 }
    ]
  },
  {
    slug: 'gomti-nagar-extension',
    name: 'Gomti Nagar Extension',
    currentPrice: 5500,
    avgAppreciation: 12.0,
    investmentRating: 'Excellent',
    demandScore: 95,
    supplyScore: 80,
    rentalYield: 3.5,
    priceHistory: [
      { year: 2020, price: 3500, growth: 0 },
      { year: 2021, price: 4000, growth: 14.3 },
      { year: 2022, price: 4500, growth: 12.5 },
      { year: 2023, price: 5000, growth: 11.1 },
      { year: 2024, price: 5500, growth: 10.0 }
    ]
  },
  {
    slug: 'hazratganj',
    name: 'Hazratganj',
    currentPrice: 9500,
    avgAppreciation: 6.1,
    investmentRating: 'Good',
    demandScore: 88,
    supplyScore: 30,
    rentalYield: 2.8,
    priceHistory: [
      { year: 2020, price: 7500, growth: 0 },
      { year: 2021, price: 8000, growth: 6.7 },
      { year: 2022, price: 8500, growth: 6.3 },
      { year: 2023, price: 9000, growth: 5.9 },
      { year: 2024, price: 9500, growth: 5.6 }
    ]
  },
  {
    slug: 'aliganj',
    name: 'Aliganj',
    currentPrice: 5200,
    avgAppreciation: 5.5,
    investmentRating: 'Good',
    demandScore: 78,
    supplyScore: 55,
    rentalYield: 3.0,
    priceHistory: [
      { year: 2020, price: 4200, growth: 0 },
      { year: 2021, price: 4500, growth: 7.1 },
      { year: 2022, price: 4800, growth: 6.7 },
      { year: 2023, price: 5000, growth: 4.2 },
      { year: 2024, price: 5200, growth: 4.0 }
    ]
  },
  {
    slug: 'sushant-golf-city',
    name: 'Sushant Golf City',
    currentPrice: 6800,
    avgAppreciation: 8.0,
    investmentRating: 'Excellent',
    demandScore: 85,
    supplyScore: 60,
    rentalYield: 2.9,
    priceHistory: [
      { year: 2020, price: 5000, growth: 0 },
      { year: 2021, price: 5500, growth: 10.0 },
      { year: 2022, price: 6000, growth: 9.1 },
      { year: 2023, price: 6400, growth: 6.7 },
      { year: 2024, price: 6800, growth: 6.3 }
    ]
  }
]

export default function PriceTrends() {
  const [selectedArea, setSelectedArea] = useState<AreaData>(areasData[0])
  const [view, setView] = useState<'chart' | 'compare'>('chart')

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Excellent': return 'text-green-600 bg-green-100'
      case 'Good': return 'text-blue-600 bg-blue-100'
      case 'Average': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const maxPrice = Math.max(...selectedArea.priceHistory.map(p => p.price))

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Price Trends & Analytics</h2>
            <p className="text-indigo-100">Track property prices across Lucknow</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Area Selection */}
        <div className="flex flex-wrap gap-2 mb-6">
          {areasData.map(area => (
            <button
              key={area.slug}
              onClick={() => setSelectedArea(area)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedArea.slug === area.slug
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {area.name}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <IndianRupee className="w-5 h-5 text-indigo-600" />
              <span className="text-sm text-gray-600">Current Price</span>
            </div>
            <p className="text-2xl font-bold text-indigo-600">₹{selectedArea.currentPrice.toLocaleString()}</p>
            <p className="text-xs text-gray-500">per sq.ft</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Appreciation</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{selectedArea.avgAppreciation}%</p>
            <p className="text-xs text-gray-500">avg. yearly</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Percent className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Rental Yield</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{selectedArea.rentalYield}%</p>
            <p className="text-xs text-gray-500">annual</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-orange-600" />
              <span className="text-sm text-gray-600">Investment</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(selectedArea.investmentRating)}`}>
              {selectedArea.investmentRating}
            </span>
          </div>
        </div>

        {/* Price Chart */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Price History (₹/sq.ft)</h3>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-end justify-between h-48 gap-4">
              {selectedArea.priceHistory.map((data, i) => (
                <div key={data.year} className="flex-1 flex flex-col items-center">
                  <div className="relative w-full flex flex-col items-center">
                    <span className="text-xs font-medium text-indigo-600 mb-1">
                      ₹{data.price.toLocaleString()}
                    </span>
                    {data.growth > 0 && (
                      <span className="text-xs text-green-600 mb-1">+{data.growth}%</span>
                    )}
                    <div
                      className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-lg transition-all duration-500"
                      style={{ height: `${(data.price / maxPrice) * 120}px` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 mt-2">{data.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Demand & Supply */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="font-medium mb-3">Demand Score</h4>
            <div className="bg-gray-100 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${selectedArea.demandScore}%` }}
              />
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500">Low</span>
              <span className="font-medium text-green-600">{selectedArea.demandScore}/100</span>
              <span className="text-gray-500">High</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Supply Score</h4>
            <div className="bg-gray-100 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${selectedArea.supplyScore}%` }}
              />
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500">Low</span>
              <span className="font-medium text-blue-600">{selectedArea.supplyScore}/100</span>
              <span className="text-gray-500">High</span>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Price Forecast</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">1 Year</p>
              <p className="text-xl font-bold text-indigo-600">
                ₹{Math.round(selectedArea.currentPrice * 1.07).toLocaleString()}
              </p>
              <p className="text-xs text-green-600">+7%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">3 Years</p>
              <p className="text-xl font-bold text-indigo-600">
                ₹{Math.round(selectedArea.currentPrice * 1.22).toLocaleString()}
              </p>
              <p className="text-xs text-green-600">+22%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">5 Years</p>
              <p className="text-xl font-bold text-indigo-600">
                ₹{Math.round(selectedArea.currentPrice * 1.40).toLocaleString()}
              </p>
              <p className="text-xs text-green-600">+40%</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 flex gap-4">
          <Button variant="gradient" className="flex-1">
            Calculate ROI
          </Button>
          <Button variant="outline" className="flex-1">
            View Properties in {selectedArea.name}
          </Button>
        </div>
      </div>
    </div>
  )
}
