import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Landmark, Scale } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Kaiserbagh Lucknow | Heritage Area | Estato',
  description: 'Find properties in Kaiserbagh, Lucknow heritage area near High Court. Buy/rent flats, offices, commercial spaces in prestigious central location.',
  keywords: 'property kaiserbagh, flats in kaiserbagh lucknow, office near high court lucknow, commercial property kaiserbagh, heritage property lucknow',
}

export default function KaiserbaghPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Kaiserbagh</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Kaiserbagh – Heritage Area Near High Court
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Kaiserbagh is a prestigious heritage area in central Lucknow, home to the High Court and historic Kaiserbagh Palace. Find offices, flats, and commercial spaces in this prime location.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Kaiserbagh&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Kaiserbagh&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Kaiserbagh, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              💬 WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">120+</div><div className="text-gray-600">Properties Listed</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹100</div><div className="text-gray-600">Avg. Office Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹12,000</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.7★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Kaiserbagh, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Kaiserbagh (also spelled Qaiserbagh) is a historic area built by Nawab Wajid Ali Shah in the 1850s. It was once the royal palace complex and is now home to the Lucknow High Court and various government offices.
              </p>
              <p className="text-gray-600 mb-4">
                The area retains its heritage charm with colonial-era buildings, wide roads, and tree-lined avenues. It's a prestigious address for law firms, advocates, and professionals working near the High Court.
              </p>
              <p className="text-gray-600">
                Kaiserbagh is centrally located between Hazratganj and Aminabad, offering excellent connectivity and a mix of residential and commercial properties.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Lucknow High Court</li>
                <li>✅ Historic Kaiserbagh Palace</li>
                <li>✅ Central Lucknow Location</li>
                <li>✅ Near Hazratganj (1 km)</li>
                <li>✅ Government Offices</li>
                <li>✅ Heritage Architecture</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Kaiserbagh</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'Offices', price: '₹40 Lakh-2 Cr', rent: '₹20,000-80,000/mo' },
              { type: 'Law Chambers', price: '₹30 Lakh-1.5 Cr', rent: '₹15,000-60,000/mo' },
              { type: 'Commercial Space', price: '₹50 Lakh-3 Cr', rent: '₹30,000-1.2 Lakh/mo' },
              { type: 'Shops', price: '₹25 Lakh-1.5 Cr', rent: '₹15,000-70,000/mo' },
              { type: '2 BHK Flats', price: '₹40-65 Lakh', rent: '₹15,000-25,000/mo' },
              { type: '3 BHK Flats', price: '₹65 Lakh-1.2 Cr', rent: '₹25,000-40,000/mo' },
              { type: 'Heritage Homes', price: '₹1-5 Crore', rent: 'On Request' },
              { type: 'PG/Rooms', price: '-', rent: '₹5,000-10,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Kaiserbagh&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Areas in Kaiserbagh</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              'High Court Area', 'Kaiserbagh Palace', 'Baradari', 'Lalbagh', 'Husainganj',
              'Naka Hindola', 'Qaiserbagh Chauraha', 'Begum Hazrat Mahal Park', 'GPO Area', 'Vidhan Sabha'
            ].map((area, i) => (
              <Link key={i} href={`/locations/${area.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center">
                {area}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What's in Kaiserbagh */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">What's in Kaiserbagh</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Scale className="w-5 h-5 text-primary-600" /> Legal Hub</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Lucknow High Court</li>
                <li>• District Courts</li>
                <li>• Law Chambers</li>
                <li>• Advocate Offices</li>
                <li>• Legal Services</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Landmark className="w-5 h-5 text-primary-600" /> Heritage Sites</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Kaiserbagh Palace</li>
                <li>• Baradari</li>
                <li>• Begum Hazrat Mahal Park</li>
                <li>• Colonial Buildings</li>
                <li>• Historic Gardens</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Building2 className="w-5 h-5 text-primary-600" /> Government</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Government Offices</li>
                <li>• Banks</li>
                <li>• Post Office</li>
                <li>• Police Station</li>
                <li>• Public Services</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Kaiserbagh?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Scale, title: 'Legal Hub', desc: 'Near High Court' },
              { icon: Landmark, title: 'Heritage Value', desc: 'Historic Nawabi area' },
              { icon: MapPin, title: 'Central Location', desc: 'Heart of Lucknow' },
              { icon: Star, title: 'Prestigious Address', desc: 'Premium location' },
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Property in Kaiserbagh</h2>
          <p className="text-primary-100 mb-8">Contact us for offices & commercial spaces near High Court</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Kaiserbagh" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Hazratganj', 'Aminabad', 'Chowk', 'Husainganj', 'Charbagh', 'Naka Hindola'].map((loc, i) => (
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
