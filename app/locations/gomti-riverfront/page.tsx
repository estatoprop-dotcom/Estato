import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Home, Building2, Star, CheckCircle, School, Cross, ShoppingBag, Car, TrendingUp, TreePine, Wind, Droplets, Sun, Users, Phone, Waves, Camera, Music } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Property Near Gomti Riverfront Lucknow | Waterfront Living | Estato',
  description: 'Find properties near Gomti Riverfront, Lucknow scenic waterfront area. Buy/rent premium flats, apartments with river views. Best recreational area in Lucknow.',
  keywords: 'property gomti riverfront, flats near gomti river lucknow, riverfront property lucknow, waterfront living lucknow, gomti nagar riverfront property',
  openGraph: {
    title: 'Property Near Gomti Riverfront Lucknow | Waterfront Living',
    description: 'Premium waterfront properties with scenic river views in Lucknow',
    type: 'website',
  },
}

export default function GomtiRiverfrontPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-200 mb-4">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/locations">Locations</Link><span>/</span>
            <span className="text-white">Gomti Riverfront</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">🌊 Waterfront</span>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">🌿 Scenic Views</span>
            <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">🎭 Entertainment Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property Near Gomti Riverfront – Waterfront Living
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mb-6">
            Gomti Riverfront is Lucknow's most scenic recreational area with beautiful promenades, gardens, and entertainment zones. Find premium properties with stunning river views.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties?area=Gomti Riverfront&listing_type=sale" className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">🏠 Buy Property</Link>
            <Link href="/properties?area=Gomti Riverfront&listing_type=rent" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 transition border border-blue-500">🔑 Rent Property</Link>
            <a href="https://wa.me/919872364476?text=Hi, I'm looking for property near Gomti Riverfront, Lucknow" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition">💬 WhatsApp Now</a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            <div className="bg-blue-50 p-4 rounded-xl"><div className="text-2xl font-bold text-blue-600">180+</div><div className="text-sm text-gray-600">Properties</div></div>
            <div className="bg-green-50 p-4 rounded-xl"><div className="text-2xl font-bold text-green-600">AQI 52</div><div className="text-sm text-gray-600">Air Quality</div></div>
            <div className="bg-teal-50 p-4 rounded-xl"><div className="text-2xl font-bold text-teal-600">River</div><div className="text-sm text-gray-600">Views</div></div>
            <div className="bg-yellow-50 p-4 rounded-xl"><div className="text-2xl font-bold text-yellow-600">₹7,500</div><div className="text-sm text-gray-600">Avg/sqft</div></div>
            <div className="bg-purple-50 p-4 rounded-xl"><div className="text-2xl font-bold text-purple-600">45 dB</div><div className="text-sm text-gray-600">Noise Level</div></div>
            <div className="bg-red-50 p-4 rounded-xl"><div className="text-2xl font-bold text-red-600">4.8★</div><div className="text-sm text-gray-600">Rating</div></div>
          </div>
        </div>
      </section>

      {/* Riverfront Attractions */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🌊 Gomti Riverfront Attractions</h2>
          <div className="grid md:grid-cols-6 gap-4">
            {[
              { icon: Waves, name: 'River Promenade', desc: '6 km walkway' },
              { icon: TreePine, name: 'Landscaped Gardens', desc: 'Beautiful parks' },
              { icon: Music, name: 'Musical Fountain', desc: 'Light shows' },
              { icon: Camera, name: 'Photo Points', desc: 'Scenic spots' },
              { icon: Users, name: 'Open Amphitheatre', desc: 'Events venue' },
              { icon: ShoppingBag, name: 'Food Courts', desc: 'Restaurants' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-sm text-center">
                <item.icon className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environment */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🌿 Environment & Living Quality</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border-2 border-blue-100">
              <Wind className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Air Quality</h3>
              <div className="text-3xl font-bold text-green-600 my-2">AQI 52</div>
              <p className="text-sm text-gray-600">Good - River Breeze</p>
              <div className="mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Fresh Air</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border-2 border-blue-100">
              <Waves className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">River Views</h3>
              <div className="text-3xl font-bold text-blue-600 my-2">Scenic</div>
              <p className="text-sm text-gray-600">Waterfront Living</p>
              <div className="mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">Premium Views</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border-2 border-green-100">
              <TreePine className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Green Spaces</h3>
              <div className="text-3xl font-bold text-green-600 my-2">Abundant</div>
              <p className="text-sm text-gray-600">Parks & Gardens</p>
              <div className="mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Nature Living</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border-2 border-purple-100">
              <Sun className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800">Lifestyle</h3>
              <div className="text-3xl font-bold text-purple-600 my-2">Active</div>
              <p className="text-sm text-gray-600">Jogging, Cycling</p>
              <div className="mt-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">Healthy Living</div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Gomti Riverfront</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Gomti Riverfront is a 6-kilometer beautification project along the Gomti River in Lucknow. It features landscaped promenades, gardens, cycling tracks, and entertainment zones.
              </p>
              <p className="text-gray-600 mb-4">
                The riverfront stretches from Kudia Ghat to Gomti Barrage, passing through Gomti Nagar. It has become Lucknow's favorite recreational destination with musical fountains, food courts, and event spaces.
              </p>
              <p className="text-gray-600 mb-4">
                Properties near the riverfront command premium prices due to scenic views, fresh air, and proximity to recreational facilities. It's ideal for families seeking an active, healthy lifestyle.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-4">📍 Location Highlights</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2"><Waves className="w-5 h-5 text-blue-600" /> 6 km River Promenade</li>
                <li className="flex items-center gap-2"><MapPin className="w-5 h-5 text-blue-600" /> Through Gomti Nagar</li>
                <li className="flex items-center gap-2"><Music className="w-5 h-5 text-blue-600" /> Musical Fountains</li>
                <li className="flex items-center gap-2"><TreePine className="w-5 h-5 text-blue-600" /> Landscaped Gardens</li>
                <li className="flex items-center gap-2"><Users className="w-5 h-5 text-blue-600" /> Event Venues</li>
                <li className="flex items-center gap-2"><Camera className="w-5 h-5 text-blue-600" /> Scenic Photo Points</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Property Types Near Riverfront</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'River View Flats', price: '₹70 Lakh-1.5 Cr', rent: '₹25,000-50,000/mo' },
              { type: '3 BHK Apartments', price: '₹55-90 Lakh', rent: '₹20,000-35,000/mo' },
              { type: '4 BHK Apartments', price: '₹90 Lakh-1.8 Cr', rent: '₹35,000-60,000/mo' },
              { type: 'Penthouses', price: '₹1.5-4 Crore', rent: '₹60,000-1.5 Lakh/mo' },
              { type: 'Villas', price: '₹1.2-3 Crore', rent: '₹50,000-1 Lakh/mo' },
              { type: 'Commercial', price: '₹50 Lakh-2 Cr', rent: '₹30,000-1 Lakh/mo' },
              { type: 'Restaurants', price: '₹80 Lakh-3 Cr', rent: '₹50,000-1.5 Lakh/mo' },
              { type: 'Offices', price: '₹40 Lakh-1.5 Cr', rent: '₹25,000-70,000/mo' },
            ].map((item, i) => (
              <Link key={i} href={`/properties?area=Gomti Riverfront&type=${item.type.split(' ')[0].toLowerCase()}`} className="bg-white p-4 rounded-xl hover:shadow-md transition border border-gray-100">
                <h3 className="font-semibold text-gray-800">{item.type}</h3>
                <p className="text-sm text-blue-600">Buy: {item.price}</p>
                <p className="text-sm text-gray-500">Rent: {item.rent}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">🏃 Riverfront Lifestyle</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'Morning Jogs', desc: '6 km scenic promenade' },
              { title: 'Evening Walks', desc: 'Sunset river views' },
              { title: 'Cycling', desc: 'Dedicated cycling tracks' },
              { title: 'Weekend Fun', desc: 'Events, food, music' },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 p-5 rounded-xl backdrop-blur">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-blue-100 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Riverfront Living?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Waves, title: 'River Views', desc: 'Scenic waterfront living' },
              { icon: Wind, title: 'Fresh Air', desc: 'River breeze, low pollution' },
              { icon: TreePine, title: 'Green Spaces', desc: 'Parks and gardens' },
              { icon: TrendingUp, title: 'Premium Value', desc: 'High appreciation' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <item.icon className="w-10 h-10 text-blue-600 mb-3" />
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
          <h2 className="text-3xl font-bold text-white mb-4">Find Waterfront Property in Lucknow</h2>
          <p className="text-primary-100 mb-8">Experience scenic riverfront living</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/properties?area=Gomti Riverfront" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">View All Properties</Link>
            <a href="tel:+919872364476" className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition flex items-center gap-2"><Phone className="w-5 h-5" /> Call Now</a>
            <a href="https://wa.me/919872364476" className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">💬 WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Related Locations */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Nearby Areas</h2>
          <div className="flex flex-wrap gap-3">
            {['Gomti Nagar', 'Gomti Nagar Extension', 'Hazratganj', 'Indira Nagar', 'Mahanagar', 'Kaiserbagh'].map((loc, i) => (
              <Link key={i} href={`/locations/${loc.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition">{loc}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
