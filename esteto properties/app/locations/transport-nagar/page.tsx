import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, Cross, ShoppingBag, Car, TrendingUp, Truck, Warehouse } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Transport Nagar Lucknow | Logistics Hub | Estato',
  description: 'Find properties in Transport Nagar, Lucknow logistics and transport hub. Buy/rent warehouses, godowns, offices for transport companies.',
  keywords: 'property transport nagar, warehouse transport nagar lucknow, godown for rent transport nagar, office transport nagar, logistics property lucknow',
}

export default function TransportNagarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Transport Nagar</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Transport Nagar – Lucknow's Logistics Hub
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Transport Nagar is Lucknow's main logistics and transport hub. Find warehouses, godowns, offices, and commercial spaces for transport and logistics businesses.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Transport Nagar&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏢 Buy Property
            </Link>
            <Link href="/properties?area=Transport Nagar&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Transport Nagar, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
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
            <div><div className="text-3xl font-bold text-primary-600">₹25</div><div className="text-gray-600">Avg. Warehouse Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹4,000</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.3★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Transport Nagar, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Transport Nagar is Lucknow's dedicated logistics and transport hub, located near Alambagh and Kanpur Road. It's home to hundreds of transport companies, truck operators, and logistics providers.
              </p>
              <p className="text-gray-600 mb-4">
                The area has warehouses, godowns, truck parking, loading/unloading facilities, and offices for transport businesses. It serves as the distribution center for goods coming in and out of Lucknow.
              </p>
              <p className="text-gray-600">
                For businesses in logistics, transportation, or distribution, Transport Nagar offers the ideal location with all necessary infrastructure and connectivity.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Main Logistics Hub</li>
                <li>✅ Near Kanpur Road</li>
                <li>✅ 8 km from Airport</li>
                <li>✅ Near Alambagh Bus Stand</li>
                <li>✅ Truck Parking Facilities</li>
                <li>✅ 24x7 Operations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Transport Nagar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'Warehouses', price: '₹40 Lakh-2.5 Cr', rent: '₹15,000-80,000/mo' },
              { type: 'Godowns', price: '₹30 Lakh-1.5 Cr', rent: '₹12,000-50,000/mo' },
              { type: 'Offices', price: '₹20-60 Lakh', rent: '₹10,000-35,000/mo' },
              { type: 'Commercial Space', price: '₹25 Lakh-1 Cr', rent: '₹15,000-45,000/mo' },
              { type: 'Truck Parking', price: '₹15-40 Lakh', rent: '₹8,000-25,000/mo' },
              { type: 'Cold Storage', price: '₹50 Lakh-3 Cr', rent: '₹30,000-1.5 Lakh/mo' },
              { type: 'Shops', price: '₹15-40 Lakh', rent: '₹8,000-25,000/mo' },
              { type: 'Flats', price: '₹18-35 Lakh', rent: '₹7,000-14,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Transport Nagar&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
                <h3 className="font-semibold text-gray-800">{item.type}</h3>
                <p className="text-sm text-primary-600">Buy: {item.price}</p>
                <p className="text-sm text-gray-500">Rent: {item.rent}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Services in Transport Nagar</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Truck className="w-5 h-5 text-primary-600" /> Transport Services</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Full Truck Load (FTL)</li>
                <li>• Part Load Services</li>
                <li>• Packers & Movers</li>
                <li>• Container Services</li>
                <li>• Express Delivery</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Warehouse className="w-5 h-5 text-primary-600" /> Storage</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Warehousing</li>
                <li>• Cold Storage</li>
                <li>• Bonded Warehouse</li>
                <li>• Distribution Centers</li>
                <li>• Inventory Management</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary-600" /> Support Services</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Truck Repair Shops</li>
                <li>• Spare Parts</li>
                <li>• Fuel Stations</li>
                <li>• Dhabas & Restaurants</li>
                <li>• Banks & ATMs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Transport Nagar?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Logistics Hub', desc: 'All transport companies' },
              { icon: Warehouse, title: 'Storage Options', desc: 'Warehouses & godowns' },
              { icon: Car, title: 'Connectivity', desc: 'Near highways & airport' },
              { icon: CheckCircle, title: 'Infrastructure', desc: 'Complete logistics setup' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Logistics Property in Transport Nagar</h2>
          <p className="text-primary-100 mb-8">Contact us for warehouses, godowns & offices</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Transport Nagar" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Alambagh', 'Kanpur Road', 'Amausi', 'Chinhat', 'Dubagga', 'Charbagh'].map((loc, i) => (
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
