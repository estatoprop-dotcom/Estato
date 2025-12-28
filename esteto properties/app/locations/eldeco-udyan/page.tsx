import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Shield, TreePine, Wind, Droplets, Sun, Users, Wifi, Zap, Phone, Dumbbell, Waves } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Eldeco Udyan Lucknow | Gated Township | Estato',
  description: 'Find properties in Eldeco Udyan, Lucknow premium gated township. Buy/rent flats, villas with clubhouse, swimming pool, gym. Best society living in Raebareli Road.',
  keywords: 'property eldeco udyan, flats in eldeco udyan lucknow, villa eldeco udyan, gated society lucknow, township lucknow, raebareli road property',
  openGraph: {
    title: 'Property in Eldeco Udyan Lucknow | Premium Gated Township',
    description: 'Premium gated township with world-class amenities on Raebareli Road',
    type: 'website',
  },
}

export default function EldecoUdyanPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-700 via-teal-800 to-teal-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-teal-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Eldeco Udyan</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium">🏘️ Gated Township</span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">🏊 Premium Amenities</span>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">🌿 Green Living</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Eldeco Udyan – Premium Gated Township
          </h1>
          <p className="text-xl text-teal-100 max-w-3xl mb-6">
            Eldeco Udyan is one of Lucknow's finest gated townships on Raebareli Road. Enjoy world-class amenities including clubhouse, swimming pool, gym, and 24/7 security in a green environment.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Eldeco Udyan&listing_type=sale" className="bg-white text-teal-700 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition">🏠 Buy Property</Link>
            <Link href="/properties?area=Eldeco Udyan&listing_type=rent" className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-500 transition border border-teal-500">🔑 Rent Property</Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Eldeco Udyan, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            <div className="bg-teal-50 p-4 rounded-xl"><div className="text-2xl font-bold text-teal-600">150+</div><div className="text-sm text-gray-600">Properties</div></div>
            <div className="bg-blue-50 p-4 rounded-xl"><div className="text-2xl font-bold text-blue-600">AQI 50</div><div className="text-sm text-gray-600">Air Quality</div></div>
            <div className="bg-green-50 p-4 rounded-xl"><div className="text-2xl font-bold text-green-600">45%</div><div className="text-sm text-gray-600">Green Cover</div></div>
            <div className="bg-yellow-50 p-4 rounded-xl"><div className="text-2xl font-bold text-yellow-600">₹5,500</div><div className="text-sm text-gray-600">Avg/sqft</div></div>
            <div className="bg-purple-50 p-4 rounded-xl"><div className="text-2xl font-bold text-purple-600">38 dB</div><div className="text-sm text-gray-600">Noise Level</div></div>
            <div className="bg-red-50 p-4 rounded-xl"><div className="text-2xl font-bold text-red-600">4.8★</div><div className="text-sm text-gray-600">Rating</div></div>
          </div>
        </div>
      </section>

      {/* Township Amenities */}
      <section className="py-12 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🏊 World-Class Township Amenities</h2>
          <div className="grid md:grid-cols-6 gap-4">
            {[
              { icon: Waves, name: 'Swimming Pool', desc: 'Olympic size' },
              { icon: Dumbbell, name: 'Gymnasium', desc: 'Modern equipment' },
              { icon: Users, name: 'Clubhouse', desc: 'Multi-purpose' },
              { icon: TreePine, name: 'Landscaped Gardens', desc: 'Jogging tracks' },
              { icon: Shield, name: '24/7 Security', desc: 'CCTV, guards' },
              { icon: Car, name: 'Covered Parking', desc: 'Reserved spots' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-sm text-center">
                <item.icon className="w-10 h-10 text-teal-600 mx-auto mb-2" />
                <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-6 gap-4 mt-4">
            {[
              { icon: School, name: 'Play Area', desc: 'Kids zone' },
              { icon: Building2, name: 'Community Hall', desc: 'Events' },
              { icon: Zap, name: 'Power Backup', desc: '100% backup' },
              { icon: Droplets, name: 'Water Supply', desc: '24/7 supply' },
              { icon: Wifi, name: 'High-Speed WiFi', desc: 'Fiber ready' },
              { icon: Cross, name: 'Medical Room', desc: 'First aid' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-sm text-center">
                <item.icon className="w-10 h-10 text-teal-600 mx-auto mb-2" />
                <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environment */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🌿 Environment & Living Quality</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border-2 border-green-100">
              <Wind className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Air Quality</h3>
              <div className="text-3xl font-bold text-green-600 my-2">AQI 50</div>
              <p className="text-sm text-gray-600">Excellent - Green Zone</p>
              <div className="mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Best for Families</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border-2 border-green-100">
              <TreePine className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Green Cover</h3>
              <div className="text-3xl font-bold text-green-600 my-2">45%</div>
              <p className="text-sm text-gray-600">Landscaped Gardens</p>
              <div className="mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Eco-Friendly</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border-2 border-blue-100">
              <Sun className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Noise Level</h3>
              <div className="text-3xl font-bold text-blue-600 my-2">38 dB</div>
              <p className="text-sm text-gray-600">Very Quiet</p>
              <div className="mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">Peaceful Living</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border-2 border-purple-100">
              <Shield className="w-12 h-12 text-purple-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Security</h3>
              <div className="text-3xl font-bold text-purple-600 my-2">24/7</div>
              <p className="text-sm text-gray-600">Gated Community</p>
              <div className="mt-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">CCTV Monitored</div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Eldeco Udyan</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Eldeco Udyan is a premium integrated township developed by Eldeco Group on Raebareli Road. Spread over 100+ acres, it offers a complete lifestyle with residential, commercial, and recreational facilities.
              </p>
              <p className="text-gray-600 mb-4">
                The township features well-planned sectors with villas, independent houses, and apartment complexes. It has its own market, schools, and healthcare facilities within the campus.
              </p>
              <p className="text-gray-600 mb-4">
                Located near SGPGI and Vrindavan Yojna, Eldeco Udyan offers excellent connectivity while maintaining a peaceful, green environment away from city congestion.
              </p>
            </div>
            <div className="bg-teal-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2"><MapPin className="w-5 h-5 text-teal-600" /> Raebareli Road</li>
                <li className="flex items-center gap-2"><Cross className="w-5 h-5 text-teal-600" /> 5 km from SGPGI</li>
                <li className="flex items-center gap-2"><Building2 className="w-5 h-5 text-teal-600" /> Near Vrindavan Yojna</li>
                <li className="flex items-center gap-2"><Car className="w-5 h-5 text-teal-600" /> 15 km from City Center</li>
                <li className="flex items-center gap-2"><School className="w-5 h-5 text-teal-600" /> Schools Within Township</li>
                <li className="flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-teal-600" /> In-Campus Market</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Eldeco Udyan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '2 BHK Flats', price: '₹35-50 Lakh', rent: '₹12,000-18,000/mo' },
              { type: '3 BHK Flats', price: '₹50-75 Lakh', rent: '₹18,000-28,000/mo' },
              { type: '4 BHK Flats', price: '₹75 Lakh-1.1 Cr', rent: '₹28,000-45,000/mo' },
              { type: 'Villas', price: '₹1-2.5 Crore', rent: '₹40,000-80,000/mo' },
              { type: 'Independent Houses', price: '₹80 Lakh-1.8 Cr', rent: '₹30,000-60,000/mo' },
              { type: 'Plots', price: '₹4,500-6,500/sqft', rent: '-' },
              { type: 'Shops', price: '₹25-60 Lakh', rent: '₹15,000-40,000/mo' },
              { type: 'Office Space', price: '₹30-70 Lakh', rent: '₹18,000-45,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Eldeco Udyan&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-white p-4 rounded-xl hover:shadow-md transition border border-gray-100">
                <h3 className="font-semibold text-gray-800">{item.type}</h3>
                <p className="text-sm text-teal-600">Buy: {item.price}</p>
                <p className="text-sm text-gray-500">Rent: {item.rent}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Facilities */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🏢 Nearby Facilities</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="border border-gray-200 p-5 rounded-xl">
              <School className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Education</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• DPS Eldeco (In-Campus)</li>
                <li>• Lucknow Public School</li>
                <li>• Amity University (8 km)</li>
                <li>• BBAU (10 km)</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <Cross className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Healthcare</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• SGPGI (5 km)</li>
                <li>• RMLIMS (8 km)</li>
                <li>• Medanta (10 km)</li>
                <li>• In-Campus Clinic</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <ShoppingBag className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Shopping</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• In-Campus Market</li>
                <li>• Shalimar Mall (12 km)</li>
                <li>• Phoenix Palassio (15 km)</li>
                <li>• Local Markets</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <Car className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Connectivity</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Raebareli Road</li>
                <li>• Ring Road (8 km)</li>
                <li>• Airport (20 km)</li>
                <li>• Charbagh (15 km)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-teal-600 to-teal-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Find Your Dream Home in Eldeco Udyan</h2>
          <p className="text-teal-100 mb-8">Premium township living with world-class amenities</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Eldeco Udyan" className="bg-white text-teal-700 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition">View All Properties</Link>
            <a href="tel:+919872364476" className="bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-400 transition flex items-center gap-2"><Phone className="w-5 h-5" /> Call Now</a>
            <a href="https://wa.me/919872364476" className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Related Locations */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Nearby Areas</h2>
          <div className="flex flex-wrap gap-3">
            {['Vrindavan Yojna', 'Raebareli Road', 'Ashiyana', 'Sushant Golf City', 'Telibagh', 'Gomti Nagar Extension'].map((loc, i) => (
              <Link key={i} href={`/locations/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition">{loc}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
