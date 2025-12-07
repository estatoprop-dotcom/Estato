import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Route, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property on Sitapur Road Lucknow | Near BBD University | Estato',
  description: 'Find properties on Sitapur Road, Lucknow near BBD University. Buy/rent flats, PG, commercial spaces. Developing corridor with affordable options.',
  keywords: 'property sitapur road, flats on sitapur road lucknow, pg near bbd university, commercial property sitapur road, jankipuram sitapur road',
}

export default function SitapurRoadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span><Link href="/locations">Locations</Link><span>/</span><span className="text-white">Sitapur Road</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Property on Sitapur Road – Near BBD University</h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">Sitapur Road is a developing corridor in North Lucknow, home to BBD University and affordable housing options. Find flats, PG, and commercial spaces.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Sitapur Road&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">🏠 Buy Property</Link>
            <Link href="/properties?area=Sitapur Road&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">🔑 Rent Property</Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property on Sitapur Road, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">180+</div><div className="text-gray-600">Properties</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹2,500</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹3,200</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.2★</div><div className="text-gray-600">Rating</div></div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Sitapur Road</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">Sitapur Road connects Lucknow to Sitapur district and is a rapidly developing corridor in North Lucknow. It passes through Jankipuram and is home to BBD University and other educational institutions.</p>
              <p className="text-gray-600 mb-4">The area offers the most affordable property prices in Lucknow, making it popular among students, first-time buyers, and investors looking for high appreciation potential.</p>
              <p className="text-gray-600">With ongoing infrastructure development and metro expansion plans, Sitapur Road is emerging as a promising real estate destination.</p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ BBD University</li>
                <li>✅ Through Jankipuram</li>
                <li>✅ Most Affordable Area</li>
                <li>✅ Developing Corridor</li>
                <li>✅ Student Hub</li>
                <li>✅ High Growth Potential</li>
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
              { type: '1 BHK Flats', price: '₹8-15 Lakh', rent: '₹4,000-7,000/mo' },
              { type: '2 BHK Flats', price: '₹15-28 Lakh', rent: '₹7,000-11,000/mo' },
              { type: '3 BHK Flats', price: '₹28-45 Lakh', rent: '₹11,000-16,000/mo' },
              { type: 'PG/Hostels', price: '-', rent: '₹2,500-5,500/mo' },
              { type: 'Plots', price: '₹2,000-3,500/sqft', rent: '-' },
              { type: 'Independent Houses', price: '₹35-70 Lakh', rent: '₹12,000-22,000/mo' },
              { type: 'Shops', price: '₹10-30 Lakh', rent: '₹6,000-20,000/mo' },
              { type: 'Commercial', price: '₹20-60 Lakh', rent: '₹12,000-35,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Sitapur Road&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
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
            {['Jankipuram', 'BBD University', 'Jankipuram Extension', 'Kursi Road', 'Madiyaon', 'Dubagga', 'Bakshi Ka Talab', 'Mohanlalganj', 'IIM Road', 'Polytechnic'].map((loc, i) => (
              <Link key={i} href={`/locations/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center">{loc}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Find Affordable Property on Sitapur Road</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Sitapur Road" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">View All Properties</Link>
            <a href="https://wa.me/919872364476" className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Nearby Areas</h2>
          <div className="flex flex-wrap gap-3">
            {['Jankipuram', 'Aliganj', 'Kursi Road', 'Vikas Nagar', 'Mahanagar', 'Gomti Nagar'].map((loc, i) => (
              <Link key={i} href={`/locations/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition">{loc}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
