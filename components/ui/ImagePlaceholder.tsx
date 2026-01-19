'use client'

import { Home } from 'lucide-react'

interface ImagePlaceholderProps {
  className?: string
}

export default function ImagePlaceholder({ className = '' }: ImagePlaceholderProps) {
  return (
    <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
      <Home className="w-16 h-16 text-gray-400" />
    </div>
  )
}
