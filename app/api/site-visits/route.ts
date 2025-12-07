import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { SiteVisit, AvailableSlot, TimeSlot } from '@/lib/types/features'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yapmbzzqahsyuxxdejpq.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

// Generate available time slots for next 14 days
function generateAvailableSlots(): AvailableSlot[] {
  const slots: AvailableSlot[] = []
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ]
  
  for (let i = 1; i <= 14; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    
    // Skip if Sunday (limited hours)
    const dayOfWeek = date.getDay()
    const availableTimeSlots = dayOfWeek === 0 
      ? timeSlots.slice(2, 6) // Sunday: 11 AM - 5 PM
      : timeSlots
    
    const daySlots: TimeSlot[] = availableTimeSlots.map(time => ({
      time,
      available: Math.random() > 0.3, // 70% availability (simulated)
      agentId: `agent_${Math.floor(Math.random() * 5) + 1}`
    }))
    
    slots.push({
      date: date.toISOString().split('T')[0],
      slots: daySlots
    })
  }
  
  return slots
}

// GET - Get site visits or available slots
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const propertyId = searchParams.get('propertyId')
    const visitId = searchParams.get('visitId')
    const action = searchParams.get('action')
    
    // Get available slots for a property
    if (action === 'slots' && propertyId) {
      // In production, check against existing bookings
      const slots = generateAvailableSlots()
      
      return NextResponse.json({
        success: true,
        data: {
          propertyId,
          availableSlots: slots,
          visitTypes: [
            { type: 'in_person', label: 'In-Person Visit', description: 'Visit the property with our agent' },
            { type: 'video_call', label: 'Video Call', description: 'Virtual tour via video call' },
            { type: 'virtual_tour', label: '360° Virtual Tour', description: 'Self-guided virtual tour' }
          ]
        }
      })
    }
    
    // Get specific visit details
    if (visitId) {
      const { data: visit, error } = await supabase
        .from('site_visits')
        .select('*, properties(*)')
        .eq('id', visitId)
        .single()
      
      if (error || !visit) {
        return NextResponse.json(
          { success: false, error: 'Visit not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json({
        success: true,
        data: visit
      })
    }
    
    // Get user's visits
    if (userId) {
      const { data: visits, error } = await supabase
        .from('site_visits')
        .select('*, properties(*)')
        .eq('user_id', userId)
        .order('scheduled_date', { ascending: true })
      
      if (error) {
        console.error('Fetch visits error:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to fetch visits' },
          { status: 500 }
        )
      }
      
      // Categorize visits
      const now = new Date()
      const upcoming = (visits || []).filter(v => 
        new Date(v.scheduled_date) >= now && v.status !== 'cancelled'
      )
      const past = (visits || []).filter(v => 
        new Date(v.scheduled_date) < now || v.status === 'completed'
      )
      const cancelled = (visits || []).filter(v => v.status === 'cancelled')
      
      return NextResponse.json({
        success: true,
        data: {
          all: visits,
          upcoming,
          past,
          cancelled,
          counts: {
            total: visits?.length || 0,
            upcoming: upcoming.length,
            past: past.length,
            cancelled: cancelled.length
          }
        }
      })
    }
    
    return NextResponse.json(
      { success: false, error: 'User ID or action required' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Site visits error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch site visits' },
      { status: 500 }
    )
  }
}

// POST - Schedule a site visit
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      propertyId,
      userId,
      scheduledDate,
      scheduledTime,
      visitType = 'in_person',
      contactName,
      contactNumber,
      notes
    } = body
    
    // Validation
    if (!propertyId || !scheduledDate || !scheduledTime || !contactName || !contactNumber) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Validate phone number
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(contactNumber.replace(/\D/g, ''))) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number' },
        { status: 400 }
      )
    }
    
    // Check if slot is still available (in production, use proper locking)
    const { data: existingVisits } = await supabase
      .from('site_visits')
      .select('id')
      .eq('property_id', propertyId)
      .eq('scheduled_date', scheduledDate)
      .eq('scheduled_time', scheduledTime)
      .neq('status', 'cancelled')
    
    if (existingVisits && existingVisits.length >= 2) {
      return NextResponse.json(
        { success: false, error: 'This time slot is no longer available. Please choose another.' },
        { status: 409 }
      )
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
        reminder_sent: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) {
      console.error('Create visit error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to schedule visit' },
        { status: 500 }
      )
    }
    
    // In production: Send confirmation SMS/WhatsApp/Email
    // await sendConfirmationSMS(contactNumber, property?.title, scheduledDate, scheduledTime)
    
    return NextResponse.json({
      success: true,
      data: {
        visit,
        property,
        confirmationMessage: `Your site visit for ${property?.title || 'the property'} has been scheduled for ${scheduledDate} at ${scheduledTime}. Our agent will contact you shortly to confirm.`
      },
      message: 'Site visit scheduled successfully'
    })
  } catch (error) {
    console.error('Schedule visit error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to schedule visit' },
      { status: 500 }
    )
  }
}

// PUT - Update visit (reschedule, cancel, add feedback)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { visitId, action, ...updateData } = body
    
    if (!visitId) {
      return NextResponse.json(
        { success: false, error: 'Visit ID required' },
        { status: 400 }
      )
    }
    
    // Get existing visit
    const { data: existingVisit } = await supabase
      .from('site_visits')
      .select('*')
      .eq('id', visitId)
      .single()
    
    if (!existingVisit) {
      return NextResponse.json(
        { success: false, error: 'Visit not found' },
        { status: 404 }
      )
    }
    
    let updatePayload: Record<string, any> = { updated_at: new Date().toISOString() }
    let message = ''
    
    switch (action) {
      case 'reschedule':
        if (!updateData.scheduledDate || !updateData.scheduledTime) {
          return NextResponse.json(
            { success: false, error: 'New date and time required for rescheduling' },
            { status: 400 }
          )
        }
        updatePayload = {
          ...updatePayload,
          scheduled_date: updateData.scheduledDate,
          scheduled_time: updateData.scheduledTime,
          status: 'rescheduled'
        }
        message = 'Visit rescheduled successfully'
        break
        
      case 'cancel':
        updatePayload = {
          ...updatePayload,
          status: 'cancelled',
          cancellation_reason: updateData.reason || null
        }
        message = 'Visit cancelled'
        break
        
      case 'confirm':
        updatePayload = {
          ...updatePayload,
          status: 'confirmed',
          agent_id: updateData.agentId || null
        }
        message = 'Visit confirmed'
        break
        
      case 'complete':
        updatePayload = {
          ...updatePayload,
          status: 'completed'
        }
        message = 'Visit marked as completed'
        break
        
      case 'feedback':
        if (!updateData.feedback) {
          return NextResponse.json(
            { success: false, error: 'Feedback data required' },
            { status: 400 }
          )
        }
        updatePayload = {
          ...updatePayload,
          feedback: updateData.feedback,
          status: 'completed'
        }
        message = 'Feedback submitted successfully'
        break
        
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        )
    }
    
    const { data: updatedVisit, error } = await supabase
      .from('site_visits')
      .update(updatePayload)
      .eq('id', visitId)
      .select()
      .single()
    
    if (error) {
      console.error('Update visit error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to update visit' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: updatedVisit,
      message
    })
  } catch (error) {
    console.error('Update visit error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update visit' },
      { status: 500 }
    )
  }
}
