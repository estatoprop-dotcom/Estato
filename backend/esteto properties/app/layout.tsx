import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import DemoBanner from '@/components/DemoBanner'
import StructuredData from './structured-data'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Estato - Premium Properties for Sale & Rent in Lucknow | #1 Real Estate Platform',
  description: 'Find luxury apartments, independent houses, villas & commercial properties in Lucknow. Explore Gomti Nagar, Hazratganj, Indira Nagar, Aliganj & prime locations. Best property deals in Lucknow with verified listings.',
  keywords: 'Lucknow properties, real estate Lucknow, apartments Lucknow, houses for sale Lucknow, rental properties Lucknow, Gomti Nagar properties, Hazratganj real estate, Indira Nagar apartments, Aliganj houses, Lucknow commercial properties, property dealers Lucknow, real estate agents Lucknow, buy property Lucknow, rent apartment Lucknow, luxury villas Lucknow, independent houses Lucknow, property investment Lucknow, real estate platform Lucknow',
  authors: [{ name: 'Estato - Lucknow Real Estate' }],
  creator: 'Estato Real Estate Platform',
  publisher: 'Estato Properties Lucknow',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://estato.com'
  },
  openGraph: {
    title: 'Estato - #1 Real Estate Platform in Lucknow | Premium Properties',
    description: 'Discover premium apartments, houses & villas in Lucknow. Best property deals in Gomti Nagar, Hazratganj, Indira Nagar. Verified listings with EMI calculator.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Estato - Lucknow Real Estate',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Estato - Premium Properties in Lucknow'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estato - Premium Properties in Lucknow | Real Estate Platform',
    description: 'Find luxury apartments & houses in Lucknow. Gomti Nagar, Hazratganj, Indira Nagar properties with EMI calculator.',
    images: ['/twitter-image.jpg']
  },
  verification: {
    google: 'your-google-verification-code'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <StructuredData />
      </head>
      <body className={`${poppins.className} min-h-screen flex flex-col bg-gray-50 text-crisp`}>
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
