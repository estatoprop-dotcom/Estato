'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Search, Home as HomeIcon, Building2, Store, Briefcase, Star, ArrowRight, Sparkles, TrendingUp, Plus, Users, Home, Key, Quote } from 'lucide-react'
import PropertyCard from '@/components/properties/PropertyCard'
import SearchBar from '@/components/ui/SearchBar'
import Button from '@/components/ui/Button'
import { Property } from '@/lib/supabase/types'
import { createSupabaseClient } from '@/lib/supabase/client'
import { shouldUseMockData, mockApi } from '@/lib/mock-api'
import Link from 'next/link'

export default function HomePage() {
  const router = useRouter()
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([])
  const [trendingProperties, setTrendingProperties] = useState<Property[]>([])
  const [buyProperties, setBuyProperties] = useState<Property[]>([])
  const [rentProperties, setRentProperties] = useState<Property[]>([])
  const [listingType, setListingType] = useState<'buy' | 'rent'>('buy')
  const [loading, setLoading] = useState(true)

  const fetchProperties = async () => {
    if (shouldUseMockData()) {
      // Use mock data
      const featured = await mockApi.getFeaturedProperties()
      const trending = await mockApi.getTrendingProperties()
      const allProperties = await mockApi.getProperties()

      setFeaturedProperties(featured)
      setTrendingProperties(trending)
      setBuyProperties(allProperties.filter(p => p.listing_type === 'sale').slice(0, 4))
      setRentProperties(allProperties.filter(p => p.listing_type === 'rent').slice(0, 4))
      setLoading(false)
      return
    }

    // Use Supabase
    const supabase = createSupabaseClient()
    if (!supabase) {
      // Fallback to mock
      const featured = await mockApi.getFeaturedProperties()
      const trending = await mockApi.getTrendingProperties()
      const allProperties = await mockApi.getProperties()

      setFeaturedProperties(featured)
      setTrendingProperties(trending)
      setBuyProperties(allProperties.filter(p => p.listing_type === 'sale').slice(0, 4))
      setRentProperties(allProperties.filter(p => p.listing_type === 'rent').slice(0, 4))
      setLoading(false)
      return
    }

    // Fetch featured properties
    const { data: featured } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'active')
      .eq('featured', true)
      .limit(6)
      .order('created_at', { ascending: false })

    // Fetch trending properties
    const { data: trending } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'active')
      .limit(8)
      .order('created_at', { ascending: false })

    // Fetch buy properties
    const { data: buy } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'active')
      .eq('listing_type', 'sale')
      .limit(4)
      .order('created_at', { ascending: false })

    // Fetch rent properties
    const { data: rent } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'active')
      .eq('listing_type', 'rent')
      .limit(4)
      .order('created_at', { ascending: false })

    setFeaturedProperties(featured || [])
    setTrendingProperties(trending || [])
    setBuyProperties(buy || [])
    setRentProperties(rent || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const handleSearch = (query: string) => {
    router.push(`/properties?search=${encodeURIComponent(query)}`)
  }

  const categories = [
    { icon: HomeIcon, label: 'Apartments', href: '/properties?type=flat&city=Lucknow', count: '500+' },
    { icon: Building2, label: 'Houses', href: '/properties?type=house&city=Lucknow', count: '300+' },
    { icon: Building2, label: 'Villas', href: '/properties?type=villa&city=Lucknow', count: '100+' },
    { icon: Briefcase, label: 'Offices', href: '/properties?type=office&city=Lucknow', count: '200+' },
    { icon: Store, label: 'Shops', href: '/properties?type=shop&city=Lucknow', count: '150+' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-12 md:py-16 lg:py-20 overflow-hidden min-h-[500px] md:min-h-[550px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
            alt="Find Your Dream Property"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-800/85 to-primary-900/90"></div>
        </div>

        <div className="container-custom relative z-10 w-full">
          <div className="max-w-5xl mx-auto text-center py-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-lg leading-tight">
              Find Your Dream Property in Lucknow
            </h1>
            <p className="text-lg mb-8 text-white/90 drop-shadow-md">
              Discover premium properties for sale and rent in Lucknow. Your perfect home is just a search away.
            </p>

            {/* Hero Search */}
            <div className="bg-white rounded-xl p-6 shadow-2xl">
              <SearchBar onSearch={handleSearch} className="mb-4" />

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2 justify-center">
                <Link href="/properties?listing_type=rent">
                  <Button variant="outline" size="sm">For Rent</Button>
                </Link>
                <Link href="/properties?listing_type=sale">
                  <Button variant="outline" size="sm">For Sale</Button>
                </Link>
                <Link href="/properties?type=villa">
                  <Button variant="outline" size="sm">Villas</Button>
                </Link>
                <Link href="/properties?type=office">
                  <Button variant="outline" size="sm">Offices</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-primary-50/20 to-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-primary-300/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-100 px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-medium text-primary-700">Explore Properties</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect property type that matches your needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((category, index) => {
              const gradients = [
                'from-blue-500 to-cyan-500',
                'from-primary-500 to-primary-700',
                'from-purple-500 to-pink-500',
                'from-orange-500 to-red-500',
                'from-green-500 to-emerald-500',
              ]
              const gradient = gradients[index % gradients.length]

              return (
                <Link
                  key={category.label}
                  href={category.href}
                  className="group relative bg-white rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 overflow-hidden"
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-white transition-colors text-lg">
                      {category.label}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 group-hover:text-white/90 transition-colors">
                      {category.count} Properties
                    </p>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Buy or Rent Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary-100/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          {/* Header with Toggle */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-100 px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-medium text-primary-700">Choose Your Option</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Properties for {listingType === 'buy' ? 'Buy' : 'Rent'}
            </h2>

            {/* Toggle Switch */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => setListingType('buy')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${listingType === 'buy'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                <Key className="w-5 h-5" />
                Buy
              </button>
              <button
                onClick={() => setListingType('rent')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${listingType === 'rent'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                <Home className="w-5 h-5" />
                Rent
              </button>
            </div>
          </div>

          {/* Properties Grid */}
          {(listingType === 'buy' ? buyProperties : rentProperties).length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 max-w-7xl mx-auto">
                {(listingType === 'buy' ? buyProperties : rentProperties).map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center">
                <Link href={`/properties?listing_type=${listingType === 'buy' ? 'sale' : 'rent'}`}>
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    View All {listingType === 'buy' ? 'Buy' : 'Rent'} Properties
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600">Check back soon for {listingType === 'buy' ? 'properties for sale' : 'rental properties'}</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Properties */}
      {featuredProperties.length > 0 && (
        <section className="py-16 bg-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary-200/20 rounded-full blur-3xl"></div>
          </div>

          <div className="container-custom relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Premium Selection</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Featured Properties
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Handpicked premium properties that meet our highest standards
              </p>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-8">
              <Link href="/properties?featured=true">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  View All Featured Properties
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Trending Properties */}
      {trendingProperties.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-gray-50 via-primary-50/20 to-gray-50 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="container-custom relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full mb-4">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Hot Right Now</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Trending Properties
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Most viewed and in-demand properties in Lucknow
              </p>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {trendingProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-8">
              <Link href="/properties">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  View All Properties
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-primary-50/30 to-gray-50 relative overflow-hidden">
        {/* Premium Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-100/30 to-cyan-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full mb-6 shadow-lg border border-primary-100">
              <Quote className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">Happy Customers</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-primary-700 to-gray-900 bg-clip-text text-transparent mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Don&apos;t just take our word for it - hear from our satisfied customers who found their dream properties
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Testimonial 1 */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:-translate-y-3 hover:scale-[1.02] overflow-hidden">
              {/* Decorative Gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-transparent rounded-bl-full"></div>

              {/* Quote Icon */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-full flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                <Quote className="w-6 h-6 text-primary-600" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 leading-relaxed text-lg font-medium">
                  &quot;Esteto Properties made finding my dream home so easy! Their team was professional, responsive, and helped me find the perfect 3BHK apartment in Gomti Nagar. Highly recommended!&quot;
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-primary-100 group-hover:ring-primary-300 transition-all shadow-lg">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                        alt="Rajesh Kumar"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Rajesh Kumar</h4>
                    <p className="text-sm text-gray-600 font-medium">Property Buyer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:-translate-y-3 hover:scale-[1.02] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-bl-full"></div>
              <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-full flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                <Quote className="w-6 h-6 text-blue-600" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 leading-relaxed text-lg font-medium">
                  &quot;I was looking to rent an office space for my startup, and Esteto Properties found me the perfect location in Sector-9. The process was smooth and hassle-free. Great service!&quot;
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-blue-100 group-hover:ring-blue-300 transition-all shadow-lg">
                      <Image
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                        alt="Priya Sharma"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Priya Sharma</h4>
                    <p className="text-sm text-gray-600 font-medium">Business Owner</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:-translate-y-3 hover:scale-[1.02] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-transparent rounded-bl-full"></div>
              <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-full flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                <Quote className="w-6 h-6 text-green-600" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 leading-relaxed text-lg font-medium">
                  &quot;Excellent platform for listing properties! I sold my house in Nirala Nagar within a month through Esteto Properties. Their team provided excellent support throughout the process.&quot;
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-green-100 group-hover:ring-green-300 transition-all shadow-lg">
                      <Image
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                        alt="Amit Patel"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Amit Patel</h4>
                    <p className="text-sm text-gray-600 font-medium">Property Seller</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:-translate-y-3 hover:scale-[1.02] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-transparent rounded-bl-full"></div>
              <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-full flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                <Quote className="w-6 h-6 text-purple-600" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 leading-relaxed text-lg font-medium">
                  &quot;Found my perfect rental apartment in Mahanagar through Esteto Properties. The search filters are amazing, and the property details were accurate. Very satisfied with the service!&quot;
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-purple-100 group-hover:ring-purple-300 transition-all shadow-lg">
                      <Image
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
                        alt="Sunita Mehta"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Sunita Mehta</h4>
                    <p className="text-sm text-gray-600 font-medium">Tenant</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 5 */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:-translate-y-3 hover:scale-[1.02] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-transparent rounded-bl-full"></div>
              <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-full flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                <Quote className="w-6 h-6 text-orange-600" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 leading-relaxed text-lg font-medium">
                  &quot;As a real estate investor, I use Esteto Properties regularly. Their verified listings and detailed property information help me make informed decisions quickly. Great platform!&quot;
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-orange-100 group-hover:ring-orange-300 transition-all shadow-lg">
                      <Image
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
                        alt="Vikram Singh"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Vikram Singh</h4>
                    <p className="text-sm text-gray-600 font-medium">Real Estate Investor</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 6 */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:-translate-y-3 hover:scale-[1.02] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-transparent rounded-bl-full"></div>
              <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-pink-500/10 to-pink-600/10 rounded-full flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                <Quote className="w-6 h-6 text-pink-600" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 leading-relaxed text-lg font-medium">
                  &quot;Rented a beautiful villa in Indira Nagar for my family. The entire process from search to finalizing the deal was seamless. Esteto Properties truly cares about their customers!&quot;
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-pink-100 group-hover:ring-pink-300 transition-all shadow-lg">
                      <Image
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
                        alt="Anjali Gupta"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Anjali Gupta</h4>
                    <p className="text-sm text-gray-600 font-medium">Property Renter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
            alt="List Your Property"
            fill
            className="object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-800/85 to-primary-900/90"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Start Listing Today</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              Ready to List Your Property?
            </h2>

            {/* Description */}
            <p className="text-xl mb-8 text-white/90 drop-shadow-md max-w-2xl mx-auto">
              Join thousands of property owners and reach millions of potential buyers
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-white/80" />
                <div className="text-left">
                  <div className="text-2xl font-bold">5,000+</div>
                  <div className="text-sm text-white/80">Property Owners</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-6 h-6 text-white/80" />
                <div className="text-left">
                  <div className="text-2xl font-bold">10,000+</div>
                  <div className="text-sm text-white/80">Properties Listed</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link href="/properties/add">
              <Button
                size="lg"
                className="group bg-white text-primary-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transition-all px-8 py-4 text-lg font-semibold"
              >
                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                List Your Property for Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            {/* Additional Info */}
            <p className="text-sm text-white/70 mt-6">
              ✓ Free listing &nbsp; • &nbsp; ✓ No hidden fees &nbsp; • &nbsp; ✓ Quick approval
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

