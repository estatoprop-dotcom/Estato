import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, TreePine, Wind, Users, Phone, Plane, Hotel, Truck, Warehouse } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property in Amausi Lucknow | Near Airport | Estato',
  description: 'Find properties in Amausi, Lucknow near Chaudhary Charan Singh Airport. Buy/rent flats, hotels, commercial spaces. Best location for airport proximity.',
  keywords: 'property amausi, flats near lucknow airport, hotel near airport lucknow, commercial property amausi, airport area lucknow, amausi lucknow property',
  openGraph: {
    title: 'Property in Amausi Lucknow | Near Airport',
    description: 'Properties near Lucknow Airport with excellent connectivity',
    type: 'website',
  },
}

export default function AmausiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-700 via-sky-800 to-sky-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sky-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Amausi</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-sky-500 text-white px-3 py-1 rounded-full text-sm font-medium">✈️ Airport Area</span>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">🏨 Hotels Hub</span>
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">📈 High Growth</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property in Amausi – Near Lucknow Airport
          </h1>
          <p className="text-xl text-sky-100 max-w-3xl mb-6">
            Amausi is home to Chaudhary Charan Singh International Airport. Find hotels, commercial spaces, and residential properties with excellent airport connectivity.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Amausi&listing_type=sale" className="bg-white text-sky-700 px-6 py-3 rounded-lg font-semibold hover:bg-sky-50 transition">🏠 Buy Property</Link>
            <Link href="/properties?area=Amausi&listing_type=rent" className="bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-500 transition border border-sky-500">🔑 Rent Property</Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property in Amausi, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            <div className="bg-sky-50 p-4 rounded-xl"><div className="text-2xl font-bold text-sky-600">150+</div><div className="text-sm text-gray-600">Properties</div></div>
            <div className="bg-green-50 p-4 rounded-xl"><div className="text-2xl font-bold text-green-600">2 km</div><div className="text-sm text-gray-600">From Airport</div></div>
            <div className="bg-blue-50 p-4 rounded-xl"><div className="text-2xl font-bold text-blue-600">20+</div><div className="text-sm text-gray-600">Hotels</div></div>
            <div className="bg-yellow-50 p-4 rounded-xl"><div className="text-2xl font-bold text-yellow-600">₹4,500</div><div className="text-sm text-gray-600">Avg/sqft</div></div>
            <div className="bg-purple-50 p-4 rounded-xl"><div className="text-2xl font-bold text-purple-600">AQI 65</div><div className="text-sm text-gray-600">Air Quality</div></div>
            <div className="bg-red-50 p-4 rounded-xl"><div className="text-2xl font-bold text-red-600">4.5★</div><div className="text-sm text-gray-600">Rating</div></div>
          </div>
        </div>
      </section>

      {/* Airport Connectivity */}
      <section className="py-12 bg-gradient-to-r from-sky-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">✈️ Airport Connectivity</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Plane className="w-12 h-12 text-sky-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Airport Distance</h3>
              <div className="text-3xl font-bold text-sky-600 my-2">2 km</div>
              <p className="text-sm text-gray-600">5 minutes drive</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Car className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Kanpur Road</h3>
              <div className="text-3xl font-bold text-green-600 my-2">NH-25</div>
              <p className="text-sm text-gray-600">Direct highway access</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Building2 className="w-12 h-12 text-purple-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">City Center</h3>
              <div className="text-3xl font-bold text-purple-600 my-2">12 km</div>
              <p className="text-sm text-gray-600">To Hazratganj</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <Hotel className="w-12 h-12 text-amber-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Hotels</h3>
              <div className="text-3xl font-bold text-amber-600 my-2">20+</div>
              <p className="text-sm text-gray-600">All categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Amausi</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Amausi is located on Kanpur Road (NH-25) and is home to Chaudhary Charan Singh International Airport, Lucknow's only commercial airport serving domestic and international flights.
              </p>
              <p className="text-gray-600 mb-4">
                The area has developed as a hospitality and logistics hub with numerous hotels, guest houses, and cargo facilities. It's ideal for businesses requiring airport proximity and travelers seeking convenient accommodation.
              </p>
              <p className="text-gray-600 mb-4">
                With the airport expansion and increasing air traffic, Amausi is seeing rapid commercial development and property appreciation. It's well-connected to Alambagh, Transport Nagar, and the city center.
              </p>
            </div>
            <div className="bg-sky-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2"><Plane className="w-5 h-5 text-sky-600" /> Lucknow Airport (2 km)</li>
                <li className="flex items-center gap-2"><Car className="w-5 h-5 text-sky-600" /> Kanpur Road NH-25</li>
                <li className="flex items-center gap-2"><Truck className="w-5 h-5 text-sky-600" /> Near Transport Nagar</li>
                <li className="flex items-center gap-2"><Building2 className="w-5 h-5 text-sky-600" /> Alambagh (5 km)</li>
                <li className="flex items-center gap-2"><Hotel className="w-5 h-5 text-sky-600" /> Hotels & Guest Houses</li>
                <li className="flex items-center gap-2"><Warehouse className="w-5 h-5 text-sky-600" /> Cargo & Logistics</li>
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
              <div className="text-3xl font-bold text-yellow-600 my-2">AQI 65</div>
              <p className="text-sm text-gray-600">Moderate</p>
              <div className="mt-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">Acceptable</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <TreePine className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Green Cover</h3>
              <div className="text-3xl font-bold text-green-600 my-2">20%</div>
              <p className="text-sm text-gray-600">Developing Area</p>
              <div className="mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Improving</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <Car className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Connectivity</h3>
              <div className="text-3xl font-bold text-blue-600 my-2">Excellent</div>
              <p className="text-sm text-gray-600">Highway Access</p>
              <div className="mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">NH-25</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <TrendingUp className="w-12 h-12 text-purple-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Growth</h3>
              <div className="text-3xl font-bold text-purple-600 my-2">High</div>
              <p className="text-sm text-gray-600">Rapid Development</p>
              <div className="mt-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">15% YoY</div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types in Amausi</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'Hotels', price: '₹2-15 Crore', rent: '₹1-5 Lakh/mo' },
              { type: 'Guest Houses', price: '₹50 Lakh-3 Cr', rent: '₹30,000-1 Lakh/mo' },
              { type: 'Commercial Space', price: '₹40 Lakh-2 Cr', rent: '₹25,000-80,000/mo' },
              { type: 'Warehouses', price: '₹50 Lakh-3 Cr', rent: '₹20,000-1 Lakh/mo' },
              { type: '2 BHK Flats', price: '₹25-40 Lakh', rent: '₹10,000-16,000/mo' },
              { type: '3 BHK Flats', price: '₹40-60 Lakh', rent: '₹16,000-25,000/mo' },
              { type: 'Plots', price: '₹3,500-5,500/sqft', rent: '-' },
              { type: 'Showrooms', price: '₹60 Lakh-3 Cr', rent: '₹35,000-1.5 Lakh/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Amausi&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-white p-4 rounded-xl hover:shadow-md transition border border-gray-100">
                <h3 className="font-semibold text-gray-800">{item.type}</h3>
                <p className="text-sm text-sky-600">Buy: {item.price}</p>
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
              <Plane className="w-8 h-8 text-sky-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Airport Services</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Domestic Terminal</li>
                <li>• International Terminal</li>
                <li>• Cargo Terminal</li>
                <li>• Airport Lounges</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <Hotel className="w-8 h-8 text-amber-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Hotels</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 5-Star Hotels</li>
                <li>• Budget Hotels</li>
                <li>• Guest Houses</li>
                <li>• Service Apartments</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <Car className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Transport</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Taxi Services</li>
                <li>• Car Rentals</li>
                <li>• Bus Stand (5 km)</li>
                <li>• Railway (10 km)</li>
              </ul>
            </div>
            <div className="border border-gray-200 p-5 rounded-xl">
              <ShoppingBag className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Amenities</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Restaurants</li>
                <li>• Petrol Pumps</li>
                <li>• ATMs & Banks</li>
                <li>• Pharmacies</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Invest in Amausi?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Plane, title: 'Airport Proximity', desc: 'Just 2 km from airport' },
              { icon: TrendingUp, title: 'High Growth', desc: 'Rapid appreciation' },
              { icon: Hotel, title: 'Hospitality Hub', desc: 'Hotel investment' },
              { icon: Car, title: 'Highway Access', desc: 'NH-25 connectivity' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <item.icon className="w-10 h-10 text-sky-600 mb-3" />
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-sky-600 to-sky-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Find Property Near Lucknow Airport</h2>
          <p className="text-sky-100 mb-8">Best location for hospitality & commercial investment</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Amausi" className="bg-white text-sky-700 px-8 py-3 rounded-lg font-semibold hover:bg-sky-50 transition">View All Properties</Link>
            <a href="tel:+919872364476" className="bg-sky-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-400 transition flex items-center gap-2"><Phone className="w-5 h-5" /> Call Now</a>
            <a href="https://wa.me/919872364476" className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Related Locations */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Nearby Areas</h2>
          <div className="flex flex-wrap gap-3">
            {['Alambagh', 'Kanpur Road', 'Transport Nagar', 'Charbagh', 'Ashiyana', 'Rajajipuram'].map((loc, i) => (
              <Link key={i} href={`/locations/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition">{loc}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
