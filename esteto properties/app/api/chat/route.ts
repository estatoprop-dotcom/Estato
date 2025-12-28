import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { ChatMessage, ChatSession, ChatContext, ChatAction, AIAgentConfig } from '@/lib/types/features'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yapmbzzqahsyuxxdejpq.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

// AI Agent Configuration
const aiAgentConfig: AIAgentConfig = {
  name: 'Priya',
  personality: 'Friendly, knowledgeable real estate expert who speaks in a warm, conversational tone. Uses simple language, occasionally Hindi phrases for local touch. Always helpful and patient.',
  greeting: "Namaste! 🙏 I'm Priya, your personal property assistant at EstatoProp. How can I help you find your dream home in Lucknow today?",
  fallbackResponses: [
    "I'm not quite sure I understood that. Could you tell me more about what kind of property you're looking for?",
    "Let me help you better! Are you looking to buy or rent a property in Lucknow?",
    "I'd love to help! Could you share your budget and preferred location?"
  ],
  intents: [],
  knowledgeBase: []
}

// Intent patterns and responses
const intents = [
  {
    name: 'greeting',
    patterns: ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good evening', 'hii', 'helo'],
    responses: [
      "Hello! 👋 Welcome to EstatoProp. I'm Priya, your property assistant. Are you looking to buy or rent a property in Lucknow?",
      "Namaste! 🙏 Great to have you here. I'm Priya from EstatoProp. How can I help you find your perfect property today?",
      "Hi there! I'm Priya, your friendly property guide. Looking for a home in Lucknow? I'd love to help!"
    ]
  },
  {
    name: 'buy_property',
    patterns: ['buy', 'purchase', 'kharidna', 'buying', 'want to buy', 'looking to buy', 'buy flat', 'buy house'],
    responses: [
      "Great choice! 🏠 Buying a property is a big decision. Let me help you find the perfect one!\n\nCould you tell me:\n1. Your budget range?\n2. Preferred location in Lucknow?\n3. Property type (Flat/House/Villa)?",
      "Wonderful! I'd love to help you find your dream home. 🏡\n\nTo show you the best options, please share:\n• Budget (e.g., 50 Lakh - 1 Crore)\n• Area preference (Gomti Nagar, Hazratganj, etc.)\n• BHK requirement"
    ],
    actions: [
      { type: 'view_property', label: 'Browse Properties', payload: { listing_type: 'sale' } }
    ]
  },
  {
    name: 'rent_property',
    patterns: ['rent', 'rental', 'kiraya', 'renting', 'want to rent', 'looking for rent', 'rent flat', 'pg'],
    responses: [
      "Looking for a rental? I can help! 🔑\n\nPlease share:\n1. Monthly budget?\n2. Preferred area?\n3. Flat/House/PG?",
      "Sure! Let's find you a great rental. 🏠\n\nQuick questions:\n• Budget per month?\n• Location preference?\n• How many bedrooms do you need?"
    ],
    actions: [
      { type: 'view_property', label: 'Browse Rentals', payload: { listing_type: 'rent' } }
    ]
  },
  {
    name: 'budget_query',
    patterns: ['budget', 'price', 'cost', 'kitna', 'rate', 'affordable', 'cheap', 'expensive'],
    responses: [
      "Budget is important! Here's a quick guide for Lucknow:\n\n💰 **Affordable** (Under 40L): Jankipuram, Kursi Road, Para\n💎 **Mid-Range** (40L-80L): Aliganj, Indira Nagar, Ashiyana\n👑 **Premium** (80L+): Gomti Nagar, Hazratganj, Sushant Golf City\n\nWhat's your budget range?",
      "Let me help you understand Lucknow property rates:\n\n📍 Gomti Nagar: ₹6,000-8,000/sqft\n📍 Hazratganj: ₹8,000-12,000/sqft\n📍 Aliganj: ₹4,500-6,000/sqft\n📍 Jankipuram: ₹3,500-4,500/sqft\n\nWhich area interests you?"
    ],
    actions: [
      { type: 'calculate_emi', label: 'Calculate EMI', payload: {} }
    ]
  },
  {
    name: 'location_query',
    patterns: ['location', 'area', 'where', 'kahan', 'best area', 'which area', 'gomti nagar', 'hazratganj', 'aliganj'],
    responses: [
      "Great question! Here are Lucknow's top areas:\n\n🌟 **Gomti Nagar** - IT hub, modern amenities\n🏛️ **Hazratganj** - City center, heritage charm\n🏡 **Aliganj** - Family-friendly, established\n🌳 **Sushant Golf City** - Premium, green living\n🚀 **Gomti Nagar Ext** - Upcoming, great investment\n\nWhich one would you like to explore?",
      "Lucknow has amazing localities! Let me help you choose:\n\n**For Families**: Aliganj, Indira Nagar, Mahanagar\n**For Professionals**: Gomti Nagar, IT City, Shaheed Path\n**For Investment**: Gomti Nagar Extension, Vrindavan Yojna\n**For Budget**: Jankipuram, Kursi Road\n\nWhat's your priority?"
    ],
    actions: [
      { type: 'view_property', label: 'Explore Locations', payload: { page: 'locations' } }
    ]
  },
  {
    name: 'emi_query',
    patterns: ['emi', 'loan', 'home loan', 'monthly payment', 'installment', 'finance', 'bank loan'],
    responses: [
      "I can help you calculate EMI! 📊\n\nCurrent home loan rates:\n• SBI: 8.50%\n• HDFC: 8.70%\n• ICICI: 8.75%\n• PNB: 8.45%\n\nFor a ₹50 Lakh loan at 8.5% for 20 years, EMI would be ~₹43,391/month.\n\nWant me to calculate for your specific amount?",
      "Let me help with EMI calculation! 💰\n\nShare these details:\n1. Property price\n2. Down payment you can make\n3. Preferred loan tenure\n\nI'll show you the best bank options!"
    ],
    actions: [
      { type: 'calculate_emi', label: 'EMI Calculator', payload: {} }
    ]
  },
  {
    name: 'schedule_visit',
    patterns: ['visit', 'see property', 'site visit', 'dekhna', 'show me', 'viewing', 'appointment'],
    responses: [
      "I'd be happy to arrange a site visit! 🏠\n\nPlease share:\n1. Which property interests you?\n2. Preferred date & time?\n3. Your contact number?\n\nOur agent will confirm within 30 minutes!",
      "Sure! Let's schedule a visit. 📅\n\nYou can:\n• Visit in person with our agent\n• Take a video call tour\n• View 360° virtual tour\n\nWhich would you prefer?"
    ],
    actions: [
      { type: 'schedule_visit', label: 'Schedule Visit', payload: {} }
    ]
  },
  {
    name: 'contact_agent',
    patterns: ['agent', 'call', 'contact', 'speak', 'talk', 'human', 'person', 'phone'],
    responses: [
      "I'll connect you with our expert! 📞\n\n**Call Now**: 9872364476\n**WhatsApp**: wa.me/919872364476\n\nOur team is available:\n• Mon-Sat: 9 AM - 9 PM\n• Sunday: 10 AM - 6 PM\n\nOr share your number, we'll call you back!",
      "Of course! Our property experts are ready to help. 🤝\n\n📱 **Quick Connect**:\n• Call: 9872364476\n• WhatsApp: Click below\n\nWant me to have someone call you instead?"
    ],
    actions: [
      { type: 'call_agent', label: 'Call Now', payload: { phone: '9872364476' } },
      { type: 'whatsapp', label: 'WhatsApp', payload: { phone: '919872364476' } }
    ]
  },
  {
    name: 'property_type',
    patterns: ['flat', 'apartment', 'house', 'villa', 'plot', 'commercial', 'shop', 'office', 'bhk', '2bhk', '3bhk'],
    responses: [
      "We have all types of properties! 🏢\n\n🏠 **Flats/Apartments** - 1BHK to 4BHK\n🏡 **Independent Houses** - Duplex, Bungalows\n🏰 **Villas** - Premium gated communities\n📐 **Plots** - Residential & Commercial\n🏪 **Commercial** - Shops, Offices, Showrooms\n\nWhich type are you interested in?",
      "Let me show you options based on your need:\n\n**For Living**:\n• 2 BHK: ₹30-60 Lakh\n• 3 BHK: ₹50-90 Lakh\n• Villa: ₹1-3 Crore\n\n**For Investment**:\n• Plots: ₹3,000-8,000/sqft\n• Commercial: High rental yield\n\nWhat's your preference?"
    ]
  },
  {
    name: 'valuation',
    patterns: ['value', 'worth', 'valuation', 'price check', 'property value', 'sell', 'selling'],
    responses: [
      "Want to know your property's value? 📊\n\nI can give you a free instant valuation!\n\nJust share:\n1. Location/Area\n2. Property type & size\n3. Age of property\n4. Amenities\n\nI'll calculate the market value for you!",
      "Thinking of selling? Let me help! 💰\n\nOur free valuation considers:\n• Location & connectivity\n• Property condition\n• Recent sales in area\n• Market trends\n\nShare your property details for instant valuation!"
    ],
    actions: [
      { type: 'get_valuation', label: 'Get Valuation', payload: {} }
    ]
  },
  {
    name: 'thanks',
    patterns: ['thanks', 'thank you', 'dhanyawad', 'shukriya', 'helpful', 'great'],
    responses: [
      "You're welcome! 😊 It's my pleasure to help. Feel free to ask anything else about properties in Lucknow!",
      "Glad I could help! 🙏 Don't hesitate to reach out anytime. Happy house hunting!",
      "My pleasure! 💫 Remember, I'm here 24/7 to help you find your dream home in Lucknow!"
    ]
  },
  {
    name: 'goodbye',
    patterns: ['bye', 'goodbye', 'see you', 'alvida', 'later', 'exit'],
    responses: [
      "Goodbye! 👋 Best of luck with your property search. Come back anytime - I'm always here to help!",
      "Take care! 🏠 When you're ready to find your dream home, just say hi. Alvida!",
      "Bye for now! 🙏 Remember, EstatoProp is just a message away. Happy house hunting!"
    ]
  }
]

// Extract entities from message
function extractEntities(message: string): Record<string, any> {
  const entities: Record<string, any> = {}
  const lowerMessage = message.toLowerCase()
  
  // Extract budget
  const budgetPatterns = [
    /(\d+)\s*(lakh|lac|l)/i,
    /(\d+)\s*(crore|cr)/i,
    /(\d+)\s*-\s*(\d+)\s*(lakh|lac|l)/i,
    /(\d+)\s*-\s*(\d+)\s*(crore|cr)/i
  ]
  
  for (const pattern of budgetPatterns) {
    const match = message.match(pattern)
    if (match) {
      if (match[3]) {
        // Range
        const unit = match[3].toLowerCase().includes('cr') ? 10000000 : 100000
        entities.budget = {
          min: parseInt(match[1]) * unit,
          max: parseInt(match[2]) * unit
        }
      } else {
        const unit = match[2].toLowerCase().includes('cr') ? 10000000 : 100000
        entities.budget = { value: parseInt(match[1]) * unit }
      }
      break
    }
  }
  
  // Extract BHK
  const bhkMatch = message.match(/(\d)\s*bhk/i)
  if (bhkMatch) {
    entities.bedrooms = parseInt(bhkMatch[1])
  }
  
  // Extract locations
  const locations = [
    'gomti nagar', 'hazratganj', 'aliganj', 'indira nagar', 'jankipuram',
    'mahanagar', 'ashiyana', 'rajajipuram', 'alambagh', 'charbagh',
    'aminabad', 'chowk', 'kaiserbagh', 'vikas nagar', 'sushant golf city',
    'vrindavan yojna', 'telibagh', 'chinhat', 'faizabad road', 'kanpur road'
  ]
  
  for (const loc of locations) {
    if (lowerMessage.includes(loc)) {
      entities.location = loc
      break
    }
  }
  
  // Extract property type
  const propertyTypes = {
    'flat': 'flat',
    'apartment': 'flat',
    'house': 'house',
    'villa': 'villa',
    'plot': 'plot',
    'commercial': 'commercial',
    'shop': 'commercial',
    'office': 'commercial',
    'pg': 'pg'
  }
  
  for (const [keyword, type] of Object.entries(propertyTypes)) {
    if (lowerMessage.includes(keyword)) {
      entities.propertyType = type
      break
    }
  }
  
  // Extract listing type
  if (lowerMessage.includes('rent') || lowerMessage.includes('kiraya')) {
    entities.listingType = 'rent'
  } else if (lowerMessage.includes('buy') || lowerMessage.includes('purchase') || lowerMessage.includes('kharid')) {
    entities.listingType = 'sale'
  }
  
  // Extract phone number
  const phoneMatch = message.match(/(\d{10})/g)
  if (phoneMatch) {
    entities.phone = phoneMatch[0]
  }
  
  return entities
}

// Intent type
type IntentType = typeof intents[number]

// Detect intent from message
function detectIntent(message: string): { intent: IntentType | null; confidence: number } {
  const lowerMessage = message.toLowerCase().trim()
  
  let bestMatch: typeof intents[0] | null = null
  let highestScore = 0
  
  for (const intent of intents) {
    for (const pattern of intent.patterns) {
      if (lowerMessage.includes(pattern.toLowerCase())) {
        const score = pattern.length / lowerMessage.length
        if (score > highestScore || (score === highestScore && pattern.length > (bestMatch?.patterns[0]?.length || 0))) {
          highestScore = score
          bestMatch = intent
        }
      }
    }
  }
  
  return { intent: bestMatch, confidence: Math.min(highestScore * 2, 1) }
}

// Generate response based on context
function generateResponse(
  message: string, 
  context: ChatContext,
  entities: Record<string, any>
): { response: string; actions: ChatAction[]; intent: string } {
  const { intent, confidence } = detectIntent(message)
  
  if (!intent || confidence < 0.1) {
    // No clear intent - ask clarifying question
    const clarifyingResponses = [
      "I'd love to help! Could you tell me more about what you're looking for? Are you interested in buying or renting a property?",
      "I'm here to help you find the perfect property! 🏠 Are you looking to:\n\n1. Buy a property\n2. Rent a property\n3. Get property valuation\n4. Calculate EMI\n\nJust let me know!",
      "I want to make sure I understand correctly. Are you looking for a property in Lucknow? Please share your requirements!"
    ]
    
    const defaultActions: ChatAction[] = [
      { type: 'view_property', label: 'Browse Properties', payload: {} },
      { type: 'calculate_emi', label: 'EMI Calculator', payload: {} }
    ]
    
    return {
      response: clarifyingResponses[Math.floor(Math.random() * clarifyingResponses.length)],
      actions: defaultActions,
      intent: 'unclear'
    }
  }
  
  // Get random response from intent
  const response = intent.responses[Math.floor(Math.random() * intent.responses.length)]
  
  // Personalize response with extracted entities
  let personalizedResponse = response
  
  if (entities.location) {
    personalizedResponse += `\n\n📍 I see you're interested in **${entities.location.replace(/\b\w/g, (l: string) => l.toUpperCase())}** - great choice!`
  }
  
  if (entities.budget) {
    const budgetStr = entities.budget.value 
      ? `₹${(entities.budget.value / 100000).toFixed(0)} Lakh`
      : `₹${(entities.budget.min / 100000).toFixed(0)} - ${(entities.budget.max / 100000).toFixed(0)} Lakh`
    personalizedResponse += `\n\n💰 Budget noted: ${budgetStr}`
  }
  
  if (entities.bedrooms) {
    personalizedResponse += `\n\n🛏️ Looking for ${entities.bedrooms} BHK - got it!`
  }
  
  return {
    response: personalizedResponse,
    actions: (intent.actions || []) as ChatAction[],
    intent: intent.name
  }
}

// GET - Get chat session or history
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    const visitorId = searchParams.get('visitorId')
    
    if (sessionId) {
      // Get specific session
      const { data: session, error } = await supabase
        .from('chat_sessions')
        .select('*, chat_messages(*)')
        .eq('id', sessionId)
        .single()
      
      if (error || !session) {
        return NextResponse.json(
          { success: false, error: 'Session not found' },
          { status: 404 }
        )
      }
      
      return NextResponse.json({
        success: true,
        data: session
      })
    }
    
    if (visitorId) {
      // Get visitor's recent sessions
      const { data: sessions, error } = await supabase
        .from('chat_sessions')
        .select('id, started_at, lead_captured')
        .eq('visitor_id', visitorId)
        .order('started_at', { ascending: false })
        .limit(5)
      
      if (error) {
        return NextResponse.json(
          { success: false, error: 'Failed to fetch sessions' },
          { status: 500 }
        )
      }
      
      return NextResponse.json({
        success: true,
        data: sessions
      })
    }
    
    // Return agent config for initialization
    return NextResponse.json({
      success: true,
      data: {
        agentName: aiAgentConfig.name,
        greeting: aiAgentConfig.greeting,
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
    return NextResponse.json(
      { success: false, error: 'Failed to fetch chat data' },
      { status: 500 }
    )
  }
}

// POST - Send message and get response
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      message, 
      sessionId, 
      visitorId, 
      userId,
      context = {}
    } = body
    
    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message required' },
        { status: 400 }
      )
    }
    
    // Create or get session
    let currentSessionId = sessionId
    
    if (!currentSessionId) {
      // Create new session
      const newSessionId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      const { error: sessionError } = await supabase
        .from('chat_sessions')
        .insert({
          id: newSessionId,
          visitor_id: visitorId || 'anonymous',
          user_id: userId || null,
          started_at: new Date().toISOString(),
          context: {
            currentPage: context.currentPage || '/',
            conversationStage: 'greeting'
          },
          lead_captured: false,
          handoff_to_agent: false
        })
      
      if (sessionError) {
        console.error('Create session error:', sessionError)
      }
      
      currentSessionId = newSessionId
    }
    
    // Extract entities from message
    const entities = extractEntities(message)
    
    // Generate response
    const { response, actions, intent } = generateResponse(message, context, entities)
    
    // Save user message
    const userMessageId = `msg_${Date.now()}_user`
    await supabase
      .from('chat_messages')
      .insert({
        id: userMessageId,
        session_id: currentSessionId,
        role: 'user',
        content: message,
        timestamp: new Date().toISOString(),
        metadata: { entities, intent }
      })
    
    // Save assistant response
    const assistantMessageId = `msg_${Date.now()}_assistant`
    await supabase
      .from('chat_messages')
      .insert({
        id: assistantMessageId,
        session_id: currentSessionId,
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
        metadata: {
          intent,
          suggestedActions: actions,
          entities
        }
      })
    
    // Update session context
    const updatedContext = {
      ...context,
      ...entities,
      lastIntent: intent,
      conversationStage: intent === 'greeting' ? 'discovery' : 
                         intent === 'schedule_visit' ? 'scheduling' :
                         intent === 'contact_agent' ? 'closing' : 'recommendation'
    }
    
    await supabase
      .from('chat_sessions')
      .update({ 
        context: updatedContext,
        updated_at: new Date().toISOString()
      })
      .eq('id', currentSessionId)
    
    // Check if lead captured (phone number shared)
    if (entities.phone) {
      await supabase
        .from('chat_sessions')
        .update({ lead_captured: true })
        .eq('id', currentSessionId)
      
      // Create lead
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
    
    return NextResponse.json({
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
    return NextResponse.json(
      { success: false, error: 'Failed to process message' },
      { status: 500 }
    )
  }
}

// PUT - Update session (handoff to agent, end session)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, action, agentId } = body
    
    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID required' },
        { status: 400 }
      )
    }
    
    if (action === 'handoff') {
      // Handoff to human agent
      await supabase
        .from('chat_sessions')
        .update({
          handoff_to_agent: true,
          agent_id: agentId || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', sessionId)
      
      // Add system message
      await supabase
        .from('chat_messages')
        .insert({
          id: `msg_${Date.now()}_system`,
          session_id: sessionId,
          role: 'system',
          content: 'Conversation handed off to human agent',
          timestamp: new Date().toISOString()
        })
      
      return NextResponse.json({
        success: true,
        message: 'Handed off to agent',
        data: {
          response: "I'm connecting you with one of our property experts who can assist you better. They'll be with you shortly! 🤝"
        }
      })
    }
    
    if (action === 'end') {
      // End session
      await supabase
        .from('chat_sessions')
        .update({
          ended_at: new Date().toISOString()
        })
        .eq('id', sessionId)
      
      return NextResponse.json({
        success: true,
        message: 'Session ended'
      })
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Chat PUT error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update session' },
      { status: 500 }
    )
  }
}
