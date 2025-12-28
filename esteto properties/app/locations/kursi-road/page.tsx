import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, TreePine, Wind, Users, Phone, GraduationCap, Landmark } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property on Kursi Road Lucknow | Near IIM & University | Buy/Rent Flats',
  description: 'Find 180+ properties on Kursi Road, Lucknow near IIM & Lucknow University. Buy/rent affordable flats from ₹10 Lakh, PG from ₹3,000/month. Best student accommodation. Call 9872364476.',
  keywords: [
    'property kursi road lucknow', 'flat in kursi road', 'house for sale kursi road',
    'pg near iim lucknow', 'flat near lucknow university', 'student accommodation lucknow',
    'affordable flats kursi road', '2 bhk kursi road', 'rent flat kursi road',
    'property near iim', 'kursi road property rates', 'kursi road real estate'
  ],
  openGraph: {
    title: 'Property on Kursi Road Lucknow | Near IIM | EstatoProp',
    description: '180+ verified properties near IIM & Lucknow University. Flats from ₹10 Lakh. PG from ₹3,000/month.',
    type: 'website',
    url: 'https://estatoprop.com/locations/kursi-road',
    siteName: 'EstatoProp',
    images: [{
      url: 'https://estatoprop.com/locations/kursi-road-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Property in Kursi Road Lucknow'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property on Kursi Road | Near IIM Lucknow',
    description: 'Affordable flats & PG near IIM, Lucknow University. From ₹10 Lakh.',
  },
  alternates: {
    canonical: 'https://estatoprop.com/locations/kursi-road'
  }
}

export default function KursiRoadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-emerald-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Kursi Road</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">🎓 Educational Hub</span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">💰 Affordable</span>
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">📈 Growing Area</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property on Kursi Road – Near IIM & University
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mb-6">
            Kursi Road is Lucknow's educational corridor, home to IIM Lucknow, Lucknow University, and numerous colleges. Find affordable flats, PG, and student accommodations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Kursi Road&listing_type=sale" className="bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition">🏠 Buy Property</Link>
            <Link href="/properties?area=Kursi Road&listing_type=rent" className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-500 transition border border-emerald-500">🔑 Rent Property</Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property on Kursi Road, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            <div className="bg-emerald-50 p-4 rounded-xl"><div className="text-2xl font-bold text-emerald-600">180+</div><div className="text-sm text-gray-600">Properties</div></div>
            <div className="bg-blue-50 p-4 rounded-xl"><div className="text-2xl font-bold text-blue-600">IIM</div><div className="text-sm text-gray-600">Lucknow</div></div>
            <div className="bg-purple-50 p-4 rounded-xl"><div className="text-2xl font-bold text-purple-600">LU</div><div className="text-sm text-gray-600">University</div></div>
            <div className="bg-yellow-50 p-4 rounded-xl"><div className="text-2xl font-bold text-yellow-600">₹3,200</div><div className="text-sm text-gray-600">Avg/sqft</div></div>
            <div className="bg-green-50 p-4 rounded-xl"><div className="text-2xl font-bold text-green-600">AQI 58</div><div className="text-sm text-gray-600">Air Quality</div></div>
            <div className="bg-red-50 p-4 rounded-xl"><div className="text-2xl font-bold text-red-600">4.4★</div><div className="text-sm text-gray-600">Rating</div></div>
          </div>
        </div>
      </section>

      {/* Educational Institutions */}
      <section className="py-12 bg-gradient-to-r from-emerald-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🎓 Educational Institutions</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <GraduationCap className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">IIM Lucknow</h3>
              <p className="text-sm text-gray-600">Premier B-School</p>
              <div className="mt-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs">2 km</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Landmark className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Lucknow University</h3>
              <p className="text-sm text-gray-600">State University</p>
              <div className="mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">5 km</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <School className="w-12 h-12 text-purple-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">BBAU</h3>
              <p className="text-sm text-gray-600">Central University</p>
              <div className="mt-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">8 km</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Building2 className="w-12 h-12 text-amber-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Engineering Colleges</h3>
              <p className="text-sm text-gray-600">Multiple Institutes</p>
              <div className="mt-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs">10+</div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Kursi Road</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Kursi Road connects Lucknow to Kursi village and is known as the educational corridor of Lucknow. It's home to IIM Lucknow, one of India's premier management institutes.
              </p>
              <p className="text-gray-600 mb-4">
                The area offers the most affordable housing options in Lucknow, making it popular among students, young professionals, and first-time buyers. Numerous PGs, hostels, and budget apartments cater to the student population.
              </p>
              <p className="text-gray-600 mb-4">
                With ongoing development and proximity to educational institutions, Kursi Road is emerging as a promising residential destination with good appreciation potential.
              </p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2"><GraduationCap className="w-5 h-5 text-emerald-600" /> IIM Lucknow (2 km)</li>
                <li className="flex items-center gap-2"><Landmark className="w-5 h-5 text-emerald-600" /> Lucknow University (5 km)</li>
                <li className="flex items-center gap-2"><MapPin className="w-5 h-5 text-emerald-600" /> Near Jankipuram</li>
                <li className="flex items-center gap-2"><Car className="w-5 h-5 text-emerald-600" /> Sitapur Road Access</li>
                <li className="flex items-center gap-2"><Home className="w-5 h-5 text-emerald-600" /> Affordable Housing</li>
                <li className="flex items-center gap-2"><Users className="w-5 h-5 text-emerald-600" /> Student Community</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Environment */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🌿 Environment & Living Quality</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <Wind className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Air Quality</h3>
              <div className="text-3xl font-bold text-green-600 my-2">AQI 58</div>
              <p className="text-sm text-gray-600">Good - Less Traffic</p>
              <div className="mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Healthy</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <TreePine className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Green Cover</h3>
              <div className="text-3xl font-bold text-green-600 my-2">25%</div>
              <p className="text-sm text-gray-600">Semi-Urban Area</p>
              <div className="mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Natural</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Community</h3>
              <div className="text-3xl font-bold text-blue-600 my-2">Young</div>
              <p className="text-sm text-gray-600">Students & Professionals</p>
              <div className="mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">Vibrant</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <TrendingUp className="w-12 h-12 text-purple-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Growth</h3>
              <div className="text-3xl font-bold text-purple-600 my-2">High</div>
              <p className="text-sm text-gray-600">Developing Area</p>
              <div className="mt-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">12% YoY</div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types on Kursi Road</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: '1 BHK Flats', price: '₹10-18 Lakh', rent: '₹5,000-8,000/mo' },
              { type: '2 BHK Flats', price: '₹18-32 Lakh', rent: '₹8,000-13,000/mo' },
              { type: '3 BHK Flats', price: '₹32-50 Lakh', rent: '₹13,000-20,000/mo' },
              { type: 'PG/Hostels', price: '-', rent: '₹3,000-6,000/mo' },
              { type: 'Student Rooms', price: '-', rent: '₹2,500-5,000/mo' },
              { type: 'Independent Houses', price: '₹35-70 Lakh', rent: '₹12,000-22,000/mo' },
              { type: 'Plots', price: '₹2,500-4,000/sqft', rent: '-' },
              { type: 'Shops', price: '₹12-35 Lakh', rent: '₹8,000-22,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Kursi Road&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-white p-4 rounded-xl hover:shadow-md transition border border-gray-100">
                <h3 className="font-semibold text-gray-800">{item.type}</h3>
                <p className="text-sm text-emerald-600">Buy: {item.price}</p>
                <p className="text-sm text-gray-500">Rent: {item.rent}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Facilities */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🏢 Nearby Facilities</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="border border-gray-200 p-5 rounded-xl">
              <School className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Education</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• IIM Lucknow</li>
                <li>• Lucknow University</li>
                <li>• BBAU</li>
                <li>• Engineering Colleges</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <Cross className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Healthcare</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• KGMU (10 km)</li>
                <li>• Local Clinics</li>
                <li>• Pharmacies</li>
                <li>• Diagnostic Centers</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <ShoppingBag className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Shopping</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Local Markets</li>
                <li>• Student Shops</li>
                <li>• Stationery Stores</li>
                <li>• Cafes & Eateries</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <Car className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Connectivity</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Sitapur Road</li>
                <li>• Jankipuram (5 km)</li>
                <li>• City Center (12 km)</li>
                <li>• Auto/Bus Services</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-emerald-600 to-emerald-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Find Affordable Property on Kursi Road</h2>
          <p className="text-emerald-100 mb-8">Best location for students & young professionals</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Kursi Road" className="bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition">View All Properties</Link>
            <a href="tel:+919872364476" className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-400 transition flex items-center gap-2"><Phone className="w-5 h-5" /> Call Now</a>
            <a href="https://wa.me/919872364476" className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Related Locations */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Nearby Areas</h2>
          <div className="flex flex-wrap gap-3">
            {['Jankipuram', 'Sitapur Road', 'Aliganj', 'Vikas Nagar', 'Mahanagar', 'Gomti Nagar'].map((loc, i) => (
              <Link key={i} href={`/locations/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition">{loc}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
