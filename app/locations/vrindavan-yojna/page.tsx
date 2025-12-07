import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Users, TreePine } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Vrindavan Yojna Lucknow | LDA Township | Estato',
  description: 'Find properties in Vrindavan Yojna, Lucknow LDA developed township. Buy/rent flats, houses, plots in well-planned sectors near Raebareli Road.',
  keywords: 'property vrindavan yojna, flats in vrindavan yojna lucknow, plot in vrindavan yojna, house for sale vrindavan yojna, lda colony lucknow',
}

export default function VrindavanYojnaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Vrindavan Yojna</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Vrindavan Yojna – LDA Developed Township
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Vrindavan Yojna is a large LDA-developed township in South Lucknow. Find affordable plots, flats, and houses in well-planned sectors with excellent infrastructure.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Vrindavan Yojna&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Vrindavan Yojna&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Vrindavan Yojna, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              💬 WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">350+</div><div className="text-gray-600">Properties Listed</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹3,000</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹4,200</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.5★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Vrindavan Yojna, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Vrindavan Yojna is one of Lucknow's largest residential townships, developed by LDA (Lucknow Development Authority). Spread over thousands of acres, it offers affordable housing options for middle-class families.
              </p>
              <p className="text-gray-600 mb-4">
                The township is divided into multiple sectors (1 to 20+) with each sector having its own parks, markets, and community facilities. It's located on Raebareli Road, providing good connectivity to the city center.
              </p>
              <p className="text-gray-600">
                Vrindavan Yojna is ideal for first-time home buyers and investors looking for affordable plots and flats with good appreciation potential.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ LDA Developed Township</li>
                <li>✅ On Raebareli Road</li>
                <li>✅ Near SGPGI Hospital (8 km)</li>
                <li>✅ 15 km from Charbagh Station</li>
                <li>✅ Multiple Sectors</li>
                <li>✅ Affordable Housing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Vrindavan Yojna</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '1 BHK Flats', price: '₹12-20 Lakh', rent: '₹5,000-8,000/mo' },
              { type: '2 BHK Flats', price: '₹22-38 Lakh', rent: '₹8,000-13,000/mo' },
              { type: '3 BHK Flats', price: '₹38-60 Lakh', rent: '₹13,000-20,000/mo' },
              { type: 'Independent Houses', price: '₹45-90 Lakh', rent: '₹15,000-30,000/mo' },
              { type: 'Plots', price: '₹3,000-5,000/sqft', rent: '-' },
              { type: 'Builder Floors', price: '₹28-50 Lakh', rent: '₹10,000-18,000/mo' },
              { type: 'PG/Rooms', price: '-', rent: '₹3,500-6,000/mo' },
              { type: 'Shops', price: '₹15-40 Lakh', rent: '₹10,000-25,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Vrindavan Yojna&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
                <h3 className="font-semibold text-gray-800">{item.type}</h3>
                <p className="text-sm text-primary-600">Buy: {item.price}</p>
                <p className="text-sm text-gray-500">Rent: {item.rent}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sectors in Vrindavan Yojna</h2>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {Array.from({length: 20}, (_, i) => `Sector ${i + 1}`).map((sector, i) => (
              <Link key={i} href={`/locations/vrindavan-yojna-${sector.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-3 py-2 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center text-sm">
                {sector}
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
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><School className="w-5 h-5 text-primary-600" /> Schools</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• CMS Vrindavan Yojna</li>
                <li>• DPS (nearby)</li>
                <li>• Kendriya Vidyalaya</li>
                <li>• Public Schools</li>
                <li>• Play Schools</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Cross className="w-5 h-5 text-primary-600" /> Hospitals</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• SGPGI (8 km)</li>
                <li>• RMLIMS (10 km)</li>
                <li>• Local Nursing Homes</li>
                <li>• Clinics</li>
                <li>• Pharmacies</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary-600" /> Shopping</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Sector Markets</li>
                <li>• Main Market</li>
                <li>• Vegetable Markets</li>
                <li>• Banks & ATMs</li>
                <li>• Local Shops</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Vrindavan Yojna?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: 'LDA Township', desc: 'Government developed' },
              { icon: CheckCircle, title: 'Affordable', desc: 'Budget-friendly options' },
              { icon: TrendingUp, title: 'Appreciation', desc: 'Good investment potential' },
              { icon: TreePine, title: 'Green Spaces', desc: 'Parks in every sector' },
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Property in Vrindavan Yojna</h2>
          <p className="text-primary-100 mb-8">Contact us for affordable plots and flats</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Vrindavan Yojna" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Ashiyana', 'Telibagh', 'Raebareli Road', 'Sushant Golf City', 'Gomti Nagar', 'Sultanpur Road'].map((loc, i) => (
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
