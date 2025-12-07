import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Trees, Trophy } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Sushant Golf City Lucknow | Premium Township | Estato',
  description: 'Find luxury properties in Sushant Golf City, Lucknow. Buy/rent premium villas, 3BHK, 4BHK flats in gated township with golf course, clubhouse amenities.',
  keywords: 'property sushant golf city, villa sushant golf city, 4bhk sushant golf city lucknow, luxury flats sushant golf city, ansal api lucknow',
}

export default function SushantGolfCityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Sushant Golf City</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Sushant Golf City – Premium Gated Township
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Sushant Golf City is Lucknow's most prestigious gated township by Ansal API. Find luxury villas, premium apartments, and plots with world-class amenities including a golf course.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Sushant Golf City&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Sushant Golf City&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Sushant Golf City, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              💬 WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">180+</div><div className="text-gray-600">Properties Listed</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹5,500</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹7,000</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.9★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Sushant Golf City, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Sushant Golf City is a premium integrated township developed by Ansal API, spread over 6,000 acres. It's Lucknow's most exclusive address, featuring a 9-hole golf course, clubhouse, and world-class infrastructure.
              </p>
              <p className="text-gray-600 mb-4">
                The township is divided into multiple phases and sectors, offering luxury villas, premium apartments, and residential plots. It's home to Lucknow's elite, including business owners, doctors, and senior professionals.
              </p>
              <p className="text-gray-600">
                With 24x7 security, landscaped gardens, sports facilities, and proximity to Lulu Mall and Phoenix Palassio, Sushant Golf City offers the best of luxury living in Lucknow.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ 9-Hole Golf Course</li>
                <li>✅ Near Lulu Mall (5 km)</li>
                <li>✅ Near Phoenix Palassio (4 km)</li>
                <li>✅ 15 km from Lucknow Airport</li>
                <li>✅ Gated Township with Security</li>
                <li>✅ Premium Clubhouse & Amenities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Sushant Golf City</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '3 BHK Flats', price: '₹70-95 Lakh', rent: '₹25,000-35,000/mo' },
              { type: '4 BHK Flats', price: '₹95 Lakh-1.5 Cr', rent: '₹35,000-55,000/mo' },
              { type: 'Penthouses', price: '₹1.5-3 Crore', rent: '₹60,000-1.2 Lakh/mo' },
              { type: 'Villas', price: '₹1.5-5 Crore', rent: '₹50,000-1.5 Lakh/mo' },
              { type: 'Independent Houses', price: '₹1-3 Crore', rent: '₹40,000-80,000/mo' },
              { type: 'Plots', price: '₹6,000-10,000/sqft', rent: '-' },
              { type: 'Commercial', price: '₹50 Lakh-2 Cr', rent: '₹30,000-1 Lakh/mo' },
              { type: 'Farmhouses', price: '₹2-8 Crore', rent: 'On Request' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Sushant Golf City&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
                <h3 className="font-semibold text-gray-800">{item.type}</h3>
                <p className="text-sm text-primary-600">Buy: {item.price}</p>
                <p className="text-sm text-gray-500">Rent: {item.rent}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Phases & Sectors */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Phases & Sectors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              'Phase 1', 'Phase 2', 'Phase 3', 'Zeta 1', 'Zeta 2',
              'Alpha 1', 'Alpha 2', 'Beta 1', 'Beta 2', 'Gamma 1',
              'Golf Avenue', 'Palm Drive', 'Maple Heights', 'Cedar Lane', 'Oak View'
            ].map((sector, i) => (
              <Link key={i} href={`/locations/sushant-golf-city-${sector.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center">
                {sector}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">World-Class Amenities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Trophy className="w-5 h-5 text-primary-600" /> Sports & Recreation</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 9-Hole Golf Course</li>
                <li>• Tennis Courts</li>
                <li>• Swimming Pool</li>
                <li>• Gymnasium</li>
                <li>• Jogging Tracks</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Building2 className="w-5 h-5 text-primary-600" /> Clubhouse</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Premium Clubhouse</li>
                <li>• Banquet Hall</li>
                <li>• Restaurant & Cafe</li>
                <li>• Spa & Salon</li>
                <li>• Kids Play Area</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Trees className="w-5 h-5 text-primary-600" /> Environment</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Landscaped Gardens</li>
                <li>• Wide Roads</li>
                <li>• 24x7 Security</li>
                <li>• Power Backup</li>
                <li>• Water Supply</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Nearby Attractions</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { name: 'Lulu Mall', distance: '5 km' },
              { name: 'Phoenix Palassio', distance: '4 km' },
              { name: 'Ekana Stadium', distance: '6 km' },
              { name: 'Lucknow Airport', distance: '15 km' },
              { name: 'Gomti Nagar', distance: '8 km' },
              { name: 'Hazratganj', distance: '12 km' },
              { name: 'CMS School', distance: '3 km' },
              { name: 'Medanta Hospital', distance: '7 km' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-primary-600">{item.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Sushant Golf City?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Trophy, title: 'Golf Course', desc: '9-hole championship course' },
              { icon: Star, title: 'Premium Address', desc: 'Most prestigious locality' },
              { icon: TrendingUp, title: 'High Appreciation', desc: '12-18% yearly growth' },
              { icon: CheckCircle, title: 'Gated Security', desc: '24x7 security & CCTV' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Luxury Property in Sushant Golf City</h2>
          <p className="text-primary-100 mb-8">Contact us for premium villas and apartments</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Sushant Golf City" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Gomti Nagar Extension', 'Shaheed Path', 'Vrindavan Yojna', 'Telibagh', 'Chinhat', 'Sultanpur Road'].map((loc, i) => (
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
