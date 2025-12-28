'use client'

import { ReviewsRatings } from '@/components/features'

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="container-custom py-12">
        <ReviewsRatings />
      </div>
    </div>
  )
}
