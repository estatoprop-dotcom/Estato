import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Train, Hotel } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Charbagh Lucknow | Near Railway Station | Estato',
  description: 'Find properties in Charbagh near Lucknow Railway Station. Buy/rent shops, hotels, commercial spaces. Prime location with highest footfall.',
  keywords: 'property charbagh, shop near lucknow railway station, hotel for sale charbagh, commercial property charbagh, near charbagh station',
}

export default function CharbaghPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Charbagh</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Charbagh – Near Lucknow Railway Station
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Charbagh is home to the iconic Lucknow Railway Station and is the city's busiest commercial hub. Find hotels, shops, and commercial properties with the highest footfall in Lucknow.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Charbagh&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Charbagh&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Charbagh, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
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
            <div><div className="text-3xl font-bold text-primary-600">₹120</div><div className="text-gray-600">Avg. Shop Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹12,000</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.7★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Charbagh, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Charbagh is the gateway to Lucknow, home to the magnificent Charbagh Railway Station - one of India's most beautiful railway stations built in 1923. The area sees millions of travelers annually.
              </p>
              <p className="text-gray-600 mb-4">
                The station area is surrounded by hotels, restaurants, shops, and commercial establishments catering to travelers. It's one of the most commercially valuable locations in Lucknow.
              </p>
              <p className="text-gray-600">
                For businesses targeting travelers, tourists, or requiring high visibility, Charbagh offers unmatched footfall and commercial potential.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Lucknow Railway Station</li>
                <li>✅ Metro Station Connected</li>
                <li>✅ 12 km from Airport</li>
                <li>✅ Highest Footfall Area</li>
                <li>✅ Hotels & Restaurants Hub</li>
                <li>✅ Central Location</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Charbagh</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'Hotels', price: '₹2-20 Crore', rent: '₹1-10 Lakh/mo' },
              { type: 'Guest Houses', price: '₹1-5 Crore', rent: '₹50,000-2 Lakh/mo' },
              { type: 'Shops', price: '₹30 Lakh-3 Cr', rent: '₹20,000-1.5 Lakh/mo' },
              { type: 'Showrooms', price: '₹50 Lakh-5 Cr', rent: '₹40,000-2 Lakh/mo' },
              { type: 'Restaurants', price: '₹40 Lakh-2 Cr', rent: '₹30,000-1 Lakh/mo' },
              { type: 'Offices', price: '₹35-90 Lakh', rent: '₹20,000-60,000/mo' },
              { type: 'Godowns', price: '₹40 Lakh-1.5 Cr', rent: '₹25,000-80,000/mo' },
              { type: 'Flats', price: '₹25-50 Lakh', rent: '₹10,000-20,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Charbagh&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Areas Around Charbagh</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              'Station Road', 'Subhash Marg', 'Vidhan Sabha Marg', 'Kaiserbagh', 'Naka Hindola',
              'Aminabad', 'Husainganj', 'Hazratganj', 'Alambagh', 'Daliganj'
            ].map((area, i) => (
              <Link key={i} href={`/locations/${area.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center">
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
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Train className="w-5 h-5 text-primary-600" /> Transport</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Charbagh Railway Station</li>
                <li>• Charbagh Metro Station</li>
                <li>• Bus Stands</li>
                <li>• Auto & Taxi Stands</li>
                <li>• Prepaid Taxi Booth</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Hotel className="w-5 h-5 text-primary-600" /> Hotels & Food</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Budget Hotels</li>
                <li>• Mid-Range Hotels</li>
                <li>• Restaurants</li>
                <li>• Fast Food Outlets</li>
                <li>• 24x7 Eateries</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary-600" /> Services</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Banks & ATMs</li>
                <li>• Travel Agencies</li>
                <li>• Courier Services</li>
                <li>• Medical Stores</li>
                <li>• General Stores</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Invest in Charbagh?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Train, title: 'Railway Hub', desc: 'Millions of travelers yearly' },
              { icon: TrendingUp, title: 'Highest Footfall', desc: 'Best commercial visibility' },
              { icon: Hotel, title: 'Hotel Business', desc: 'Ideal for hospitality' },
              { icon: Star, title: 'Prime Location', desc: 'Gateway to Lucknow' },
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Commercial Property in Charbagh</h2>
          <p className="text-primary-100 mb-8">Contact us for hotels, shops & commercial spaces</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Charbagh" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Hazratganj', 'Aminabad', 'Kaiserbagh', 'Alambagh', 'Husainganj', 'Naka Hindola'].map((loc, i) => (
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
