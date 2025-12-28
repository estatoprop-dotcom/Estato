import { Router, Request, Response } from 'express'
import { supabase } from '../config/supabase'
import { authenticate, optionalAuth, AuthRequest } from '../middleware/auth'

const router = Router()

// GET - Get reviews
router.get('/', async (req: Request, res: Response) => {
  try {
    const { propertyId, agentId, locality, type = 'property', page = '1', limit = '10', sortBy = 'recent' } = req.query
    
    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const offset = (pageNum - 1) * limitNum
    
    // Property reviews
    if (type === 'property' && propertyId) {
      let query = supabase
        .from('property_reviews')
        .select('*', { count: 'exact' })
        .eq('property_id', propertyId)
      
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
      
      const { data: reviews, count, error } = await query.range(offset, offset + limitNum - 1)
      
      if (error) {
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch reviews'
        })
      }
      
      // Calculate summary
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
      
      return res.json({
        success: true,
        data: {
          reviews,
          pagination: {
            page: pageNum,
            limit: limitNum,
            total: count || 0,
            totalPages: Math.ceil((count || 0) / limitNum)
          },
          summary: {
            averageRating: Math.round(avgRating * 10) / 10,
            totalReviews: allReviews?.length || 0,
            ratingDistribution: ratingCounts
          }
        }
      })
    }
    
    // Agent reviews
    if (type === 'agent' && agentId) {
      const { data: reviews, error } = await supabase
        .from('agent_reviews')
        .select('*')
        .eq('agent_id', agentId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limitNum - 1)
      
      if (error) {
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch agent reviews'
        })
      }
      
      return res.json({
        success: true,
        data: { reviews }
      })
    }
    
    // Locality reviews
    if (type === 'locality' && locality) {
      const { data: reviews, count, error } = await supabase
        .from('locality_reviews')
        .select('*', { count: 'exact' })
        .eq('locality', (locality as string).toLowerCase())
        .order('created_at', { ascending: false })
        .range(offset, offset + limitNum - 1)
      
      if (error) {
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch locality reviews'
        })
      }
      
      return res.json({
        success: true,
        data: {
          reviews,
          pagination: {
            page: pageNum,
            limit: limitNum,
            total: count || 0,
            totalPages: Math.ceil((count || 0) / limitNum)
          }
        }
      })
    }
    
    return res.status(400).json({
      success: false,
      error: 'Property ID, Agent ID, or Locality required'
    })
  } catch (error) {
    console.error('Reviews error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reviews'
    })
  }
})

// POST - Create review
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const {
      type = 'property',
      propertyId,
      agentId,
      locality,
      rating,
      title,
      review,
      pros,
      cons,
      images,
      // Agent review specific
      communicationRating,
      knowledgeRating,
      responsivenessRating,
      // Locality review specific
      safetyRating,
      connectivityRating,
      amenitiesRating
    } = req.body
    
    if (!rating || !review) {
      return res.status(400).json({
        success: false,
        error: 'Rating and review are required'
      })
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: 'Rating must be between 1 and 5'
      })
    }
    
    const reviewId = `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const now = new Date().toISOString()
    
    // Get user name
    const { data: userData } = await supabase
      .from('users')
      .select('name')
      .eq('id', userId)
      .single()
    
    const userName = userData?.name || 'Anonymous'
    
    // Property review
    if (type === 'property' && propertyId) {
      // Check if already reviewed
      const { data: existing } = await supabase
        .from('property_reviews')
        .select('id')
        .eq('property_id', propertyId)
        .eq('user_id', userId)
        .single()
      
      if (existing) {
        return res.status(409).json({
          success: false,
          error: 'You have already reviewed this property'
        })
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
          helpful_count: 0,
          created_at: now
        })
        .select()
        .single()
      
      if (error) {
        return res.status(500).json({
          success: false,
          error: 'Failed to create review'
        })
      }
      
      // Update property average rating
      const { data: allReviews } = await supabase
        .from('property_reviews')
        .select('rating')
        .eq('property_id', propertyId)
      
      if (allReviews && allReviews.length > 0) {
        const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
        await supabase
          .from('properties')
          .update({ rating: Math.round(avgRating * 10) / 10 })
          .eq('id', propertyId)
      }
      
      return res.status(201).json({
        success: true,
        data: newReview,
        message: 'Review submitted successfully'
      })
    }
    
    // Agent review
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
          review,
          created_at: now
        })
        .select()
        .single()
      
      if (error) {
        return res.status(500).json({
          success: false,
          error: 'Failed to create agent review'
        })
      }
      
      return res.status(201).json({
        success: true,
        data: newReview,
        message: 'Agent review submitted'
      })
    }
    
    // Locality review
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
          review,
          pros: pros || [],
          cons: cons || [],
          created_at: now
        })
        .select()
        .single()
      
      if (error) {
        return res.status(500).json({
          success: false,
          error: 'Failed to create locality review'
        })
      }
      
      return res.status(201).json({
        success: true,
        data: newReview,
        message: 'Locality review submitted'
      })
    }
    
    return res.status(400).json({
      success: false,
      error: 'Invalid review type or missing target ID'
    })
  } catch (error) {
    console.error('Create review error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to create review'
    })
  }
})

// PUT - Mark review as helpful
router.put('/:reviewId/helpful', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { reviewId } = req.params
    const userId = req.user?.id
    
    // Check if already marked
    const { data: existing } = await supabase
      .from('review_helpful')
      .select('id')
      .eq('review_id', reviewId)
      .eq('user_id', userId)
      .single()
    
    if (existing) {
      return res.status(409).json({
        success: false,
        error: 'Already marked as helpful'
      })
    }
    
    // Add helpful record
    await supabase
      .from('review_helpful')
      .insert({
        review_id: reviewId,
        user_id: userId,
        created_at: new Date().toISOString()
      })
    
    // Increment count
    const { data: review } = await supabase
      .from('property_reviews')
      .select('helpful_count')
      .eq('id', reviewId)
      .single()
    
    await supabase
      .from('property_reviews')
      .update({ helpful_count: (review?.helpful_count || 0) + 1 })
      .eq('id', reviewId)
    
    res.json({
      success: true,
      message: 'Marked as helpful'
    })
  } catch (error) {
    console.error('Helpful error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to mark as helpful'
    })
  }
})

// DELETE - Delete review
router.delete('/:reviewId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { reviewId } = req.params
    const { type = 'property' } = req.query
    const userId = req.user?.id
    
    const table = type === 'agent' ? 'agent_reviews' : type === 'locality' ? 'locality_reviews' : 'property_reviews'
    
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', reviewId)
      .eq('user_id', userId)
    
    if (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to delete review'
      })
    }
    
    res.json({
      success: true,
      message: 'Review deleted'
    })
  } catch (error) {
    console.error('Delete review error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to delete review'
    })
  }
})

export default router
