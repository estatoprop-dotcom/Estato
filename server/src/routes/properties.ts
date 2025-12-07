import { Router, Request, Response } from 'express'
import { supabase } from '../config/supabase'
import { authenticate, optionalAuth, AuthRequest } from '../middleware/auth'

const router = Router()

// GET - Get properties with filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      page = '1',
      limit = '12',
      location,
      propertyType,
      minPrice,
      maxPrice,
      bedrooms,
      listingType,
      sortBy = 'created_at',
      sortOrder = 'desc',
      search
    } = req.query
    
    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const offset = (pageNum - 1) * limitNum
    
    let query = supabase
      .from('properties')
      .select('*', { count: 'exact' })
    
    // Apply filters
    if (location) {
      query = query.ilike('location', `%${location}%`)
    }
    
    if (propertyType) {
      query = query.eq('property_type', propertyType)
    }
    
    if (minPrice) {
      query = query.gte('price', parseInt(minPrice as string))
    }
    
    if (maxPrice) {
      query = query.lte('price', parseInt(maxPrice as string))
    }
    
    if (bedrooms) {
      query = query.eq('bedrooms', parseInt(bedrooms as string))
    }
    
    if (listingType) {
      query = query.eq('listing_type', listingType)
    }
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,location.ilike.%${search}%`)
    }
    
    // Apply sorting
    query = query.order(sortBy as string, { ascending: sortOrder === 'asc' })
    
    // Apply pagination
    const { data: properties, count, error } = await query.range(offset, offset + limitNum - 1)
    
    if (error) {
      console.error('Properties fetch error:', error)
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch properties'
      })
    }
    
    res.json({
      success: true,
      data: {
        properties,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limitNum)
        }
      }
    })
  } catch (error) {
    console.error('Properties error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch properties'
    })
  }
})

// GET - Get single property
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    const { data: property, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error || !property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      })
    }
    
    // Increment view count
    await supabase
      .from('properties')
      .update({ views: (property.views || 0) + 1 })
      .eq('id', id)
    
    res.json({
      success: true,
      data: property
    })
  } catch (error) {
    console.error('Property error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch property'
    })
  }
})

// POST - Create property (authenticated)
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const propertyData = req.body
    
    const { data: newProperty, error } = await supabase
      .from('properties')
      .insert({
        ...propertyData,
        dealer_id: userId,
        views: 0,
        leads_count: 0,
        is_verified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) {
      console.error('Create property error:', error)
      return res.status(500).json({
        success: false,
        error: 'Failed to create property'
      })
    }
    
    res.status(201).json({
      success: true,
      data: newProperty,
      message: 'Property created successfully'
    })
  } catch (error) {
    console.error('Create property error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to create property'
    })
  }
})

// PUT - Update property
router.put('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.user?.id
    const updateData = req.body
    
    // Check ownership
    const { data: existing } = await supabase
      .from('properties')
      .select('dealer_id')
      .eq('id', id)
      .single()
    
    if (existing?.dealer_id !== userId && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this property'
      })
    }
    
    const { data: updatedProperty, error } = await supabase
      .from('properties')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to update property'
      })
    }
    
    res.json({
      success: true,
      data: updatedProperty,
      message: 'Property updated successfully'
    })
  } catch (error) {
    console.error('Update property error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update property'
    })
  }
})

// DELETE - Delete property
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.user?.id
    
    // Check ownership
    const { data: existing } = await supabase
      .from('properties')
      .select('dealer_id')
      .eq('id', id)
      .single()
    
    if (existing?.dealer_id !== userId && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this property'
      })
    }
    
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)
    
    if (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to delete property'
      })
    }
    
    res.json({
      success: true,
      message: 'Property deleted successfully'
    })
  } catch (error) {
    console.error('Delete property error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to delete property'
    })
  }
})

// POST - Submit lead for property
router.post('/:id/lead', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, phone, email, message } = req.body
    
    if (!phone) {
      return res.status(400).json({
        success: false,
        error: 'Phone number is required'
      })
    }
    
    // Get property dealer
    const { data: property } = await supabase
      .from('properties')
      .select('dealer_id, title, leads_count')
      .eq('id', id)
      .single()
    
    // Create lead
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        property_id: id,
        dealer_id: property?.dealer_id,
        name: name || null,
        phone,
        email: email || null,
        message: message || null,
        source: 'website',
        status: 'new',
        created_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to submit lead'
      })
    }
    
    // Increment leads count
    await supabase
      .from('properties')
      .update({ leads_count: (property?.leads_count || 0) + 1 })
      .eq('id', id)
    
    res.status(201).json({
      success: true,
      data: lead,
      message: 'Thank you! Our agent will contact you shortly.'
    })
  } catch (error) {
    console.error('Submit lead error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to submit lead'
    })
  }
})

export default router
