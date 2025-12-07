import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Gomti Nagar Extension Lucknow | Near Lulu Mall | Estato',
  description: 'Find properties in Gomti Nagar Extension near Lulu Mall & Phoenix Palassio. Buy/rent 2BHK, 3BHK, 4BHK flats, villas, plots. New projects with modern amenities.',
  keywords: 'property gomti nagar extension, flats near lulu mall, house near phoenix palassio, 3bhk gomti nagar extension, villa gomti nagar extension lucknow',
}

export default function GomtiNagarExtensionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Gomti Nagar Extension</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Gomti Nagar Extension – Near Lulu Mall & Phoenix Palassio
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Gomti Nagar Extension is Lucknow's fastest-growing premium locality near Lulu Mall & Phoenix Palassio. Find modern flats, villas, plots & commercial spaces with world-class amenities.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Gomti Nagar Extension&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Gomti Nagar Extension&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Gomti Nagar Extension, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              💬 WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">300+</div><div className="text-gray-600">Properties Listed</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹5,000</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹7,500</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.9★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Gomti Nagar Extension, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Gomti Nagar Extension is the newest and most premium extension of Gomti Nagar, developed along the Shaheed Path. It has emerged as Lucknow's most sought-after address for luxury living.
              </p>
              <p className="text-gray-600 mb-4">
                The area is home to Lucknow's biggest attractions - Lulu Mall (India's largest mall), Phoenix Palassio, and Ekana International Cricket Stadium. This has made it a hotspot for real estate investment.
              </p>
              <p className="text-gray-600">
                With wide roads, modern infrastructure, gated societies, and proximity to IT parks, Gomti Nagar Extension offers the perfect blend of luxury living and investment potential.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Adjacent to Lulu Mall</li>
                <li>✅ Near Phoenix Palassio Mall</li>
                <li>✅ 2 km from Ekana Stadium</li>
                <li>✅ 10 km from Lucknow Airport</li>
                <li>✅ On Shaheed Path (Ring Road)</li>
                <li>✅ Near IT City & Tech Parks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Gomti Nagar Extension</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '2 BHK Flats', price: '₹40-60 Lakh', rent: '₹15,000-22,000/mo' },
              { type: '3 BHK Flats', price: '₹60-95 Lakh', rent: '₹22,000-35,000/mo' },
              { type: '4 BHK Flats', price: '₹95 Lakh-1.8 Cr', rent: '₹35,000-60,000/mo' },
              { type: 'Penthouses', price: '₹1.5-3 Crore', rent: '₹50,000-1 Lakh/mo' },
              { type: 'Villas', price: '₹1.5-4 Crore', rent: '₹50,000-1 Lakh/mo' },
              { type: 'Plots', price: '₹8,000-12,000/sqft', rent: '-' },
              { type: 'Shops', price: '₹30-80 Lakh', rent: '₹25,000-60,000/mo' },
              { type: 'Offices', price: '₹40 Lakh-1.5 Cr', rent: '₹30,000-80,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Gomti Nagar Extension&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
                <h3 className="font-semibold text-gray-800">{item.type}</h3>
                <p className="text-sm text-primary-600">Buy: {item.price}</p>
                <p className="text-sm text-gray-500">Rent: {item.rent}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Projects */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Projects & Societies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              'Eldeco Eternia', 'Omaxe Residency', 'ATS Greens', 'Shalimar Mannat', 'Purvanchal Heights',
              'Eldeco City', 'Ansal API', 'Sushant Golf City', 'Omaxe Grand', 'DLF Garden City'
            ].map((project, i) => (
              <div key={i} className="bg-white px-4 py-3 rounded-lg border border-gray-200 text-center">
                {project}
              </div>
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
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary-600" /> Shopping & Entertainment</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Lulu Mall (0.5 km)</li>
                <li>• Phoenix Palassio (1 km)</li>
                <li>• Ekana Stadium (2 km)</li>
                <li>• Fun Republic Mall (5 km)</li>
                <li>• Riverside Mall (6 km)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Cross className="w-5 h-5 text-primary-600" /> Hospitals</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Medanta Hospital (3 km)</li>
                <li>• Sahara Hospital (5 km)</li>
                <li>• Apollo Hospital (6 km)</li>
                <li>• SGPGI (8 km)</li>
                <li>• KGMU (10 km)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><School className="w-5 h-5 text-primary-600" /> Schools & Colleges</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• CMS Gomti Nagar</li>
                <li>• DPS Eldeco</li>
                <li>• Seth MR Jaipuria</li>
                <li>• Amity University</li>
                <li>• BBDU</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Invest in Gomti Nagar Extension?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: 'High ROI', desc: '15-20% yearly appreciation' },
              { icon: ShoppingBag, title: 'Premium Lifestyle', desc: 'Near Lulu Mall & Phoenix' },
              { icon: Car, title: 'Great Connectivity', desc: 'Ring Road & Airport access' },
              { icon: Building2, title: 'New Projects', desc: 'Modern gated societies' },
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Your Dream Property in Gomti Nagar Extension</h2>
          <p className="text-primary-100 mb-8">Contact us on WhatsApp for instant property listings near Lulu Mall</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Gomti Nagar Extension" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Gomti Nagar', 'Sushant Golf City', 'Shaheed Path', 'Chinhat', 'Faizabad Road', 'Indira Nagar'].map((loc, i) => (
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
