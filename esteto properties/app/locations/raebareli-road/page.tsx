import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Route } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property on Raebareli Road Lucknow | Near SGPGI | Estato',
  description: 'Find properties on Raebareli Road, Lucknow near SGPGI Hospital. Buy/rent flats, houses, commercial spaces. Developing corridor with medical hub.',
  keywords: 'property raebareli road, flats near sgpgi lucknow, house on raebareli road, commercial property raebareli road, ashiyana raebareli road',
}

export default function RaebareliRoadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span><Link href="/locations">Locations</Link><span>/</span><span className="text-white">Raebareli Road</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Property on Raebareli Road – Near SGPGI Hospital</h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">Raebareli Road is a major corridor in South Lucknow, home to SGPGI Hospital and developing residential areas. Find flats, houses, and commercial spaces.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Raebareli Road&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">🏠 Buy Property</Link>
            <Link href="/properties?area=Raebareli Road&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">🔑 Rent Property</Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property on Raebareli Road, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">220+</div><div className="text-gray-600">Properties</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹3,200</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹4,500</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.5★</div><div className="text-gray-600">Rating</div></div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Raebareli Road</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">Raebareli Road connects Lucknow to Raebareli district and is a developing corridor in South Lucknow. It's home to the prestigious SGPGI (Sanjay Gandhi Post Graduate Institute of Medical Sciences).</p>
              <p className="text-gray-600 mb-4">The road passes through Ashiyana, Vrindavan Yojna, and Telibagh, offering a mix of established and developing residential areas. It's popular among medical professionals and families.</p>
              <p className="text-gray-600">With SGPGI as a major landmark, the area has good healthcare facilities and is seeing rapid residential development.</p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ SGPGI Hospital</li>
                <li>✅ Through Ashiyana</li>
                <li>✅ Vrindavan Yojna</li>
                <li>✅ Medical Hub</li>
                <li>✅ Developing Area</li>
                <li>✅ Good Connectivity</li>
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
              { type: '1 BHK Flats', price: '₹12-20 Lakh', rent: '₹5,500-9,000/mo' },
              { type: '2 BHK Flats', price: '₹22-40 Lakh', rent: '₹9,000-15,000/mo' },
              { type: '3 BHK Flats', price: '₹40-65 Lakh', rent: '₹15,000-25,000/mo' },
              { type: 'Independent Houses', price: '₹50-95 Lakh', rent: '₹18,000-35,000/mo' },
              { type: 'Plots', price: '₹3,000-5,000/sqft', rent: '-' },
              { type: 'PG/Rooms', price: '-', rent: '₹4,000-7,000/mo' },
              { type: 'Shops', price: '₹15-45 Lakh', rent: '₹10,000-30,000/mo' },
              { type: 'Commercial', price: '₹25-80 Lakh', rent: '₹15,000-50,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Raebareli Road&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Key Locations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {['SGPGI', 'Ashiyana', 'Vrindavan Yojna', 'Telibagh', 'RMLIMS', 'Sushant Golf City', 'Sultanpur Road', 'Gomti Nagar', 'Alambagh', 'Charbagh'].map((loc, i) => (
              <Link key={i} href={`/locations/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center">{loc}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Find Property on Raebareli Road</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Raebareli Road" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">View All Properties</Link>
            <a href="https://wa.me/919872364476" className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Nearby Areas</h2>
          <div className="flex flex-wrap gap-3">
            {['Ashiyana', 'Vrindavan Yojna', 'Telibagh', 'Gomti Nagar', 'Sushant Golf City', 'Alambagh'].map((loc, i) => (
              <Link key={i} href={`/locations/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition">{loc}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
