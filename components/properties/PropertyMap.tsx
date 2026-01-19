'use client'

import { useEffect, useRef } from 'react'

interface PropertyMapProps {
  lat: number
  lng: number
  title: string
}

export default function PropertyMap({ lat, lng, title }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current || !process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      return
    }

    const loadMap = async () => {
      try {
        const { Loader } = await import('@googlemaps/js-api-loader')
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
          version: 'weekly',
        })

        const { Map } = await loader.importLibrary('maps')
        const { Marker } = await loader.importLibrary('marker')

        const map = new Map(mapRef.current!, {
          center: { lat, lng },
          zoom: 15,
          mapTypeControl: false,
          streetViewControl: false,
        })

        new Marker({
          position: { lat, lng },
          map,
          title,
        })
      } catch (error) {
        console.error('Error loading map:', error)
      }
    }

    loadMap()
  }, [lat, lng, title])

  return (
    <div
      ref={mapRef}
      className="w-full h-96 rounded-lg overflow-hidden border border-gray-200"
    />
  )
}
