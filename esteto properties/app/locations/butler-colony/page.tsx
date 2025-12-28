import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Shield, TreePine, Wind, Droplets, Sun, Users, Wifi, Zap, Phone, Landmark } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Butler Colony Lucknow | Posh Residential Area | Estato',
  description: 'Find properties in Butler Colony, Lucknow most elite residential area. Buy/rent luxury bungalows, villas near Hazratganj. VIP neighborhood with best amenities.',
  keywords: 'property butler colony, bungalow butler colony lucknow, villa butler colony, posh area lucknow, elite locality lucknow, vip area lucknow property',
  openGraph: {
    title: 'Property in Butler Colony Lucknow | Elite Residential Area',
    description: 'Most prestigious residential colony in Lucknow with luxury properties',
    type: 'website',
  },
}

export default function ButlerColonyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-amber-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Butler Colony</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">👑 Most Elite</span>
            <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">🏛️ Heritage</span>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">🌿 Green Zone</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Butler Colony – Lucknow's Most Elite Address
          </h1>
          <p className="text-xl text-amber-100 max-w-3xl mb-6">
            Butler Colony is Lucknow's most prestigious residential area, home to industrialists, politicians, and top professionals. Experience luxury living with heritage charm.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Butler Colony&listing_type=sale" className="bg-white text-amber-700 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition">🏠 Buy Property</Link>
            <Link href="/properties?area=Butler Colony&listing_type=rent" className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-500 transition border border-amber-500">🔑 Rent Property</Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Butler Colony, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            <div className="bg-amber-50 p-4 rounded-xl"><div className="text-2xl font-bold text-amber-600">45+</div><div className="text-sm text-gray-600">Properties</div></div>
            <div className="bg-blue-50 p-4 rounded-xl"><div className="text-2xl font-bold text-blue-600">AQI 55</div><div className="text-sm text-gray-600">Air Quality</div></div>
            <div className="bg-green-50 p-4 rounded-xl"><div className="text-2xl font-bold text-green-600">35%</div><div className="text-sm text-gray-600">Green Cover</div></div>
            <div className="bg-yellow-50 p-4 rounded-xl"><div className="text-2xl font-bold text-yellow-600">₹18,000</div><div className="text-sm text-gray-600">Avg/sqft</div></div>
            <div className="bg-purple-50 p-4 rounded-xl"><div className="text-2xl font-bold text-purple-600">40 dB</div><div className="text-sm text-gray-600">Noise Level</div></div>
            <div className="bg-red-50 p-4 rounded-xl"><div className="text-2xl font-bold text-red-600">5.0★</div><div className="text-sm text-gray-600">Rating</div></div>
          </div>
        </div>
      </section>

      {/* Environment & Air Quality */}
      <section className="py-12 bg-gradient-to-r from-amber-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🌿 Environment & Living Quality</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Wind className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Air Quality</h3>
              <div className="text-3xl font-bold text-green-600 my-2">AQI 55</div>
              <p className="text-sm text-gray-600">Good - Low Pollution</p>
              <div className="mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Healthy Living</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <TreePine className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Green Cover</h3>
              <div className="text-3xl font-bold text-green-600 my-2">35%</div>
              <p className="text-sm text-gray-600">Mature Trees</p>
              <div className="mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Heritage Gardens</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Sun className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Noise Level</h3>
              <div className="text-3xl font-bold text-blue-600 my-2">40 dB</div>
              <p className="text-sm text-gray-600">Very Quiet</p>
              <div className="mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">Peaceful Area</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Shield className="w-12 h-12 text-purple-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Security</h3>
              <div className="text-3xl font-bold text-purple-600 my-2">24/7</div>
              <p className="text-sm text-gray-600">Private Security</p>
              <div className="mt-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">VIP Protection</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Butler Colony</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Butler Colony, named after Sir Harcourt Butler (former Governor of UP), is Lucknow's most exclusive residential enclave. Established during the British era, it has been home to the city's elite for over a century.
              </p>
              <p className="text-gray-600 mb-4">
                The colony features sprawling bungalows with large gardens, tree-lined avenues, and a serene atmosphere. It's located in the heart of Lucknow, adjacent to Hazratganj and the Civil Lines area.
              </p>
              <p className="text-gray-600 mb-4">
                Residents include top industrialists, senior bureaucrats, politicians, and business families. The area offers unmatched privacy, security, and prestige.
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2"><Landmark className="w-5 h-5 text-amber-600" /> Heritage British-Era Colony</li>
                <li className="flex items-center gap-2"><MapPin className="w-5 h-5 text-amber-600" /> Adjacent to Hazratganj</li>
                <li className="flex items-center gap-2"><Shield className="w-5 h-5 text-amber-600" /> Private Security</li>
                <li className="flex items-center gap-2"><TreePine className="w-5 h-5 text-amber-600" /> Large Garden Plots</li>
                <li className="flex items-center gap-2"><Star className="w-5 h-5 text-amber-600" /> VIP Neighborhood</li>
                <li className="flex items-center gap-2"><Home className="w-5 h-5 text-amber-600" /> Sprawling Bungalows</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Amenities */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🏢 Premium Facilities & Amenities</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="border border-gray-200 p-5 rounded-xl">
              <School className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Education</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• La Martiniere College (2 km)</li>
                <li>• Loreto Convent (1 km)</li>
                <li>• CMS (1.5 km)</li>
                <li>• Lucknow University (3 km)</li>
                <li>• St. Francis College (2 km)</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <Cross className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Healthcare</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• KGMU (4 km)</li>
                <li>• Sahara Hospital (5 km)</li>
                <li>• Mayo Hospital (3 km)</li>
                <li>• Private Clinics</li>
                <li>• 24/7 Emergency Services</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <ShoppingBag className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Shopping</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Hazratganj (Walking Distance)</li>
                <li>• Sahara Ganj Mall (3 km)</li>
                <li>• Branded Showrooms</li>
                <li>• Luxury Boutiques</li>
                <li>• Fine Dining Restaurants</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <Users className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Recreation</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Lucknow Club</li>
                <li>• Golf Course (5 km)</li>
                <li>• Gymkhana Club</li>
                <li>• Heritage Hotels</li>
                <li>• Art Galleries</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Butler Colony</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'Heritage Bungalows', price: '₹5-25 Crore', rent: '₹1-3 Lakh/mo' },
              { type: 'Luxury Villas', price: '₹3-15 Crore', rent: '₹80,000-2 Lakh/mo' },
              { type: 'Independent Houses', price: '₹2-8 Crore', rent: '₹50,000-1.5 Lakh/mo' },
              { type: 'Premium Flats', price: '₹1-3 Crore', rent: '₹40,000-80,000/mo' },
              { type: 'Plots', price: '₹15,000-25,000/sqft', rent: '-' },
              { type: 'Commercial', price: '₹1-5 Crore', rent: '₹50,000-2 Lakh/mo' },
              { type: 'Office Space', price: '₹80 Lakh-3 Cr', rent: '₹40,000-1.2 Lakh/mo' },
              { type: 'Guest Houses', price: '₹2-6 Crore', rent: '₹60,000-1.5 Lakh/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Butler Colony&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-white p-4 rounded-xl hover:shadow-md transition border border-gray-100">
                <h3 className="font-semibold text-gray-800">{item.type}</h3>
                <p className="text-sm text-amber-600">Buy: {item.price}</p>
                <p className="text-sm text-gray-500">Rent: {item.rent}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle */}
      <section className="py-12 bg-gradient-to-r from-amber-600 to-amber-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">👑 Elite Lifestyle in Butler Colony</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'Privacy & Exclusivity', desc: 'Gated community, limited access' },
              { title: 'Heritage Living', desc: 'Colonial architecture, history' },
              { title: 'Elite Neighbors', desc: 'Industrialists, politicians' },
              { title: 'Central Location', desc: 'Heart of Lucknow' },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 p-5 rounded-xl backdrop-blur">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-amber-100 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Find Luxury Property in Butler Colony</h2>
          <p className="text-primary-100 mb-8">Experience elite living in Lucknow's most prestigious address</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Butler Colony" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">View All Properties</Link>
            <a href="tel:+919872364476" className="bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition flex items-center gap-2"><Phone className="w-5 h-5" /> Call Now</a>
            <a href="https://wa.me/919872364476" className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Related Locations */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Nearby Areas</h2>
          <div className="flex flex-wrap gap-3">
            {['Hazratganj', 'Kaiserbagh', 'Lucknow Cantonment', 'Mahanagar', 'Gomti Nagar', 'Aminabad'].map((loc, i) => (
              <Link key={i} href={`/locations/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition">{loc}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
