import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Phone, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, Bus, Plane } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Alambagh Lucknow | Near Bus Stand & Airport | Estato',
  description: 'Find properties in Alambagh, Lucknow. Buy/rent flats, shops near Alambagh Bus Stand & Airport. Commercial & residential options with excellent connectivity.',
  keywords: 'property alambagh, flats in alambagh lucknow, shop for rent alambagh, near alambagh bus stand, property near lucknow airport',
}

export default function AlambaghPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Alambagh</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Alambagh – Near Bus Stand & Airport
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mb-6">
            Alambagh is a major commercial and residential hub in Lucknow, home to the main bus stand and close to the airport. Find shops, offices, and flats with excellent connectivity.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Alambagh&listing_type=sale" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              🏠 Buy Property
            </Link>
            <Link href="/properties?area=Alambagh&listing_type=rent" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border border-primary-400">
              🔑 Rent Property
            </Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Alambagh, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              💬 WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600">280+</div><div className="text-gray-600">Properties Listed</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹3,200</div><div className="text-gray-600">Avg. Rent/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">₹4,500</div><div className="text-gray-600">Avg. Sale/sqft</div></div>
            <div><div className="text-3xl font-bold text-primary-600">4.4★</div><div className="text-gray-600">Area Rating</div></div>
          </div>
        </div>
      </section>

      {/* About Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Alambagh, Lucknow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Alambagh is one of Lucknow's most important commercial and transport hubs. It's home to the main Alambagh Bus Stand (ISBT) which connects Lucknow to all major cities in North India.
              </p>
              <p className="text-gray-600 mb-4">
                The area has a mix of commercial establishments, hotels, and residential colonies. Its proximity to Chaudhary Charan Singh International Airport makes it ideal for businesses and travelers.
              </p>
              <p className="text-gray-600">
                Alambagh is well-connected to Charbagh Railway Station, Hazratganj, and other parts of the city, making it a strategic location for both commercial and residential purposes.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Alambagh Bus Stand (ISBT)</li>
                <li>✅ 8 km from Lucknow Airport</li>
                <li>✅ 3 km from Charbagh Station</li>
                <li>✅ On Kanpur Road</li>
                <li>✅ Major Commercial Hub</li>
                <li>✅ Hotels & Restaurants</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Alambagh</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'Shops', price: '₹25-80 Lakh', rent: '₹15,000-50,000/mo' },
              { type: 'Showrooms', price: '₹50 Lakh-2 Cr', rent: '₹30,000-1 Lakh/mo' },
              { type: 'Offices', price: '₹30-90 Lakh', rent: '₹18,000-60,000/mo' },
              { type: 'Commercial Space', price: '₹40 Lakh-1.5 Cr', rent: '₹25,000-80,000/mo' },
              { type: '1 BHK Flats', price: '₹12-22 Lakh', rent: '₹6,000-10,000/mo' },
              { type: '2 BHK Flats', price: '₹22-38 Lakh', rent: '₹10,000-16,000/mo' },
              { type: '3 BHK Flats', price: '₹38-60 Lakh', rent: '₹16,000-25,000/mo' },
              { type: 'Hotels/Guest Houses', price: '₹1-5 Crore', rent: 'On Request' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Alambagh&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition border border-gray-100">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Areas in Alambagh</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              'Alambagh Main', 'Near Bus Stand', 'Kanpur Road', 'Amausi', 'Transport Nagar',
              'Alambagh Colony', 'Dubagga', 'Para', 'Sarojini Nagar', 'Jankipuram Extension'
            ].map((area, i) => (
              <Link key={i} href={`/locations/${area.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition text-center">
                {area}
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
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Bus className="w-5 h-5 text-primary-600" /> Transport</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Alambagh Bus Stand (ISBT)</li>
                <li>• Charbagh Railway Station (3 km)</li>
                <li>• Lucknow Airport (8 km)</li>
                <li>• Metro Station (nearby)</li>
                <li>• Auto & Taxi Stands</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Cross className="w-5 h-5 text-primary-600" /> Hospitals</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• KGMU (5 km)</li>
                <li>• Balrampur Hospital</li>
                <li>• Private Hospitals</li>
                <li>• Clinics & Nursing Homes</li>
                <li>• 24x7 Pharmacies</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-primary-600" /> Shopping & Hotels</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Alambagh Market</li>
                <li>• Hotels & Lodges</li>
                <li>• Restaurants</li>
                <li>• Banks & ATMs</li>
                <li>• Petrol Pumps</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Alambagh?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Bus, title: 'Transport Hub', desc: 'Main bus stand of Lucknow' },
              { icon: Plane, title: 'Near Airport', desc: 'Just 8 km from airport' },
              { icon: TrendingUp, title: 'Commercial Value', desc: 'High footfall area' },
              { icon: Car, title: 'Connectivity', desc: 'Easy access to all areas' },
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Property in Alambagh</h2>
          <p className="text-primary-100 mb-8">Contact us for commercial & residential listings</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Alambagh" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
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
            {['Charbagh', 'Rajajipuram', 'Aishbagh', 'Transport Nagar', 'Amausi', 'Kanpur Road'].map((loc, i) => (
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
