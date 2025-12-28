import { Router, Request, Response } from 'express'
import { supabase } from '../config/supabase'
import { authenticate, optionalAuth, AuthRequest } from '../middleware/auth'

const router = Router()

// GET - Get user's wishlist
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const shareToken = req.query.shareToken as string
    
    // Get shared wishlist
    if (shareToken) {
      const { data: shared, error } = await supabase
        .from('shared_wishlists')
        .select('*')
        .eq('share_token', shareToken)
        .single()
      
      if (error || !shared) {
        return res.status(404).json({
          success: false,
          error: 'Shared wishlist not found'
        })
      }
      
      // Get properties
      const { data: properties } = await supabase
        .from('properties')
        .select('*')
        .in('id', shared.property_ids)
      
      // Increment view count
      await supabase
        .from('shared_wishlists')
        .update({ view_count: (shared.view_count || 0) + 1 })
        .eq('share_token', shareToken)
      
      return res.json({
        success: true,
        data: {
          ...shared,
          properties,
          isShared: true
        }
      })
    }
    
    // Get user's wishlist
    const { data: wishlistItems, error } = await supabase
      .from('wishlist_items')
      .select('*, properties(*)')
      .eq('user_id', userId)
      .order('added_at', { ascending: false })
    
    if (error) {
      console.error('Wishlist fetch error:', error)
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch wishlist'
      })
    }
    
    // Calculate price changes
    const itemsWithChanges = (wishlistItems || []).map(item => {
      const currentPrice = item.properties?.price || item.price_at_add
      const priceChange = currentPrice - item.price_at_add
      const priceChangePercent = (priceChange / item.price_at_add) * 100
      
      return {
        ...item,
        currentPrice,
        priceChange,
        priceChangePercent: Math.round(priceChangePercent * 100) / 100,
        property: item.properties
      }
    })
    
    res.json({
      success: true,
      data: {
        items: itemsWithChanges,
        count: itemsWithChanges.length,
        alerts: {
          priceDrops: itemsWithChanges.filter(i => i.priceChange < 0).length,
          priceIncreases: itemsWithChanges.filter(i => i.priceChange > 0).length
        }
      }
    })
  } catch (error) {
    console.error('Wishlist error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch wishlist'
    })
  }
})

// POST - Add to wishlist
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const { propertyId, notes } = req.body
    
    if (!propertyId) {
      return res.status(400).json({
        success: false,
        error: 'Property ID required'
      })
    }
    
    // Check if already in wishlist
    const { data: existing } = await supabase
      .from('wishlist_items')
      .select('id')
      .eq('user_id', userId)
      .eq('property_id', propertyId)
      .single()
    
    if (existing) {
      return res.status(409).json({
        success: false,
        error: 'Property already in wishlist'
      })
    }
    
    // Get property price
    const { data: property } = await supabase
      .from('properties')
      .select('price, title')
      .eq('id', propertyId)
      .single()
    
    // Add to wishlist
    const { data: newItem, error } = await supabase
      .from('wishlist_items')
      .insert({
        user_id: userId,
        property_id: propertyId,
        price_at_add: property?.price || 0,
        notes: notes || null,
        added_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) {
      console.error('Add to wishlist error:', error)
      return res.status(500).json({
        success: false,
        error: 'Failed to add to wishlist'
      })
    }
    
    res.status(201).json({
      success: true,
      data: newItem,
      message: `${property?.title || 'Property'} added to wishlist`
    })
  } catch (error) {
    console.error('Add wishlist error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to add to wishlist'
    })
  }
})

// DELETE - Remove from wishlist
router.delete('/:propertyId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const { propertyId } = req.params
    
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId)
      .eq('property_id', propertyId)
    
    if (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to remove from wishlist'
      })
    }
    
    res.json({
      success: true,
      message: 'Removed from wishlist'
    })
  } catch (error) {
    console.error('Remove wishlist error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to remove from wishlist'
    })
  }
})

// POST - Share wishlist
router.post('/share', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const { propertyIds, expiresIn } = req.body
    
    if (!propertyIds || propertyIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Property IDs required'
      })
    }
    
    const shareToken = `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const expiresAt = expiresIn 
      ? new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000).toISOString()
      : null
    
    const { data: shared, error } = await supabase
      .from('shared_wishlists')
      .insert({
        user_id: userId,
        share_token: shareToken,
        property_ids: propertyIds,
        expires_at: expiresAt,
        view_count: 0,
        created_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to share wishlist'
      })
    }
    
    res.json({
      success: true,
      data: {
        ...shared,
        shareableLink: `https://estatoprop.com/wishlist/shared/${shareToken}`
      }
    })
  } catch (error) {
    console.error('Share wishlist error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to share wishlist'
    })
  }
})

export default router
