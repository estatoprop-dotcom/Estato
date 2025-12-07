'use client'

import { PropertyComparison } from '@/components/features'

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container-custom py-12">
        <PropertyComparison />
      </div>
    </div>
  )
}
