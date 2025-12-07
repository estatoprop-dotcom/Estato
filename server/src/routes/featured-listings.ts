import { Router, Request, Response } from 'express'
import { supabase } from '../config/supabase'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = Router()

// Featured packages
const featuredPackages = [
  {
    id: 'basic',
    name: 'Basic Boost',
    price: 999,
    duration: 7,
    features: ['Priority in search results', 'Basic badge', 'Email support'],
    maxListings: 1,
    priority: 1
  },
  {
    id: 'premium',
    name: 'Premium Spotlight',
    price: 2499,
    duration: 15,
    features: ['Top position in search', 'Premium badge', 'Featured on homepage', 'Social media promotion', 'Priority support'],
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
    features: ['Top position everywhere', 'Spotlight badge', 'Homepage carousel', 'Social media', 'WhatsApp broadcast', 'Dedicated manager', 'Analytics'],
    maxListings: 5,
    priority: 3,
    badge: 'Spotlight'
  }
]

// GET - Get featured listings or packages
router.get('/', async (req: Request, res: Response) => {
  try {
    const { action, dealerId, location, limit = '10' } = req.query
    
    // Get packages
    if (action === 'packages') {
      return res.json({
        success: true,
        data: featuredPackages
      })
    }
    
    // Get dealer dashboard
    if (action === 'dashboard' && dealerId) {
      const { data: listings } = await supabase
        .from('properties')
        .select('id, title, views, leads_count')
        .eq('dealer_id', dealerId)
      
      const { data: featured } = await supabase
        .from('featured_listings')
        .select('*')
        .eq('dealer_id', dealerId)
        .eq('is_active', true)
      
      const { data: leads } = await supabase
        .from('leads')
        .select('*')
        .eq('dealer_id', dealerId)
        .order('created_at', { ascending: false })
        .limit(10)
      
      const totalListings = listings?.length || 0
      const featuredCount = featured?.length || 0
      const totalViews = listings?.reduce((sum, l) => sum + (l.views || 0), 0) || 0
      const totalLeads = listings?.reduce((sum, l) => sum + (l.leads_count || 0), 0) || 0
      
      return res.json({
        success: true,
        data: {
          dealerId,
          totalListings,
          featuredListings: featuredCount,
          totalLeads,
          newLeads: leads?.filter(l => l.status === 'new').length || 0,
          totalViews,
          conversionRate: totalViews > 0 ? Math.round((totalLeads / totalViews) * 10000) / 100 : 0,
          recentLeads: leads || []
        }
      })
    }
    
    // Get featured listings
    let query = supabase
      .from('featured_listings')
      .select('*, properties(*)')
      .eq('is_active', true)
      .gte('end_date', new Date().toISOString())
      .order('position', { ascending: true })
    
    if (location) {
      query = query.eq('properties.location', location)
    }
    
    const { data: featuredListings, error } = await query.limit(parseInt(limit as string))
    
    if (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch featured listings'
      })
    }
    
    res.json({
      success: true,
      data: featuredListings?.map(f => ({
        ...f,
        property: f.properties
      })) || []
    })
  } catch (error) {
    console.error('Featured listings error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch featured listings'
    })
  }
})

// POST - Create featured listing
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const dealerId = req.user?.id
    const { propertyId, packageId, paymentId } = req.body
    
    if (!propertyId || !packageId) {
      return res.status(400).json({
        success: false,
        error: 'Property ID and Package ID required'
      })
    }
    
    const selectedPackage = featuredPackages.find(p => p.id === packageId)
    if (!selectedPackage) {
      return res.status(400).json({
        success: false,
        error: 'Invalid package'
      })
    }
    
    // Check if already featured
    const { data: existing } = await supabase
      .from('featured_listings')
      .select('id')
      .eq('property_id', propertyId)
      .eq('is_active', true)
      .gte('end_date', new Date().toISOString())
      .single()
    
    if (existing) {
      return res.status(409).json({
        success: false,
        error: 'Property is already featured'
      })
    }
    
    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + selectedPackage.duration)
    
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
        is_active: true,
        payment: {
          amount: selectedPackage.price,
          status: paymentId ? 'completed' : 'pending',
          transactionId: paymentId || null
        }
      })
      .select()
      .single()
    
    if (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to create featured listing'
      })
    }
    
    res.status(201).json({
      success: true,
      data: {
        featured: newFeatured,
        package: selectedPackage,
        validUntil: endDate.toISOString()
      },
      message: `Property featured for ${selectedPackage.duration} days`
    })
  } catch (error) {
    console.error('Create featured error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to create featured listing'
    })
  }
})

// PUT - Track clicks/leads
router.put('/:featuredId', async (req: Request, res: Response) => {
  try {
    const { featuredId } = req.params
    const { action, leadData } = req.body
    
    if (action === 'click') {
      const { data: featured } = await supabase
        .from('featured_listings')
        .select('clicks')
        .eq('id', featuredId)
        .single()
      
      await supabase
        .from('featured_listings')
        .update({ clicks: (featured?.clicks || 0) + 1 })
        .eq('id', featuredId)
      
      return res.json({
        success: true,
        message: 'Click tracked'
      })
    }
    
    if (action === 'lead' && leadData) {
      const { data: featured } = await supabase
        .from('featured_listings')
        .select('leads, property_id, dealer_id')
        .eq('id', featuredId)
        .single()
      
      await supabase
        .from('featured_listings')
        .update({ leads: (featured?.leads || 0) + 1 })
        .eq('id', featuredId)
      
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
          created_at: new Date().toISOString()
        })
      
      return res.json({
        success: true,
        message: 'Lead tracked'
      })
    }
    
    if (action === 'cancel') {
      await supabase
        .from('featured_listings')
        .update({ is_active: false })
        .eq('id', featuredId)
      
      return res.json({
        success: true,
        message: 'Featured listing cancelled'
      })
    }
    
    return res.status(400).json({
      success: false,
      error: 'Invalid action'
    })
  } catch (error) {
    console.error('Update featured error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update featured listing'
    })
  }
})

export default router
