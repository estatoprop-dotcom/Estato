'use client'

import { FeaturedListings } from '@/components/features'

export default function FeaturedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="container-custom py-12">
        <FeaturedListings />
      </div>
    </div>
  )
}
