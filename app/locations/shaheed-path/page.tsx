import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Route } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property on Shaheed Path Lucknow | Ring Road | Estato',
  description: 'Find properties on Shaheed Path (Ring Road), Lucknow. Buy/rent premium flats, villas near Lulu Mall, Phoenix Palassio. Prime developing corridor.',
  keywords: 'property shaheed path, flats on ring road lucknow, near lulu mall property, shaheed path lucknow, gomti nagar extension shaheed path',
}

export default function ShaheedPathPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span><Link href="/locations">Locations</Link><span>/</span><span className="text-white">Shaheed Path</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Property on Shaheed Path – Lucknow's Premium Ring Road</h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">Shaheed Path (Ring Road) is Lucknow's most premium developing corridor, home to Lulu Mall, Phoenix Palassio, and Ekana Stadium. Find luxury properties with excellent connectivity.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Shaheed Path&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">🏠 Buy Property</Link>
            <Link href="/properties?area=Shaheed Path&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">🔑 Rent Property</Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property on Shaheed Path, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">250+</div><div className="text-gray-600">Properties</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹5,500</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹7,500</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.9★</div><div className="text-gray-600">Rating</div></div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Shaheed Path</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">Shaheed Path is Lucknow's outer ring road, connecting major areas and bypassing the city center. It has emerged as the most premium real estate corridor in Lucknow.</p>
              <p className="text-gray-600 mb-4">The road is home to Lulu Mall (India's largest), Phoenix Palassio, Ekana International Cricket Stadium, and numerous premium residential projects. It connects Gomti Nagar Extension, Sushant Golf City, and other upscale localities.</p>
              <p className="text-gray-600">Properties on Shaheed Path have seen the highest appreciation in Lucknow, making it ideal for both living and investment.</p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Lulu Mall (India's Largest)</li>
                <li>✅ Phoenix Palassio</li>
                <li>✅ Ekana Stadium</li>
                <li>✅ Ring Road Connectivity</li>
                <li>✅ Premium Projects</li>
                <li>✅ Highest Appreciation</li>
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
              { type: '3 BHK Flats', price: '₹65-95 Lakh', rent: '₹25,000-40,000/mo' },
              { type: '4 BHK Flats', price: '₹95 Lakh-1.8 Cr', rent: '₹40,000-70,000/mo' },
              { type: 'Penthouses', price: '₹1.5-4 Crore', rent: '₹70,000-1.5 Lakh/mo' },
              { type: 'Villas', price: '₹1.5-5 Crore', rent: '₹60,000-1.5 Lakh/mo' },
              { type: 'Plots', price: '₹7,000-12,000/sqft', rent: '-' },
              { type: 'Commercial', price: '₹50 Lakh-3 Cr', rent: '₹35,000-1.5 Lakh/mo' },
              { type: 'Showrooms', price: '₹1-8 Crore', rent: '₹50,000-3 Lakh/mo' },
              { type: 'Offices', price: '₹40 Lakh-2 Cr', rent: '₹30,000-1 Lakh/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Shaheed Path&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
                <h3 className="font-semibold text-gray-800">{item.type}</h3>
                <p className="text-sm text-primary-600">Buy: {item.price}</p>
                <p className="text-sm text-gray-500">Rent: {item.rent}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Key Landmarks</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {['Lulu Mall', 'Phoenix Palassio', 'Ekana Stadium', 'Gomti Nagar Extension', 'Sushant Golf City', 'IT City', 'Medanta Hospital', 'DPS Eldeco', 'Amity University', 'Lucknow Airport'].map((loc, i) => (
              <div key={i} className="bg-white px-4 py-3 rounded-lg border border-gray-200 text-center">{loc}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Find Premium Property on Shaheed Path</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Shaheed Path" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">View All Properties</Link>
            <a href="https://wa.me/919872364476" className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Nearby Areas</h2>
          <div className="flex flex-wrap gap-3">
            {['Gomti Nagar Extension', 'Sushant Golf City', 'Chinhat', 'Faizabad Road', 'Sultanpur Road', 'Vrindavan Yojna'].map((loc, i) => (
              <Link key={i} href={`/locations/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition">{loc}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
