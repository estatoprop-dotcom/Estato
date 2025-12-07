'use client'

import { Wishlist } from '@/components/features'

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="container-custom py-12">
        <Wishlist />
      </div>
    </div>
  )
}
