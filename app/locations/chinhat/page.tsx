import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Factory, Warehouse } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Chinhat Lucknow | Industrial & Residential | Estato',
  description: 'Find properties in Chinhat, Lucknow industrial and residential area. Buy/rent flats, houses, commercial spaces, warehouses near Chinhat Industrial Area.',
  keywords: 'property chinhat, flats in chinhat lucknow, warehouse chinhat, industrial property chinhat, house for sale chinhat, chinhat industrial area',
}

export default function ChinhatPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Chinhat</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Chinhat – Industrial & Residential Hub
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Chinhat is a major industrial and residential area on Faizabad Road. Find warehouses, industrial plots, commercial spaces, and affordable residential properties.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Chinhat&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Chinhat&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Chinhat, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              💬 WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">180+</div><div className="text-gray-600">Properties Listed</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹2,500</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹3,500</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.2★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Chinhat, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Chinhat is located on Faizabad Road (NH-28) and is known for its industrial area and pottery industry. The famous Chinhat Pottery is a major attraction and export hub.
              </p>
              <p className="text-gray-600 mb-4">
                The area has a mix of industrial establishments, warehouses, and residential colonies. It's popular among businesses requiring warehouse and industrial space due to its strategic location on the highway.
              </p>
              <p className="text-gray-600">
                With proximity to Gomti Nagar Extension and good highway connectivity, Chinhat is ideal for logistics businesses, manufacturing units, and affordable residential options.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ On Faizabad Road (NH-28)</li>
                <li>✅ Chinhat Industrial Area</li>
                <li>✅ Famous for Pottery</li>
                <li>✅ Near Gomti Nagar Extension</li>
                <li>✅ Highway Connectivity</li>
                <li>✅ Warehouse Hub</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Chinhat</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'Warehouses', price: '₹50 Lakh-3 Cr', rent: '₹20,000-1 Lakh/mo' },
              { type: 'Industrial Plots', price: '₹2,000-4,000/sqft', rent: '-' },
              { type: 'Factory Sheds', price: '₹40 Lakh-2 Cr', rent: '₹25,000-80,000/mo' },
              { type: 'Commercial Space', price: '₹30 Lakh-1 Cr', rent: '₹15,000-50,000/mo' },
              { type: '1 BHK Flats', price: '₹10-16 Lakh', rent: '₹4,500-7,000/mo' },
              { type: '2 BHK Flats', price: '₹16-28 Lakh', rent: '₹7,000-11,000/mo' },
              { type: '3 BHK Flats', price: '₹28-45 Lakh', rent: '₹11,000-16,000/mo' },
              { type: 'Shops', price: '₹12-35 Lakh', rent: '₹8,000-25,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Chinhat&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Areas in Chinhat</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              'Chinhat Industrial Area', 'Chinhat Tiraha', 'Pottery Area', 'Nagram Road', 'Faizabad Road',
              'Chinhat Colony', 'Transport Nagar', 'Warehouse Zone', 'Residential Area', 'Market Area'
            ].map((area, i) => (
              <div key={i} className="bg-white px-4 py-3 rounded-lg border border-gray-200 text-center">
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Chinhat is Famous For */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">What Chinhat is Famous For</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Factory className="w-5 h-5 text-primary-600" /> Industries</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Chinhat Pottery (Famous)</li>
                <li>• Ceramic Industries</li>
                <li>• Manufacturing Units</li>
                <li>• Food Processing</li>
                <li>• Small Scale Industries</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Warehouse className="w-5 h-5 text-primary-600" /> Logistics</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Warehouses</li>
                <li>• Godowns</li>
                <li>• Distribution Centers</li>
                <li>• Transport Companies</li>
                <li>• Cold Storage</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary-600" /> Services</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Petrol Pumps</li>
                <li>• Dhabas & Restaurants</li>
                <li>• Auto Workshops</li>
                <li>• Hardware Shops</li>
                <li>• Building Materials</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Chinhat?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Factory, title: 'Industrial Hub', desc: 'Established industrial area' },
              { icon: Car, title: 'Highway Access', desc: 'On Faizabad Road NH-28' },
              { icon: Warehouse, title: 'Warehousing', desc: 'Ideal for logistics' },
              { icon: CheckCircle, title: 'Affordable', desc: 'Low property prices' },
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Industrial & Residential Property in Chinhat</h2>
          <p className="text-primary-100 mb-8">Contact us for warehouses, plots & flats</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Chinhat" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Gomti Nagar Extension', 'Indira Nagar', 'Faizabad Road', 'Nagram', 'Sultanpur Road', 'Transport Nagar'].map((loc, i) => (
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
