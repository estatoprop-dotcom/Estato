import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Store } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property Near Lulu Mall Lucknow | Premium Location | Estato',
  description: 'Find properties near Lulu Mall, Lucknow. Buy/rent premium flats, villas, commercial spaces near India largest mall. Best investment location.',
  keywords: 'property near lulu mall, flats near lulu mall lucknow, house near lulu mall, commercial property near lulu mall, gomti nagar extension lulu mall',
}

export default function NearLuluMallPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span><Link href="/locations">Locations</Link><span>/</span><span className="text-white">Near Lulu Mall</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Property Near Lulu Mall – India's Largest Mall</h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">Find premium properties near Lulu Mall, India's largest shopping mall. Best location for investment with highest appreciation potential in Lucknow.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Lulu Mall&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">🏠 Buy Property</Link>
            <Link href="/properties?area=Lulu Mall&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">🔑 Rent Property</Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property near Lulu Mall, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">200+</div><div className="text-gray-600">Properties</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹6,000</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹8,000</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">5.0★</div><div className="text-gray-600">Rating</div></div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Lulu Mall Area</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">Lulu Mall Lucknow is India's largest shopping mall, spread over 22 lakh sq ft. Located on Shaheed Path in Gomti Nagar Extension, it has transformed the surrounding area into Lucknow's most premium real estate destination.</p>
              <p className="text-gray-600 mb-4">Properties near Lulu Mall have seen 20-30% appreciation since the mall opened. The area is home to premium residential projects, hotels, restaurants, and commercial establishments.</p>
              <p className="text-gray-600">With Phoenix Palassio and Ekana Stadium also nearby, this is the most sought-after location in Lucknow for both living and investment.</p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ India's Largest Mall</li>
                <li>✅ 22 Lakh Sq Ft Area</li>
                <li>✅ 300+ Brands</li>
                <li>✅ Near Phoenix Palassio</li>
                <li>✅ Near Ekana Stadium</li>
                <li>✅ Highest Appreciation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types Near Lulu Mall</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '3 BHK Flats', price: '₹70 Lakh-1.1 Cr', rent: '₹28,000-45,000/mo' },
              { type: '4 BHK Flats', price: '₹1.1-2 Crore', rent: '₹45,000-80,000/mo' },
              { type: 'Penthouses', price: '₹2-5 Crore', rent: '₹80,000-2 Lakh/mo' },
              { type: 'Villas', price: '₹2-6 Crore', rent: '₹70,000-2 Lakh/mo' },
              { type: 'Commercial', price: '₹80 Lakh-5 Cr', rent: '₹50,000-2.5 Lakh/mo' },
              { type: 'Showrooms', price: '₹1.5-10 Crore', rent: '₹1-5 Lakh/mo' },
              { type: 'Offices', price: '₹50 Lakh-3 Cr', rent: '₹35,000-1.5 Lakh/mo' },
              { type: 'Plots', price: '₹8,000-15,000/sqft', rent: '-' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Lulu Mall&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Invest Near Lulu Mall?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Store, title: 'India\'s Largest Mall', desc: '22 lakh sq ft, 300+ brands' },
              { icon: TrendingUp, title: '20-30% Appreciation', desc: 'Highest in Lucknow' },
              { icon: Car, title: 'Ring Road Access', desc: 'Shaheed Path connectivity' },
              { icon: Star, title: 'Premium Address', desc: 'Most prestigious location' },
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

      <section className="py-12 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Find Property Near Lulu Mall</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Lulu Mall" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">View All Properties</Link>
            <a href="https://wa.me/919872364476" className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Nearby Areas</h2>
          <div className="flex flex-wrap gap-3">
            {['Gomti Nagar Extension', 'Shaheed Path', 'Sushant Golf City', 'Chinhat', 'Faizabad Road', 'Gomti Nagar'].map((loc, i) => (
              <Link key={i} href={`/locations/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition">{loc}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
