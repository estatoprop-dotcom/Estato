import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { SimilarProperty } from '@/lib/types/features'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yapmbzzqahsyuxxdejpq.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

// Calculate similarity score between two properties
function calculateSimilarity(
  source: any, 
  target: any,
  weights: { price: number; area: number; bedrooms: number; location: number; type: number }
): { score: number; matching: string[]; differing: string[] } {
  const matching: string[] = []
  const differing: string[] = []
  let totalScore = 0
  let totalWeight = 0
  
  // Price similarity (within 20% range)
  const priceDiff = Math.abs(source.price - target.price) / source.price
  const priceScore = Math.max(0, 1 - priceDiff / 0.3) * weights.price
  totalScore += priceScore
  totalWeight += weights.price
  if (priceDiff < 0.15) matching.push('Similar price range')
  else differing.push(`Price differs by ${Math.round(priceDiff * 100)}%`)
  
  // Area similarity (within 25% range)
  const areaDiff = Math.abs(source.area - target.area) / source.area
  const areaScore = Math.max(0, 1 - areaDiff / 0.35) * weights.area
  totalScore += areaScore
  totalWeight += weights.area
  if (areaDiff < 0.2) matching.push('Similar area')
  else differing.push(`Area differs by ${Math.round(areaDiff * 100)}%`)
  
  // Bedrooms match
  if (source.bedrooms === target.bedrooms) {
    totalScore += weights.bedrooms
    matching.push(`Same ${source.bedrooms} BHK`)
  } else if (Math.abs(source.bedrooms - target.bedrooms) === 1) {
    totalScore += weights.bedrooms * 0.5
    differing.push(`${target.bedrooms} BHK vs ${source.bedrooms} BHK`)
  } else {
    differing.push(`Different BHK configuration`)
  }
  totalWeight += weights.bedrooms
  
  // Location match
  if (source.location?.toLowerCase() === target.location?.toLowerCase()) {
    totalScore += weights.location
    matching.push('Same locality')
  } else {
    totalScore += weights.location * 0.3
    differing.push('Different locality')
  }
  totalWeight += weights.location
  
  // Property type match
  if (source.property_type === target.property_type) {
    totalScore += weights.type
    matching.push(`Same property type (${source.property_type})`)
  } else {
    differing.push('Different property type')
  }
  totalWeight += weights.type
  
  const finalScore = Math.round((totalScore / totalWeight) * 100)
  
  return { score: finalScore, matching, differing }
}

// GET - Get similar properties
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const propertyId = searchParams.get('propertyId')
    const limit = parseInt(searchParams.get('limit') || '6')
    const priceRange = parseInt(searchParams.get('priceRange') || '25') // percentage
    const areaRange = parseInt(searchParams.get('areaRange') || '30') // percentage
    const sameLocality = searchParams.get('sameLocality') === 'true'
    const sameType = searchParams.get('sameType') !== 'false' // default true
    
    if (!propertyId) {
      return NextResponse.json(
        { success: false, error: 'Property ID required' },
        { status: 400 }
      )
    }
    
    // Get source property
    const { data: sourceProperty, error: sourceError } = await supabase
      .from('properties')
      .select('*')
      .eq('id', propertyId)
      .single()
    
    if (sourceError || !sourceProperty) {
      return NextResponse.json(
        { success: false, error: 'Property not found' },
        { status: 404 }
      )
    }
    
    // Build query for similar properties
    let query = supabase
      .from('properties')
      .select('*')
      .neq('id', propertyId)
      .gte('price', sourceProperty.price * (1 - priceRange / 100))
      .lte('price', sourceProperty.price * (1 + priceRange / 100))
    
    if (sourceProperty.area) {
      query = query
        .gte('area', sourceProperty.area * (1 - areaRange / 100))
        .lte('area', sourceProperty.area * (1 + areaRange / 100))
    }
    
    if (sameLocality && sourceProperty.location) {
      query = query.eq('location', sourceProperty.location)
    }
    
    if (sameType && sourceProperty.property_type) {
      query = query.eq('property_type', sourceProperty.property_type)
    }
    
    // Get candidate properties
    const { data: candidates, error: candidatesError } = await query.limit(50)
    
    if (candidatesError) {
      console.error('Fetch similar properties error:', candidatesError)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch similar properties' },
        { status: 500 }
      )
    }
    
    // Calculate similarity scores
    const weights = {
      price: 30,
      area: 25,
      bedrooms: 20,
      location: 15,
      type: 10
    }
    
    const similarProperties: SimilarProperty[] = (candidates || [])
      .map(property => {
        const similarity = calculateSimilarity(sourceProperty, property, weights)
        return {
          id: property.id,
          title: property.title,
          price: property.price,
          area: property.area,
          bedrooms: property.bedrooms || 0,
          location: property.location,
          image: property.images?.[0] || '/placeholder-property.jpg',
          similarity: similarity.score,
          matchingFeatures: similarity.matching,
          differingFeatures: similarity.differing
        }
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
    
    return NextResponse.json({
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
        count: similarProperties.length,
        filters: {
          priceRange: `±${priceRange}%`,
          areaRange: `±${areaRange}%`,
          sameLocality,
          sameType
        }
      }
    })
  } catch (error) {
    console.error('Similar properties error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch similar properties' },
      { status: 500 }
    )
  }
}

// POST - Get recently viewed properties
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, propertyId, action } = body
    
    if (action === 'track' && propertyId) {
      // Track property view
      const { error } = await supabase
        .from('recently_viewed')
        .upsert({
          user_id: userId || 'anonymous',
          property_id: propertyId,
          viewed_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,property_id'
        })
      
      if (error) {
        console.error('Track view error:', error)
      }
      
      return NextResponse.json({
        success: true,
        message: 'View tracked'
      })
    }
    
    if (action === 'get' && userId) {
      // Get recently viewed properties
      const { data: recentViews, error } = await supabase
        .from('recently_viewed')
        .select('*, properties(*)')
        .eq('user_id', userId)
        .order('viewed_at', { ascending: false })
        .limit(10)
      
      if (error) {
        console.error('Fetch recent views error:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to fetch recently viewed' },
          { status: 500 }
        )
      }
      
      const recentlyViewed = (recentViews || []).map(rv => ({
        propertyId: rv.property_id,
        viewedAt: rv.viewed_at,
        property: rv.properties ? {
          id: rv.properties.id,
          title: rv.properties.title,
          price: rv.properties.price,
          image: rv.properties.images?.[0] || '/placeholder-property.jpg',
          location: rv.properties.location
        } : null
      })).filter(rv => rv.property !== null)
      
      return NextResponse.json({
        success: true,
        data: recentlyViewed
      })
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Recently viewed error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
