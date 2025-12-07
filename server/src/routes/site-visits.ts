import { Router, Request, Response } from 'express'
import { supabase } from '../config/supabase'
import { authenticate, optionalAuth, AuthRequest } from '../middleware/auth'

const router = Router()

// Generate available slots
function generateAvailableSlots() {
  const slots = []
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ]
  
  for (let i = 1; i <= 14; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    
    const dayOfWeek = date.getDay()
    const availableTimeSlots = dayOfWeek === 0 
      ? timeSlots.slice(2, 6) // Sunday: limited hours
      : timeSlots
    
    const daySlots = availableTimeSlots.map(time => ({
      time,
      available: Math.random() > 0.3
    }))
    
    slots.push({
      date: date.toISOString().split('T')[0],
      dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
      slots: daySlots
    })
  }
  
  return slots
}

// GET - Get available slots or user's visits
router.get('/', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { propertyId, action, visitId } = req.query
    const userId = req.user?.id
    
    // Get available slots for a property
    if (action === 'slots' && propertyId) {
      const slots = generateAvailableSlots()
      
      return res.json({
        success: true,
        data: {
          propertyId,
          availableSlots: slots,
          visitTypes: [
            { type: 'in_person', label: 'In-Person Visit', icon: '🏠' },
            { type: 'video_call', label: 'Video Call', icon: '📹' },
            { type: 'virtual_tour', label: '360° Virtual Tour', icon: '🔄' }
          ]
        }
      })
    }
    
    // Get specific visit
    if (visitId) {
      const { data: visit, error } = await supabase
        .from('site_visits')
        .select('*, properties(*)')
        .eq('id', visitId)
        .single()
      
      if (error || !visit) {
        return res.status(404).json({
          success: false,
          error: 'Visit not found'
        })
      }
      
      return res.json({
        success: true,
        data: visit
      })
    }
    
    // Get user's visits
    if (userId) {
      const { data: visits, error } = await supabase
        .from('site_visits')
        .select('*, properties(id, title, location, images)')
        .eq('user_id', userId)
        .order('scheduled_date', { ascending: true })
      
      if (error) {
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch visits'
        })
      }
      
      const now = new Date()
      const upcoming = (visits || []).filter(v => 
        new Date(v.scheduled_date) >= now && v.status !== 'cancelled'
      )
      const past = (visits || []).filter(v => 
        new Date(v.scheduled_date) < now || v.status === 'completed'
      )
      
      return res.json({
        success: true,
        data: {
          all: visits,
          upcoming,
          past,
          counts: {
            total: visits?.length || 0,
            upcoming: upcoming.length,
            past: past.length
          }
        }
      })
    }
    
    return res.status(400).json({
      success: false,
      error: 'Property ID or authentication required'
    })
  } catch (error) {
    console.error('Site visits error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch site visits'
    })
  }
})

// POST - Schedule a site visit
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      propertyId,
      userId,
      scheduledDate,
      scheduledTime,
      visitType = 'in_person',
      contactName,
      contactNumber,
      notes
    } = req.body
    
    if (!propertyId || !scheduledDate || !scheduledTime || !contactName || !contactNumber) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      })
    }
    
    // Validate phone
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(contactNumber.replace(/\D/g, ''))) {
      return res.status(400).json({
        success: false,
        error: 'Invalid phone number'
      })
    }
    
    // Get property details
    const { data: property } = await supabase
      .from('properties')
      .select('title, location')
      .eq('id', propertyId)
      .single()
    
    // Create visit
    const visitId = `visit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const { data: visit, error } = await supabase
      .from('site_visits')
      .insert({
        id: visitId,
        property_id: propertyId,
        user_id: userId || null,
        scheduled_date: scheduledDate,
        scheduled_time: scheduledTime,
        visit_type: visitType,
        contact_name: contactName,
        contact_number: contactNumber,
        notes: notes || null,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) {
      console.error('Create visit error:', error)
      return res.status(500).json({
        success: false,
        error: 'Failed to schedule visit'
      })
    }
    
    res.status(201).json({
      success: true,
      data: {
        visit,
        property,
        confirmationMessage: `Your site visit for ${property?.title || 'the property'} has been scheduled for ${scheduledDate} at ${scheduledTime}. Our agent will contact you shortly.`
      }
    })
  } catch (error) {
    console.error('Schedule visit error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to schedule visit'
    })
  }
})

// PUT - Update visit (reschedule, cancel)
router.put('/:visitId', async (req: Request, res: Response) => {
  try {
    const { visitId } = req.params
    const { action, scheduledDate, scheduledTime, reason, feedback } = req.body
    
    let updatePayload: Record<string, any> = { updated_at: new Date().toISOString() }
    let message = ''
    
    switch (action) {
      case 'reschedule':
        if (!scheduledDate || !scheduledTime) {
          return res.status(400).json({
            success: false,
            error: 'New date and time required'
          })
        }
        updatePayload = {
          ...updatePayload,
          scheduled_date: scheduledDate,
          scheduled_time: scheduledTime,
          status: 'rescheduled'
        }
        message = 'Visit rescheduled successfully'
        break
        
      case 'cancel':
        updatePayload = {
          ...updatePayload,
          status: 'cancelled',
          cancellation_reason: reason || null
        }
        message = 'Visit cancelled'
        break
        
      case 'confirm':
        updatePayload = { ...updatePayload, status: 'confirmed' }
        message = 'Visit confirmed'
        break
        
      case 'complete':
        updatePayload = { ...updatePayload, status: 'completed' }
        message = 'Visit marked as completed'
        break
        
      case 'feedback':
        updatePayload = {
          ...updatePayload,
          feedback,
          status: 'completed'
        }
        message = 'Feedback submitted'
        break
        
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid action'
        })
    }
    
    const { data: updatedVisit, error } = await supabase
      .from('site_visits')
      .update(updatePayload)
      .eq('id', visitId)
      .select()
      .single()
    
    if (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to update visit'
      })
    }
    
    res.json({
      success: true,
      data: updatedVisit,
      message
    })
  } catch (error) {
    console.error('Update visit error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update visit'
    })
  }
})

export default router
