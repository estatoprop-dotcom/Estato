import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { PropertyReview, AgentRating, LocalityReview } from '@/lib/types/features'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yapmbzzqahsyuxxdejpq.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

// GET - Get reviews
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const propertyId = searchParams.get('propertyId')
    const agentId = searchParams.get('agentId')
    const locality = searchParams.get('locality')
    const userId = searchParams.get('userId')
    const type = searchParams.get('type') || 'property' // property, agent, locality
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const sortBy = searchParams.get('sortBy') || 'recent' // recent, helpful, rating_high, rating_low
    
    const offset = (page - 1) * limit
    
    // Get property reviews
    if (type === 'property' && propertyId) {
      let query = supabase
        .from('property_reviews')
        .select('*, agent_responses(*)', { count: 'exact' })
        .eq('property_id', propertyId)
      
      // Apply sorting
      switch (sortBy) {
        case 'helpful':
          query = query.order('helpful_count', { ascending: false })
          break
        case 'rating_high':
          query = query.order('rating', { ascending: false })
          break
        case 'rating_low':
          query = query.order('rating', { ascending: true })
          break
        default:
          query = query.order('created_at', { ascending: false })
      }
      
      const { data: reviews, count, error } = await query
        .range(offset, offset + limit - 1)
      
      if (error) {
        console.error('Fetch reviews error:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to fetch reviews' },
          { status: 500 }
        )
      }
      
      // Calculate rating summary
      const { data: allReviews } = await supabase
        .from('property_reviews')
        .select('rating')
        .eq('property_id', propertyId)
      
      const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      let totalRating = 0
      
      allReviews?.forEach(r => {
        ratingCounts[r.rating as keyof typeof ratingCounts]++
        totalRating += r.rating
      })
      
      const avgRating = allReviews?.length ? totalRating / allReviews.length : 0
      
      return NextResponse.json({
        success: true,
        data: {
          reviews,
          pagination: {
            page,
            limit,
            total: count || 0,
            totalPages: Math.ceil((count || 0) / limit)
          },
          summary: {
            averageRating: Math.round(avgRating * 10) / 10,
            totalReviews: allReviews?.length || 0,
            ratingDistribution: ratingCounts,
            verifiedReviews: reviews?.filter(r => r.is_verified).length || 0
          }
        }
      })
    }
    
    // Get agent reviews/ratings
    if (type === 'agent' && agentId) {
      const { data: reviews, error } = await supabase
        .from('agent_reviews')
        .select('*')
        .eq('agent_id', agentId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)
      
      if (error) {
        console.error('Fetch agent reviews error:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to fetch agent reviews' },
          { status: 500 }
        )
      }
      
      // Calculate agent rating summary
      const { data: allAgentReviews } = await supabase
        .from('agent_reviews')
        .select('*')
        .eq('agent_id', agentId)
      
      const ratings = {
        communication: 0,
        knowledge: 0,
        responsiveness: 0,
        negotiation: 0,
        professionalism: 0
      }
      
      let totalOverall = 0
      
      allAgentReviews?.forEach(r => {
        ratings.communication += r.communication_rating || 0
        ratings.knowledge += r.knowledge_rating || 0
        ratings.responsiveness += r.responsiveness_rating || 0
        ratings.negotiation += r.negotiation_rating || 0
        ratings.professionalism += r.professionalism_rating || 0
        totalOverall += r.overall_rating || 0
      })
      
      const count = allAgentReviews?.length || 1
      
      return NextResponse.json({
        success: true,
        data: {
          reviews,
          agentRating: {
            totalReviews: allAgentReviews?.length || 0,
            averageRating: Math.round((totalOverall / count) * 10) / 10,
            ratings: {
              communication: Math.round((ratings.communication / count) * 10) / 10,
              knowledge: Math.round((ratings.knowledge / count) * 10) / 10,
              responsiveness: Math.round((ratings.responsiveness / count) * 10) / 10,
              negotiation: Math.round((ratings.negotiation / count) * 10) / 10,
              professionalism: Math.round((ratings.professionalism / count) * 10) / 10
            }
          }
        }
      })
    }
    
    // Get locality reviews
    if (type === 'locality' && locality) {
      const { data: reviews, count, error } = await supabase
        .from('locality_reviews')
        .select('*', { count: 'exact' })
        .eq('locality', locality.toLowerCase())
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)
      
      if (error) {
        console.error('Fetch locality reviews error:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to fetch locality reviews' },
          { status: 500 }
        )
      }
      
      // Calculate locality rating summary
      const { data: allLocalityReviews } = await supabase
        .from('locality_reviews')
        .select('*')
        .eq('locality', locality.toLowerCase())
      
      const ratings = {
        safety: 0,
        connectivity: 0,
        amenities: 0,
        environment: 0,
        valueForMoney: 0
      }
      
      let totalOverall = 0
      
      allLocalityReviews?.forEach(r => {
        ratings.safety += r.safety_rating || 0
        ratings.connectivity += r.connectivity_rating || 0
        ratings.amenities += r.amenities_rating || 0
        ratings.environment += r.environment_rating || 0
        ratings.valueForMoney += r.value_rating || 0
        totalOverall += r.overall_rating || 0
      })
      
      const reviewCount = allLocalityReviews?.length || 1
      
      return NextResponse.json({
        success: true,
        data: {
          reviews,
          pagination: {
            page,
            limit,
            total: count || 0,
            totalPages: Math.ceil((count || 0) / limit)
          },
          localityRating: {
            totalReviews: allLocalityReviews?.length || 0,
            averageRating: Math.round((totalOverall / reviewCount) * 10) / 10,
            ratings: {
              safety: Math.round((ratings.safety / reviewCount) * 10) / 10,
              connectivity: Math.round((ratings.connectivity / reviewCount) * 10) / 10,
              amenities: Math.round((ratings.amenities / reviewCount) * 10) / 10,
              environment: Math.round((ratings.environment / reviewCount) * 10) / 10,
              valueForMoney: Math.round((ratings.valueForMoney / reviewCount) * 10) / 10
            }
          }
        }
      })
    }
    
    // Get user's reviews
    if (userId) {
      const { data: userReviews, error } = await supabase
        .from('property_reviews')
        .select('*, properties(title, location)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      if (error) {
        return NextResponse.json(
          { success: false, error: 'Failed to fetch user reviews' },
          { status: 500 }
        )
      }
      
      return NextResponse.json({
        success: true,
        data: userReviews
      })
    }
    
    return NextResponse.json(
      { success: false, error: 'Property ID, Agent ID, Locality, or User ID required' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Reviews error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST - Create a review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      type = 'property', // property, agent, locality
      propertyId,
      agentId,
      locality,
      userId,
      userName,
      rating,
      title,
      review,
      pros,
      cons,
      images,
      // For agent reviews
      communicationRating,
      knowledgeRating,
      responsivenessRating,
      negotiationRating,
      professionalismRating,
      // For locality reviews
      safetyRating,
      connectivityRating,
      amenitiesRating,
      environmentRating,
      valueRating,
      livingDuration
    } = body
    
    // Validation
    if (!userId || !userName || !rating || !review) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: userId, userName, rating, review' },
        { status: 400 }
      )
    }
    
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }
    
    const reviewId = `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const now = new Date().toISOString()
    
    // Create property review
    if (type === 'property' && propertyId) {
      // Check if user already reviewed this property
      const { data: existing } = await supabase
        .from('property_reviews')
        .select('id')
        .eq('property_id', propertyId)
        .eq('user_id', userId)
        .single()
      
      if (existing) {
        return NextResponse.json(
          { success: false, error: 'You have already reviewed this property' },
          { status: 409 }
        )
      }
      
      const { data: newReview, error } = await supabase
        .from('property_reviews')
        .insert({
          id: reviewId,
          property_id: propertyId,
          user_id: userId,
          user_name: userName,
          rating,
          title: title || null,
          review,
          pros: pros || [],
          cons: cons || [],
          images: images || [],
          is_verified: false,
          is_verified_buyer: false,
          helpful_count: 0,
          created_at: now,
          updated_at: now
        })
        .select()
        .single()
      
      if (error) {
        console.error('Create review error:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to create review' },
          { status: 500 }
        )
      }
      
      // Update property average rating
      const { data: allReviews } = await supabase
        .from('property_reviews')
        .select('rating')
        .eq('property_id', propertyId)
      
      const avgRating = allReviews?.reduce((sum, r) => sum + r.rating, 0) / (allReviews?.length || 1)
      
      await supabase
        .from('properties')
        .update({ rating: Math.round(avgRating * 10) / 10 })
        .eq('id', propertyId)
      
      return NextResponse.json({
        success: true,
        data: newReview,
        message: 'Review submitted successfully. It will be visible after verification.'
      })
    }
    
    // Create agent review
    if (type === 'agent' && agentId) {
      const { data: newReview, error } = await supabase
        .from('agent_reviews')
        .insert({
          id: reviewId,
          agent_id: agentId,
          user_id: userId,
          user_name: userName,
          overall_rating: rating,
          communication_rating: communicationRating || rating,
          knowledge_rating: knowledgeRating || rating,
          responsiveness_rating: responsivenessRating || rating,
          negotiation_rating: negotiationRating || rating,
          professionalism_rating: professionalismRating || rating,
          review,
          created_at: now
        })
        .select()
        .single()
      
      if (error) {
        console.error('Create agent review error:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to create agent review' },
          { status: 500 }
        )
      }
      
      return NextResponse.json({
        success: true,
        data: newReview,
        message: 'Agent review submitted successfully'
      })
    }
    
    // Create locality review
    if (type === 'locality' && locality) {
      const { data: newReview, error } = await supabase
        .from('locality_reviews')
        .insert({
          id: reviewId,
          locality: locality.toLowerCase(),
          user_id: userId,
          user_name: userName,
          overall_rating: rating,
          safety_rating: safetyRating || rating,
          connectivity_rating: connectivityRating || rating,
          amenities_rating: amenitiesRating || rating,
          environment_rating: environmentRating || rating,
          value_rating: valueRating || rating,
          review,
          pros: pros || [],
          cons: cons || [],
          living_duration: livingDuration || null,
          created_at: now
        })
        .select()
        .single()
      
      if (error) {
        console.error('Create locality review error:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to create locality review' },
          { status: 500 }
        )
      }
      
      return NextResponse.json({
        success: true,
        data: newReview,
        message: 'Locality review submitted successfully'
      })
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid review type or missing target ID' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Create review error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    )
  }
}

// PUT - Update review or mark as helpful
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { reviewId, action, userId, response } = body
    
    if (!reviewId) {
      return NextResponse.json(
        { success: false, error: 'Review ID required' },
        { status: 400 }
      )
    }
    
    // Mark as helpful
    if (action === 'helpful') {
      // Check if user already marked this as helpful
      const { data: existing } = await supabase
        .from('review_helpful')
        .select('id')
        .eq('review_id', reviewId)
        .eq('user_id', userId)
        .single()
      
      if (existing) {
        return NextResponse.json(
          { success: false, error: 'You already marked this review as helpful' },
          { status: 409 }
        )
      }
      
      // Add helpful record
      await supabase
        .from('review_helpful')
        .insert({
          review_id: reviewId,
          user_id: userId,
          created_at: new Date().toISOString()
        })
      
      // Increment helpful count
      const { error } = await supabase.rpc('increment_helpful_count', { review_id: reviewId })
      
      if (error) {
        // Fallback: manual increment
        const { data: review } = await supabase
          .from('property_reviews')
          .select('helpful_count')
          .eq('id', reviewId)
          .single()
        
        await supabase
          .from('property_reviews')
          .update({ helpful_count: (review?.helpful_count || 0) + 1 })
          .eq('id', reviewId)
      }
      
      return NextResponse.json({
        success: true,
        message: 'Marked as helpful'
      })
    }
    
    // Agent response to review
    if (action === 'respond' && response) {
      const { error } = await supabase
        .from('agent_responses')
        .insert({
          review_id: reviewId,
          agent_id: userId,
          response,
          responded_at: new Date().toISOString()
        })
      
      if (error) {
        console.error('Agent response error:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to add response' },
          { status: 500 }
        )
      }
      
      return NextResponse.json({
        success: true,
        message: 'Response added successfully'
      })
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Update review error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update review' },
      { status: 500 }
    )
  }
}

// DELETE - Delete review
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const reviewId = searchParams.get('reviewId')
    const userId = searchParams.get('userId')
    const type = searchParams.get('type') || 'property'
    
    if (!reviewId || !userId) {
      return NextResponse.json(
        { success: false, error: 'Review ID and User ID required' },
        { status: 400 }
      )
    }
    
    const table = type === 'agent' ? 'agent_reviews' : type === 'locality' ? 'locality_reviews' : 'property_reviews'
    
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', reviewId)
      .eq('user_id', userId)
    
    if (error) {
      console.error('Delete review error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to delete review' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully'
    })
  } catch (error) {
    console.error('Delete review error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete review' },
      { status: 500 }
    )
  }
}
