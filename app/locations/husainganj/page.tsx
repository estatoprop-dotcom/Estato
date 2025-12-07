import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Landmark } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Husainganj Lucknow | Central Location | Estato',
  description: 'Find properties in Husainganj, central Lucknow. Buy/rent flats, shops, offices near Hazratganj. Prime residential and commercial location.',
  keywords: 'property husainganj, flats in husainganj lucknow, shop for rent husainganj, office husainganj, near hazratganj property',
}

export default function HusainganjPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Husainganj</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Property in Husainganj – Central Lucknow</h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Husainganj is a prime central location adjacent to Hazratganj. Find flats, shops, and offices in this well-connected residential and commercial area.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Husainganj&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">🏠 Buy Property</Link>
            <Link href="/properties?area=Husainganj&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">🔑 Rent Property</Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Husainganj, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">100+</div><div className="text-gray-600">Properties</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹4,500</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹8,000</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.6★</div><div className="text-gray-600">Rating</div></div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Husainganj</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">Husainganj is located adjacent to Hazratganj and is one of Lucknow's oldest and most established localities. It offers a mix of residential apartments, independent houses, and commercial spaces.</p>
              <p className="text-gray-600 mb-4">The area is well-connected by roads and is close to major landmarks like Sahara Ganj Mall, GPO, and Vidhan Sabha. It's popular among professionals working in central Lucknow.</p>
              <p className="text-gray-600">With its central location and good infrastructure, Husainganj is ideal for those seeking convenient urban living.</p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Adjacent to Hazratganj</li>
                <li>✅ Near Sahara Ganj Mall</li>
                <li>✅ 4 km from Charbagh Station</li>
                <li>✅ Central Location</li>
                <li>✅ Good Connectivity</li>
                <li>✅ Established Area</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '2 BHK Flats', price: '₹35-55 Lakh', rent: '₹12,000-20,000/mo' },
              { type: '3 BHK Flats', price: '₹55-90 Lakh', rent: '₹20,000-35,000/mo' },
              { type: 'Shops', price: '₹25-80 Lakh', rent: '₹15,000-50,000/mo' },
              { type: 'Offices', price: '₹30-70 Lakh', rent: '₹18,000-45,000/mo' },
              { type: 'Independent Houses', price: '₹70 Lakh-1.5 Cr', rent: '₹25,000-50,000/mo' },
              { type: 'PG/Rooms', price: '-', rent: '₹5,000-10,000/mo' },
              { type: 'Commercial Space', price: '₹40 Lakh-1.5 Cr', rent: '₹25,000-80,000/mo' },
              { type: 'Builder Floors', price: '₹40-70 Lakh', rent: '₹15,000-28,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Husainganj&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
                <h3 className="font-semibold text-gray-800">{item.type}</h3>
                <p className="text-sm text-primary-600">Buy: {item.price}</p>
                <p className="text-sm text-gray-500">Rent: {item.rent}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Find Property in Husainganj</h2>
          <p className="text-primary-100 mb-8">Contact us for listings in central Lucknow</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Husainganj" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">View All Properties</Link>
            <a href="https://wa.me/919872364476" className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Nearby Areas</h2>
          <div className="flex flex-wrap gap-3">
            {['Hazratganj', 'Kaiserbagh', 'Aminabad', 'Charbagh', 'Mahanagar', 'Naka Hindola'].map((loc, i) => (
              <Link key={i} href={`/locations/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition">{loc}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
