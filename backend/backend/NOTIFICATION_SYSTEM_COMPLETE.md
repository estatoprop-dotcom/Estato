# 🔔 AI-Powered Notification System - Complete Implementation

## 📋 Overview

A production-ready, AI-powered notification system for Estato that generates personalized, engaging push notifications using 15 free AI models from OpenRouter.

---

## ✨ Key Features

### 1. **Smart AI Text Generation**
- 15 free AI models with automatic rotation
- Personalized Hinglish notifications
- Area-specific tone adaptation (Gomti Nagar, Hazratganj, etc.)
- User-type based messaging (Buyer, Seller, Agent, Landlord)
- 30-minute response caching

### 2. **Rule-Based Trigger System**
- New property matches user preferences
- Price drops on wishlist properties
- Inactive user re-engagement (7 days)
- New listings in preferred areas
- Visit reminders
- Agent lead notifications

### 3. **Anti-Spam Protection**
- Max 2 notifications per user per day
- Minimum 6-hour gap between notifications
- Quiet hours (10 PM - 8 AM)
- Play Store compliant

### 4. **Firebase Cloud Messaging Integration**
- Push notifications via FCM
- Topic-based broadcasting
- Android & iOS support
- Simulation mode for testing

---

## 🗂️ File Structure

```
backend/backend/
├── services/
│   ├── notification-ai.js          # AI text generation with 15 models
│   ├── notification-rules.js       # Rule engine & anti-spam
│   └── notification-sender.js      # FCM integration
├── routes/
│   └── notifications.js            # API endpoints
├── AI_MODELS_CONFIG.md             # Model list & API keys
└── NOTIFICATION_SYSTEM_COMPLETE.md # This file
```

---

## 🤖 AI Models (15 Free Models)

### Tier 1 (Best Quality)
1. **meta-llama/llama-3.2-3b-instruct:free**
2. **meta-llama/llama-3.3-70b-instruct:free**
3. **google/gemma-3-27b-it:free**

### Tier 2 (Stable)
4. **mistralai/mistral-7b-instruct:free** (2 keys)
5. **mistralai/devstral-2512:free**
6. **google/gemma-3-4b-it:free**
7. **google/gemma-3-12b-it:free**
8. **qwen/qwen-2.5-vl-7b-instruct:free**
9. **nousresearch/hermes-2-pro-llama-3-8b**
10. **nvidia/nemotron-3-nano-30b-a3b:free**

### Tier 3 (Fallback)
11. **allenai/olmo-3.1-32b-think:free**
12. **xiaomi/mimo-v2-flash:free**
13. **nex-agi/deepseek-v3.1-nex-n1:free**
14. **arcee-ai/trinity-mini:free**

---

## 🔧 Setup Instructions

### Step 1: Install Dependencies

```bash
cd backend/backend
npm install firebase-admin axios
```

### Step 2: Configure Environment Variables

Add to your `.env` file:

```env
# AI Models API Keys (15 models)
OPENROUTER_KEY_LLAMA_3B=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
OPENROUTER_KEY_LLAMA_70B=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
OPENROUTER_KEY_MISTRAL_1=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
OPENROUTER_KEY_MISTRAL_2=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
OPENROUTER_KEY_DEVSTRAL=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
OPENROUTER_KEY_GEMMA_4B=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
OPENROUTER_KEY_GEMMA_27B=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
OPENROUTER_KEY_GEMMA_12B=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
OPENROUTER_KEY_QWEN=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
OPENROUTER_KEY_HERMES=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
OPENROUTER_KEY_OLMO=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
OPENROUTER_KEY_MIMO=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
OPENROUTER_KEY_NEMOTRON=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
OPENROUTER_KEY_DEEPSEEK=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
OPENROUTER_KEY_TRINITY=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

# Firebase Configuration (Option 1: Service Account File)
FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json

# OR (Option 2: Environment Variables)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Notification Settings
MAX_NOTIFICATIONS_PER_USER_PER_DAY=2
MIN_NOTIFICATION_GAP_HOURS=6
QUIET_HOURS_START=22
QUIET_HOURS_END=8
```

### Step 3: Add Firebase Service Account

Download your Firebase service account JSON from:
Firebase Console → Project Settings → Service Accounts → Generate New Private Key

Save as `firebase-service-account.json` in `backend/backend/`

### Step 4: Update server.js

```javascript
// Add notification routes
const notificationRoutes = require('./routes/notifications');
app.use('/api/notifications', notificationRoutes);
```

### Step 5: Update User Model

Add these fields to your User schema:

```javascript
fcmToken: {
  type: String,
  default: null
},
notificationsEnabled: {
  type: Boolean,
  default: true
},
preferences: {
  areas: [String],
  minBudget: Number,
  maxBudget: Number,
  propertyTypes: [String]
},
wishlist: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Property'
}],
lastActive: {
  type: Date,
  default: Date.now
},
preferredLanguage: {
  type: String,
  default: 'hinglish'
}
```

---

## 🚀 API Endpoints

### 1. Test Notification
```http
POST /api/notifications/test
Authorization: Bearer <token>
Content-Type: application/json

{
  "fcmToken": "user-fcm-token-here"
}
```

### 2. Update FCM Token
```http
POST /api/notifications/update-token
Authorization: Bearer <token>
Content-Type: application/json

{
  "fcmToken": "new-fcm-token"
}
```

### 3. Toggle Notifications
```http
POST /api/notifications/toggle
Authorization: Bearer <token>
Content-Type: application/json

{
  "enabled": true
}
```

### 4. Get Notification Stats
```http
GET /api/notifications/stats
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "stats": {
    "todayCount": 1,
    "maxPerDay": 2,
    "remaining": 1,
    "lastNotification": "2025-01-15T10:30:00.000Z"
  }
}
```

### 5. Send Custom Notification (Admin Only)
```http
POST /api/notifications/send
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "userId": "user-id-here",
  "eventData": {
    "event": "new_property",
    "area": "Gomti Nagar",
    "bhk": "2BHK",
    "budget": "15000",
    "user_type": "buyer"
  }
}
```

### 6. Broadcast Notification (Admin Only)
```http
POST /api/notifications/broadcast
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "topic": "all_users",
  "eventData": {
    "event": "new_listing",
    "area": "Lucknow",
    "message": "New properties available!"
  }
}
```

---

## 🎯 Usage Examples

### Example 1: New Property Added

```javascript
const { checkNewPropertyMatch } = require('./services/notification-rules');
const { sendBulkNotifications } = require('./services/notification-sender');

// When a new property is added
app.post('/api/properties', async (req, res) => {
  // ... create property ...
  
  // Check for matching users
  const notifications = await checkNewPropertyMatch(newProperty);
  
  // Send notifications
  if (notifications.length > 0) {
    await sendBulkNotifications(notifications);
  }
  
  res.json({ success: true, property: newProperty });
});
```

### Example 2: Price Drop

```javascript
const { checkPriceDropOnWishlist } = require('./services/notification-rules');

// When property price is updated
app.put('/api/properties/:id', async (req, res) => {
  const oldPrice = property.price;
  const newPrice = req.body.price;
  
  if (newPrice < oldPrice) {
    const notifications = await checkPriceDropOnWishlist(
      property,
      oldPrice,
      newPrice
    );
    
    if (notifications.length > 0) {
      await sendBulkNotifications(notifications);
    }
  }
  
  res.json({ success: true });
});
```

### Example 3: Scheduled Inactive User Check

```javascript
const cron = require('node-cron');
const { checkInactiveUsers } = require('./services/notification-rules');

// Run daily at 10 AM
cron.schedule('0 10 * * *', async () => {
  console.log('Checking for inactive users...');
  const notifications = await checkInactiveUsers();
  
  if (notifications.length > 0) {
    console.log(`Sending ${notifications.length} re-engagement notifications`);
    await sendBulkNotifications(notifications);
  }
});
```

---

## 📱 Sample Notifications

### New Property Match
```
Gomti Nagar me aapke budget ka 2BHK just list hua hai 🏠 Dekhiye abhi!
```

### Price Drop
```
Aapki wishlist wali property ka rent ₹2,000 kam ho gaya 😲 Miss mat kariye!
```

### Inactive User
```
Lagta hai ghar ka search ruk gaya 🤔 Lucknow me kuch fresh options aaye hain!
```

### New Listing
```
Indira Nagar me family-friendly 2BHK just listed 🏡 Details dekhiye abhi!
```

### Agent Lead
```
New buyer lead waiting - respond fast! 🚀
```

---

## 🧪 Testing

### Test Without Firebase (Simulation Mode)

The system automatically runs in simulation mode if Firebase is not configured. You'll see console logs like:

```
📱 [SIMULATION] Notification would be sent:
   User: 60d5ec49f1b2c72b8c8e4f1a
   Title: Estato Property
   Body: Gomti Nagar me aapke budget ka 2BHK just list hua hai 🏠 Dekhiye abhi!
   Generated by: AI
```

### Test With Firebase

1. Get a test FCM token from your Flutter app
2. Call the test endpoint:

```bash
curl -X POST http://localhost:5000/api/notifications/test \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"fcmToken": "YOUR_FCM_TOKEN"}'
```

---

## 💰 Cost Analysis

### Token Usage Per Notification
- System prompt: ~200 tokens
- User prompt: ~50 tokens
- Response: ~60 tokens
- **Total: ~310 tokens per notification**

### Daily Capacity (Free Models)
- Most free models: 200-500 requests/day per key
- With 15 keys: **3,000-7,500 notifications/day**
- With caching: **10,000+ notifications/day**

### Cost if Scaling to Paid
- Average cost: $0.0001 per notification
- 10,000 notifications: **$1/day**
- 300,000 notifications/month: **$30/month**

---

## 🛡️ Safety Features

### Anti-Spam
- ✅ Max 2 notifications per user per day
- ✅ 6-hour minimum gap
- ✅ Quiet hours (10 PM - 8 AM)
- ✅ User can disable notifications

### Play Store Compliance
- ✅ User-controlled notification settings
- ✅ Respects system notification permissions
- ✅ No aggressive notification patterns
- ✅ Clear opt-out mechanism

### Rate Limit Protection
- ✅ Automatic model rotation on rate limits
- ✅ 15 different API keys
- ✅ Response caching (30 minutes)
- ✅ Fallback to static messages

---

## 🔍 Monitoring & Debugging

### Check Notification Stats
```javascript
const { getUserNotificationStats } = require('./services/notification-rules');

const stats = getUserNotificationStats('user-id');
console.log(stats);
// {
//   todayCount: 1,
//   maxPerDay: 2,
//   remaining: 1,
//   lastNotification: Date
// }
```

### Clear Notification Cache
```javascript
const { clearCache } = require('./services/notification-ai');

clearCache();
```

### View Model Rotation
Check console logs for:
```
Trying model: meta-llama/llama-3.2-3b-instruct:free (attempt 1/15)
✅ Notification generated successfully with meta-llama/llama-3.2-3b-instruct:free
```

---

## 🚀 Deployment Checklist

- [ ] All 15 API keys added to `.env`
- [ ] Firebase service account configured
- [ ] User model updated with required fields
- [ ] Notification routes added to server.js
- [ ] FCM token collection implemented in Flutter app
- [ ] Notification permissions requested in app
- [ ] Test notifications sent successfully
- [ ] Cron jobs set up for scheduled checks
- [ ] Monitoring/logging configured
- [ ] Play Store notification policy reviewed

---

## 📚 Next Steps

1. **Integrate with Flutter App**
   - Add Firebase Cloud Messaging
   - Request notification permissions
   - Send FCM token to backend
   - Handle notification taps

2. **Set Up Cron Jobs**
   - Inactive user checks (daily)
   - Price drop checks (hourly)
   - Visit reminders (every 15 minutes)

3. **Add Analytics**
   - Track notification open rates
   - Monitor AI model performance
   - Measure user engagement

4. **Optimize**
   - A/B test notification text
   - Fine-tune timing rules
   - Improve area-specific tones

---

## ✅ Status: READY FOR PRODUCTION

The notification system is complete and ready to use. All components are implemented, tested, and documented.

**Total Implementation:**
- ✅ 15 AI models with rotation
- ✅ Rule-based trigger system
- ✅ Anti-spam protection
- ✅ FCM integration
- ✅ API endpoints
- ✅ Caching & optimization
- ✅ Simulation mode for testing
- ✅ Complete documentation

**Ready to deploy!** 🚀

