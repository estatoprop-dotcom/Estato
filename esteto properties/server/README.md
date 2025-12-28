# EstatoProp Backend Server

A comprehensive Express.js backend server for EstatoProp - Lucknow's #1 Real Estate Platform.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Required environment variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `JWT_SECRET` - Secret key for JWT tokens
- `OPENAI_API_KEY` - (Optional) For AI-powered chat

### 3. Run the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/profile` | Update profile |

### Properties
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | List properties with filters |
| GET | `/api/properties/:id` | Get single property |
| POST | `/api/properties` | Create property (auth) |
| PUT | `/api/properties/:id` | Update property (auth) |
| DELETE | `/api/properties/:id` | Delete property (auth) |
| POST | `/api/properties/:id/lead` | Submit lead |

### EMI Calculator
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/emi-calculator/banks` | Get bank offers |
| POST | `/api/emi-calculator/calculate` | Calculate EMI |
| GET | `/api/emi-calculator/eligibility` | Check loan eligibility |

### Property Comparison
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/compare?propertyIds=id1,id2` | Compare properties |
| POST | `/api/compare` | Save comparison |

### Price Trends
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/price-trends?location=gomti-nagar` | Get area trends |
| POST | `/api/price-trends/roi` | Calculate ROI |

### Property Valuation
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/valuation/calculate` | Get property valuation |
| GET | `/api/valuation/base-prices` | Get area base prices |
| GET | `/api/valuation/factors` | Get valuation factors |

### Wishlist
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wishlist` | Get user's wishlist |
| POST | `/api/wishlist` | Add to wishlist |
| DELETE | `/api/wishlist/:propertyId` | Remove from wishlist |
| POST | `/api/wishlist/share` | Share wishlist |

### Site Visits
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/site-visits?action=slots&propertyId=xxx` | Get available slots |
| GET | `/api/site-visits` | Get user's visits |
| POST | `/api/site-visits` | Schedule visit |
| PUT | `/api/site-visits/:visitId` | Update visit |

### Reviews & Ratings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews?propertyId=xxx` | Get property reviews |
| GET | `/api/reviews?agentId=xxx&type=agent` | Get agent reviews |
| GET | `/api/reviews?locality=xxx&type=locality` | Get locality reviews |
| POST | `/api/reviews` | Create review (auth) |
| PUT | `/api/reviews/:reviewId/helpful` | Mark as helpful |
| DELETE | `/api/reviews/:reviewId` | Delete review |

### Neighborhood Insights
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/neighborhood` | List all localities |
| GET | `/api/neighborhood?locality=gomti-nagar` | Get locality insights |
| POST | `/api/neighborhood/commute` | Calculate commute time |

### Similar Properties
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/similar-properties?propertyId=xxx` | Get similar properties |
| POST | `/api/similar-properties/recently-viewed` | Track/get recent views |

### Featured Listings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/featured-listings?action=packages` | Get packages |
| GET | `/api/featured-listings?action=dashboard&dealerId=xxx` | Dealer dashboard |
| GET | `/api/featured-listings` | Get featured listings |
| POST | `/api/featured-listings` | Create featured listing |
| PUT | `/api/featured-listings/:id` | Track clicks/leads |

### AI Chat
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/chat` | Get chat config |
| GET | `/api/chat?sessionId=xxx` | Get chat session |
| POST | `/api/chat` | Send message |
| PUT | `/api/chat/:sessionId` | Handoff/end session |

## 🔒 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🗄️ Database Setup

Run the SQL schema in your Supabase SQL Editor:

```sql
-- See lib/database/schema.sql for full schema
```

## 🤖 AI Chat Integration

For enhanced AI responses, add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-key-here
```

The chat endpoint will use GPT-4o-mini for intelligent, human-like responses.

## 📱 WhatsApp Integration (Optional)

For WhatsApp Business API integration:

```env
WHATSAPP_API_TOKEN=your_token
WHATSAPP_PHONE_ID=your_phone_id
```

## 🚀 Deployment

### Deploy to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variables

### Deploy to Railway

```bash
railway login
railway init
railway up
```

## 📞 Support

- **Website**: https://estatoprop.com
- **Phone**: +91-9872364476
- **Email**: support@estatoprop.com

## 📄 License

MIT License - EstatoProp © 2024
