// ============================================
// EstatoProp Feature Types & Interfaces
// ============================================

// ==================== EMI Calculator ====================
export interface EMICalculatorInput {
  propertyPrice: number
  downPayment: number
  loanAmount: number
  interestRate: number
  loanTenure: number // in years
  bankId?: string
}

export interface EMIResult {
  monthlyEMI: number
  totalInterest: number
  totalPayment: number
  principalAmount: number
  interestPercentage: number
  yearWiseBreakdown: YearlyBreakdown[]
}

export interface YearlyBreakdown {
  year: number
  principalPaid: number
  interestPaid: number
  balance: number
}

export interface BankOffer {
  id: string
  bankName: string
  bankLogo: string
  interestRate: number
  processingFee: string
  maxLoanAmount: number
  maxTenure: number
  specialOffer?: string
  features: string[]
  isPopular?: boolean
}

// ==================== Property Comparison ====================
export interface ComparisonProperty {
  id: string
  title: string
  price: number
  pricePerSqft: number
  area: number
  bedrooms: number
  bathrooms: number
  propertyType: string
  location: string
  locality: string
  amenities: string[]
  ageOfProperty: string
  facing: string
  floor: string
  totalFloors: number
  parking: string
  furnishing: string
  images: string[]
  rating: number
  isVerified: boolean
}

export interface ComparisonResult {
  properties: ComparisonProperty[]
  comparisonId: string
  shareableLink: string
  createdAt: Date
  highlights: ComparisonHighlight[]
}

export interface ComparisonHighlight {
  category: string
  winner: string
  reason: string
}

// ==================== Price Trends & Analytics ====================
export interface PriceTrend {
  location: string
  period: string // monthly, quarterly, yearly
  data: PriceDataPoint[]
  averagePrice: number
  priceChange: number
  priceChangePercent: number
  trend: 'up' | 'down' | 'stable'
}

export interface PriceDataPoint {
  date: string
  avgPricePerSqft: number
  totalListings: number
  avgPropertyPrice: number
}

export interface AreaAnalytics {
  location: string
  currentAvgPrice: number
  lastYearAvgPrice: number
  appreciation: number
  demandScore: number // 1-100
  supplyScore: number // 1-100
  investmentRating: 'Excellent' | 'Good' | 'Average' | 'Below Average'
  bestTimeToBy: string
  priceForcast: PriceForecast[]
  comparableAreas: ComparableArea[]
}

export interface PriceForecast {
  period: string
  predictedPrice: number
  confidence: number
}

export interface ComparableArea {
  name: string
  avgPrice: number
  distance: number
  appreciation: number
}

export interface ROICalculation {
  propertyPrice: number
  expectedRent: number
  appreciationRate: number
  holdingPeriod: number // years
  grossYield: number
  netYield: number
  totalReturn: number
  annualizedReturn: number
  breakEvenYears: number
}

// ==================== Property Valuation ====================
export interface ValuationInput {
  location: string
  locality: string
  propertyType: 'flat' | 'house' | 'villa' | 'plot' | 'commercial'
  area: number
  bedrooms?: number
  bathrooms?: number
  floor?: number
  totalFloors?: number
  ageOfProperty: string
  facing?: string
  furnishing?: string
  amenities?: string[]
  parking?: boolean
  balcony?: number
}

export interface ValuationResult {
  estimatedValue: number
  valueRange: {
    min: number
    max: number
  }
  pricePerSqft: number
  confidence: number // 0-100
  factors: ValuationFactor[]
  comparableProperties: ComparableProperty[]
  marketInsights: string[]
  lastUpdated: Date
}

export interface ValuationFactor {
  factor: string
  impact: 'positive' | 'negative' | 'neutral'
  weight: number
  description: string
}

export interface ComparableProperty {
  id: string
  title: string
  price: number
  area: number
  location: string
  soldDate?: string
  similarity: number // percentage
}

// ==================== Wishlist & Shortlist ====================
export interface WishlistItem {
  id: string
  propertyId: string
  userId: string
  addedAt: Date
  notes?: string
  priceAtAdd: number
  currentPrice: number
  priceChange: number
  alerts: WishlistAlert[]
}

export interface WishlistAlert {
  type: 'price_drop' | 'price_increase' | 'status_change' | 'new_similar'
  message: string
  createdAt: Date
  isRead: boolean
}

export interface SharedWishlist {
  id: string
  userId: string
  shareToken: string
  sharedWith: string[] // emails
  properties: string[]
  createdAt: Date
  expiresAt?: Date
  viewCount: number
}

// ==================== Site Visit Scheduling ====================
export interface SiteVisit {
  id: string
  propertyId: string
  userId: string
  agentId?: string
  scheduledDate: Date
  scheduledTime: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled'
  visitType: 'in_person' | 'video_call' | 'virtual_tour'
  notes?: string
  contactNumber: string
  contactName: string
  reminderSent: boolean
  feedback?: VisitFeedback
  createdAt: Date
  updatedAt: Date
}

export interface VisitFeedback {
  rating: number
  liked: string[]
  disliked: string[]
  comments?: string
  interestedToBuy: boolean
  followUpRequired: boolean
}

export interface AvailableSlot {
  date: string
  slots: TimeSlot[]
}

export interface TimeSlot {
  time: string
  available: boolean
  agentId?: string
}

// ==================== Reviews & Ratings ====================
export interface PropertyReview {
  id: string
  propertyId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  review: string
  pros: string[]
  cons: string[]
  visitDate?: Date
  isVerified: boolean
  isVerifiedBuyer: boolean
  helpfulCount: number
  images?: string[]
  agentResponse?: AgentResponse
  createdAt: Date
  updatedAt: Date
}

export interface AgentResponse {
  agentId: string
  agentName: string
  response: string
  respondedAt: Date
}

export interface AgentRating {
  agentId: string
  agentName: string
  agentPhoto?: string
  totalReviews: number
  averageRating: number
  ratings: {
    communication: number
    knowledge: number
    responsiveness: number
    negotiation: number
    professionalism: number
  }
  recentReviews: PropertyReview[]
}

export interface LocalityReview {
  id: string
  locality: string
  userId: string
  userName: string
  rating: number
  review: string
  livingDuration: string
  ratings: {
    safety: number
    connectivity: number
    amenities: number
    environment: number
    valueForMoney: number
  }
  pros: string[]
  cons: string[]
  createdAt: Date
}

// ==================== Neighborhood Insights ====================
export interface NeighborhoodInsights {
  locality: string
  city: string
  overallScore: number // 1-100
  categories: NeighborhoodCategory[]
  nearbyPlaces: NearbyPlace[]
  demographics: Demographics
  connectivity: Connectivity
  environment: Environment
  lifestyle: Lifestyle
}

export interface NeighborhoodCategory {
  name: string
  score: number
  icon: string
  places: NearbyPlace[]
}

export interface NearbyPlace {
  id: string
  name: string
  type: 'school' | 'hospital' | 'mall' | 'restaurant' | 'bank' | 'atm' | 'park' | 'gym' | 'metro' | 'bus_stop' | 'petrol_pump' | 'pharmacy'
  distance: number // in meters
  rating?: number
  address: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface Demographics {
  population: string
  avgAge: number
  familyType: string
  incomeLevel: string
  educationLevel: string
}

export interface Connectivity {
  nearestMetro?: {
    name: string
    distance: number
    line: string
  }
  nearestBusStop: {
    name: string
    distance: number
  }
  nearestRailway: {
    name: string
    distance: number
  }
  nearestAirport: {
    name: string
    distance: number
  }
  majorRoads: string[]
  commuteTime: {
    toCityCenter: number
    toAirport: number
    toRailway: number
  }
}

export interface Environment {
  airQualityIndex: number
  airQualityStatus: 'Good' | 'Moderate' | 'Poor' | 'Very Poor'
  greenCover: number // percentage
  noiseLevel: number // dB
  waterQuality: string
  floodRisk: 'Low' | 'Medium' | 'High'
}

export interface Lifestyle {
  restaurants: number
  cafes: number
  gyms: number
  parks: number
  malls: number
  nightlife: 'Active' | 'Moderate' | 'Quiet'
  familyFriendly: boolean
  petFriendly: boolean
}

// ==================== Similar Properties ====================
export interface SimilarPropertiesRequest {
  propertyId: string
  limit?: number
  filters?: {
    priceRange?: number // percentage variance
    areaRange?: number
    sameLocality?: boolean
    samePropertyType?: boolean
  }
}

export interface SimilarProperty {
  id: string
  title: string
  price: number
  area: number
  bedrooms: number
  location: string
  image: string
  similarity: number // percentage
  matchingFeatures: string[]
  differingFeatures: string[]
}

export interface RecentlyViewed {
  propertyId: string
  viewedAt: Date
  property: {
    id: string
    title: string
    price: number
    image: string
    location: string
  }
}

// ==================== Featured Listings ====================
export interface FeaturedListing {
  id: string
  propertyId: string
  dealerId: string
  packageType: 'basic' | 'premium' | 'spotlight'
  startDate: Date
  endDate: Date
  impressions: number
  clicks: number
  leads: number
  position: number
  isActive: boolean
  payment: PaymentInfo
}

export interface FeaturedPackage {
  id: string
  name: string
  price: number
  duration: number // days
  features: string[]
  maxListings: number
  priority: number
  badge?: string
  isPopular?: boolean
}

export interface PaymentInfo {
  amount: number
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  transactionId?: string
  paymentMethod: string
  paidAt?: Date
}

export interface DealerDashboard {
  dealerId: string
  totalListings: number
  activeListings: number
  featuredListings: number
  totalLeads: number
  newLeads: number
  totalViews: number
  conversionRate: number
  performance: PerformanceMetrics
  recentLeads: Lead[]
}

export interface PerformanceMetrics {
  viewsThisMonth: number
  viewsLastMonth: number
  leadsThisMonth: number
  leadsLastMonth: number
  responseTime: number // average in hours
  responseRate: number // percentage
}

export interface Lead {
  id: string
  propertyId: string
  name: string
  phone: string
  email?: string
  message?: string
  source: 'website' | 'whatsapp' | 'call' | 'chat'
  status: 'new' | 'contacted' | 'interested' | 'site_visit' | 'negotiation' | 'closed' | 'lost'
  createdAt: Date
  updatedAt: Date
}

// ==================== AI Chat ====================
export interface ChatMessage {
  id: string
  sessionId: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: {
    intent?: string
    entities?: Record<string, any>
    suggestedActions?: ChatAction[]
    propertyRecommendations?: string[]
  }
}

export interface ChatSession {
  id: string
  visitorId: string
  userId?: string
  startedAt: Date
  endedAt?: Date
  messages: ChatMessage[]
  context: ChatContext
  leadCaptured: boolean
  handoffToAgent: boolean
}

export interface ChatContext {
  currentPage: string
  propertyId?: string
  searchFilters?: Record<string, any>
  userPreferences?: {
    budget?: { min: number; max: number }
    locations?: string[]
    propertyTypes?: string[]
    bedrooms?: number[]
  }
  conversationStage: 'greeting' | 'discovery' | 'recommendation' | 'scheduling' | 'closing'
}

export interface ChatAction {
  type: 'view_property' | 'schedule_visit' | 'call_agent' | 'whatsapp' | 'compare' | 'calculate_emi' | 'get_valuation'
  label: string
  payload: Record<string, any>
}

export interface AIAgentConfig {
  name: string
  personality: string
  greeting: string
  fallbackResponses: string[]
  intents: AIIntent[]
  knowledgeBase: string[]
}

export interface AIIntent {
  name: string
  patterns: string[]
  responses: string[]
  actions?: ChatAction[]
}
