import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Gomti Nagar Lucknow | Buy, Sell & Rent Flats, Houses | Estato',
  description: 'Find verified properties in Gomti Nagar, Lucknow. Buy, sell or rent 1BHK, 2BHK, 3BHK flats, villas, PG, shops & offices. Zero brokerage, direct owner contact.',
  keywords: 'property in gomti nagar, flats in gomti nagar, house for sale gomti nagar, rent in gomti nagar, 2bhk gomti nagar, 3bhk gomti nagar lucknow, pg in gomti nagar',
}

export default function GomtiNagarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Gomti Nagar</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Gomti Nagar – Buy, Sell & Rent in Gomti Nagar, Lucknow
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Gomti Nagar is Lucknow's most premium residential and commercial hub. Find verified flats, villas, PG, shops & offices with direct owner contact. Zero brokerage on Estato.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Gomti Nagar&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Gomti Nagar&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Gomti Nagar, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              💬 WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">500+</div><div className="text-gray-600">Properties Listed</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹4,500</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹6,000</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.8★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Gomti Nagar, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Gomti Nagar is the most sought-after residential locality in Lucknow, situated along the banks of the Gomti River. It is known for its well-planned infrastructure, wide roads, and excellent connectivity to all parts of the city.
              </p>
              <p className="text-gray-600 mb-4">
                The area is divided into multiple sectors called "Khands" - Vipul Khand, Vishal Khand, Vibhav Khand, Vinamra Khand, Viram Khand, and more. Each Khand offers a mix of residential apartments, independent houses, and commercial spaces.
              </p>
              <p className="text-gray-600">
                Gomti Nagar is home to top schools, hospitals, shopping malls, restaurants, and entertainment zones making it perfect for families, working professionals, and investors.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ 5 km from Lucknow Railway Station</li>
                <li>✅ 15 km from Amausi Airport</li>
                <li>✅ Direct Metro Connectivity</li>
                <li>✅ Near IT Hub & Corporate Offices</li>
                <li>✅ Premium Schools & Hospitals</li>
                <li>✅ Shopping Malls & Entertainment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Gomti Nagar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '1 BHK Flats', price: '₹15-25 Lakh', rent: '₹8,000-12,000/mo' },
              { type: '2 BHK Flats', price: '₹30-50 Lakh', rent: '₹12,000-18,000/mo' },
              { type: '3 BHK Flats', price: '₹50-80 Lakh', rent: '₹18,000-30,000/mo' },
              { type: '4 BHK Flats', price: '₹80 Lakh-1.5 Cr', rent: '₹30,000-50,000/mo' },
              { type: 'Villas', price: '₹1-3 Crore', rent: '₹40,000-80,000/mo' },
              { type: 'PG/Rooms', price: '-', rent: '₹4,000-8,000/mo' },
              { type: 'Shops', price: '₹20-50 Lakh', rent: '₹15,000-40,000/mo' },
              { type: 'Offices', price: '₹30-80 Lakh', rent: '₹20,000-60,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Gomti Nagar&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Sectors in Gomti Nagar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              'Vipul Khand', 'Vishal Khand', 'Vibhav Khand', 'Vinamra Khand', 'Viram Khand',
              'Vikas Khand', 'Vijay Khand', 'Vinay Khand', 'Vivek Khand', 'Patrakarpuram',
              'Gomti Nagar Khand 1', 'Gomti Nagar Khand 2', 'Gomti Nagar Khand 3', 'Nehru Enclave', 'Manas Enclave'
            ].map((sector, i) => (
              <Link key={i} href={`/locations/${sector.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center">
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
                <li>• City Montessori School (CMS)</li>
                <li>• Delhi Public School</li>
                <li>• Amity University</li>
                <li>• BBDU University</li>
                <li>• Lucknow Public School</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Cross className="w-5 h-5 text-primary-600" /> Hospitals</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Sahara Hospital</li>
                <li>• Medanta Hospital</li>
                <li>• Apollo Hospital</li>
                <li>• Vivekananda Hospital</li>
                <li>• Mayo Hospital</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary-600" /> Shopping & Entertainment</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Singapore Mall</li>
                <li>• Fun Republic Mall</li>
                <li>• Wave Mall</li>
                <li>• Riverside Mall</li>
                <li>• Gomti Nagar Central Market</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Buy/Rent Property in Gomti Nagar?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle, title: 'Premium Location', desc: 'Most developed area of Lucknow' },
              { icon: Car, title: 'Excellent Connectivity', desc: 'Metro, roads, near airport' },
              { icon: TrendingUp, title: 'High Appreciation', desc: '10-15% yearly price growth' },
              { icon: Star, title: 'Best Amenities', desc: 'Schools, hospitals, malls nearby' },
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Your Dream Property in Gomti Nagar</h2>
          <p className="text-primary-100 mb-8">Contact us on WhatsApp for instant property listings</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Gomti Nagar" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Gomti Nagar Extension', 'Indira Nagar', 'Hazratganj', 'Aliganj', 'Mahanagar', 'Jankipuram'].map((loc, i) => (
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
