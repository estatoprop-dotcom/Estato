import { Router, Request, Response } from 'express'
import { supabase } from '../config/supabase'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

// GET - Get comparison by ID or compare properties
router.get('/', async (req: Request, res: Response) => {
  try {
    const { comparisonId, propertyIds } = req.query
    
    // Get saved comparison
    if (comparisonId) {
      const { data: comparison, error } = await supabase
        .from('property_comparisons')
        .select('*')
        .eq('id', comparisonId)
        .single()
      
      if (error || !comparison) {
        return res.status(404).json({
          success: false,
          error: 'Comparison not found'
        })
      }
      
      return res.json({
        success: true,
        data: comparison
      })
    }
    
    // Compare properties by IDs
    if (propertyIds) {
      const ids = (propertyIds as string).split(',').slice(0, 4)
      
      if (ids.length < 2) {
        return res.status(400).json({
          success: false,
          error: 'At least 2 property IDs required for comparison'
        })
      }
      
      const { data: properties, error } = await supabase
        .from('properties')
        .select('*')
        .in('id', ids)
      
      if (error || !properties || properties.length < 2) {
        return res.status(404).json({
          success: false,
          error: 'Properties not found'
        })
      }
      
      // Generate comparison highlights
      const highlights = generateHighlights(properties)
      
      return res.json({
        success: true,
        data: {
          properties,
          highlights,
          comparisonFields: [
            'price', 'area', 'bedrooms', 'bathrooms', 'location',
            'property_type', 'furnishing', 'floor', 'facing', 'amenities'
          ]
        }
      })
    }
    
    return res.status(400).json({
      success: false,
      error: 'Comparison ID or Property IDs required'
    })
  } catch (error) {
    console.error('Compare error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get comparison'
    })
  }
})

// POST - Create and save comparison
router.post('/', async (req: Request, res: Response) => {
  try {
    const { propertyIds, userId } = req.body
    
    if (!propertyIds || propertyIds.length < 2 || propertyIds.length > 4) {
      return res.status(400).json({
        success: false,
        error: 'Provide 2-4 property IDs for comparison'
      })
    }
    
    // Fetch properties
    const { data: properties, error } = await supabase
      .from('properties')
      .select('*')
      .in('id', propertyIds)
    
    if (error || !properties || properties.length < 2) {
      return res.status(404).json({
        success: false,
        error: 'Properties not found'
      })
    }
    
    // Generate highlights
    const highlights = generateHighlights(properties)
    
    // Save comparison
    const comparisonId = `cmp_${Date.now()}_${uuidv4().slice(0, 8)}`
    
    const { data: savedComparison, error: saveError } = await supabase
      .from('property_comparisons')
      .insert({
        id: comparisonId,
        property_ids: propertyIds,
        user_id: userId || null,
        properties_data: properties,
        highlights,
        created_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (saveError) {
      console.error('Save comparison error:', saveError)
    }
    
    const shareableLink = `https://estatoprop.com/compare/${comparisonId}`
    
    res.json({
      success: true,
      data: {
        comparisonId,
        properties,
        highlights,
        shareableLink
      }
    })
  } catch (error) {
    console.error('Create comparison error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to create comparison'
    })
  }
})

// Generate comparison highlights
function generateHighlights(properties: any[]) {
  const highlights: Record<string, any> = {}
  
  // Best price
  const sortedByPrice = [...properties].sort((a, b) => (a.price || 0) - (b.price || 0))
  highlights.lowestPrice = {
    propertyId: sortedByPrice[0].id,
    title: sortedByPrice[0].title,
    value: sortedByPrice[0].price,
    label: 'Lowest Price'
  }
  
  // Best value (price per sqft)
  const withPricePerSqft = properties.map(p => ({
    ...p,
    pricePerSqft: p.area ? p.price / p.area : Infinity
  }))
  const sortedByValue = [...withPricePerSqft].sort((a, b) => a.pricePerSqft - b.pricePerSqft)
  highlights.bestValue = {
    propertyId: sortedByValue[0].id,
    title: sortedByValue[0].title,
    value: Math.round(sortedByValue[0].pricePerSqft),
    label: 'Best Value (₹/sqft)'
  }
  
  // Largest area
  const sortedByArea = [...properties].sort((a, b) => (b.area || 0) - (a.area || 0))
  highlights.largestArea = {
    propertyId: sortedByArea[0].id,
    title: sortedByArea[0].title,
    value: sortedByArea[0].area,
    label: 'Largest Area'
  }
  
  // Most bedrooms
  const sortedByBedrooms = [...properties].sort((a, b) => (b.bedrooms || 0) - (a.bedrooms || 0))
  highlights.mostBedrooms = {
    propertyId: sortedByBedrooms[0].id,
    title: sortedByBedrooms[0].title,
    value: sortedByBedrooms[0].bedrooms,
    label: 'Most Bedrooms'
  }
  
  // Most amenities
  const sortedByAmenities = [...properties].sort((a, b) => 
    (b.amenities?.length || 0) - (a.amenities?.length || 0)
  )
  highlights.mostAmenities = {
    propertyId: sortedByAmenities[0].id,
    title: sortedByAmenities[0].title,
    value: sortedByAmenities[0].amenities?.length || 0,
    label: 'Most Amenities'
  }
  
  return highlights
}

export default router
