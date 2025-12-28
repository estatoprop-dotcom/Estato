import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Users, TreePine } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Ashiyana Lucknow | Planned Township | Estato',
  description: 'Find properties in Ashiyana, Lucknow. Buy/rent flats, houses in well-planned township near SGPGI. Modern amenities, parks, schools.',
  keywords: 'property ashiyana, flats in ashiyana lucknow, house for sale ashiyana, rent in ashiyana, ashiyana colony, near sgpgi property',
}

export default function AshiyanaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Ashiyana</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Ashiyana – Well-Planned Township Near SGPGI
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Ashiyana is a well-planned residential township in South Lucknow near SGPGI Hospital. Find modern flats, houses with parks, schools, and excellent infrastructure.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Ashiyana&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Ashiyana&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Ashiyana, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
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
            <div><div className="text-3xl font-bold text-primary-600">₹3,500</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹4,800</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.6★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Ashiyana, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Ashiyana is one of Lucknow's most well-planned residential townships, developed by LDA (Lucknow Development Authority). Located in South Lucknow, it's known for its organized layout, green spaces, and modern infrastructure.
              </p>
              <p className="text-gray-600 mb-4">
                The area is divided into multiple sectors (A to L) with each sector having its own parks, markets, and community facilities. It's particularly popular among doctors and medical professionals due to its proximity to SGPGI.
              </p>
              <p className="text-gray-600">
                Ashiyana offers a perfect blend of peaceful living with urban conveniences, making it ideal for families seeking quality residential options.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Near SGPGI Hospital (2 km)</li>
                <li>✅ On Raebareli Road</li>
                <li>✅ 12 km from Charbagh Station</li>
                <li>✅ Well-Planned LDA Township</li>
                <li>✅ Multiple Parks & Green Spaces</li>
                <li>✅ Good Schools & Markets</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Ashiyana</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '1 BHK Flats', price: '₹12-22 Lakh', rent: '₹6,000-10,000/mo' },
              { type: '2 BHK Flats', price: '₹25-42 Lakh', rent: '₹10,000-15,000/mo' },
              { type: '3 BHK Flats', price: '₹42-65 Lakh', rent: '₹15,000-25,000/mo' },
              { type: 'Independent Houses', price: '₹55 Lakh-1.2 Cr', rent: '₹18,000-35,000/mo' },
              { type: 'Villas', price: '₹80 Lakh-1.8 Cr', rent: '₹30,000-50,000/mo' },
              { type: 'PG/Rooms', price: '-', rent: '₹4,000-7,000/mo' },
              { type: 'Plots', price: '₹3,500-5,500/sqft', rent: '-' },
              { type: 'Shops', price: '₹15-40 Lakh', rent: '₹10,000-25,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Ashiyana&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sectors in Ashiyana</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              'Sector A', 'Sector B', 'Sector C', 'Sector D', 'Sector E', 'Sector F',
              'Sector G', 'Sector H', 'Sector I', 'Sector J', 'Sector K', 'Sector L'
            ].map((sector, i) => (
              <Link key={i} href={`/locations/ashiyana-${sector.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center">
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
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Cross className="w-5 h-5 text-primary-600" /> Hospitals</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• SGPGI Hospital (2 km)</li>
                <li>• RMLIMS (5 km)</li>
                <li>• Sahara Hospital (8 km)</li>
                <li>• Local Clinics</li>
                <li>• Pharmacy Stores</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><School className="w-5 h-5 text-primary-600" /> Schools</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• CMS Ashiyana</li>
                <li>• DPS Ashiyana</li>
                <li>• St. Joseph's School</li>
                <li>• Kendriya Vidyalaya</li>
                <li>• Multiple Play Schools</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><TreePine className="w-5 h-5 text-primary-600" /> Parks & Recreation</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Sector Parks</li>
                <li>• Ashiyana Park</li>
                <li>• Jogging Tracks</li>
                <li>• Community Centers</li>
                <li>• Sports Facilities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Ashiyana?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: 'Planned Township', desc: 'LDA developed, organized layout' },
              { icon: TreePine, title: 'Green Spaces', desc: 'Parks in every sector' },
              { icon: Cross, title: 'Near SGPGI', desc: 'Top hospital just 2 km away' },
              { icon: Users, title: 'Family-Friendly', desc: 'Safe, peaceful environment' },
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Your Home in Ashiyana</h2>
          <p className="text-primary-100 mb-8">Contact us on WhatsApp for property listings</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Ashiyana" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Telibagh', 'Vrindavan Yojna', 'Raebareli Road', 'Gomti Nagar', 'Jankipuram', 'Alambagh'].map((loc, i) => (
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
