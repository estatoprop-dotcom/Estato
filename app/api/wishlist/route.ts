import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { WishlistItem, SharedWishlist } from '@/lib/types/features'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yapmbzzqahsyuxxdejpq.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

// GET - Get user's wishlist
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const shareToken = searchParams.get('shareToken')
    
    // If share token provided, get shared wishlist
    if (shareToken) {
      const { data: shared, error } = await supabase
        .from('shared_wishlists')
        .select('*, wishlist_items(*, properties(*))')
        .eq('share_token', shareToken)
        .single()
      
      if (error || !shared) {
        return NextResponse.json(
          { success: false, error: 'Shared wishlist not found or expired' },
          { status: 404 }
        )
      }
      
      // Increment view count
      await supabase
        .from('shared_wishlists')
        .update({ view_count: (shared.view_count || 0) + 1 })
        .eq('share_token', shareToken)
      
      return NextResponse.json({
        success: true,
        data: shared,
        isShared: true
      })
    }
    
    // Get user's wishlist
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      )
    }
    
    const { data: wishlistItems, error } = await supabase
      .from('wishlist_items')
      .select('*, properties(*)')
      .eq('user_id', userId)
      .order('added_at', { ascending: false })
    
    if (error) {
      console.error('Wishlist fetch error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch wishlist' },
        { status: 500 }
      )
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
    
    // Get price alerts
    const priceDrops = itemsWithChanges.filter(item => item.priceChange < 0)
    const priceIncreases = itemsWithChanges.filter(item => item.priceChange > 0)
    
    return NextResponse.json({
      success: true,
      data: {
        items: itemsWithChanges,
        count: itemsWithChanges.length,
        alerts: {
          priceDrops: priceDrops.length,
          priceIncreases: priceIncreases.length
        },
        summary: {
          totalValue: itemsWithChanges.reduce((sum, item) => sum + (item.currentPrice || 0), 0),
          avgPrice: itemsWithChanges.length > 0 
            ? Math.round(itemsWithChanges.reduce((sum, item) => sum + (item.currentPrice || 0), 0) / itemsWithChanges.length)
            : 0
        }
      }
    })
  } catch (error) {
    console.error('Wishlist error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch wishlist' },
      { status: 500 }
    )
  }
}

// POST - Add to wishlist
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, propertyId, notes } = body
    
    if (!userId || !propertyId) {
      return NextResponse.json(
        { success: false, error: 'User ID and Property ID required' },
        { status: 400 }
      )
    }
    
    // Check if already in wishlist
    const { data: existing } = await supabase
      .from('wishlist_items')
      .select('id')
      .eq('user_id', userId)
      .eq('property_id', propertyId)
      .single()
    
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Property already in wishlist' },
        { status: 409 }
      )
    }
    
    // Get property details for price tracking
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
      return NextResponse.json(
        { success: false, error: 'Failed to add to wishlist' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: newItem,
      message: `${property?.title || 'Property'} added to wishlist`
    })
  } catch (error) {
    console.error('Wishlist add error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add to wishlist' },
      { status: 500 }
    )
  }
}

// DELETE - Remove from wishlist
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const propertyId = searchParams.get('propertyId')
    const itemId = searchParams.get('itemId')
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      )
    }
    
    let query = supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId)
    
    if (itemId) {
      query = query.eq('id', itemId)
    } else if (propertyId) {
      query = query.eq('property_id', propertyId)
    } else {
      return NextResponse.json(
        { success: false, error: 'Property ID or Item ID required' },
        { status: 400 }
      )
    }
    
    const { error } = await query
    
    if (error) {
      console.error('Remove from wishlist error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to remove from wishlist' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Property removed from wishlist'
    })
  } catch (error) {
    console.error('Wishlist remove error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove from wishlist' },
      { status: 500 }
    )
  }
}

// PUT - Update wishlist item or share wishlist
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, userId, itemId, notes, propertyIds, sharedWith, expiresIn } = body
    
    if (action === 'update_notes' && itemId && userId) {
      // Update notes for a wishlist item
      const { error } = await supabase
        .from('wishlist_items')
        .update({ notes })
        .eq('id', itemId)
        .eq('user_id', userId)
      
      if (error) {
        return NextResponse.json(
          { success: false, error: 'Failed to update notes' },
          { status: 500 }
        )
      }
      
      return NextResponse.json({
        success: true,
        message: 'Notes updated'
      })
    }
    
    if (action === 'share' && userId && propertyIds) {
      // Create shared wishlist
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
          shared_with: sharedWith || [],
          expires_at: expiresAt,
          view_count: 0,
          created_at: new Date().toISOString()
        })
        .select()
        .single()
      
      if (error) {
        console.error('Share wishlist error:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to share wishlist' },
          { status: 500 }
        )
      }
      
      const shareableLink = `https://estatoprop.com/wishlist/shared/${shareToken}`
      
      return NextResponse.json({
        success: true,
        data: {
          ...shared,
          shareableLink
        },
        message: 'Wishlist shared successfully'
      })
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Wishlist update error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update wishlist' },
      { status: 500 }
    )
  }
}
