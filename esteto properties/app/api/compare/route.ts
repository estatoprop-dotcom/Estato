import { NextRequest, NextResponse } from 'next/server'
import { ComparisonProperty, ComparisonResult, ComparisonHighlight } from '@/lib/types/features'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yapmbzzqahsyuxxdejpq.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

// Generate comparison highlights
function generateHighlights(properties: ComparisonProperty[]): ComparisonHighlight[] {
  const highlights: ComparisonHighlight[] = []
  
  if (properties.length < 2) return highlights
  
  // Best Price
  const lowestPrice = properties.reduce((min, p) => p.price < min.price ? p : min)
  highlights.push({
    category: 'Best Price',
    winner: lowestPrice.title,
    reason: `Lowest at ₹${(lowestPrice.price / 100000).toFixed(2)} Lakh`
  })
  
  // Best Value (Price per sqft)
  const bestValue = properties.reduce((min, p) => p.pricePerSqft < min.pricePerSqft ? p : min)
  highlights.push({
    category: 'Best Value',
    winner: bestValue.title,
    reason: `₹${bestValue.pricePerSqft}/sqft - lowest price per sqft`
  })
  
  // Largest Area
  const largestArea = properties.reduce((max, p) => p.area > max.area ? p : max)
  highlights.push({
    category: 'Largest Area',
    winner: largestArea.title,
    reason: `${largestArea.area} sqft - most spacious`
  })
  
  // Most Amenities
  const mostAmenities = properties.reduce((max, p) => p.amenities.length > max.amenities.length ? p : max)
  highlights.push({
    category: 'Most Amenities',
    winner: mostAmenities.title,
    reason: `${mostAmenities.amenities.length} amenities included`
  })
  
  // Highest Rated
  const highestRated = properties.reduce((max, p) => p.rating > max.rating ? p : max)
  if (highestRated.rating > 0) {
    highlights.push({
      category: 'Highest Rated',
      winner: highestRated.title,
      reason: `${highestRated.rating}★ rating`
    })
  }
  
  // Newest Property
  const ageOrder = ['Under Construction', 'New', '0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years']
  const newest = properties.reduce((min, p) => {
    const minIndex = ageOrder.indexOf(min.ageOfProperty)
    const pIndex = ageOrder.indexOf(p.ageOfProperty)
    return pIndex < minIndex ? p : min
  })
  highlights.push({
    category: 'Newest',
    winner: newest.title,
    reason: `${newest.ageOfProperty} old`
  })
  
  return highlights
}

// Generate shareable link
function generateShareableLink(comparisonId: string): string {
  return `https://estatoprop.com/compare/${comparisonId}`
}

// GET - Get comparison by ID or get properties for comparison
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const comparisonId = searchParams.get('id')
    const propertyIds = searchParams.get('properties')?.split(',')
    
    // If comparison ID provided, fetch saved comparison
    if (comparisonId) {
      const { data: comparison, error } = await supabase
        .from('property_comparisons')
        .select('*')
        .eq('id', comparisonId)
        .single()
      
      if (error || !comparison) {
        return NextResponse.json(
          { success: false, error: 'Comparison not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json({
        success: true,
        data: comparison
      })
    }
    
    // If property IDs provided, fetch properties for comparison
    if (propertyIds && propertyIds.length >= 2 && propertyIds.length <= 4) {
      const { data: properties, error } = await supabase
        .from('properties')
        .select('*')
        .in('id', propertyIds)
      
      if (error) {
        return NextResponse.json(
          { success: false, error: 'Failed to fetch properties' },
          { status: 500 }
        )
      }
      
      // Transform to comparison format
      const comparisonProperties: ComparisonProperty[] = (properties || []).map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        pricePerSqft: Math.round(p.price / p.area),
        area: p.area,
        bedrooms: p.bedrooms || 0,
        bathrooms: p.bathrooms || 0,
        propertyType: p.property_type,
        location: p.location,
        locality: p.locality || p.location,
        amenities: p.amenities || [],
        ageOfProperty: p.age_of_property || 'Not specified',
        facing: p.facing || 'Not specified',
        floor: p.floor || 'Not specified',
        totalFloors: p.total_floors || 0,
        parking: p.parking || 'Not specified',
        furnishing: p.furnishing || 'Unfurnished',
        images: p.images || [],
        rating: p.rating || 0,
        isVerified: p.is_verified || false
      }))
      
      const highlights = generateHighlights(comparisonProperties)
      
      return NextResponse.json({
        success: true,
        data: {
          properties: comparisonProperties,
          highlights,
          comparisonId: null,
          shareableLink: null
        }
      })
    }
    
    return NextResponse.json(
      { success: false, error: 'Provide either comparison ID or 2-4 property IDs' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Comparison fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comparison' },
      { status: 500 }
    )
  }
}

// POST - Create new comparison
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { propertyIds, userId } = body
    
    if (!propertyIds || propertyIds.length < 2 || propertyIds.length > 4) {
      return NextResponse.json(
        { success: false, error: 'Provide 2-4 property IDs for comparison' },
        { status: 400 }
      )
    }
    
    // Fetch properties
    const { data: properties, error: fetchError } = await supabase
      .from('properties')
      .select('*')
      .in('id', propertyIds)
    
    if (fetchError || !properties || properties.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch properties or insufficient properties found' },
        { status: 400 }
      )
    }
    
    // Transform to comparison format
    const comparisonProperties: ComparisonProperty[] = properties.map(p => ({
      id: p.id,
      title: p.title,
      price: p.price,
      pricePerSqft: Math.round(p.price / p.area),
      area: p.area,
      bedrooms: p.bedrooms || 0,
      bathrooms: p.bathrooms || 0,
      propertyType: p.property_type,
      location: p.location,
      locality: p.locality || p.location,
      amenities: p.amenities || [],
      ageOfProperty: p.age_of_property || 'Not specified',
      facing: p.facing || 'Not specified',
      floor: p.floor || 'Not specified',
      totalFloors: p.total_floors || 0,
      parking: p.parking || 'Not specified',
      furnishing: p.furnishing || 'Unfurnished',
      images: p.images || [],
      rating: p.rating || 0,
      isVerified: p.is_verified || false
    }))
    
    const highlights = generateHighlights(comparisonProperties)
    
    // Generate unique comparison ID
    const comparisonId = `cmp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Save comparison to database
    const { error: saveError } = await supabase
      .from('property_comparisons')
      .insert({
        id: comparisonId,
        property_ids: propertyIds,
        user_id: userId || null,
        properties_data: comparisonProperties,
        highlights,
        created_at: new Date().toISOString()
      })
    
    if (saveError) {
      console.error('Save comparison error:', saveError)
      // Continue without saving - still return comparison
    }
    
    const shareableLink = generateShareableLink(comparisonId)
    
    const result: ComparisonResult = {
      properties: comparisonProperties,
      comparisonId,
      shareableLink,
      createdAt: new Date(),
      highlights
    }
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Comparison created successfully'
    })
  } catch (error) {
    console.error('Comparison creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create comparison' },
      { status: 500 }
    )
  }
}
