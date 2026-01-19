import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import DemoBanner from '@/components/DemoBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Esteto Properties - Find Your Dream Home',
  description: 'Discover premium properties for sale and rent. Modern real estate platform with advanced search and filters.',
  keywords: 'real estate, properties, rent, buy, apartments, houses, villas',
  authors: [{ name: 'Esteto Properties' }],
  openGraph: {
    title: 'Esteto Properties - Find Your Dream Home',
    description: 'Discover premium properties for sale and rent',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Esteto Properties - Find Your Dream Home',
    description: 'Discover premium properties for sale and rent',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        <DemoBanner />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
