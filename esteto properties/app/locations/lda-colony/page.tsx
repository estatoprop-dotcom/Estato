import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in LDA Colony Lucknow | Government Developed | Estato',
  description: 'Find properties in LDA Colony, Lucknow. Buy/rent affordable flats, houses, plots in government developed colonies. Multiple LDA schemes available.',
  keywords: 'property lda colony, flats in lda colony lucknow, lda scheme lucknow, plot in lda colony, house for sale lda colony',
}

export default function LDAColonyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span><Link href="/locations">Locations</Link><span>/</span><span className="text-white">LDA Colony</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Property in LDA Colony – Government Developed Housing</h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">LDA (Lucknow Development Authority) colonies offer affordable, well-planned housing across Lucknow. Find flats, houses, and plots in various LDA schemes.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=LDA Colony&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">🏠 Buy Property</Link>
            <Link href="/properties?area=LDA Colony&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">🔑 Rent Property</Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in LDA Colony, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">500+</div><div className="text-gray-600">Properties</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹3,000</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹4,000</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.4★</div><div className="text-gray-600">Rating</div></div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About LDA Colonies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">LDA (Lucknow Development Authority) has developed numerous residential colonies across Lucknow to provide affordable housing to middle-class families.</p>
              <p className="text-gray-600 mb-4">Major LDA colonies include Ashiyana, Vrindavan Yojna, Vikas Nagar, Jankipuram, and many sector-based developments. These colonies feature planned layouts, parks, and community facilities.</p>
              <p className="text-gray-600">LDA properties are known for clear titles, government backing, and affordable prices compared to private developments.</p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 LDA Benefits</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Government Developed</li>
                <li>✅ Clear Property Titles</li>
                <li>✅ Planned Infrastructure</li>
                <li>✅ Affordable Pricing</li>
                <li>✅ Parks & Community Spaces</li>
                <li>✅ Multiple Locations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Major LDA Colonies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {['Ashiyana', 'Vrindavan Yojna', 'Vikas Nagar', 'Jankipuram', 'Gomti Nagar', 'Aliganj', 'Rajajipuram', 'Mahanagar', 'Indira Nagar', 'Nirala Nagar'].map((colony, i) => (
              <Link key={i} href={`/locations/${colony.toLowerCase().replace(/\s+/g, '-')}`} className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center">{colony}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in LDA Colonies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '1 BHK Flats', price: '₹10-18 Lakh', rent: '₹5,000-8,000/mo' },
              { type: '2 BHK Flats', price: '₹18-35 Lakh', rent: '₹8,000-14,000/mo' },
              { type: '3 BHK Flats', price: '₹35-55 Lakh', rent: '₹14,000-22,000/mo' },
              { type: 'Independent Houses', price: '₹40-80 Lakh', rent: '₹15,000-30,000/mo' },
              { type: 'Plots', price: '₹2,500-5,000/sqft', rent: '-' },
              { type: 'Builder Floors', price: '₹25-45 Lakh', rent: '₹10,000-18,000/mo' },
              { type: 'PG/Rooms', price: '-', rent: '₹3,000-6,000/mo' },
              { type: 'Shops', price: '₹12-35 Lakh', rent: '₹8,000-25,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=LDA Colony&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
                <h3 className="font-semibold text-gray-800">{item.type}</h3>
                <p className="text-sm text-primary-600">Buy: {item.price}</p>
                <p className="text-sm text-gray-500">Rent: {item.rent}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Find Property in LDA Colonies</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=LDA" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">View All Properties</Link>
            <a href="https://wa.me/919872364476" className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>
    </div>
  )
}
