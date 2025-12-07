import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Users, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Jankipuram Lucknow | Affordable Flats & PG | Estato',
  description: 'Find affordable properties in Jankipuram, Lucknow. Buy/rent 1BHK, 2BHK, 3BHK flats, PG rooms near BBD University. Student-friendly area with budget options.',
  keywords: 'property jankipuram, flats in jankipuram, pg near bbd university, rent in jankipuram lucknow, affordable flats jankipuram, student accommodation jankipuram',
}

export default function JankipuramPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Jankipuram</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Jankipuram – Affordable Living Near BBD University
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Jankipuram is Lucknow's most affordable residential area, popular among students and young professionals. Find budget-friendly flats, PG rooms, and plots near BBD University.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Jankipuram&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Jankipuram&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Jankipuram, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              💬 WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">450+</div><div className="text-gray-600">Properties Listed</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹2,500</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹3,500</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.4★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Jankipuram, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Jankipuram is a rapidly developing residential area in North Lucknow, known for its affordable housing options. It's particularly popular among students due to its proximity to BBD University and other educational institutions.
              </p>
              <p className="text-gray-600 mb-4">
                The area is divided into multiple sectors (A to F) and includes Jankipuram Extension (Jankipuram Vistar) which offers even more budget-friendly options. The locality has seen significant infrastructure development in recent years.
              </p>
              <p className="text-gray-600">
                Jankipuram is ideal for first-time home buyers, students looking for PG accommodation, and investors seeking affordable plots with high appreciation potential.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Near BBD University</li>
                <li>✅ On Sitapur Road</li>
                <li>✅ 12 km from Charbagh Station</li>
                <li>✅ Affordable Property Prices</li>
                <li>✅ Growing Infrastructure</li>
                <li>✅ Student-Friendly Area</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Jankipuram</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '1 BHK Flats', price: '₹10-18 Lakh', rent: '₹5,000-8,000/mo' },
              { type: '2 BHK Flats', price: '₹18-32 Lakh', rent: '₹8,000-12,000/mo' },
              { type: '3 BHK Flats', price: '₹32-50 Lakh', rent: '₹12,000-18,000/mo' },
              { type: 'Independent Houses', price: '₹40-80 Lakh', rent: '₹15,000-25,000/mo' },
              { type: 'PG/Rooms', price: '-', rent: '₹3,000-6,000/mo' },
              { type: 'Hostels', price: '-', rent: '₹4,000-8,000/mo' },
              { type: 'Plots', price: '₹2,500-4,000/sqft', rent: '-' },
              { type: 'Shops', price: '₹10-30 Lakh', rent: '₹8,000-20,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Jankipuram&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Sectors in Jankipuram</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              'Sector A', 'Sector B', 'Sector C', 'Sector D', 'Sector E',
              'Sector F', 'Sector 1', 'Sector 2', 'Sector 3', 'Sector 4',
              'Sector 5', 'Sector 6', 'Jankipuram Vistar', 'Jankipuram Extension', 'Near BBD'
            ].map((sector, i) => (
              <Link key={i} href={`/locations/jankipuram-${sector.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center">
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
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><GraduationCap className="w-5 h-5 text-primary-600" /> Universities & Colleges</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• BBD University</li>
                <li>• BBDNITM</li>
                <li>• Integral University (nearby)</li>
                <li>• Amity University (nearby)</li>
                <li>• Multiple Coaching Centers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Cross className="w-5 h-5 text-primary-600" /> Hospitals</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Sahara Hospital (nearby)</li>
                <li>• Vivekananda Hospital</li>
                <li>• Local Clinics</li>
                <li>• Pharmacy Stores</li>
                <li>• Diagnostic Centers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary-600" /> Shopping & Food</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Jankipuram Market</li>
                <li>• Local Grocery Stores</li>
                <li>• Street Food Stalls</li>
                <li>• Cafes & Restaurants</li>
                <li>• Vegetable Markets</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Jankipuram?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle, title: 'Most Affordable', desc: 'Lowest property prices in Lucknow' },
              { icon: GraduationCap, title: 'Student Hub', desc: 'Near BBD & other universities' },
              { icon: TrendingUp, title: 'High Growth', desc: 'Rapid infrastructure development' },
              { icon: Home, title: 'First-Time Buyers', desc: 'Ideal for budget home buyers' },
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

      {/* Student Special */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">🎓 Student Special - PG & Hostels</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-2">Boys PG</h3>
              <p className="text-gray-600 mb-2">Starting ₹3,000/month</p>
              <p className="text-sm text-gray-500">With meals, WiFi, laundry</p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-2">Girls PG</h3>
              <p className="text-gray-600 mb-2">Starting ₹3,500/month</p>
              <p className="text-sm text-gray-500">Safe, secure with warden</p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-2">Shared Rooms</h3>
              <p className="text-gray-600 mb-2">Starting ₹2,500/month</p>
              <p className="text-sm text-gray-500">2-3 sharing available</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Find Affordable Property in Jankipuram</h2>
          <p className="text-primary-100 mb-8">Contact us on WhatsApp for budget-friendly listings</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Jankipuram" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Aliganj', 'Kursi Road', 'Sitapur Road', 'Vikas Nagar', 'Madiyaon', 'Dubagga'].map((loc, i) => (
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
