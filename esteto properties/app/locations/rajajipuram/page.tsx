import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Rajajipuram Lucknow | Affordable Housing | Estato',
  description: 'Find affordable properties in Rajajipuram, Lucknow. Buy/rent 1BHK, 2BHK, 3BHK flats in various blocks. Budget-friendly residential area in West Lucknow.',
  keywords: 'property rajajipuram, flats in rajajipuram lucknow, house for rent rajajipuram, 2bhk rajajipuram, pg in rajajipuram, rajajipuram blocks',
}

export default function RajajipuramPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Rajajipuram</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Rajajipuram – Affordable Housing in West Lucknow
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Rajajipuram is one of Lucknow's largest and most affordable residential areas in West Lucknow. Find budget-friendly flats, houses, and PG rooms across multiple blocks.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Rajajipuram&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Rajajipuram&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Rajajipuram, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              💬 WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">400+</div><div className="text-gray-600">Properties Listed</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹2,800</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹3,800</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.3★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Rajajipuram, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Rajajipuram is one of the largest residential colonies in Lucknow, located in West Lucknow near Alambagh. It was developed as a planned township and is divided into multiple blocks (A to P).
              </p>
              <p className="text-gray-600 mb-4">
                The area is known for its affordable housing options, making it popular among middle-class families and first-time home buyers. Each block has its own market, schools, and community facilities.
              </p>
              <p className="text-gray-600">
                With good connectivity to Charbagh Railway Station and Alambagh Bus Stand, Rajajipuram is ideal for working professionals who commute to different parts of the city.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ 5 km from Charbagh Station</li>
                <li>✅ Near Alambagh Bus Stand</li>
                <li>✅ On Kanpur Road</li>
                <li>✅ Multiple Blocks (A to P)</li>
                <li>✅ Affordable Housing</li>
                <li>✅ Well-Connected Area</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Rajajipuram</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '1 BHK Flats', price: '₹10-18 Lakh', rent: '₹5,000-8,000/mo' },
              { type: '2 BHK Flats', price: '₹18-30 Lakh', rent: '₹8,000-12,000/mo' },
              { type: '3 BHK Flats', price: '₹30-50 Lakh', rent: '₹12,000-18,000/mo' },
              { type: 'Independent Houses', price: '₹40-80 Lakh', rent: '₹15,000-25,000/mo' },
              { type: 'Builder Floors', price: '₹25-50 Lakh', rent: '₹10,000-18,000/mo' },
              { type: 'PG/Rooms', price: '-', rent: '₹3,000-6,000/mo' },
              { type: 'Plots', price: '₹2,500-4,000/sqft', rent: '-' },
              { type: 'Shops', price: '₹12-35 Lakh', rent: '₹8,000-25,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Rajajipuram&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
                <h3 className="font-semibold text-gray-800">{item.type}</h3>
                <p className="text-sm text-primary-600">Buy: {item.price}</p>
                <p className="text-sm text-gray-500">Rent: {item.rent}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blocks */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Blocks in Rajajipuram</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-3">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'].map((block, i) => (
              <Link key={i} href={`/locations/rajajipuram-block-${block.toLowerCase()}`} className="bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center font-semibold">
                Block {block}
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
                <li>• CMS Rajajipuram</li>
                <li>• St. Joseph's School</li>
                <li>• Kendriya Vidyalaya</li>
                <li>• Multiple Public Schools</li>
                <li>• Coaching Centers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Cross className="w-5 h-5 text-primary-600" /> Hospitals</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• KGMU (nearby)</li>
                <li>• Balrampur Hospital</li>
                <li>• Local Nursing Homes</li>
                <li>• Clinics in Each Block</li>
                <li>• Pharmacy Stores</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary-600" /> Shopping</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Block Markets</li>
                <li>• Alambagh Market (nearby)</li>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Rajajipuram?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle, title: 'Most Affordable', desc: 'Budget-friendly housing' },
              { icon: Building2, title: 'Planned Colony', desc: 'Organized block system' },
              { icon: Car, title: 'Good Connectivity', desc: 'Near Charbagh & Alambagh' },
              { icon: Users, title: 'Community Living', desc: 'Markets in each block' },
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Affordable Property in Rajajipuram</h2>
          <p className="text-primary-100 mb-8">Contact us on WhatsApp for budget-friendly listings</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Rajajipuram" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Alambagh', 'Aishbagh', 'Charbagh', 'Kaiserbagh', 'Transport Nagar', 'Kanpur Road'].map((loc, i) => (
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
