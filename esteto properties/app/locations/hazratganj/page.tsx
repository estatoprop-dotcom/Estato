import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Landmark } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Hazratganj Lucknow | Commercial & Residential | Estato',
  description: 'Find properties in Hazratganj, the heart of Lucknow. Buy/rent shops, offices, flats in prime commercial location. Heritage area with premium real estate.',
  keywords: 'property hazratganj, shop for rent hazratganj, office space hazratganj, flat in hazratganj lucknow, commercial property hazratganj',
}

export default function HazratganjPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Hazratganj</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Hazratganj – The Heart of Lucknow
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Hazratganj is Lucknow's most iconic commercial and heritage district. Find premium shops, offices, and residential properties in the city's prime location.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Hazratganj&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Hazratganj&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Hazratganj, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
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
            <div><div className="text-3xl font-bold text-primary-600">₹15,000</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">5.0★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Hazratganj, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Hazratganj, often called the "Heart of Lucknow," is the city's most prestigious commercial and cultural district. Named after Hazrat Ali, it has been Lucknow's premier shopping and business destination since the British era.
              </p>
              <p className="text-gray-600 mb-4">
                The area is famous for its colonial architecture, high-end showrooms, branded stores, restaurants, and government offices. It's home to the iconic Sahara Ganj Mall, GPO, and Vidhan Sabha.
              </p>
              <p className="text-gray-600">
                For businesses, Hazratganj offers unmatched visibility and footfall. For residents, it provides the charm of heritage living with modern conveniences.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Central Lucknow Location</li>
                <li>✅ 3 km from Charbagh Railway Station</li>
                <li>✅ Near Vidhan Sabha & GPO</li>
                <li>✅ Heritage Shopping District</li>
                <li>✅ Premium Commercial Hub</li>
                <li>✅ Government Offices Nearby</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Hazratganj</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'Shops', price: '₹50 Lakh-5 Cr', rent: '₹30,000-2 Lakh/mo' },
              { type: 'Showrooms', price: '₹1-10 Crore', rent: '₹1-5 Lakh/mo' },
              { type: 'Offices', price: '₹40 Lakh-2 Cr', rent: '₹25,000-1 Lakh/mo' },
              { type: 'Commercial Space', price: '₹1-15 Crore', rent: '₹50,000-5 Lakh/mo' },
              { type: '2 BHK Flats', price: '₹50-80 Lakh', rent: '₹15,000-25,000/mo' },
              { type: '3 BHK Flats', price: '₹80 Lakh-1.5 Cr', rent: '₹25,000-40,000/mo' },
              { type: 'Heritage Homes', price: '₹2-10 Crore', rent: 'On Request' },
              { type: 'PG/Rooms', price: '-', rent: '₹5,000-12,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Hazratganj&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Areas in & Around Hazratganj</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              'Lalbagh', 'Kaiserbagh', 'Husainganj', 'Aminabad', 'Naka Hindola',
              'GPO Area', 'Vidhan Sabha', 'Janpath Market', 'Sapru Marg', 'Ashok Marg'
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
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Landmark className="w-5 h-5 text-primary-600" /> Heritage & Government</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Vidhan Sabha (State Assembly)</li>
                <li>• GPO (General Post Office)</li>
                <li>• High Court</li>
                <li>• Raj Bhavan</li>
                <li>• State Museum</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary-600" /> Shopping & Dining</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Sahara Ganj Mall</li>
                <li>• Janpath Market</li>
                <li>• British-era Showrooms</li>
                <li>• Royal Cafe</li>
                <li>• Tunday Kababi</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Cross className="w-5 h-5 text-primary-600" /> Hospitals & Banks</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Balrampur Hospital</li>
                <li>• KGMU (3 km)</li>
                <li>• State Bank of India</li>
                <li>• Reserve Bank of India</li>
                <li>• All Major Banks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Hazratganj for Business?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Star, title: 'Prime Location', desc: 'Most prestigious address in Lucknow' },
              { icon: TrendingUp, title: 'High Footfall', desc: 'Lakhs of visitors daily' },
              { icon: Landmark, title: 'Heritage Value', desc: 'Colonial charm & prestige' },
              { icon: Building2, title: 'Business Hub', desc: 'Banks, offices, showrooms' },
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Premium Property in Hazratganj</h2>
          <p className="text-primary-100 mb-8">Contact us for exclusive commercial & residential listings</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Hazratganj" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Aminabad', 'Kaiserbagh', 'Chowk', 'Gomti Nagar', 'Mahanagar', 'Charbagh'].map((loc, i) => (
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
