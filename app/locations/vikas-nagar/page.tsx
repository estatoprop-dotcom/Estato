import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Vikas Nagar Lucknow | Residential Area | Estato',
  description: 'Find properties in Vikas Nagar, Lucknow. Buy/rent 2BHK, 3BHK flats, houses in well-established residential area. Good schools, markets nearby.',
  keywords: 'property vikas nagar, flats in vikas nagar lucknow, house for rent vikas nagar, 2bhk vikas nagar, pg in vikas nagar',
}

export default function VikasNagarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Vikas Nagar</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Vikas Nagar – Established Residential Area
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Vikas Nagar is a well-established residential area in Lucknow with good infrastructure, schools, and markets. Find affordable flats, houses, and PG accommodations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Vikas Nagar&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Vikas Nagar&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Vikas Nagar, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              💬 WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">220+</div><div className="text-gray-600">Properties Listed</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹3,200</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹4,200</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.4★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Vikas Nagar, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Vikas Nagar is a well-planned residential colony located in North Lucknow, developed by LDA. It's known for its organized layout, wide roads, and peaceful environment.
              </p>
              <p className="text-gray-600 mb-4">
                The area is divided into multiple sectors and offers a mix of independent houses, builder floors, and apartments. It's popular among middle-class families due to its affordable housing options.
              </p>
              <p className="text-gray-600">
                With good schools, markets, and healthcare facilities nearby, Vikas Nagar is ideal for families looking for a peaceful residential environment with all amenities.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ LDA Developed Colony</li>
                <li>✅ Near Aliganj & Mahanagar</li>
                <li>✅ 10 km from Charbagh Station</li>
                <li>✅ Well-Planned Layout</li>
                <li>✅ Good Schools & Markets</li>
                <li>✅ Peaceful Environment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Vikas Nagar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '1 BHK Flats', price: '₹12-20 Lakh', rent: '₹5,500-9,000/mo' },
              { type: '2 BHK Flats', price: '₹22-38 Lakh', rent: '₹9,000-14,000/mo' },
              { type: '3 BHK Flats', price: '₹38-60 Lakh', rent: '₹14,000-22,000/mo' },
              { type: 'Independent Houses', price: '₹50-95 Lakh', rent: '₹18,000-32,000/mo' },
              { type: 'Builder Floors', price: '₹30-55 Lakh', rent: '₹12,000-20,000/mo' },
              { type: 'PG/Rooms', price: '-', rent: '₹3,500-6,500/mo' },
              { type: 'Plots', price: '₹3,000-4,500/sqft', rent: '-' },
              { type: 'Shops', price: '₹15-40 Lakh', rent: '₹10,000-28,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Vikas Nagar&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sectors in Vikas Nagar</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {['Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Sector 5', 'Sector 6', 'Sector 7', 'Sector 8', 'Sector 9', 'Sector 10', 'Sector 11', 'Sector 12'].map((sector, i) => (
              <Link key={i} href={`/locations/vikas-nagar-${sector.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center">
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
                <li>• CMS Vikas Nagar</li>
                <li>• St. Francis School</li>
                <li>• Kendriya Vidyalaya</li>
                <li>• Public Schools</li>
                <li>• Play Schools</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Cross className="w-5 h-5 text-primary-600" /> Hospitals</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Vivekananda Hospital</li>
                <li>• Local Nursing Homes</li>
                <li>• Clinics</li>
                <li>• Diagnostic Centers</li>
                <li>• Pharmacies</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary-600" /> Shopping</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Vikas Nagar Market</li>
                <li>• Sector Markets</li>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Vikas Nagar?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: 'Planned Colony', desc: 'LDA developed, organized' },
              { icon: Users, title: 'Family-Friendly', desc: 'Peaceful residential area' },
              { icon: CheckCircle, title: 'Affordable', desc: 'Budget-friendly options' },
              { icon: Car, title: 'Good Connectivity', desc: 'Near main roads' },
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Property in Vikas Nagar</h2>
          <p className="text-primary-100 mb-8">Contact us on WhatsApp for property listings</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Vikas Nagar" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Aliganj', 'Mahanagar', 'Jankipuram', 'Indira Nagar', 'Nirala Nagar', 'Gomti Nagar'].map((loc, i) => (
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
