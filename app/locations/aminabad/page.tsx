import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Store, Shirt } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Aminabad Lucknow | Famous Shopping Market | Estato',
  description: 'Find properties in Aminabad, Lucknow famous shopping market. Buy/rent shops, showrooms in busiest retail hub. Chikan, textiles, electronics market.',
  keywords: 'property aminabad, shop for rent aminabad, commercial property aminabad lucknow, aminabad market, chikan market aminabad',
}

export default function AminabadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Aminabad</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Aminabad – Lucknow's Busiest Shopping Market
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Aminabad is Lucknow's most famous and busiest shopping destination. Find shops, showrooms, and commercial spaces in this iconic retail hub known for textiles, Chikan, and electronics.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Aminabad&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏪 Buy Shop
            </Link>
            <Link href="/properties?area=Aminabad&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Shop
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Aminabad, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
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
            <div><div className="text-3xl font-bold text-primary-600">₹150</div><div className="text-gray-600">Avg. Shop Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹18,000</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.8★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Aminabad, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Aminabad is Lucknow's oldest and most popular shopping market, established during the Nawabi era. It's the go-to destination for traditional shopping, especially during festivals and weddings.
              </p>
              <p className="text-gray-600 mb-4">
                The market is famous for Lucknowi Chikan embroidery, textiles, jewelry, electronics, and street food. Lakhs of shoppers visit Aminabad daily, making it one of the highest footfall areas in North India.
              </p>
              <p className="text-gray-600">
                For retail businesses, Aminabad offers unmatched customer traffic and brand visibility. The market operates from morning till late night, especially during festive seasons.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Lucknow's Busiest Market</li>
                <li>✅ 2 km from Hazratganj</li>
                <li>✅ 3 km from Charbagh Station</li>
                <li>✅ Famous for Chikan & Textiles</li>
                <li>✅ Lakhs of Daily Visitors</li>
                <li>✅ Festival Shopping Hub</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Aminabad</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'Shops', price: '₹30 Lakh-5 Cr', rent: '₹20,000-2 Lakh/mo' },
              { type: 'Showrooms', price: '₹1-10 Crore', rent: '₹50,000-5 Lakh/mo' },
              { type: 'Godowns', price: '₹50 Lakh-2 Cr', rent: '₹25,000-1 Lakh/mo' },
              { type: 'Commercial Space', price: '₹80 Lakh-8 Cr', rent: '₹40,000-3 Lakh/mo' },
              { type: 'Basement Shops', price: '₹20-80 Lakh', rent: '₹15,000-60,000/mo' },
              { type: 'First Floor Shops', price: '₹25 Lakh-2 Cr', rent: '₹18,000-80,000/mo' },
              { type: 'Offices', price: '₹30-90 Lakh', rent: '₹15,000-50,000/mo' },
              { type: 'Warehouse', price: '₹40 Lakh-1.5 Cr', rent: '₹20,000-70,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Aminabad&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Famous Markets in Aminabad</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              'Chikan Market', 'Textile Market', 'Electronics Market', 'Jewelry Market', 'Footwear Market',
              'Cosmetics Lane', 'Saree Market', 'Readymade Garments', 'Handicrafts', 'Street Food Lane'
            ].map((market, i) => (
              <div key={i} className="bg-white px-4 py-3 rounded-lg border border-gray-200 text-center">
                {market}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Aminabad is Famous For */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">What Aminabad is Famous For</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Shirt className="w-5 h-5 text-primary-600" /> Textiles & Fashion</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Lucknowi Chikan Kurtas</li>
                <li>• Banarasi Sarees</li>
                <li>• Bridal Lehengas</li>
                <li>• Men's Ethnic Wear</li>
                <li>• Kids' Clothing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Store className="w-5 h-5 text-primary-600" /> Electronics & More</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Mobile Phones & Accessories</li>
                <li>• Electronics & Appliances</li>
                <li>• Jewelry & Imitation</li>
                <li>• Cosmetics & Beauty</li>
                <li>• Footwear & Bags</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary-600" /> Famous Food</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Basket Chaat</li>
                <li>• Makhan Malai</li>
                <li>• Kulfi Faluda</li>
                <li>• Kebabs & Biryani</li>
                <li>• Traditional Sweets</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Invest in Aminabad?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: 'Highest Footfall', desc: 'Lakhs of shoppers daily' },
              { icon: Star, title: 'Brand Value', desc: 'Most famous market' },
              { icon: Store, title: 'Retail Hub', desc: 'Best for retail business' },
              { icon: CheckCircle, title: 'Year-Round Sales', desc: 'Busy throughout the year' },
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Shop in Aminabad Market</h2>
          <p className="text-primary-100 mb-8">Contact us for prime retail spaces in Lucknow's busiest market</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Aminabad" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Hazratganj', 'Chowk', 'Naka Hindola', 'Kaiserbagh', 'Charbagh', 'Husainganj'].map((loc, i) => (
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
