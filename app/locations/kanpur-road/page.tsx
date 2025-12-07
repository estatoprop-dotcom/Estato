import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Route, Plane } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property on Kanpur Road Lucknow | Near Airport | Estato',
  description: 'Find properties on Kanpur Road, Lucknow near Airport. Buy/rent commercial spaces, showrooms, flats on NH-25. Prime highway location.',
  keywords: 'property kanpur road, flats on kanpur road lucknow, showroom kanpur road, commercial property kanpur road, near lucknow airport property',
}

export default function KanpurRoadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Kanpur Road</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property on Kanpur Road – Near Lucknow Airport
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Kanpur Road (NH-25) connects Lucknow to Kanpur and passes near the airport. Find commercial properties, showrooms, and residential options on this major highway.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Kanpur Road&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Kanpur Road&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property on Kanpur Road, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
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
            <div><div className="text-3xl font-bold text-primary-600">₹60</div><div className="text-gray-600">Avg. Commercial Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹5,500</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.4★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Kanpur Road, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Kanpur Road (NH-25) is a major highway connecting Lucknow to Kanpur and Delhi via Agra Expressway. It passes through Alambagh, near the airport, and extends towards Unnao.
              </p>
              <p className="text-gray-600 mb-4">
                The road is lined with automobile showrooms, industrial units, warehouses, and commercial establishments. Areas like Alambagh, Amausi, and Transport Nagar are located on this corridor.
              </p>
              <p className="text-gray-600">
                With proximity to Lucknow Airport and good highway connectivity, Kanpur Road is ideal for logistics, automobile, and hospitality businesses.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ National Highway 25</li>
                <li>✅ Near Lucknow Airport (5 km)</li>
                <li>✅ Connects to Kanpur & Delhi</li>
                <li>✅ Through Alambagh</li>
                <li>✅ Automobile Hub</li>
                <li>✅ Industrial Corridor</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types on Kanpur Road</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'Showrooms', price: '₹80 Lakh-8 Cr', rent: '₹40,000-2.5 Lakh/mo' },
              { type: 'Commercial Space', price: '₹40 Lakh-4 Cr', rent: '₹25,000-1.2 Lakh/mo' },
              { type: 'Warehouses', price: '₹50 Lakh-3 Cr', rent: '₹20,000-1 Lakh/mo' },
              { type: 'Industrial Plots', price: '₹2,500-5,000/sqft', rent: '-' },
              { type: '2 BHK Flats', price: '₹22-38 Lakh', rent: '₹10,000-15,000/mo' },
              { type: '3 BHK Flats', price: '₹38-60 Lakh', rent: '₹15,000-25,000/mo' },
              { type: 'Hotels', price: '₹1-10 Crore', rent: 'On Request' },
              { type: 'Petrol Pumps', price: '₹2-12 Crore', rent: 'On Request' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Kanpur Road&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
                <h3 className="font-semibold text-gray-800">{item.type}</h3>
                <p className="text-sm text-primary-600">Buy: {item.price}</p>
                <p className="text-sm text-gray-500">Rent: {item.rent}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Key Locations */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Key Locations on Kanpur Road</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              'Alambagh', 'Amausi', 'Transport Nagar', 'Airport Area', 'Dubagga',
              'Para', 'Sarojini Nagar', 'Ashiyana Crossing', 'Unnao Border', 'Toll Plaza'
            ].map((loc, i) => (
              <Link key={i} href={`/locations/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center">
                {loc}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What's on Kanpur Road */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">What's on Kanpur Road</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Car className="w-5 h-5 text-primary-600" /> Automobile</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Car Showrooms (All Brands)</li>
                <li>• Two-Wheeler Showrooms</li>
                <li>• Service Centers</li>
                <li>• Spare Parts Shops</li>
                <li>• Used Car Dealers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Plane className="w-5 h-5 text-primary-600" /> Near Airport</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Airport Hotels</li>
                <li>• Cargo Services</li>
                <li>• Travel Agencies</li>
                <li>• Taxi Services</li>
                <li>• Logistics Companies</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Building2 className="w-5 h-5 text-primary-600" /> Industrial</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Warehouses</li>
                <li>• Manufacturing Units</li>
                <li>• Godowns</li>
                <li>• Transport Companies</li>
                <li>• Cold Storage</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Invest on Kanpur Road?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Plane, title: 'Near Airport', desc: 'Just 5 km from airport' },
              { icon: Route, title: 'Highway Access', desc: 'NH-25 connectivity' },
              { icon: Car, title: 'Auto Hub', desc: 'All car showrooms' },
              { icon: TrendingUp, title: 'Growth Corridor', desc: 'Rapid development' },
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Property on Kanpur Road</h2>
          <p className="text-primary-100 mb-8">Contact us for showrooms & commercial spaces</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Kanpur Road" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Alambagh', 'Amausi', 'Transport Nagar', 'Charbagh', 'Rajajipuram', 'Ashiyana'].map((loc, i) => (
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
