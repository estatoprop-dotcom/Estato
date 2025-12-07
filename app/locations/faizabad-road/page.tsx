import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Route } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property on Faizabad Road Lucknow | Prime Location | Estato',
  description: 'Find properties on Faizabad Road, Lucknow main highway. Buy/rent flats, commercial spaces, showrooms on NH-28. Prime roadside locations.',
  keywords: 'property faizabad road, flats on faizabad road lucknow, showroom faizabad road, commercial property faizabad road, nh28 lucknow property',
}

export default function FaizabadRoadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Faizabad Road</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property on Faizabad Road – Prime Highway Location
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Faizabad Road (NH-28) is one of Lucknow's busiest highways connecting to Ayodhya. Find prime commercial properties, showrooms, and residential options along this major corridor.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Faizabad Road&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Faizabad Road&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property on Faizabad Road, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              💬 WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">250+</div><div className="text-gray-600">Properties Listed</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹80</div><div className="text-gray-600">Avg. Commercial Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹8,000</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.5★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Faizabad Road, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Faizabad Road (NH-28) is a major highway connecting Lucknow to Faizabad (Ayodhya) and beyond. It's one of the busiest commercial corridors in Lucknow with high visibility and footfall.
              </p>
              <p className="text-gray-600 mb-4">
                The road passes through prime areas like Indira Nagar, Chinhat, and connects to Gomti Nagar Extension. It's lined with showrooms, malls, hotels, restaurants, and commercial establishments.
              </p>
              <p className="text-gray-600">
                With the development of Ayodhya as a major religious tourism hub, properties on Faizabad Road have seen significant appreciation and commercial interest.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ National Highway 28</li>
                <li>✅ Connects to Ayodhya</li>
                <li>✅ High Commercial Visibility</li>
                <li>✅ Wave Mall & Showrooms</li>
                <li>✅ Through Indira Nagar</li>
                <li>✅ Near Gomti Nagar Extension</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types on Faizabad Road</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'Showrooms', price: '₹1-10 Crore', rent: '₹50,000-3 Lakh/mo' },
              { type: 'Commercial Space', price: '₹50 Lakh-5 Cr', rent: '₹30,000-1.5 Lakh/mo' },
              { type: 'Shops', price: '₹25 Lakh-2 Cr', rent: '₹15,000-80,000/mo' },
              { type: 'Offices', price: '₹30 Lakh-1.5 Cr', rent: '₹20,000-70,000/mo' },
              { type: '2 BHK Flats', price: '₹30-50 Lakh', rent: '₹12,000-18,000/mo' },
              { type: '3 BHK Flats', price: '₹50-80 Lakh', rent: '₹18,000-30,000/mo' },
              { type: 'Hotels/Restaurants', price: '₹1-8 Crore', rent: 'On Request' },
              { type: 'Petrol Pumps', price: '₹2-15 Crore', rent: 'On Request' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Faizabad Road&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Key Locations on Faizabad Road</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              'Munshi Pulia', 'Indira Nagar', 'Lekhraj Market', 'Wave Mall', 'Chinhat Tiraha',
              'Nagram', 'IT Chauraha', 'Sahara Hospital', 'Polytechnic', 'Gomti Nagar Crossing'
            ].map((loc, i) => (
              <Link key={i} href={`/locations/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center">
                {loc}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What's on Faizabad Road */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">What's on Faizabad Road</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary-600" /> Shopping & Malls</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Wave Mall</li>
                <li>• Car Showrooms</li>
                <li>• Electronics Stores</li>
                <li>• Furniture Showrooms</li>
                <li>• Lekhraj Market</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Cross className="w-5 h-5 text-primary-600" /> Healthcare</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Sahara Hospital</li>
                <li>• Vivekananda Hospital</li>
                <li>• Charak Hospital</li>
                <li>• Diagnostic Centers</li>
                <li>• Pharmacies</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Building2 className="w-5 h-5 text-primary-600" /> Hotels & Food</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Hotels & Resorts</li>
                <li>• Restaurants</li>
                <li>• Fast Food Chains</li>
                <li>• Banquet Halls</li>
                <li>• Cafes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Invest on Faizabad Road?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Route, title: 'Highway Frontage', desc: 'Maximum visibility' },
              { icon: TrendingUp, title: 'High Appreciation', desc: 'Ayodhya development boost' },
              { icon: Car, title: 'Heavy Traffic', desc: 'Thousands of vehicles daily' },
              { icon: Star, title: 'Prime Location', desc: 'Best commercial corridor' },
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Prime Property on Faizabad Road</h2>
          <p className="text-primary-100 mb-8">Contact us for showrooms & commercial spaces</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Faizabad Road" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Indira Nagar', 'Chinhat', 'Gomti Nagar', 'Gomti Nagar Extension', 'Mahanagar', 'Hazratganj'].map((loc, i) => (
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
