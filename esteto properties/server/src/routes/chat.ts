import { Router, Request, Response } from 'express'
import { supabase } from '../config/supabase'

const router = Router()

// Intent patterns and responses
const intents = [
  {
    name: 'greeting',
    patterns: ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good evening'],
    responses: [
      "Hello! 👋 Welcome to EstatoProp. I'm Priya, your property assistant. Are you looking to buy or rent a property in Lucknow?",
      "Namaste! 🙏 Great to have you here. How can I help you find your perfect property today?"
    ]
  },
  {
    name: 'buy_property',
    patterns: ['buy', 'purchase', 'kharidna', 'buying', 'want to buy'],
    responses: [
      "Great choice! 🏠 Let me help you find the perfect property!\n\nCould you tell me:\n1. Your budget range?\n2. Preferred location?\n3. Property type (Flat/House/Villa)?",
      "Wonderful! I'd love to help you find your dream home. 🏡\n\nPlease share:\n• Budget\n• Area preference\n• BHK requirement"
    ],
    actions: [{ type: 'view_property', label: 'Browse Properties' }]
  },
  {
    name: 'rent_property',
    patterns: ['rent', 'rental', 'kiraya', 'renting', 'pg'],
    responses: [
      "Looking for a rental? I can help! 🔑\n\nPlease share:\n1. Monthly budget?\n2. Preferred area?\n3. Flat/House/PG?"
    ],
    actions: [{ type: 'view_property', label: 'Browse Rentals' }]
  },
  {
    name: 'budget_query',
    patterns: ['budget', 'price', 'cost', 'kitna', 'rate', 'affordable'],
    responses: [
      "Here's a quick guide for Lucknow:\n\n💰 **Affordable** (Under 40L): Jankipuram, Kursi Road\n💎 **Mid-Range** (40L-80L): Aliganj, Indira Nagar\n👑 **Premium** (80L+): Gomti Nagar, Hazratganj\n\nWhat's your budget range?"
    ],
    actions: [{ type: 'calculate_emi', label: 'Calculate EMI' }]
  },
  {
    name: 'location_query',
    patterns: ['location', 'area', 'where', 'kahan', 'best area', 'gomti nagar', 'hazratganj'],
    responses: [
      "Great question! Here are Lucknow's top areas:\n\n🌟 **Gomti Nagar** - IT hub, modern amenities\n🏛️ **Hazratganj** - City center, heritage\n🏡 **Aliganj** - Family-friendly\n🌳 **Sushant Golf City** - Premium living\n\nWhich one interests you?"
    ]
  },
  {
    name: 'emi_query',
    patterns: ['emi', 'loan', 'home loan', 'monthly payment', 'finance'],
    responses: [
      "I can help with EMI! 📊\n\nCurrent rates:\n• SBI: 8.50%\n• HDFC: 8.70%\n• ICICI: 8.75%\n\nFor ₹50L loan at 8.5% for 20 years, EMI ≈ ₹43,391/month.\n\nWant me to calculate for your amount?"
    ],
    actions: [{ type: 'calculate_emi', label: 'EMI Calculator' }]
  },
  {
    name: 'schedule_visit',
    patterns: ['visit', 'see property', 'site visit', 'dekhna', 'show me'],
    responses: [
      "I'd be happy to arrange a visit! 🏠\n\nPlease share:\n1. Which property?\n2. Preferred date & time?\n3. Your contact number?\n\nOur agent will confirm within 30 minutes!"
    ],
    actions: [{ type: 'schedule_visit', label: 'Schedule Visit' }]
  },
  {
    name: 'contact_agent',
    patterns: ['agent', 'call', 'contact', 'speak', 'talk', 'human'],
    responses: [
      "I'll connect you with our expert! 📞\n\n**Call Now**: 9872364476\n**WhatsApp**: wa.me/919872364476\n\nAvailable: Mon-Sat 9AM-9PM\n\nOr share your number, we'll call you!"
    ],
    actions: [
      { type: 'call_agent', label: 'Call Now' },
      { type: 'whatsapp', label: 'WhatsApp' }
    ]
  },
  {
    name: 'valuation',
    patterns: ['value', 'worth', 'valuation', 'sell', 'selling'],
    responses: [
      "Want to know your property's value? 📊\n\nShare:\n1. Location/Area\n2. Property type & size\n3. Age & amenities\n\nI'll calculate the market value!"
    ],
    actions: [{ type: 'get_valuation', label: 'Get Valuation' }]
  },
  {
    name: 'thanks',
    patterns: ['thanks', 'thank you', 'dhanyawad', 'helpful'],
    responses: [
      "You're welcome! 😊 Feel free to ask anything else about properties in Lucknow!",
      "Glad I could help! 🙏 Don't hesitate to reach out anytime!"
    ]
  },
  {
    name: 'goodbye',
    patterns: ['bye', 'goodbye', 'see you', 'alvida'],
    responses: [
      "Goodbye! 👋 Best of luck with your property search. Come back anytime!",
      "Take care! 🏠 When you're ready, just say hi. Alvida!"
    ]
  }
]

// Extract entities from message
function extractEntities(message: string) {
  const entities: Record<string, any> = {}
  const lowerMessage = message.toLowerCase()
  
  // Budget
  const budgetMatch = message.match(/(\d+)\s*(lakh|lac|l|crore|cr)/i)
  if (budgetMatch) {
    const value = parseInt(budgetMatch[1])
    const unit = budgetMatch[2].toLowerCase().includes('cr') ? 10000000 : 100000
    entities.budget = value * unit
  }
  
  // BHK
  const bhkMatch = message.match(/(\d)\s*bhk/i)
  if (bhkMatch) {
    entities.bedrooms = parseInt(bhkMatch[1])
  }
  
  // Locations
  const locations = ['gomti nagar', 'hazratganj', 'aliganj', 'indira nagar', 'jankipuram', 'mahanagar']
  for (const loc of locations) {
    if (lowerMessage.includes(loc)) {
      entities.location = loc
      break
    }
  }
  
  // Phone
  const phoneMatch = message.match(/(\d{10})/g)
  if (phoneMatch) {
    entities.phone = phoneMatch[0]
  }
  
  return entities
}

// Detect intent
function detectIntent(message: string) {
  const lowerMessage = message.toLowerCase().trim()
  
  for (const intent of intents) {
    for (const pattern of intent.patterns) {
      if (lowerMessage.includes(pattern.toLowerCase())) {
        return intent
      }
    }
  }
  
  return null
}

// Generate response
function generateResponse(message: string, entities: Record<string, any>) {
  const intent = detectIntent(message)
  
  if (!intent) {
    return {
      response: "I'd love to help! Could you tell me more? Are you looking to buy or rent a property in Lucknow?",
      actions: [
        { type: 'view_property', label: 'Browse Properties' },
        { type: 'calculate_emi', label: 'EMI Calculator' }
      ],
      intent: 'unclear'
    }
  }
  
  let response = intent.responses[Math.floor(Math.random() * intent.responses.length)]
  
  // Personalize with entities
  if (entities.location) {
    response += `\n\n📍 I see you're interested in **${entities.location.replace(/\b\w/g, (l: string) => l.toUpperCase())}** - great choice!`
  }
  
  if (entities.budget) {
    response += `\n\n💰 Budget noted: ₹${(entities.budget / 100000).toFixed(0)} Lakh`
  }
  
  if (entities.bedrooms) {
    response += `\n\n🛏️ Looking for ${entities.bedrooms} BHK - got it!`
  }
  
  return {
    response,
    actions: intent.actions || [],
    intent: intent.name
  }
}

// GET - Get chat config or session
router.get('/', async (req: Request, res: Response) => {
  try {
    const { sessionId, visitorId } = req.query
    
    if (sessionId) {
      const { data: session, error } = await supabase
        .from('chat_sessions')
        .select('*, chat_messages(*)')
        .eq('id', sessionId)
        .single()
      
      if (error || !session) {
        return res.status(404).json({
          success: false,
          error: 'Session not found'
        })
      }
      
      return res.json({
        success: true,
        data: session
      })
    }
    
    // Return config
    res.json({
      success: true,
      data: {
        agentName: 'Priya',
        greeting: "Namaste! 🙏 I'm Priya, your personal property assistant at EstatoProp. How can I help you find your dream home in Lucknow today?",
        suggestedQuestions: [
          "I want to buy a flat in Gomti Nagar",
          "Show me rental properties under 20,000",
          "What are property rates in Lucknow?",
          "Calculate EMI for 50 Lakh loan",
          "Schedule a property visit"
        ]
      }
    })
  } catch (error) {
    console.error('Chat GET error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch chat data'
    })
  }
})

// POST - Send message
router.post('/', async (req: Request, res: Response) => {
  try {
    const { message, sessionId, visitorId, userId, context = {} } = req.body
    
    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message required'
      })
    }
    
    // Create or get session
    let currentSessionId = sessionId
    
    if (!currentSessionId) {
      currentSessionId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      await supabase
        .from('chat_sessions')
        .insert({
          id: currentSessionId,
          visitor_id: visitorId || 'anonymous',
          user_id: userId || null,
          started_at: new Date().toISOString(),
          context: {},
          lead_captured: false,
          handoff_to_agent: false
        })
    }
    
    // Extract entities and generate response
    const entities = extractEntities(message)
    const { response, actions, intent } = generateResponse(message, entities)
    
    // Save messages
    const userMessageId = `msg_${Date.now()}_user`
    const assistantMessageId = `msg_${Date.now()}_assistant`
    
    await supabase
      .from('chat_messages')
      .insert([
        {
          id: userMessageId,
          session_id: currentSessionId,
          role: 'user',
          content: message,
          timestamp: new Date().toISOString(),
          metadata: { entities, intent }
        },
        {
          id: assistantMessageId,
          session_id: currentSessionId,
          role: 'assistant',
          content: response,
          timestamp: new Date().toISOString(),
          metadata: { intent, suggestedActions: actions }
        }
      ])
    
    // Update context
    const updatedContext = { ...context, ...entities, lastIntent: intent }
    
    await supabase
      .from('chat_sessions')
      .update({ context: updatedContext, updated_at: new Date().toISOString() })
      .eq('id', currentSessionId)
    
    // Capture lead if phone shared
    if (entities.phone) {
      await supabase
        .from('chat_sessions')
        .update({ lead_captured: true })
        .eq('id', currentSessionId)
      
      await supabase
        .from('leads')
        .insert({
          source: 'chat',
          phone: entities.phone,
          status: 'new',
          context: updatedContext,
          created_at: new Date().toISOString()
        })
    }
    
    res.json({
      success: true,
      data: {
        sessionId: currentSessionId,
        message: {
          id: assistantMessageId,
          role: 'assistant',
          content: response,
          timestamp: new Date().toISOString()
        },
        suggestedActions: actions,
        context: updatedContext,
        entities
      }
    })
  } catch (error) {
    console.error('Chat POST error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to process message'
    })
  }
})

// PUT - Handoff to agent
router.put('/:sessionId', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params
    const { action, agentId } = req.body
    
    if (action === 'handoff') {
      await supabase
        .from('chat_sessions')
        .update({
          handoff_to_agent: true,
          agent_id: agentId || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', sessionId)
      
      return res.json({
        success: true,
        message: 'Handed off to agent',
        data: {
          response: "I'm connecting you with one of our property experts. They'll be with you shortly! 🤝"
        }
      })
    }
    
    if (action === 'end') {
      await supabase
        .from('chat_sessions')
        .update({ ended_at: new Date().toISOString() })
        .eq('id', sessionId)
      
      return res.json({
        success: true,
        message: 'Session ended'
      })
    }
    
    return res.status(400).json({
      success: false,
      error: 'Invalid action'
    })
  } catch (error) {
    console.error('Chat PUT error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update session'
    })
  }
})

export default router
