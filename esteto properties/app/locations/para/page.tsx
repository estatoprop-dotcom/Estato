import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, TreePine, Wind, Users, Phone, Factory, Warehouse } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Para Lucknow | Industrial & Residential | Estato',
  description: 'Find properties in Para, Lucknow industrial and residential area. Buy/rent flats, warehouses, plots. Affordable housing near Kanpur Road with growth potential.',
  keywords: 'property para lucknow, flats in para, warehouse para lucknow, plot in para, industrial property para, affordable housing para lucknow',
  openGraph: {
    title: 'Property in Para Lucknow | Industrial & Residential',
    description: 'Affordable properties in Para with industrial and residential options',
    type: 'website',
  },
}

export default function ParaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-700 via-orange-800 to-orange-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-orange-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Para</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">🏭 Industrial</span>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">💰 Affordable</span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">📈 Growing</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Para – Industrial & Affordable Residential
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mb-6">
            Para is an emerging industrial and residential area near Kanpur Road. Find affordable flats, warehouses, and plots with excellent growth potential.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Para&listing_type=sale" className="bg-white text-orange-700 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition">🏠 Buy Property</Link>
            <Link href="/properties?area=Para&listing_type=rent" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-500 transition border border-orange-500">🔑 Rent Property</Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Para, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            <div className="bg-orange-50 p-4 rounded-xl"><div className="text-2xl font-bold text-orange-600">120+</div><div className="text-sm text-gray-600">Properties</div></div>
            <div className="bg-green-50 p-4 rounded-xl"><div className="text-2xl font-bold text-green-600">₹2,800</div><div className="text-sm text-gray-600">Avg/sqft</div></div>
            <div className="bg-blue-50 p-4 rounded-xl"><div className="text-2xl font-bold text-blue-600">15%</div><div className="text-sm text-gray-600">YoY Growth</div></div>
            <div className="bg-yellow-50 p-4 rounded-xl"><div className="text-2xl font-bold text-yellow-600">AQI 70</div><div className="text-sm text-gray-600">Air Quality</div></div>
            <div className="bg-purple-50 p-4 rounded-xl"><div className="text-2xl font-bold text-purple-600">22%</div><div className="text-sm text-gray-600">Green Cover</div></div>
            <div className="bg-red-50 p-4 rounded-xl"><div className="text-2xl font-bold text-red-600">4.2★</div><div className="text-sm text-gray-600">Rating</div></div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Para</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Para is located near Kanpur Road and is known for its mix of industrial and residential areas. It's one of the most affordable localities in Lucknow with good growth potential.
              </p>
              <p className="text-gray-600 mb-4">
                The area has small-scale industries, warehouses, and residential colonies. It's popular among first-time buyers and investors looking for budget properties with appreciation potential.
              </p>
              <p className="text-gray-600 mb-4">
                With proximity to Kanpur Road and the airport, Para offers good connectivity while maintaining affordable property prices compared to central Lucknow.
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2"><MapPin className="w-5 h-5 text-orange-600" /> Near Kanpur Road</li>
                <li className="flex items-center gap-2"><Factory className="w-5 h-5 text-orange-600" /> Industrial Area</li>
                <li className="flex items-center gap-2"><Home className="w-5 h-5 text-orange-600" /> Affordable Housing</li>
                <li className="flex items-center gap-2"><Car className="w-5 h-5 text-orange-600" /> 15 km from Airport</li>
                <li className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-orange-600" /> High Growth Potential</li>
                <li className="flex items-center gap-2"><Warehouse className="w-5 h-5 text-orange-600" /> Warehouse Hub</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Environment */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🌿 Environment & Living Quality</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <Wind className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Air Quality</h3>
              <div className="text-3xl font-bold text-yellow-600 my-2">AQI 70</div>
              <p className="text-sm text-gray-600">Moderate</p>
              <div className="mt-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">Acceptable</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <TreePine className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Green Cover</h3>
              <div className="text-3xl font-bold text-green-600 my-2">22%</div>
              <p className="text-sm text-gray-600">Semi-Urban</p>
              <div className="mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Developing</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Community</h3>
              <div className="text-3xl font-bold text-blue-600 my-2">Mixed</div>
              <p className="text-sm text-gray-600">Workers & Families</p>
              <div className="mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">Diverse</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <TrendingUp className="w-12 h-12 text-purple-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Growth</h3>
              <div className="text-3xl font-bold text-purple-600 my-2">15%</div>
              <p className="text-sm text-gray-600">YoY Appreciation</p>
              <div className="mt-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">High</div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Para</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '1 BHK Flats', price: '₹8-14 Lakh', rent: '₹4,000-6,500/mo' },
              { type: '2 BHK Flats', price: '₹14-25 Lakh', rent: '₹6,500-10,000/mo' },
              { type: '3 BHK Flats', price: '₹25-40 Lakh', rent: '₹10,000-16,000/mo' },
              { type: 'Warehouses', price: '₹30 Lakh-2 Cr', rent: '₹15,000-70,000/mo' },
              { type: 'Industrial Plots', price: '₹2,000-3,500/sqft', rent: '-' },
              { type: 'Residential Plots', price: '₹2,200-3,800/sqft', rent: '-' },
              { type: 'Independent Houses', price: '₹25-55 Lakh', rent: '₹10,000-20,000/mo' },
              { type: 'Shops', price: '₹10-30 Lakh', rent: '₹6,000-18,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Para&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-white p-4 rounded-xl hover:shadow-md transition border border-gray-100">
                <h3 className="font-semibold text-gray-800">{item.type}</h3>
                <p className="text-sm text-orange-600">Buy: {item.price}</p>
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
                <li>• Local Schools</li>
                <li>• Government Schools</li>
                <li>• Coaching Centers</li>
                <li>• ITI Institutes</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <Cross className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Healthcare</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Local Clinics</li>
                <li>• Government Hospital</li>
                <li>• Pharmacies</li>
                <li>• Sahara Hospital (10 km)</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <ShoppingBag className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Shopping</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Local Markets</li>
                <li>• Grocery Stores</li>
                <li>• Hardware Shops</li>
                <li>• Alambagh Market (8 km)</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <Car className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Connectivity</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Kanpur Road</li>
                <li>• Airport (15 km)</li>
                <li>• Charbagh (12 km)</li>
                <li>• Bus Services</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Invest in Para?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: 'High Growth', desc: '15% YoY appreciation' },
              { icon: Home, title: 'Affordable', desc: 'Lowest prices in Lucknow' },
              { icon: Factory, title: 'Industrial Hub', desc: 'Business opportunities' },
              { icon: Car, title: 'Connectivity', desc: 'Near Kanpur Road' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <item.icon className="w-10 h-10 text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-orange-600 to-orange-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Find Affordable Property in Para</h2>
          <p className="text-orange-100 mb-8">Best investment for budget-conscious buyers</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Para" className="bg-white text-orange-700 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition">View All Properties</Link>
            <a href="tel:+919872364476" className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-400 transition flex items-center gap-2"><Phone className="w-5 h-5" /> Call Now</a>
            <a href="https://wa.me/919872364476" className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Related Locations */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Nearby Areas</h2>
          <div className="flex flex-wrap gap-3">
            {['Kanpur Road', 'Alambagh', 'Amausi', 'Transport Nagar', 'Ashiyana', 'Rajajipuram'].map((loc, i) => (
              <Link key={i} href={`/locations/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition">{loc}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
