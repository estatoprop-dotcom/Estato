import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Import routes
import authRoutes from './routes/auth'
import emiRoutes from './routes/emi-calculator'
import compareRoutes from './routes/compare'
import priceTrendsRoutes from './routes/price-trends'
import valuationRoutes from './routes/valuation'
import wishlistRoutes from './routes/wishlist'
import siteVisitsRoutes from './routes/site-visits'
import reviewsRoutes from './routes/reviews'
import neighborhoodRoutes from './routes/neighborhood'
import similarRoutes from './routes/similar-properties'
import featuredRoutes from './routes/featured-listings'
import chatRoutes from './routes/chat'
import propertiesRoutes from './routes/properties'

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet())

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: { error: 'Too many requests, please try again later.' }
})
app.use('/api/', limiter)

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
} else {
  app.use(morgan('combined'))
}

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'EstatoProp Backend',
    version: '1.0.0'
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/emi-calculator', emiRoutes)
app.use('/api/compare', compareRoutes)
app.use('/api/price-trends', priceTrendsRoutes)
app.use('/api/valuation', valuationRoutes)
app.use('/api/wishlist', wishlistRoutes)
app.use('/api/site-visits', siteVisitsRoutes)
app.use('/api/reviews', reviewsRoutes)
app.use('/api/neighborhood', neighborhoodRoutes)
app.use('/api/similar-properties', similarRoutes)
app.use('/api/featured-listings', featuredRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/properties', propertiesRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Endpoint not found',
    path: req.path
  })
})

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err)
  
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal server error'
  
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════════════╗
  ║                                                       ║
  ║   🏠 EstatoProp Backend Server                        ║
  ║                                                       ║
  ║   Server running on: http://localhost:${PORT}           ║
  ║   Environment: ${process.env.NODE_ENV || 'development'}                        ║
  ║                                                       ║
  ║   API Endpoints:                                      ║
  ║   • /api/auth          - Authentication               ║
  ║   • /api/properties    - Property CRUD                ║
  ║   • /api/emi-calculator - EMI Calculations            ║
  ║   • /api/compare       - Property Comparison          ║
  ║   • /api/price-trends  - Price Analytics              ║
  ║   • /api/valuation     - Property Valuation           ║
  ║   • /api/wishlist      - Wishlist Management          ║
  ║   • /api/site-visits   - Site Visit Scheduling        ║
  ║   • /api/reviews       - Reviews & Ratings            ║
  ║   • /api/neighborhood  - Neighborhood Insights        ║
  ║   • /api/similar-properties - Similar Properties      ║
  ║   • /api/featured-listings - Featured Listings        ║
  ║   • /api/chat          - AI Chat                      ║
  ║                                                       ║
  ╚═══════════════════════════════════════════════════════╝
  `)
})

export default app
