'use client'

import { NeighborhoodInsights } from '@/components/features'

interface PageProps {
  params: { locality: string }
}

export default function NeighborhoodPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <div className="container-custom py-12">
        <NeighborhoodInsights locality={params.locality} />
      </div>
    </div>
  )
}
