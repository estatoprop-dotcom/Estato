'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Phone, Calendar, Calculator, Home, Sparkles, User } from 'lucide-react'
import Button from '@/components/ui/Button'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  actions?: ChatAction[]
}

interface ChatAction {
  type: string
  label: string
  icon?: string
}

const suggestedQuestions = [
  "I want to buy a flat in Gomti Nagar",
  "Show me 3BHK under 80 Lakhs",
  "What are property rates in Lucknow?",
  "Calculate EMI for 50 Lakh loan",
  "Schedule a property visit"
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize messages only on client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Namaste! 🙏 I'm Priya, your personal property assistant at EstatoProp. How can I help you find your dream home in Lucknow today?",
        timestamp: new Date(),
        actions: [
          { type: 'view_property', label: '🏠 Browse Properties', icon: '🏠' },
          { type: 'calculate_emi', label: '🧮 EMI Calculator', icon: '🧮' }
        ]
      }
    ])
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const generateResponse = (userMessage: string): { content: string; actions?: ChatAction[] } => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes('buy') || lowerMessage.includes('purchase')) {
      return {
        content: "Great choice! 🏡 I'd love to help you find the perfect property!\n\nCould you tell me:\n1. Your budget range?\n2. Preferred location?\n3. Property type (Flat/House/Villa)?",
        actions: [
          { type: 'view_property', label: '🏠 Browse Properties', icon: '🏠' },
          { type: 'filter', label: '🔍 Set Filters', icon: '🔍' }
        ]
      }
    }

    if (lowerMessage.includes('rent')) {
      return {
        content: "Looking for a rental? I can help! 🏢\n\nPlease share:\n1. Monthly budget?\n2. Preferred area?\n3. Flat/House/PG?",
        actions: [{ type: 'view_rentals', label: '🏠 Browse Rentals', icon: '🏠' }]
      }
    }

    if (lowerMessage.includes('emi') || lowerMessage.includes('loan')) {
      return {
        content: "I can help with EMI! 🧮\n\nCurrent rates:\n• SBI: 8.50%\n• HDFC: 8.70%\n• ICICI: 8.75%\n\nFor ₹50L loan at 8.5% for 20 years, EMI ≈ ₹43,391/month.\n\nWant me to calculate for your amount?",
        actions: [{ type: 'calculate_emi', label: '🧮 EMI Calculator', icon: '🧮' }]
      }
    }

    if (lowerMessage.includes('rate') || lowerMessage.includes('price') || lowerMessage.includes('budget')) {
      return {
        content: "Here's a quick guide for Lucknow:\n\n💰 **Affordable** (Under 40L): Jankipuram, Kursi Road\n💵 **Mid-Range** (40L-80L): Aliganj, Indira Nagar\n💎 **Premium** (80L+): Gomti Nagar, Hazratganj\n\nWhat's your budget range?",
        actions: [{ type: 'price_trends', label: '📈 View Price Trends', icon: '📈' }]
      }
    }

    if (lowerMessage.includes('visit') || lowerMessage.includes('see') || lowerMessage.includes('show')) {
      return {
        content: "I'd be happy to arrange a visit! 📅\n\nPlease share:\n1. Which property?\n2. Preferred date & time?\n3. Your contact number?\n\nOur agent will confirm within 30 minutes!",
        actions: [{ type: 'schedule_visit', label: '📅 Schedule Visit', icon: '📅' }]
      }
    }

    if (lowerMessage.includes('gomti nagar')) {
      return {
        content: "Gomti Nagar is one of Lucknow's most sought-after areas! 🌟\n\n📍 **Key Highlights:**\n• IT Hub with major companies\n• Metro connectivity (upcoming)\n• Premium malls & restaurants\n• Price: ₹6,500-8,500/sq.ft\n\nWould you like to see properties here?",
        actions: [
          { type: 'view_property', label: '🏠 Properties in Gomti Nagar', icon: '🏠' },
          { type: 'neighborhood', label: '📊 Area Insights', icon: '📊' }
        ]
      }
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('agent')) {
      return {
        content: "I'll connect you with our expert! 📞\n\n**Call Now**: 9872364476\n**WhatsApp**: wa.me/919872364476\n\nAvailable: Mon-Sat 9AM-9PM\n\nOr share your number, we'll call you!",
        actions: [
          { type: 'call', label: '📞 Call Now', icon: '📞' },
          { type: 'whatsapp', label: '💬 WhatsApp', icon: '💬' }
        ]
      }
    }

    if (lowerMessage.includes('3bhk') || lowerMessage.includes('3 bhk')) {
      return {
        content: "Great choice! 3BHK is perfect for families. 🏠\n\nI found several options:\n\n1. **Gomti Nagar** - ₹75L-1.2Cr\n2. **Aliganj** - ₹55L-85L\n3. **Indira Nagar** - ₹60L-90L\n\nWhich area interests you?",
        actions: [{ type: 'view_3bhk', label: '🏠 View 3BHK Properties', icon: '🏠' }]
      }
    }

    if (lowerMessage.includes('thank')) {
      return {
        content: "You're welcome! 😊 Feel free to ask anything else about properties in Lucknow. I'm here to help!",
        actions: []
      }
    }

    return {
      content: "I'd love to help! Could you tell me more? Are you looking to buy or rent a property in Lucknow? 🏠",
      actions: [
        { type: 'buy', label: '🏠 Buy Property', icon: '🏠' },
        { type: 'rent', label: '🏢 Rent Property', icon: '🏢' },
        { type: 'valuation', label: '💰 Property Valuation', icon: '💰' }
      ]
    }
  }

  const sendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    const response = generateResponse(inputValue)

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.content,
      timestamp: new Date(),
      actions: response.actions
    }

    setIsTyping(false)
    setMessages(prev => [...prev, assistantMessage])
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
    setTimeout(() => sendMessage(), 100)
  }

  const handleAction = (action: ChatAction) => {
    // Handle different actions
    switch (action.type) {
      case 'calculate_emi':
        window.location.href = '/emi-calculator'
        break
      case 'view_property':
        window.location.href = '/properties'
        break
      case 'schedule_visit':
        // Open visit scheduler
        break
      case 'call':
        window.location.href = 'tel:+919872364476'
        break
      case 'whatsapp':
        window.open('https://wa.me/919872364476', '_blank')
        break
    }
  }

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 z-50 w-[calc(100vw-48px)] sm:w-96 max-w-[400px] h-[80vh] sm:h-[600px] max-h-[700px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Priya - Property Assistant</h3>
                <p className="text-xs text-purple-200 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Online • Typically replies instantly
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${message.role === 'user' ? 'order-2' : ''}`}>
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-purple-600" />
                    </div>
                    <span className="text-xs text-gray-500">Priya</span>
                  </div>
                )}
                <div className={`rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-purple-600 text-white rounded-br-md'
                    : 'bg-white shadow-sm rounded-bl-md'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
                
                {/* Action Buttons */}
                {message.actions && message.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.actions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => handleAction(action)}
                        className="px-3 py-1.5 bg-white border border-purple-200 rounded-full text-xs text-purple-600 hover:bg-purple-50 transition-colors flex items-center gap-1"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
                
                <p className="text-xs text-gray-400 mt-1">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-purple-600" />
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 bg-white border-t">
            <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.slice(0, 3).map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q)}
                  className="px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full text-xs hover:bg-purple-100 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 bg-white border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-purple-500 text-sm"
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim()}
              className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
