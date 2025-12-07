import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Landmark, Store } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Chowk Lucknow | Old City Commercial Hub | Estato',
  description: 'Find properties in Chowk, Old Lucknow. Buy/rent shops, commercial spaces in historic market area. Famous for Chikan, jewelry, traditional markets.',
  keywords: 'property chowk lucknow, shop for rent chowk, commercial property chowk, aminabad property, old lucknow real estate',
}

export default function ChowkPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Chowk</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Chowk – Historic Commercial Hub of Old Lucknow
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Chowk is the historic heart of Old Lucknow, famous for Chikan embroidery, jewelry, and traditional markets. Find commercial properties, shops, and heritage homes in this iconic area.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Chowk&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Chowk&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Chowk, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              💬 WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">150+</div><div className="text-gray-600">Properties Listed</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹100</div><div className="text-gray-600">Avg. Shop Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹8,000</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.5★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Chowk, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Chowk is the historic commercial center of Old Lucknow, dating back to the Nawabi era. It's famous worldwide for Lucknowi Chikan embroidery, traditional jewelry, ittar (perfumes), and the iconic Tunday Kababi.
              </p>
              <p className="text-gray-600 mb-4">
                The area is a maze of narrow lanes filled with shops selling traditional crafts, textiles, and food. Despite its old-world charm, Chowk remains one of the busiest commercial hubs in Lucknow.
              </p>
              <p className="text-gray-600">
                For businesses dealing in traditional crafts, textiles, or food, Chowk offers unmatched footfall and heritage value. Residential options are limited but offer authentic Old Lucknow living experience.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Historic Nawabi Era Market</li>
                <li>✅ Famous for Chikan Embroidery</li>
                <li>✅ Near Aminabad Market</li>
                <li>✅ 4 km from Charbagh Station</li>
                <li>✅ High Footfall Area</li>
                <li>✅ Heritage Commercial Hub</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Chowk</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'Shops', price: '₹20 Lakh-2 Cr', rent: '₹10,000-1 Lakh/mo' },
              { type: 'Showrooms', price: '₹50 Lakh-5 Cr', rent: '₹30,000-2 Lakh/mo' },
              { type: 'Godowns', price: '₹30 Lakh-1 Cr', rent: '₹15,000-50,000/mo' },
              { type: 'Commercial Space', price: '₹40 Lakh-3 Cr', rent: '₹25,000-1.5 Lakh/mo' },
              { type: 'Heritage Homes', price: '₹50 Lakh-3 Cr', rent: 'On Request' },
              { type: '1-2 BHK Flats', price: '₹20-40 Lakh', rent: '₹8,000-15,000/mo' },
              { type: 'Offices', price: '₹25-80 Lakh', rent: '₹12,000-40,000/mo' },
              { type: 'Warehouse', price: '₹40 Lakh-1.5 Cr', rent: '₹20,000-60,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Chowk&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
                <h3 className="font-semibold text-gray-800">{item.type}</h3>
                <p className="text-sm text-primary-600">Buy: {item.price}</p>
                <p className="text-sm text-gray-500">Rent: {item.rent}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Famous Markets */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Famous Markets in Chowk</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              'Chikan Market', 'Nakhas', 'Yahiyaganj', 'Aminabad', 'Nakkhas',
              'Akbari Gate', 'Gol Darwaza', 'Chowk Sarafa', 'Latouche Road', 'Maulviganj'
            ].map((market, i) => (
              <Link key={i} href={`/locations/${market.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center">
                {market}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What Chowk is Famous For */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">What Chowk is Famous For</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Store className="w-5 h-5 text-primary-600" /> Traditional Crafts</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Lucknowi Chikan Embroidery</li>
                <li>• Zardozi Work</li>
                <li>• Traditional Jewelry</li>
                <li>• Ittar (Perfumes)</li>
                <li>• Handicrafts</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Landmark className="w-5 h-5 text-primary-600" /> Heritage Sites</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Bara Imambara</li>
                <li>• Chhota Imambara</li>
                <li>• Rumi Darwaza</li>
                <li>• Clock Tower</li>
                <li>• Historic Mosques</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary-600" /> Famous Food</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Tunday Kababi</li>
                <li>• Rahim's Nihari</li>
                <li>• Prakash Kulfi</li>
                <li>• Chaat & Street Food</li>
                <li>• Traditional Sweets</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Invest in Chowk?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: 'High Footfall', desc: 'Lakhs of visitors daily' },
              { icon: Landmark, title: 'Heritage Value', desc: 'Historic Nawabi market' },
              { icon: Store, title: 'Business Hub', desc: 'Traditional crafts center' },
              { icon: Star, title: 'Tourist Attraction', desc: 'Famous worldwide' },
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Commercial Property in Chowk</h2>
          <p className="text-primary-100 mb-8">Contact us for shops & commercial spaces in Old Lucknow</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Chowk" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Aminabad', 'Hazratganj', 'Kaiserbagh', 'Naka Hindola', 'Husainganj', 'Charbagh'].map((loc, i) => (
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
