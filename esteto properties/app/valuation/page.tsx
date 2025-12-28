'use client'

import { PropertyValuation } from '@/components/features'

export default function ValuationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          <PropertyValuation />
        </div>
      </div>
    </div>
  )
}
