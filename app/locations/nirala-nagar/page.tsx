import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Nirala Nagar Lucknow | Residential Area | Estato',
  description: 'Find properties in Nirala Nagar, Lucknow. Buy/rent flats, houses in peaceful residential area near Mahanagar. Family-friendly locality.',
  keywords: 'property nirala nagar, flats in nirala nagar lucknow, house for rent nirala nagar, 2bhk nirala nagar, pg in nirala nagar',
}

export default function NiralaNagarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span><Link href="/locations">Locations</Link><span>/</span><span className="text-white">Nirala Nagar</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Property in Nirala Nagar – Peaceful Residential Area</h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">Nirala Nagar is a well-established residential colony near Mahanagar. Find affordable flats, houses, and PG accommodations in this family-friendly locality.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Nirala Nagar&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">🏠 Buy Property</Link>
            <Link href="/properties?area=Nirala Nagar&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">🔑 Rent Property</Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Nirala Nagar, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">120+</div><div className="text-gray-600">Properties</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹3,500</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹4,800</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.5★</div><div className="text-gray-600">Rating</div></div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Nirala Nagar</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">Nirala Nagar is a peaceful residential colony located near Mahanagar and Vikas Nagar. Named after the famous Hindi poet Suryakant Tripathi 'Nirala', it's known for its calm environment and community feel.</p>
              <p className="text-gray-600 mb-4">The area offers a mix of independent houses, builder floors, and apartments at affordable prices. It's well-connected to central Lucknow and has good schools and markets nearby.</p>
              <p className="text-gray-600">Ideal for families and working professionals looking for peaceful living with urban conveniences.</p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Near Mahanagar</li>
                <li>✅ Peaceful Environment</li>
                <li>✅ 8 km from Charbagh</li>
                <li>✅ Good Schools</li>
                <li>✅ Affordable Housing</li>
                <li>✅ Family-Friendly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '1 BHK Flats', price: '₹12-20 Lakh', rent: '₹6,000-9,000/mo' },
              { type: '2 BHK Flats', price: '₹22-38 Lakh', rent: '₹9,000-14,000/mo' },
              { type: '3 BHK Flats', price: '₹38-60 Lakh', rent: '₹14,000-22,000/mo' },
              { type: 'Independent Houses', price: '₹50-90 Lakh', rent: '₹18,000-32,000/mo' },
              { type: 'Builder Floors', price: '₹28-50 Lakh', rent: '₹12,000-20,000/mo' },
              { type: 'PG/Rooms', price: '-', rent: '₹3,500-6,500/mo' },
              { type: 'Plots', price: '₹3,500-5,000/sqft', rent: '-' },
              { type: 'Shops', price: '₹15-40 Lakh', rent: '₹10,000-28,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Nirala Nagar&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Property in Nirala Nagar</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Nirala Nagar" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">View All Properties</Link>
            <a href="https://wa.me/919872364476" className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Nearby Areas</h2>
          <div className="flex flex-wrap gap-3">
            {['Mahanagar', 'Vikas Nagar', 'Aliganj', 'Indira Nagar', 'Gomti Nagar', 'Hazratganj'].map((loc, i) => (
              <Link key={i} href={`/locations/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition">{loc}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
