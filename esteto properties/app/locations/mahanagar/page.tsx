import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Mahanagar Lucknow | Central Location | Estato',
  description: 'Find properties in Mahanagar, Lucknow. Buy/rent flats, houses in central location. Near Polytechnic, well-connected residential area.',
  keywords: 'property mahanagar, flats in mahanagar lucknow, house for rent mahanagar, 2bhk mahanagar, pg in mahanagar, mahanagar extension',
}

export default function MahanagarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Mahanagar</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Mahanagar – Central Lucknow Location
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Mahanagar is a centrally located residential area in Lucknow with excellent connectivity. Find flats, houses, and commercial properties near Polytechnic Chauraha.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Mahanagar&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Mahanagar&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Mahanagar, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              💬 WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">250+</div><div className="text-gray-600">Properties Listed</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹3,800</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹5,000</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.5★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Mahanagar, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Mahanagar is one of Lucknow's most centrally located residential areas, situated between Hazratganj and Aliganj. It's known for its excellent connectivity to all parts of the city.
              </p>
              <p className="text-gray-600 mb-4">
                The area includes Mahanagar Extension which offers a mix of old and new constructions. Polytechnic Chauraha is the main landmark and commercial hub of the area.
              </p>
              <p className="text-gray-600">
                Mahanagar is ideal for working professionals due to its central location and proximity to government offices, hospitals, and educational institutions.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Central Lucknow Location</li>
                <li>✅ Near Polytechnic Chauraha</li>
                <li>✅ 5 km from Charbagh Station</li>
                <li>✅ 5 km from Hazratganj</li>
                <li>✅ Well-Connected by Roads</li>
                <li>✅ Government Offices Nearby</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Mahanagar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '1 BHK Flats', price: '₹15-25 Lakh', rent: '₹7,000-11,000/mo' },
              { type: '2 BHK Flats', price: '₹28-45 Lakh', rent: '₹11,000-16,000/mo' },
              { type: '3 BHK Flats', price: '₹45-70 Lakh', rent: '₹16,000-25,000/mo' },
              { type: 'Independent Houses', price: '₹60 Lakh-1.2 Cr', rent: '₹20,000-35,000/mo' },
              { type: 'Builder Floors', price: '₹40-80 Lakh', rent: '₹15,000-30,000/mo' },
              { type: 'PG/Rooms', price: '-', rent: '₹4,000-7,000/mo' },
              { type: 'Shops', price: '₹20-50 Lakh', rent: '₹12,000-30,000/mo' },
              { type: 'Offices', price: '₹25-60 Lakh', rent: '₹15,000-40,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Mahanagar&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Areas in Mahanagar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              'Mahanagar Extension', 'Sector A', 'Sector B', 'Sector C', 'Sector D',
              'Sector E', 'Sector F', 'Near Polytechnic', 'PGI Road', 'Nirala Nagar'
            ].map((sector, i) => (
              <Link key={i} href={`/locations/mahanagar-${sector.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center">
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
                <li>• Lucknow Polytechnic</li>
                <li>• CMS Mahanagar</li>
                <li>• St. Francis School</li>
                <li>• Kendriya Vidyalaya</li>
                <li>• Multiple Coaching Centers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Cross className="w-5 h-5 text-primary-600" /> Hospitals</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• PGI Hospital</li>
                <li>• Vivekananda Hospital</li>
                <li>• Chandan Hospital</li>
                <li>• Multiple Clinics</li>
                <li>• Diagnostic Centers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary-600" /> Shopping & Services</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Mahanagar Market</li>
                <li>• Polytechnic Market</li>
                <li>• Banks & ATMs</li>
                <li>• Restaurants</li>
                <li>• Local Shops</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Mahanagar?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: MapPin, title: 'Central Location', desc: 'Heart of Lucknow' },
              { icon: Car, title: 'Great Connectivity', desc: 'Easy access to all areas' },
              { icon: Building2, title: 'Established Area', desc: 'Well-developed infrastructure' },
              { icon: CheckCircle, title: 'All Amenities', desc: 'Schools, hospitals, markets' },
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Property in Mahanagar</h2>
          <p className="text-primary-100 mb-8">Contact us on WhatsApp for property listings</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Mahanagar" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Aliganj', 'Indira Nagar', 'Hazratganj', 'Gomti Nagar', 'Nirala Nagar', 'Vikas Nagar'].map((loc, i) => (
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
