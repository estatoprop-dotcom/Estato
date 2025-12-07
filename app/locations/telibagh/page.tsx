import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Telibagh Lucknow | Emerging Residential Area | Estato',
  description: 'Find properties in Telibagh, Lucknow emerging residential area. Buy/rent affordable flats, houses, plots. Growing infrastructure with new developments.',
  keywords: 'property telibagh, flats in telibagh lucknow, house for sale telibagh, plot in telibagh, rent in telibagh, telibagh colony',
}

export default function TelibaghPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Telibagh</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Telibagh – Emerging Residential Hub
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Telibagh is an emerging residential area in South Lucknow with affordable housing options. Find flats, houses, and plots with excellent growth potential.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Telibagh&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Telibagh&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Telibagh, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              💬 WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">200+</div><div className="text-gray-600">Properties Listed</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹2,800</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹3,800</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.3★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Telibagh, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Telibagh is a rapidly developing residential area in South Lucknow, located near Raebareli Road. It has emerged as an affordable alternative to premium areas like Gomti Nagar and Ashiyana.
              </p>
              <p className="text-gray-600 mb-4">
                The area is witnessing significant infrastructure development with new residential projects, schools, and commercial establishments. It's popular among first-time home buyers and investors.
              </p>
              <p className="text-gray-600">
                With proximity to SGPGI Hospital and good connectivity to the city center, Telibagh offers excellent value for money with high appreciation potential.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Near Raebareli Road</li>
                <li>✅ 5 km from SGPGI Hospital</li>
                <li>✅ 12 km from Charbagh Station</li>
                <li>✅ Emerging Residential Area</li>
                <li>✅ Affordable Property Prices</li>
                <li>✅ New Developments</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Telibagh</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '1 BHK Flats', price: '₹10-18 Lakh', rent: '₹5,000-8,000/mo' },
              { type: '2 BHK Flats', price: '₹18-32 Lakh', rent: '₹8,000-12,000/mo' },
              { type: '3 BHK Flats', price: '₹32-50 Lakh', rent: '₹12,000-18,000/mo' },
              { type: 'Independent Houses', price: '₹40-80 Lakh', rent: '₹15,000-28,000/mo' },
              { type: 'Plots', price: '₹2,500-4,000/sqft', rent: '-' },
              { type: 'Builder Floors', price: '₹25-45 Lakh', rent: '₹10,000-16,000/mo' },
              { type: 'PG/Rooms', price: '-', rent: '₹3,000-5,500/mo' },
              { type: 'Shops', price: '₹12-35 Lakh', rent: '₹8,000-22,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Telibagh&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
                <h3 className="font-semibold text-gray-800">{item.type}</h3>
                <p className="text-sm text-primary-600">Buy: {item.price}</p>
                <p className="text-sm text-gray-500">Rent: {item.rent}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-localities */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Areas in Telibagh</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              'Telibagh Main', 'Balaji Vihar', 'Shiv Vihar', 'Krishna Nagar', 'Ram Nagar',
              'Gayatri Nagar', 'Hanuman Nagar', 'Durga Vihar', 'Lakshmi Nagar', 'Saket Nagar'
            ].map((area, i) => (
              <Link key={i} href={`/locations/telibagh-${area.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center">
                {area}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Landmarks */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Nearby Landmarks & Amenities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><School className="w-5 h-5 text-primary-600" /> Schools</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Local Schools</li>
                <li>• CMS (nearby)</li>
                <li>• Public Schools</li>
                <li>• Play Schools</li>
                <li>• Coaching Centers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Cross className="w-5 h-5 text-primary-600" /> Hospitals</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• SGPGI (5 km)</li>
                <li>• RMLIMS (8 km)</li>
                <li>• Local Clinics</li>
                <li>• Nursing Homes</li>
                <li>• Pharmacies</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary-600" /> Shopping</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Local Markets</li>
                <li>• Vegetable Markets</li>
                <li>• Grocery Stores</li>
                <li>• Banks & ATMs</li>
                <li>• Petrol Pumps</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Telibagh?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle, title: 'Affordable', desc: 'Budget-friendly prices' },
              { icon: TrendingUp, title: 'High Growth', desc: 'Rapid development' },
              { icon: Cross, title: 'Near SGPGI', desc: 'Top hospital nearby' },
              { icon: Home, title: 'New Projects', desc: 'Modern constructions' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <item.icon className="w-10 h-10 text-primary-600 mb-3" />
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Find Affordable Property in Telibagh</h2>
          <p className="text-primary-100 mb-8">Contact us for budget-friendly listings</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Telibagh" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              View All Properties
            </Link>
            <a href="https://wa.me/919872364476" className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              💬 WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Related Locations */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Nearby Areas</h2>
          <div className="flex flex-wrap gap-3">
            {['Ashiyana', 'Vrindavan Yojna', 'Raebareli Road', 'Sushant Golf City', 'Gomti Nagar', 'Sultanpur Road'].map((loc, i) => (
              <Link key={i} href={`/locations/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition">
                {loc}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
