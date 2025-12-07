import { createClient } from '@supabase/supabase-js'

// Default to actual Supabase credentials for development
const supabaseUrl = process.env.SUPABASE_URL || 'https://yapmbzzqahsyuxxdejpq.supabase.co'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcG1ienpxYWhzeXV4eGRlanBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1OTc5OTAsImV4cCI6MjA3ODE3Mzk5MH0.tff4ZU1_tFy2B13r0rklBVElIDTgO_ZGz1vtGFCo-kw'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || supabaseAnonKey

// Client for public operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for privileged operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export default supabase
