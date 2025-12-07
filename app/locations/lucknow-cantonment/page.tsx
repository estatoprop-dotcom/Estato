import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Shield, TreePine, Wind, Droplets, Sun, Users, Wifi, Zap, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Lucknow Cantonment | Secure & Green Living | Estato',
  description: 'Find properties in Lucknow Cantonment - safest, greenest locality with excellent air quality. Buy/rent flats, bungalows in army area. Premium secure living.',
  keywords: 'property lucknow cantonment, flats in cantonment lucknow, bungalow cantonment area, army area lucknow property, safest area lucknow, green locality lucknow',
  openGraph: {
    title: 'Property in Lucknow Cantonment | Secure & Green Living',
    description: 'Safest and greenest locality in Lucknow with premium properties',
    type: 'website',
  },
}

export default function LucknowCantonmentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 via-green-800 to-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-green-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Lucknow Cantonment</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">🌿 Greenest Area</span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">🛡️ Safest Locality</span>
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">⭐ Premium</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Lucknow Cantonment – Secure & Green Living
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mb-6">
            Lucknow Cantonment is the safest and greenest locality in Lucknow. Experience premium living with tree-lined roads, clean air, low noise pollution, and 24/7 security.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Cantonment&listing_type=sale" className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition">🏠 Buy Property</Link>
            <Link href="/properties?area=Cantonment&listing_type=rent" className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-500 transition border border-green-500">🔑 Rent Property</Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Lucknow Cantonment" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            <div className="bg-green-50 p-4 rounded-xl"><div className="text-2xl font-bold text-green-600">85+</div><div className="text-sm text-gray-600">Properties</div></div>
            <div className="bg-blue-50 p-4 rounded-xl"><div className="text-2xl font-bold text-blue-600">AQI 45</div><div className="text-sm text-gray-600">Air Quality</div></div>
            <div className="bg-green-50 p-4 rounded-xl"><div className="text-2xl font-bold text-green-600">40%</div><div className="text-sm text-gray-600">Green Cover</div></div>
            <div className="bg-yellow-50 p-4 rounded-xl"><div className="text-2xl font-bold text-yellow-600">₹9,000</div><div className="text-sm text-gray-600">Avg/sqft</div></div>
            <div className="bg-purple-50 p-4 rounded-xl"><div className="text-2xl font-bold text-purple-600">35 dB</div><div className="text-sm text-gray-600">Noise Level</div></div>
            <div className="bg-red-50 p-4 rounded-xl"><div className="text-2xl font-bold text-red-600">4.9★</div><div className="text-sm text-gray-600">Rating</div></div>
          </div>
        </div>
      </section>

      {/* Environment & Air Quality */}
      <section className="py-12 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🌿 Environment & Air Quality Index</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Wind className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Air Quality</h3>
              <div className="text-3xl font-bold text-green-600 my-2">AQI 45</div>
              <p className="text-sm text-gray-600">Good - Best in Lucknow</p>
              <div className="mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Excellent for Health</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <TreePine className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Green Cover</h3>
              <div className="text-3xl font-bold text-green-600 my-2">40%</div>
              <p className="text-sm text-gray-600">Dense Tree Coverage</p>
              <div className="mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Highest in City</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Sun className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Noise Level</h3>
              <div className="text-3xl font-bold text-blue-600 my-2">35 dB</div>
              <p className="text-sm text-gray-600">Very Quiet Area</p>
              <div className="mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">Peaceful Living</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Droplets className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Water Quality</h3>
              <div className="text-3xl font-bold text-blue-600 my-2">TDS 180</div>
              <p className="text-sm text-gray-600">Clean Ground Water</p>
              <div className="mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">Safe for Drinking</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Lucknow Cantonment</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Lucknow Cantonment is a prestigious military area established during the British era. It's home to the Indian Army's Central Command and offers the most secure and serene living environment in Lucknow.
              </p>
              <p className="text-gray-600 mb-4">
                The area features wide tree-lined roads, colonial-era bungalows, well-maintained parks, and strict security protocols. It's the preferred choice for defense personnel, senior government officials, and families seeking peaceful living.
              </p>
              <p className="text-gray-600 mb-4">
                With the lowest crime rate, best air quality, and highest green cover in Lucknow, Cantonment offers an unmatched quality of life. The area has excellent schools, hospitals, and recreational facilities.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2"><Shield className="w-5 h-5 text-green-600" /> 24/7 Military Security</li>
                <li className="flex items-center gap-2"><TreePine className="w-5 h-5 text-green-600" /> 40% Green Cover</li>
                <li className="flex items-center gap-2"><Wind className="w-5 h-5 text-green-600" /> Best Air Quality (AQI 45)</li>
                <li className="flex items-center gap-2"><MapPin className="w-5 h-5 text-green-600" /> Central Location</li>
                <li className="flex items-center gap-2"><Car className="w-5 h-5 text-green-600" /> Wide Roads, Less Traffic</li>
                <li className="flex items-center gap-2"><Star className="w-5 h-5 text-green-600" /> Premium Lifestyle</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Amenities */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🏢 Facilities & Amenities</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="border border-gray-200 p-5 rounded-xl">
              <School className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Education</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Kendriya Vidyalaya</li>
                <li>• Army Public School</li>
                <li>• La Martiniere College</li>
                <li>• St. Francis College</li>
                <li>• Lucknow University (5 km)</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <Cross className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Healthcare</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Command Hospital</li>
                <li>• Military Hospital</li>
                <li>• KGMU (6 km)</li>
                <li>• Sahara Hospital (4 km)</li>
                <li>• 24/7 Ambulance Service</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <ShoppingBag className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Shopping</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• CSD Canteen</li>
                <li>• Hazratganj (3 km)</li>
                <li>• Sahara Ganj Mall (4 km)</li>
                <li>• Wave Mall (6 km)</li>
                <li>• Local Markets</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <Users className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Recreation</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Golf Course</li>
                <li>• Officers Club</li>
                <li>• Swimming Pool</li>
                <li>• Parks & Gardens</li>
                <li>• Sports Complex</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🔧 Infrastructure & Connectivity</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Zap className="w-10 h-10 text-yellow-500 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Power Supply</h3>
              <p className="text-gray-600 text-sm">24/7 uninterrupted power supply with dedicated military grid. Minimal power cuts.</p>
              <div className="mt-3 text-green-600 font-medium">✓ 99.9% Uptime</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Droplets className="w-10 h-10 text-blue-500 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Water Supply</h3>
              <p className="text-gray-600 text-sm">Clean water supply from dedicated sources. Low TDS groundwater available.</p>
              <div className="mt-3 text-green-600 font-medium">✓ 24/7 Supply</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Wifi className="w-10 h-10 text-purple-500 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Connectivity</h3>
              <p className="text-gray-600 text-sm">High-speed internet, 4G/5G coverage. All major telecom providers available.</p>
              <div className="mt-3 text-green-600 font-medium">✓ Fiber Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Cantonment</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'Bungalows', price: '₹2-8 Crore', rent: '₹50,000-1.5 Lakh/mo' },
              { type: '3 BHK Flats', price: '₹70 Lakh-1.2 Cr', rent: '₹25,000-45,000/mo' },
              { type: '4 BHK Flats', price: '₹1-2 Crore', rent: '₹40,000-70,000/mo' },
              { type: 'Villas', price: '₹1.5-5 Crore', rent: '₹60,000-1.2 Lakh/mo' },
              { type: 'Independent Houses', price: '₹80 Lakh-2 Cr', rent: '₹30,000-60,000/mo' },
              { type: 'Plots', price: '₹8,000-15,000/sqft', rent: '-' },
              { type: 'PG/Rooms', price: '-', rent: '₹8,000-15,000/mo' },
              { type: 'Commercial', price: '₹50 Lakh-2 Cr', rent: '₹30,000-1 Lakh/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Cantonment&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
                <h3 className="font-semibold text-gray-800">{item.type}</h3>
                <p className="text-sm text-primary-600">Buy: {item.price}</p>
                <p className="text-sm text-gray-500">Rent: {item.rent}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">🌟 Lifestyle in Cantonment</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'Morning Walks', desc: 'Tree-lined roads, fresh air, parks' },
              { title: 'Safe for Kids', desc: 'Low traffic, secure environment' },
              { title: 'Community Living', desc: 'Close-knit defense community' },
              { title: 'Heritage Charm', desc: 'Colonial architecture, history' },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 p-5 rounded-xl backdrop-blur">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-green-100 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Cantonment?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Safest Area', desc: 'Lowest crime rate in Lucknow' },
              { icon: TreePine, title: 'Greenest Locality', desc: '40% green cover, clean air' },
              { icon: Star, title: 'Premium Living', desc: 'High-quality lifestyle' },
              { icon: TrendingUp, title: 'Value Appreciation', desc: 'Steady property growth' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <item.icon className="w-10 h-10 text-green-600 mb-3" />
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Your Dream Home in Cantonment</h2>
          <p className="text-primary-100 mb-8">Experience secure, green, premium living</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Cantonment" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">View All Properties</Link>
            <a href="tel:+919872364476" className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition flex items-center gap-2"><Phone className="w-5 h-5" /> Call Now</a>
            <a href="https://wa.me/919872364476" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition">💬 WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Related Locations */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Nearby Areas</h2>
          <div className="flex flex-wrap gap-3">
            {['Hazratganj', 'Mahanagar', 'Kaiserbagh', 'Aminabad', 'Charbagh', 'Gomti Nagar'].map((loc, i) => (
              <Link key={i} href={`/locations/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition">{loc}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
