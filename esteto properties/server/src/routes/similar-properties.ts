import { Router, Request, Response } from 'express'
import { supabase } from '../config/supabase'

const router = Router()

// Calculate similarity score
function calculateSimilarity(source: any, target: any) {
  const matching: string[] = []
  const differing: string[] = []
  let score = 0
  
  // Price similarity (30 points)
  const priceDiff = Math.abs(source.price - target.price) / source.price
  if (priceDiff < 0.15) {
    score += 30
    matching.push('Similar price range')
  } else if (priceDiff < 0.25) {
    score += 20
    matching.push('Comparable price')
  } else {
    score += 10
    differing.push(`Price differs by ${Math.round(priceDiff * 100)}%`)
  }
  
  // Area similarity (25 points)
  if (source.area && target.area) {
    const areaDiff = Math.abs(source.area - target.area) / source.area
    if (areaDiff < 0.2) {
      score += 25
      matching.push('Similar area')
    } else if (areaDiff < 0.35) {
      score += 15
    } else {
      differing.push(`Area differs by ${Math.round(areaDiff * 100)}%`)
    }
  }
  
  // Bedrooms match (20 points)
  if (source.bedrooms === target.bedrooms) {
    score += 20
    matching.push(`Same ${source.bedrooms} BHK`)
  } else if (Math.abs(source.bedrooms - target.bedrooms) === 1) {
    score += 10
    differing.push(`${target.bedrooms} BHK vs ${source.bedrooms} BHK`)
  }
  
  // Location match (15 points)
  if (source.location?.toLowerCase() === target.location?.toLowerCase()) {
    score += 15
    matching.push('Same locality')
  } else {
    score += 5
    differing.push('Different locality')
  }
  
  // Property type match (10 points)
  if (source.property_type === target.property_type) {
    score += 10
    matching.push(`Same property type`)
  }
  
  return { score, matching, differing }
}

// GET - Get similar properties
router.get('/', async (req: Request, res: Response) => {
  try {
    const { propertyId, limit = '6', priceRange = '25', sameLocality, sameType } = req.query
    
    if (!propertyId) {
      return res.status(400).json({
        success: false,
        error: 'Property ID required'
      })
    }
    
    // Get source property
    const { data: sourceProperty, error: sourceError } = await supabase
      .from('properties')
      .select('*')
      .eq('id', propertyId)
      .single()
    
    if (sourceError || !sourceProperty) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      })
    }
    
    const priceRangeNum = parseInt(priceRange as string)
    
    // Build query
    let query = supabase
      .from('properties')
      .select('*')
      .neq('id', propertyId)
      .gte('price', sourceProperty.price * (1 - priceRangeNum / 100))
      .lte('price', sourceProperty.price * (1 + priceRangeNum / 100))
    
    if (sameLocality === 'true' && sourceProperty.location) {
      query = query.eq('location', sourceProperty.location)
    }
    
    if (sameType !== 'false' && sourceProperty.property_type) {
      query = query.eq('property_type', sourceProperty.property_type)
    }
    
    const { data: candidates, error } = await query.limit(50)
    
    if (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch similar properties'
      })
    }
    
    // Calculate similarity and sort
    const similarProperties = (candidates || [])
      .map(property => {
        const similarity = calculateSimilarity(sourceProperty, property)
        return {
          id: property.id,
          title: property.title,
          price: property.price,
          area: property.area,
          bedrooms: property.bedrooms,
          location: property.location,
          image: property.images?.[0] || '/placeholder-property.jpg',
          similarity: similarity.score,
          matchingFeatures: similarity.matching,
          differingFeatures: similarity.differing
        }
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, parseInt(limit as string))
    
    res.json({
      success: true,
      data: {
        sourceProperty: {
          id: sourceProperty.id,
          title: sourceProperty.title,
          price: sourceProperty.price,
          area: sourceProperty.area,
          bedrooms: sourceProperty.bedrooms,
          location: sourceProperty.location
        },
        similarProperties,
        count: similarProperties.length
      }
    })
  } catch (error) {
    console.error('Similar properties error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch similar properties'
    })
  }
})

// POST - Track recently viewed
router.post('/recently-viewed', async (req: Request, res: Response) => {
  try {
    const { userId, propertyId, action } = req.body
    
    if (action === 'track' && propertyId) {
      await supabase
        .from('recently_viewed')
        .upsert({
          user_id: userId || 'anonymous',
          property_id: propertyId,
          viewed_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,property_id'
        })
      
      return res.json({
        success: true,
        message: 'View tracked'
      })
    }
    
    if (action === 'get' && userId) {
      const { data: recentViews, error } = await supabase
        .from('recently_viewed')
        .select('*, properties(*)')
        .eq('user_id', userId)
        .order('viewed_at', { ascending: false })
        .limit(10)
      
      if (error) {
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch recently viewed'
        })
      }
      
      const recentlyViewed = (recentViews || [])
        .filter(rv => rv.properties)
        .map(rv => ({
          propertyId: rv.property_id,
          viewedAt: rv.viewed_at,
          property: {
            id: rv.properties.id,
            title: rv.properties.title,
            price: rv.properties.price,
            image: rv.properties.images?.[0] || '/placeholder-property.jpg',
            location: rv.properties.location
          }
        }))
      
      return res.json({
        success: true,
        data: recentlyViewed
      })
    }
    
    return res.status(400).json({
      success: false,
      error: 'Invalid action'
    })
  } catch (error) {
    console.error('Recently viewed error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to process request'
    })
  }
})

export default router
