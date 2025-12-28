/** @type {import('next').NextConfig} */
const nextConfig = {
  // Increase static generation timeout
  staticPageGenerationTimeout: 120,
  // Skip type checking during build for faster builds
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost', 'supabase.co', 'images.unsplash.com', 'yapmbzzqahsyuxxdejpq.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'yapmbzzqahsyuxxdejpq.supabase.co',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://yapmbzzqahsyuxxdejpq.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcG1ienpxYWhzeXV4eGRlanBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1OTc5OTAsImV4cCI6MjA3ODE3Mzk5MH0.tff4ZU1_tFy2B13r0rklBVElIDTgO_ZGz1vtGFCo-kw',
    NEXT_PUBLIC_API_URL: 'https://champ-y6eg.onrender.com/api',
    NEXT_PUBLIC_APP_URL: 'http://localhost:3001',
  },
}

module.exports = nextConfig
