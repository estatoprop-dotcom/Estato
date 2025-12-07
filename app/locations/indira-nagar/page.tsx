import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Indira Nagar Lucknow | Buy, Sell & Rent | Estato',
  description: 'Find properties in Indira Nagar, Lucknow. Buy/rent 2BHK, 3BHK flats, houses, PG near Munshi Pulia & Faizabad Road. Prime residential locality.',
  keywords: 'property indira nagar lucknow, flats in indira nagar, house for rent indira nagar, 2bhk indira nagar, pg in indira nagar, munshi pulia property',
}

export default function IndiraNagarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Indira Nagar</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Indira Nagar – Prime Residential Locality
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Indira Nagar is a prime residential area in Lucknow located on Faizabad Road. Find verified flats, houses, PG rooms near Munshi Pulia with excellent connectivity.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Indira Nagar&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Indira Nagar&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Indira Nagar, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
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
            <div><div className="text-3xl font-bold text-primary-600">₹4,000</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹5,500</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.7★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Indira Nagar, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Indira Nagar is one of Lucknow's most sought-after residential localities, strategically located on Faizabad Road. It offers excellent connectivity to Gomti Nagar, Hazratganj, and other major areas.
              </p>
              <p className="text-gray-600 mb-4">
                The area is divided into multiple sectors (Sector 10 to Sector 27) and is known for its well-planned layout, wide roads, and green surroundings. Munshi Pulia is the main commercial hub.
              </p>
              <p className="text-gray-600">
                Indira Nagar is popular among working professionals and families due to its proximity to IT offices, schools, hospitals, and shopping centers.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ On Faizabad Road (NH-28)</li>
                <li>✅ 5 km from Gomti Nagar</li>
                <li>✅ Near Munshi Pulia Junction</li>
                <li>✅ 10 km from Charbagh Station</li>
                <li>✅ Wave Mall & Lekhraj Market</li>
                <li>✅ Multiple Metro Stations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Indira Nagar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '1 BHK Flats', price: '₹15-25 Lakh', rent: '₹7,000-11,000/mo' },
              { type: '2 BHK Flats', price: '₹30-50 Lakh', rent: '₹11,000-17,000/mo' },
              { type: '3 BHK Flats', price: '₹50-80 Lakh', rent: '₹17,000-28,000/mo' },
              { type: '4 BHK Flats', price: '₹80 Lakh-1.3 Cr', rent: '₹28,000-45,000/mo' },
              { type: 'Independent Houses', price: '₹70 Lakh-1.5 Cr', rent: '₹25,000-45,000/mo' },
              { type: 'PG/Rooms', price: '-', rent: '₹4,000-8,000/mo' },
              { type: 'Shops', price: '₹20-50 Lakh', rent: '₹12,000-35,000/mo' },
              { type: 'Offices', price: '₹30-70 Lakh', rent: '₹15,000-45,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Indira Nagar&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Sectors in Indira Nagar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              'Sector 10', 'Sector 11', 'Sector 12', 'Sector 13', 'Sector 14',
              'Sector 15', 'Sector 16', 'Sector 17', 'Sector 18', 'Sector 19',
              'Sector 20', 'Sector 21', 'Sector 22', 'Munshi Pulia', 'Lekhraj Market'
            ].map((sector, i) => (
              <Link key={i} href={`/locations/indira-nagar-${sector.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center">
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
                <li>• Delhi Public School</li>
                <li>• Lucknow Public School</li>
                <li>• St. Joseph's College</li>
                <li>• Amity University (nearby)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Cross className="w-5 h-5 text-primary-600" /> Hospitals</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Sahara Hospital</li>
                <li>• Vivekananda Hospital</li>
                <li>• Charak Hospital</li>
                <li>• Medanta (nearby)</li>
                <li>• Multiple Clinics</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary-600" /> Shopping & Entertainment</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Wave Mall</li>
                <li>• Lekhraj Market</li>
                <li>• Munshi Pulia Market</li>
                <li>• Sahara Ganj (nearby)</li>
                <li>• Local Markets</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Indira Nagar?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Car, title: 'Great Connectivity', desc: 'On Faizabad Road, near Metro' },
              { icon: Building2, title: 'Well-Planned', desc: 'Organized sectors & wide roads' },
              { icon: Users, title: 'Working Professionals', desc: 'Near IT offices & corporates' },
              { icon: TrendingUp, title: 'Good Appreciation', desc: '8-12% yearly growth' },
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Your Dream Property in Indira Nagar</h2>
          <p className="text-primary-100 mb-8">Contact us on WhatsApp for instant property listings</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Indira Nagar" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Gomti Nagar', 'Faizabad Road', 'Mahanagar', 'Aliganj', 'Chinhat', 'Hazratganj'].map((loc, i) => (
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
