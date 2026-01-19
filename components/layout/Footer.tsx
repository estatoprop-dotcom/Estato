import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Building2, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-auto w-full relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container-custom py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white px-3 py-2 rounded-lg font-bold text-xl shadow-lg">
                EP
              </div>
              <span className="text-white text-xl font-bold">Esteto Properties</span>
            </div>
            <p className="text-sm mb-6 text-gray-400 leading-relaxed">
              Your trusted partner in finding the perfect property. Discover premium homes, apartments, and commercial spaces in Lucknow.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gradient-to-br hover:from-cyan-400 hover:to-cyan-500 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gradient-to-br hover:from-pink-500 hover:to-pink-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-700 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-primary-700 rounded"></div>
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/properties" className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Browse Properties</span>
                </Link>
              </li>
              <li>
                <Link href="/properties/add" className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>List Property</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors group">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-primary-700 rounded"></div>
              Property Types
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/properties?type=flat" className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors group">
                  <Building2 className="w-4 h-4" />
                  <span>Apartments</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?type=house" className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors group">
                  <Building2 className="w-4 h-4" />
                  <span>Houses</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?type=villa" className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors group">
                  <Building2 className="w-4 h-4" />
                  <span>Villas</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?type=office" className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors group">
                  <Building2 className="w-4 h-4" />
                  <span>Offices</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?type=shop" className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors group">
                  <Building2 className="w-4 h-4" />
                  <span>Shops</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-primary-700 rounded"></div>
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Email</p>
                  <a href="mailto:info@esteto.com" className="text-white hover:text-primary-400 transition-colors font-medium">
                    info@esteto.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Phone</p>
                  <a href="tel:+919876543210" className="text-white hover:text-primary-400 transition-colors font-medium">
                    +91 98765 43210
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Address</p>
                  <p className="text-white font-medium">
                    Gomti Nagar, Lucknow<br />
                    Uttar Pradesh, India
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Esteto Properties. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-primary-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
