'use client'

import { PriceTrends } from '@/components/features'

export default function PriceTrendsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container-custom py-12">
        <PriceTrends />
      </div>
    </div>
  )
}
