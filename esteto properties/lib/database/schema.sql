-- ============================================
-- EstatoProp Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================== Wishlist Tables ====================

-- Wishlist Items
CREATE TABLE IF NOT EXISTS wishlist_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  price_at_add DECIMAL(15, 2) NOT NULL,
  notes TEXT,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

CREATE INDEX idx_wishlist_user ON wishlist_items(user_id);
CREATE INDEX idx_wishlist_property ON wishlist_items(property_id);

-- Shared Wishlists
CREATE TABLE IF NOT EXISTS shared_wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  share_token TEXT UNIQUE NOT NULL,
  property_ids UUID[] NOT NULL,
  shared_with TEXT[],
  expires_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_shared_wishlist_token ON shared_wishlists(share_token);

-- ==================== Site Visits Tables ====================

CREATE TABLE IF NOT EXISTS site_visits (
  id TEXT PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  user_id TEXT,
  agent_id TEXT,
  scheduled_date DATE NOT NULL,
  scheduled_time TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'rescheduled')),
  visit_type TEXT DEFAULT 'in_person' CHECK (visit_type IN ('in_person', 'video_call', 'virtual_tour')),
  contact_name TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  notes TEXT,
  cancellation_reason TEXT,
  reminder_sent BOOLEAN DEFAULT FALSE,
  feedback JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_site_visits_user ON site_visits(user_id);
CREATE INDEX idx_site_visits_property ON site_visits(property_id);
CREATE INDEX idx_site_visits_date ON site_visits(scheduled_date);
CREATE INDEX idx_site_visits_status ON site_visits(status);

-- ==================== Reviews Tables ====================

-- Property Reviews
CREATE TABLE IF NOT EXISTS property_reviews (
  id TEXT PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  review TEXT NOT NULL,
  pros TEXT[],
  cons TEXT[],
  images TEXT[],
  is_verified BOOLEAN DEFAULT FALSE,
  is_verified_buyer BOOLEAN DEFAULT FALSE,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_property_reviews_property ON property_reviews(property_id);
CREATE INDEX idx_property_reviews_user ON property_reviews(user_id);
CREATE INDEX idx_property_reviews_rating ON property_reviews(rating);

-- Agent Responses to Reviews
CREATE TABLE IF NOT EXISTS agent_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id TEXT REFERENCES property_reviews(id) ON DELETE CASCADE,
  agent_id TEXT NOT NULL,
  agent_name TEXT,
  response TEXT NOT NULL,
  responded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Review Helpful Tracking
CREATE TABLE IF NOT EXISTS review_helpful (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id TEXT REFERENCES property_reviews(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(review_id, user_id)
);

-- Agent Reviews
CREATE TABLE IF NOT EXISTS agent_reviews (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  overall_rating INTEGER NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
  communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
  knowledge_rating INTEGER CHECK (knowledge_rating >= 1 AND knowledge_rating <= 5),
  responsiveness_rating INTEGER CHECK (responsiveness_rating >= 1 AND responsiveness_rating <= 5),
  negotiation_rating INTEGER CHECK (negotiation_rating >= 1 AND negotiation_rating <= 5),
  professionalism_rating INTEGER CHECK (professionalism_rating >= 1 AND professionalism_rating <= 5),
  review TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_agent_reviews_agent ON agent_reviews(agent_id);

-- Locality Reviews
CREATE TABLE IF NOT EXISTS locality_reviews (
  id TEXT PRIMARY KEY,
  locality TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  overall_rating INTEGER NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
  safety_rating INTEGER CHECK (safety_rating >= 1 AND safety_rating <= 5),
  connectivity_rating INTEGER CHECK (connectivity_rating >= 1 AND connectivity_rating <= 5),
  amenities_rating INTEGER CHECK (amenities_rating >= 1 AND amenities_rating <= 5),
  environment_rating INTEGER CHECK (environment_rating >= 1 AND environment_rating <= 5),
  value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),
  review TEXT NOT NULL,
  pros TEXT[],
  cons TEXT[],
  living_duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_locality_reviews_locality ON locality_reviews(locality);

-- ==================== Property Comparisons ====================

CREATE TABLE IF NOT EXISTS property_comparisons (
  id TEXT PRIMARY KEY,
  property_ids UUID[] NOT NULL,
  user_id TEXT,
  properties_data JSONB NOT NULL,
  highlights JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== Recently Viewed ====================

CREATE TABLE IF NOT EXISTS recently_viewed (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

CREATE INDEX idx_recently_viewed_user ON recently_viewed(user_id);

-- ==================== Featured Listings ====================

CREATE TABLE IF NOT EXISTS featured_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  dealer_id TEXT NOT NULL,
  package_type TEXT NOT NULL CHECK (package_type IN ('basic', 'premium', 'spotlight')),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  leads INTEGER DEFAULT 0,
  position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  payment JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_featured_active ON featured_listings(is_active, end_date);
CREATE INDEX idx_featured_dealer ON featured_listings(dealer_id);

-- ==================== Leads ====================

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  dealer_id TEXT,
  name TEXT,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT,
  source TEXT DEFAULT 'website' CHECK (source IN ('website', 'whatsapp', 'call', 'chat', 'featured')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'interested', 'site_visit', 'negotiation', 'closed', 'lost')),
  context JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_leads_dealer ON leads(dealer_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_phone ON leads(phone);

-- ==================== Chat Tables ====================

-- Chat Sessions
CREATE TABLE IF NOT EXISTS chat_sessions (
  id TEXT PRIMARY KEY,
  visitor_id TEXT NOT NULL,
  user_id TEXT,
  agent_id TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  context JSONB DEFAULT '{}',
  lead_captured BOOLEAN DEFAULT FALSE,
  handoff_to_agent BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_chat_sessions_visitor ON chat_sessions(visitor_id);

-- Chat Messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY,
  session_id TEXT REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB
);

CREATE INDEX idx_chat_messages_session ON chat_messages(session_id);

-- ==================== Helper Functions ====================

-- Function to increment helpful count
CREATE OR REPLACE FUNCTION increment_helpful_count(review_id TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE property_reviews 
  SET helpful_count = helpful_count + 1 
  WHERE id = review_id;
END;
$$ LANGUAGE plpgsql;

-- Function to increment featured clicks
CREATE OR REPLACE FUNCTION increment_featured_clicks(featured_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE featured_listings 
  SET clicks = clicks + 1 
  WHERE id = featured_id;
END;
$$ LANGUAGE plpgsql;

-- Function to increment impressions for multiple listings
CREATE OR REPLACE FUNCTION increment_impressions(listing_ids UUID[])
RETURNS VOID AS $$
BEGIN
  UPDATE featured_listings 
  SET impressions = impressions + 1 
  WHERE id = ANY(listing_ids);
END;
$$ LANGUAGE plpgsql;

-- ==================== Add columns to existing properties table ====================

-- Add columns if they don't exist
DO $$ 
BEGIN
  -- Add views column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'properties' AND column_name = 'views') THEN
    ALTER TABLE properties ADD COLUMN views INTEGER DEFAULT 0;
  END IF;
  
  -- Add leads_count column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'properties' AND column_name = 'leads_count') THEN
    ALTER TABLE properties ADD COLUMN leads_count INTEGER DEFAULT 0;
  END IF;
  
  -- Add dealer_id column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'properties' AND column_name = 'dealer_id') THEN
    ALTER TABLE properties ADD COLUMN dealer_id TEXT;
  END IF;
  
  -- Add rating column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'properties' AND column_name = 'rating') THEN
    ALTER TABLE properties ADD COLUMN rating DECIMAL(2, 1) DEFAULT 0;
  END IF;
  
  -- Add is_verified column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'properties' AND column_name = 'is_verified') THEN
    ALTER TABLE properties ADD COLUMN is_verified BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

-- ==================== Row Level Security ====================

-- Enable RLS on all tables
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_listings ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Public read access" ON property_reviews FOR SELECT USING (true);
CREATE POLICY "Public read access" ON locality_reviews FOR SELECT USING (true);
CREATE POLICY "Public read access" ON featured_listings FOR SELECT USING (is_active = true);

-- Policies for authenticated users
CREATE POLICY "Users can manage own wishlist" ON wishlist_items 
  FOR ALL USING (auth.uid()::text = user_id);

CREATE POLICY "Users can manage own visits" ON site_visits 
  FOR ALL USING (auth.uid()::text = user_id OR user_id IS NULL);

CREATE POLICY "Users can create reviews" ON property_reviews 
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can manage own chat" ON chat_sessions 
  FOR ALL USING (auth.uid()::text = user_id OR user_id IS NULL);

-- Grant permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon;
