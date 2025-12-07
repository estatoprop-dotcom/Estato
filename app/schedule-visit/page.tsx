'use client'

import { SiteVisitScheduler } from '@/components/features'

export default function ScheduleVisitPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          <SiteVisitScheduler />
        </div>
      </div>
    </div>
  )
}
