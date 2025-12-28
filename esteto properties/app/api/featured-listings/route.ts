import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { FeaturedListing, FeaturedPackage, DealerDashboard } from '@/lib/types/features'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yapmbzzqahsyuxxdejpq.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

// Featured packages
const featuredPackages: FeaturedPackage[] = [
  {
    id: 'basic',
    name: 'Basic Boost',
    price: 999,
    duration: 7,
    features: [
      'Priority in search results',
      'Basic badge on listing',
      'Email support'
    ],
    maxListings: 1,
    priority: 1
  },
  {
    id: 'premium',
    name: 'Premium Spotlight',
    price: 2499,
    duration: 15,
    features: [
      'Top position in search results',
      'Premium badge on listing',
      'Featured on homepage',
      'Social media promotion',
      'Priority support'
    ],
    maxListings: 3,
    priority: 2,
    badge: 'Premium',
    isPopular: true
  },
  {
    id: 'spotlight',
    name: 'Spotlight Pro',
    price: 4999,
    duration: 30,
    features: [
      'Top position in all searches',
      'Spotlight badge on listing',
      'Featured on homepage carousel',
      'Social media promotion',
      'WhatsApp broadcast',
      'Dedicated account manager',
      'Performance analytics'
    ],
    maxListings: 5,
    priority: 3,
    badge: 'Spotlight'
  }
]

// GET - Get featured listings or packages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const dealerId = searchParams.get('dealerId')
    const location = searchParams.get('location')
    const propertyType = searchParams.get('propertyType')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    // Get available packages
    if (action === 'packages') {
      return NextResponse.json({
        success: true,
        data: featuredPackages
      })
    }
    
    // Get dealer dashboard
    if (action === 'dashboard' && dealerId) {
      // Get dealer's listings
      const { data: listings } = await supabase
        .from('properties')
        .select('id, title, views, leads_count')
        .eq('dealer_id', dealerId)
      
      // Get featured listings
      const { data: featured } = await supabase
        .from('featured_listings')
        .select('*')
        .eq('dealer_id', dealerId)
        .eq('is_active', true)
      
      // Get recent leads
      const { data: leads } = await supabase
        .from('leads')
        .select('*')
        .eq('dealer_id', dealerId)
        .order('created_at', { ascending: false })
        .limit(10)
      
      // Calculate metrics
      const totalListings = listings?.length || 0
      const activeListings = listings?.filter(l => l).length || 0
      const featuredCount = featured?.length || 0
      const totalViews = listings?.reduce((sum, l) => sum + (l.views || 0), 0) || 0
      const totalLeads = listings?.reduce((sum, l) => sum + (l.leads_count || 0), 0) || 0
      const newLeads = leads?.filter(l => l.status === 'new').length || 0
      
      const dashboard: DealerDashboard = {
        dealerId,
        totalListings,
        activeListings,
        featuredListings: featuredCount,
        totalLeads,
        newLeads,
        totalViews,
        conversionRate: totalViews > 0 ? Math.round((totalLeads / totalViews) * 10000) / 100 : 0,
        performance: {
          viewsThisMonth: Math.floor(totalViews * 0.3),
          viewsLastMonth: Math.floor(totalViews * 0.25),
          leadsThisMonth: Math.floor(totalLeads * 0.35),
          leadsLastMonth: Math.floor(totalLeads * 0.3),
          responseTime: 2.5,
          responseRate: 85
        },
        recentLeads: (leads || []).map(l => ({
          id: l.id,
          propertyId: l.property_id,
          name: l.name,
          phone: l.phone,
          email: l.email,
          message: l.message,
          source: l.source || 'website',
          status: l.status || 'new',
          createdAt: l.created_at,
          updatedAt: l.updated_at
        }))
      }
      
      return NextResponse.json({
        success: true,
        data: dashboard
      })
    }
    
    // Get featured listings for display
    let query = supabase
      .from('featured_listings')
      .select('*, properties(*)')
      .eq('is_active', true)
      .gte('end_date', new Date().toISOString())
      .order('position', { ascending: true })
    
    if (location) {
      query = query.eq('properties.location', location)
    }
    
    if (propertyType) {
      query = query.eq('properties.property_type', propertyType)
    }
    
    const { data: featuredListings, error } = await query.limit(limit)
    
    if (error) {
      console.error('Fetch featured listings error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch featured listings' },
        { status: 500 }
      )
    }
    
    // Track impressions
    if (featuredListings && featuredListings.length > 0) {
      const ids = featuredListings.map(f => f.id)
      await supabase.rpc('increment_impressions', { listing_ids: ids })
    }
    
    return NextResponse.json({
      success: true,
      data: featuredListings?.map(f => ({
        ...f,
        property: f.properties
      })) || []
    })
  } catch (error) {
    console.error('Featured listings error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch featured listings' },
      { status: 500 }
    )
  }
}

// POST - Create featured listing
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { propertyId, dealerId, packageId, paymentId } = body
    
    if (!propertyId || !dealerId || !packageId) {
      return NextResponse.json(
        { success: false, error: 'Property ID, Dealer ID, and Package ID required' },
        { status: 400 }
      )
    }
    
    // Get package details
    const selectedPackage = featuredPackages.find(p => p.id === packageId)
    if (!selectedPackage) {
      return NextResponse.json(
        { success: false, error: 'Invalid package' },
        { status: 400 }
      )
    }
    
    // Check if property already featured
    const { data: existing } = await supabase
      .from('featured_listings')
      .select('id')
      .eq('property_id', propertyId)
      .eq('is_active', true)
      .gte('end_date', new Date().toISOString())
      .single()
    
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Property is already featured' },
        { status: 409 }
      )
    }
    
    // Calculate dates
    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + selectedPackage.duration)
    
    // Get next position
    const { data: lastPosition } = await supabase
      .from('featured_listings')
      .select('position')
      .order('position', { ascending: false })
      .limit(1)
      .single()
    
    const position = (lastPosition?.position || 0) + 1
    
    // Create featured listing
    const { data: newFeatured, error } = await supabase
      .from('featured_listings')
      .insert({
        property_id: propertyId,
        dealer_id: dealerId,
        package_type: packageId,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        impressions: 0,
        clicks: 0,
        leads: 0,
        position,
        is_active: true,
        payment: {
          amount: selectedPackage.price,
          status: paymentId ? 'completed' : 'pending',
          transactionId: paymentId || null,
          paymentMethod: 'online',
          paidAt: paymentId ? new Date().toISOString() : null
        }
      })
      .select()
      .single()
    
    if (error) {
      console.error('Create featured listing error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to create featured listing' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: {
        featured: newFeatured,
        package: selectedPackage,
        validUntil: endDate.toISOString()
      },
      message: `Property featured successfully for ${selectedPackage.duration} days`
    })
  } catch (error) {
    console.error('Create featured listing error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create featured listing' },
      { status: 500 }
    )
  }
}

// PUT - Update featured listing (track clicks, update status)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { featuredId, action, leadData } = body
    
    if (!featuredId) {
      return NextResponse.json(
        { success: false, error: 'Featured listing ID required' },
        { status: 400 }
      )
    }
    
    // Track click
    if (action === 'click') {
      const { error } = await supabase.rpc('increment_featured_clicks', { featured_id: featuredId })
      
      if (error) {
        // Fallback: manual increment
        const { data: featured } = await supabase
          .from('featured_listings')
          .select('clicks')
          .eq('id', featuredId)
          .single()
        
        await supabase
          .from('featured_listings')
          .update({ clicks: (featured?.clicks || 0) + 1 })
          .eq('id', featuredId)
      }
      
      return NextResponse.json({
        success: true,
        message: 'Click tracked'
      })
    }
    
    // Track lead
    if (action === 'lead' && leadData) {
      // Increment lead count
      const { data: featured } = await supabase
        .from('featured_listings')
        .select('leads, property_id, dealer_id')
        .eq('id', featuredId)
        .single()
      
      await supabase
        .from('featured_listings')
        .update({ leads: (featured?.leads || 0) + 1 })
        .eq('id', featuredId)
      
      // Create lead record
      await supabase
        .from('leads')
        .insert({
          property_id: featured?.property_id,
          dealer_id: featured?.dealer_id,
          name: leadData.name,
          phone: leadData.phone,
          email: leadData.email,
          message: leadData.message,
          source: 'featured',
          status: 'new',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      
      return NextResponse.json({
        success: true,
        message: 'Lead tracked'
      })
    }
    
    // Cancel featured listing
    if (action === 'cancel') {
      const { error } = await supabase
        .from('featured_listings')
        .update({ is_active: false })
        .eq('id', featuredId)
      
      if (error) {
        return NextResponse.json(
          { success: false, error: 'Failed to cancel featured listing' },
          { status: 500 }
        )
      }
      
      return NextResponse.json({
        success: true,
        message: 'Featured listing cancelled'
      })
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Update featured listing error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update featured listing' },
      { status: 500 }
    )
  }
}
