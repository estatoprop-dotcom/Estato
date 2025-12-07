import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import DemoBanner from '@/components/DemoBanner'
import StructuredData from './structured-data'
import { ChatWidget } from '@/components/features'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://estatoprop.com'),
  title: {
    default: 'EstatoProp - #1 Property Portal in Lucknow | Buy, Sell, Rent Properties',
    template: '%s | EstatoProp - Lucknow Real Estate'
  },
  description: 'EstatoProp.com - Lucknow\'s #1 Real Estate Platform. Find 5000+ verified properties for sale & rent in Gomti Nagar, Hazratganj, Indira Nagar, Aliganj. Flats, Houses, Villas, Plots, Commercial. Best property deals with 0% brokerage. Call 9872364476.',
  keywords: [
    // Primary Keywords (High Volume)
    'property in lucknow', 'lucknow property', 'real estate lucknow', 'lucknow real estate',
    'flats in lucknow', 'apartments in lucknow', 'house for sale in lucknow', 'property for sale in lucknow',
    'rent house in lucknow', 'flat for rent in lucknow', 'pg in lucknow', '2 bhk flat in lucknow',
    '3 bhk flat in lucknow', 'villa in lucknow', 'plot in lucknow', 'commercial property lucknow',
    // Location Keywords (High Intent)
    'property in gomti nagar', 'flat in gomti nagar', 'house in hazratganj', 'property in indira nagar',
    'flat in aliganj', 'property in jankipuram', 'house in mahanagar', 'flat in ashiyana',
    'property in sushant golf city', 'flat in vrindavan yojna', 'house in rajajipuram',
    // Long-tail Keywords
    'best property dealer in lucknow', 'top real estate agent lucknow', 'property rates in lucknow',
    'lucknow property price', 'affordable flats in lucknow', 'luxury apartments lucknow',
    'new projects in lucknow', 'under construction flats lucknow', 'ready to move flats lucknow',
    // Brand Keywords
    'estatoprop', 'estato prop', 'estatoprop lucknow', 'estatoprop.com'
  ],
  authors: [{ name: 'EstatoProp - Lucknow Real Estate', url: 'https://estatoprop.com' }],
  creator: 'EstatoProp Real Estate Platform',
  publisher: 'EstatoProp.com',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://estatoprop.com',
    languages: {
      'en-IN': 'https://estatoprop.com',
      'hi-IN': 'https://estatoprop.com/hi'
    }
  },
  openGraph: {
    title: 'EstatoProp - #1 Property Portal in Lucknow | 5000+ Verified Properties',
    description: 'Find your dream property in Lucknow. 5000+ verified flats, houses, villas, plots for sale & rent. Gomti Nagar, Hazratganj, Indira Nagar. 0% Brokerage. Call Now!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://estatoprop.com',
    siteName: 'EstatoProp - Lucknow Real Estate',
    images: [
      {
        url: 'https://estatoprop.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EstatoProp - #1 Property Portal in Lucknow',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@estatoprop',
    creator: '@estatoprop',
    title: 'EstatoProp - #1 Property Portal in Lucknow',
    description: 'Find 5000+ verified properties in Lucknow. Flats, Houses, Villas for Sale & Rent. 0% Brokerage!',
    images: ['https://estatoprop.com/twitter-image.jpg']
  },
  verification: {
    google: 'your-google-search-console-verification-code',
    yandex: 'your-yandex-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code'
    }
  },
  category: 'Real Estate',
  classification: 'Property Portal'
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
        <ChatWidget />
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
