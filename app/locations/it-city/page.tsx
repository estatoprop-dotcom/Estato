import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, TreePine, Wind, Droplets, Users, Phone, Wifi, Zap, Monitor, Briefcase, Coffee } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in IT City Lucknow | Tech Hub | Estato',
  description: 'Find properties in IT City, Lucknow technology hub. Buy/rent flats, offices near TCS, HCL, Infosys. Best location for IT professionals with modern amenities.',
  keywords: 'property it city lucknow, flats near tcs lucknow, office space it city, it park lucknow property, tech hub lucknow, software park lucknow',
  openGraph: {
    title: 'Property in IT City Lucknow | Technology Hub',
    description: 'Premium properties near IT companies in Lucknow tech corridor',
    type: 'website',
  },
}

export default function ITCityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-indigo-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">IT City</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">💻 Tech Hub</span>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">🏢 IT Companies</span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">🚀 Growth Corridor</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in IT City – Lucknow's Technology Hub
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mb-6">
            IT City is Lucknow's premier technology corridor, home to TCS, HCL, Infosys, and other IT giants. Find modern flats and offices perfect for tech professionals.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=IT City&listing_type=sale" className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition">🏠 Buy Property</Link>
            <Link href="/properties?area=IT City&listing_type=rent" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-500 transition border border-indigo-500">🔑 Rent Property</Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in IT City, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            <div className="bg-indigo-50 p-4 rounded-xl"><div className="text-2xl font-bold text-indigo-600">200+</div><div className="text-sm text-gray-600">Properties</div></div>
            <div className="bg-green-50 p-4 rounded-xl"><div className="text-2xl font-bold text-green-600">15+</div><div className="text-sm text-gray-600">IT Companies</div></div>
            <div className="bg-blue-50 p-4 rounded-xl"><div className="text-2xl font-bold text-blue-600">50,000+</div><div className="text-sm text-gray-600">IT Employees</div></div>
            <div className="bg-yellow-50 p-4 rounded-xl"><div className="text-2xl font-bold text-yellow-600">₹6,500</div><div className="text-sm text-gray-600">Avg/sqft</div></div>
            <div className="bg-purple-50 p-4 rounded-xl"><div className="text-2xl font-bold text-purple-600">AQI 55</div><div className="text-sm text-gray-600">Air Quality</div></div>
            <div className="bg-red-50 p-4 rounded-xl"><div className="text-2xl font-bold text-red-600">4.7★</div><div className="text-sm text-gray-600">Rating</div></div>
          </div>
        </div>
      </section>

      {/* IT Companies */}
      <section className="py-12 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">💻 Major IT Companies</h2>
          <div className="grid md:grid-cols-6 gap-4">
            {[
              { name: 'TCS', desc: 'Tata Consultancy' },
              { name: 'HCL', desc: 'HCL Technologies' },
              { name: 'Infosys', desc: 'Infosys Ltd' },
              { name: 'Wipro', desc: 'Wipro Limited' },
              { name: 'Tech Mahindra', desc: 'Tech Mahindra' },
              { name: 'Cognizant', desc: 'Cognizant Tech' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-sm text-center">
                <Monitor className="w-10 h-10 text-indigo-600 mx-auto mb-2" />
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-6 gap-4 mt-4">
            {[
              { name: 'Capgemini', desc: 'Capgemini India' },
              { name: 'Accenture', desc: 'Accenture India' },
              { name: 'IBM', desc: 'IBM India' },
              { name: 'Startups', desc: '100+ Startups' },
              { name: 'BPOs', desc: 'Call Centers' },
              { name: 'IT Parks', desc: 'Multiple SEZs' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-sm text-center">
                <Briefcase className="w-10 h-10 text-indigo-600 mx-auto mb-2" />
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environment */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🌿 Environment & Infrastructure</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border-2 border-indigo-100">
              <Wind className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Air Quality</h3>
              <div className="text-3xl font-bold text-green-600 my-2">AQI 55</div>
              <p className="text-sm text-gray-600">Good - Green Zone</p>
              <div className="mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Healthy</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border-2 border-indigo-100">
              <Wifi className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Connectivity</h3>
              <div className="text-3xl font-bold text-indigo-600 my-2">Fiber</div>
              <p className="text-sm text-gray-600">High-Speed Internet</p>
              <div className="mt-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs">1 Gbps+</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border-2 border-blue-100">
              <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Power</h3>
              <div className="text-3xl font-bold text-yellow-600 my-2">24/7</div>
              <p className="text-sm text-gray-600">Uninterrupted Supply</p>
              <div className="mt-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">IT Grade</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border-2 border-green-100">
              <TreePine className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Green Cover</h3>
              <div className="text-3xl font-bold text-green-600 my-2">30%</div>
              <p className="text-sm text-gray-600">Planned Landscaping</p>
              <div className="mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Eco-Friendly</div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About IT City</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                IT City is located on Shaheed Path (Ring Road) near Gomti Nagar Extension. It's Lucknow's dedicated technology corridor with multiple IT parks, SEZs, and corporate offices.
              </p>
              <p className="text-gray-600 mb-4">
                Major IT companies like TCS, HCL, Infosys, and Wipro have their campuses here, employing over 50,000 IT professionals. The area has modern infrastructure with high-speed internet, 24/7 power, and excellent connectivity.
              </p>
              <p className="text-gray-600 mb-4">
                Properties near IT City are in high demand from young professionals. The area offers modern apartments, co-living spaces, and premium housing options with quick commute to workplaces.
              </p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2"><MapPin className="w-5 h-5 text-indigo-600" /> Shaheed Path (Ring Road)</li>
                <li className="flex items-center gap-2"><Building2 className="w-5 h-5 text-indigo-600" /> Near Gomti Nagar Extension</li>
                <li className="flex items-center gap-2"><Monitor className="w-5 h-5 text-indigo-600" /> Multiple IT Parks</li>
                <li className="flex items-center gap-2"><Car className="w-5 h-5 text-indigo-600" /> 20 km from Airport</li>
                <li className="flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-indigo-600" /> Near Lulu Mall</li>
                <li className="flex items-center gap-2"><Coffee className="w-5 h-5 text-indigo-600" /> Cafes & Restaurants</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in IT City</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '1 BHK Flats', price: '₹25-40 Lakh', rent: '₹10,000-16,000/mo' },
              { type: '2 BHK Flats', price: '₹40-65 Lakh', rent: '₹16,000-25,000/mo' },
              { type: '3 BHK Flats', price: '₹65-95 Lakh', rent: '₹25,000-40,000/mo' },
              { type: 'Studio Apartments', price: '₹18-30 Lakh', rent: '₹8,000-14,000/mo' },
              { type: 'Co-Living', price: '-', rent: '₹6,000-12,000/mo' },
              { type: 'PG/Hostels', price: '-', rent: '₹4,000-8,000/mo' },
              { type: 'Office Space', price: '₹40 Lakh-2 Cr', rent: '₹25,000-1 Lakh/mo' },
              { type: 'Commercial', price: '₹50 Lakh-3 Cr', rent: '₹30,000-1.5 Lakh/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=IT City&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-white p-4 rounded-xl hover:shadow-md transition border border-gray-100">
                <h3 className="font-semibold text-gray-800">{item.type}</h3>
                <p className="text-sm text-indigo-600">Buy: {item.price}</p>
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
                <li>• DPS Eldeco (5 km)</li>
                <li>• Amity University (8 km)</li>
                <li>• IIM Lucknow (12 km)</li>
                <li>• BBAU (10 km)</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <Cross className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Healthcare</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Medanta Hospital (5 km)</li>
                <li>• Apollo Hospital (8 km)</li>
                <li>• SGPGI (15 km)</li>
                <li>• Clinics & Pharmacies</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <ShoppingBag className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Shopping</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Lulu Mall (3 km)</li>
                <li>• Phoenix Palassio (4 km)</li>
                <li>• Food Courts</li>
                <li>• Supermarkets</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <Coffee className="w-8 h-8 text-amber-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Lifestyle</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cafes & Restaurants</li>
                <li>• Gyms & Fitness</li>
                <li>• Pubs & Lounges</li>
                <li>• Multiplexes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle */}
      <section className="py-12 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">👨‍💻 IT Professional Lifestyle</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'Quick Commute', desc: 'Walk to office, save time' },
              { title: 'Work-Life Balance', desc: 'Malls, cafes, entertainment' },
              { title: 'Young Community', desc: 'Like-minded professionals' },
              { title: 'Modern Living', desc: 'Smart homes, co-living' },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 p-5 rounded-xl backdrop-blur">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-indigo-100 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Find Property Near IT City</h2>
          <p className="text-primary-100 mb-8">Perfect homes for IT professionals</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=IT City" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">View All Properties</Link>
            <a href="tel:+919872364476" className="bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition flex items-center gap-2"><Phone className="w-5 h-5" /> Call Now</a>
            <a href="https://wa.me/919872364476" className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Related Locations */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Nearby Areas</h2>
          <div className="flex flex-wrap gap-3">
            {['Gomti Nagar Extension', 'Shaheed Path', 'Near Lulu Mall', 'Sushant Golf City', 'Chinhat', 'Faizabad Road'].map((loc, i) => (
              <Link key={i} href={`/locations/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition">{loc}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
