import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Aliganj Lucknow | Buy, Sell & Rent Flats, Houses | Estato',
  description: 'Find properties in Aliganj, Lucknow. Buy/rent 1BHK, 2BHK, 3BHK flats, houses, PG rooms. Family-friendly area with schools, markets & hospitals.',
  keywords: 'property aliganj, flats in aliganj, house for sale aliganj, rent in aliganj lucknow, 2bhk aliganj, pg in aliganj, sector h aliganj',
}

export default function AliganjPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Aliganj</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Aliganj – Family-Friendly Residential Hub
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Aliganj is one of Lucknow's most established and family-friendly residential areas. Find affordable flats, houses, PG rooms with excellent schools, markets, and healthcare facilities.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Aliganj&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Aliganj&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Aliganj, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
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
            <div><div className="text-3xl font-bold text-primary-600">₹3,500</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹4,500</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.6★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Aliganj, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Aliganj is one of Lucknow's oldest and most well-established residential localities. Located in North Lucknow, it's known for its peaceful environment, tree-lined streets, and strong community feel.
              </p>
              <p className="text-gray-600 mb-4">
                The area is divided into multiple sectors (A to K) with Sector H being the most premium. Kapoorthala, Vrindavan Colony, and Chandganj are popular sub-localities within Aliganj.
              </p>
              <p className="text-gray-600">
                Aliganj is ideal for families due to its excellent schools, healthcare facilities, and the famous Aliganj Market which offers everything from groceries to electronics.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ 8 km from Charbagh Railway Station</li>
                <li>✅ 20 km from Lucknow Airport</li>
                <li>✅ Near Polytechnic Chauraha</li>
                <li>✅ Famous Aliganj Market</li>
                <li>✅ Top Schools & Colleges</li>
                <li>✅ Multiple Hospitals Nearby</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Aliganj</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '1 BHK Flats', price: '₹12-20 Lakh', rent: '₹6,000-10,000/mo' },
              { type: '2 BHK Flats', price: '₹25-40 Lakh', rent: '₹10,000-15,000/mo' },
              { type: '3 BHK Flats', price: '₹40-65 Lakh', rent: '₹15,000-25,000/mo' },
              { type: 'Independent Houses', price: '₹60 Lakh-1.5 Cr', rent: '₹20,000-40,000/mo' },
              { type: 'Villas', price: '₹80 Lakh-2 Cr', rent: '₹30,000-50,000/mo' },
              { type: 'PG/Rooms', price: '-', rent: '₹3,500-7,000/mo' },
              { type: 'Shops', price: '₹15-40 Lakh', rent: '₹10,000-30,000/mo' },
              { type: 'Plots', price: '₹4,000-6,000/sqft', rent: '-' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Aliganj&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Sectors & Colonies in Aliganj</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              'Sector A', 'Sector B', 'Sector C', 'Sector D', 'Sector E',
              'Sector F', 'Sector G', 'Sector H', 'Sector J', 'Sector K',
              'Kapoorthala', 'Vrindavan Colony', 'Chandganj', 'Keshav Nagar', 'Chandralok Colony'
            ].map((sector, i) => (
              <Link key={i} href={`/locations/aliganj-${sector.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center">
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
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><School className="w-5 h-5 text-primary-600" /> Schools & Colleges</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• City Montessori School</li>
                <li>• Lucknow Public School</li>
                <li>• St. Francis College</li>
                <li>• Navyug Radiance School</li>
                <li>• Kendriya Vidyalaya</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Cross className="w-5 h-5 text-primary-600" /> Hospitals</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Vivekananda Hospital</li>
                <li>• Mayo Hospital</li>
                <li>• Chandan Hospital</li>
                <li>• Shekhar Hospital</li>
                <li>• Multiple Clinics</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary-600" /> Shopping & Markets</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Aliganj Main Market</li>
                <li>• Kapoorthala Market</li>
                <li>• Sector H Market</li>
                <li>• Big Bazaar</li>
                <li>• Local Vegetable Markets</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Aliganj?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Users, title: 'Family-Friendly', desc: 'Safe, peaceful residential area' },
              { icon: School, title: 'Top Schools', desc: 'CMS, LPS, St. Francis nearby' },
              { icon: ShoppingBag, title: 'Great Market', desc: 'Famous Aliganj Market' },
              { icon: CheckCircle, title: 'Affordable', desc: 'Reasonable property prices' },
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Your Perfect Home in Aliganj</h2>
          <p className="text-primary-100 mb-8">Contact us on WhatsApp for family-friendly property listings</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Aliganj" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Jankipuram', 'Mahanagar', 'Vikas Nagar', 'Indira Nagar', 'Gomti Nagar', 'Kapoorthala'].map((loc, i) => (
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
