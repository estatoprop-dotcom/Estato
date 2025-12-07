// Script to seed Lucknow locations into Supabase database
// Run with: npx ts-node scripts/seed-locations.ts

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yapmbzzqahsyuxxdejpq.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

// All Lucknow locations to seed
const locations = [
  // Top 20 High-Traffic Locations
  { name: 'Gomti Nagar', slug: 'gomti-nagar', type: 'area', pincode: '226010', popular: true, description: 'Premium residential & commercial hub with excellent connectivity' },
  { name: 'Gomti Nagar Extension', slug: 'gomti-nagar-extension', type: 'area', pincode: '226010', popular: true, description: 'Rapidly developing area with modern apartments and villas' },
  { name: 'Hazratganj', slug: 'hazratganj', type: 'area', pincode: '226001', popular: true, description: 'Heart of Lucknow with premium commercial and heritage properties' },
  { name: 'Aliganj', slug: 'aliganj', type: 'area', pincode: '226024', popular: true, description: 'Well-established residential area with good schools and markets' },
  { name: 'Jankipuram', slug: 'jankipuram', type: 'area', pincode: '226021', popular: true, description: 'Affordable residential area with growing infrastructure' },
  { name: 'Indira Nagar', slug: 'indira-nagar', type: 'area', pincode: '226016', popular: true, description: 'Prime residential locality with excellent connectivity' },
  { name: 'Mahanagar', slug: 'mahanagar', type: 'area', pincode: '226006', popular: true, description: 'Central location with mix of residential and commercial' },
  { name: 'Arjunganj', slug: 'arjunganj', type: 'area', pincode: '226002', popular: true, description: 'Developing area near Sultanpur Road with affordable options' },
  { name: 'Telibagh', slug: 'telibagh', type: 'area', pincode: '226002', popular: true, description: 'Emerging residential area with new developments' },
  { name: 'Vrindavan Colony', slug: 'vrindavan-colony', type: 'colony', pincode: '226024', popular: true, description: 'Peaceful residential colony with good amenities' },
  { name: 'Ashiyana', slug: 'ashiyana', type: 'area', pincode: '226012', popular: true, description: 'Well-planned residential area with parks and schools' },
  { name: 'Chowk', slug: 'chowk', type: 'area', pincode: '226003', popular: true, description: 'Historic commercial area with traditional markets' },
  { name: 'Charbagh', slug: 'charbagh', type: 'area', pincode: '226004', popular: true, description: 'Transport hub with commercial and residential options' },
  { name: 'Alambagh', slug: 'alambagh', type: 'area', pincode: '226005', popular: true, description: 'Commercial area with good connectivity' },
  { name: 'Transport Nagar', slug: 'transport-nagar', type: 'area', pincode: '226012', popular: true, description: 'Commercial hub for transport and logistics' },
  { name: 'Rajajipuram', slug: 'rajajipuram', type: 'area', pincode: '226017', popular: true, description: 'Established residential area with sectors' },
  { name: 'Faizabad Road', slug: 'faizabad-road', type: 'road', pincode: '226016', popular: true, description: 'Major arterial road with residential and commercial properties' },
  { name: 'Raebareli Road', slug: 'raebareli-road', type: 'road', pincode: '226002', popular: true, description: 'Developing corridor with new projects' },
  { name: 'Kanpur Road', slug: 'kanpur-road', type: 'road', pincode: '226012', popular: true, description: 'Major commercial and industrial corridor' },
  { name: 'Bijnor Road', slug: 'bijnor-road', type: 'road', pincode: '226024', popular: true, description: 'Residential area with affordable options' },
  
  // Micro Locations (40)
  { name: 'Kapoorthala', slug: 'kapoorthala', type: 'colony', popular: false, description: 'Premium residential colony near Aliganj' },
  { name: 'Nishatganj', slug: 'nishatganj', type: 'area', popular: false, description: 'Central location with heritage properties' },
  { name: 'Vikas Nagar', slug: 'vikas-nagar', type: 'area', popular: false, description: 'Residential area with good connectivity' },
  { name: 'Khurram Nagar', slug: 'khurram-nagar', type: 'area', popular: false, description: 'Developing residential locality' },
  { name: 'Kursi Road', slug: 'kursi-road', type: 'road', popular: false, description: 'Emerging area with new developments' },
  { name: 'Deva Road', slug: 'deva-road', type: 'road', popular: false, description: 'Industrial and residential corridor' },
  { name: 'Polytechnic Chauraha', slug: 'polytechnic-chauraha', type: 'landmark', popular: false, description: 'Central junction with commercial properties' },
  { name: 'Patrakarpuram', slug: 'patrakarpuram', type: 'area', popular: false, description: 'Residential area in Gomti Nagar' },
  { name: 'Sector 6, Jankipuram', slug: 'sector-6-jankipuram', type: 'area', popular: false, description: 'Planned sector with residential plots' },
  { name: 'Sector H, Aliganj', slug: 'sector-h-aliganj', type: 'area', popular: false, description: 'Premium sector in Aliganj' },
  { name: 'Viram Khand', slug: 'viram-khand', type: 'area', popular: false, description: 'Sector in Gomti Nagar' },
  { name: 'Vishal Khand', slug: 'vishal-khand', type: 'area', popular: false, description: 'Residential sector in Gomti Nagar' },
  { name: 'Vipul Khand', slug: 'vipul-khand', type: 'area', popular: false, description: 'Premium sector in Gomti Nagar' },
  { name: 'Vinamra Khand', slug: 'vinamra-khand', type: 'area', popular: false, description: 'Residential sector in Gomti Nagar' },
  { name: 'Vibhav Khand', slug: 'vibhav-khand', type: 'area', popular: false, description: 'Sector in Gomti Nagar' },
  { name: 'Vasant Kunj', slug: 'vasant-kunj', type: 'colony', popular: false, description: 'Residential colony' },
  { name: 'Butler Colony', slug: 'butler-colony', type: 'colony', popular: false, description: 'Heritage residential area' },
  { name: 'Daliganj', slug: 'daliganj', type: 'area', popular: false, description: 'Traditional residential area' },
  { name: 'Dubagga', slug: 'dubagga', type: 'area', popular: false, description: 'Developing area with affordable options' },
  { name: 'Mohanlalganj', slug: 'mohanlalganj', type: 'area', popular: false, description: 'Suburban area with plots' },
  { name: 'SGPGI', slug: 'sgpgi', type: 'landmark', popular: false, description: 'Area near SGPGI Hospital' },
  { name: 'South City', slug: 'south-city', type: 'area', popular: false, description: 'Premium residential township' },
  { name: 'Tiwariganj', slug: 'tiwariganj', type: 'area', popular: false, description: 'Residential area near Faizabad Road' },
  { name: 'Munshi Pulia', slug: 'munshi-pulia', type: 'landmark', popular: false, description: 'Major junction with commercial properties' },
  { name: 'Ring Road', slug: 'ring-road', type: 'road', popular: false, description: 'Outer ring road with new developments' },
  { name: 'Husainganj', slug: 'husainganj', type: 'area', popular: false, description: 'Central area near Hazratganj' },
  { name: 'Sushant Golf City', slug: 'sushant-golf-city', type: 'area', popular: true, description: 'Premium township with golf course' },
  { name: 'Ansal API', slug: 'ansal-api', type: 'area', popular: false, description: 'Integrated township' },
  { name: 'Shaheed Path', slug: 'shaheed-path', type: 'road', popular: false, description: 'Major road with new developments' },
  { name: 'Eldeco City', slug: 'eldeco-city', type: 'area', popular: false, description: 'Residential township' },
  { name: 'Paper Mill Colony', slug: 'paper-mill-colony', type: 'colony', popular: false, description: 'Residential colony' },
  { name: 'Aminabad', slug: 'aminabad', type: 'area', popular: false, description: 'Historic commercial market area' },
  { name: 'Kaiserbagh', slug: 'kaiserbagh', type: 'area', popular: false, description: 'Heritage area with government offices' },
  { name: 'Madiyaon', slug: 'madiyaon', type: 'area', popular: false, description: 'Developing suburban area' },
  { name: 'Tedhi Puliya', slug: 'tedhi-puliya', type: 'landmark', popular: false, description: 'Junction area with mixed properties' },
  { name: 'Bhitauli', slug: 'bhitauli', type: 'area', popular: false, description: 'Suburban area with plots' },
  { name: 'Kalyanpur', slug: 'kalyanpur', type: 'area', popular: false, description: 'Residential area' },
  { name: 'Chandganj', slug: 'chandganj', type: 'area', popular: false, description: 'Residential locality' },
  { name: 'Yahiyaganj', slug: 'yahiyaganj', type: 'area', popular: false, description: 'Commercial area' },
  { name: 'Thakurganj', slug: 'thakurganj', type: 'area', popular: false, description: 'Traditional residential area' },
  
  // Landmark-based locations
  { name: 'Near Lulu Mall', slug: 'near-lulu-mall', type: 'landmark', popular: true, description: 'Properties near Lulu Mall' },
  { name: 'Near Phoenix Palassio', slug: 'near-phoenix-palassio', type: 'landmark', popular: true, description: 'Properties near Phoenix Palassio Mall' },
  { name: 'Near BBD University', slug: 'near-bbd-university', type: 'landmark', popular: true, description: 'PG and rooms for students' },
  { name: 'Near CMS School', slug: 'near-cms-school', type: 'landmark', popular: false, description: 'Family properties near CMS' },
  { name: 'Near Medanta Hospital', slug: 'near-medanta-hospital', type: 'landmark', popular: false, description: 'Properties near Medanta' },
  { name: 'Near Charbagh Metro', slug: 'near-charbagh-metro', type: 'landmark', popular: true, description: 'Properties near metro station' },
  { name: 'Near Lucknow University', slug: 'near-lucknow-university', type: 'landmark', popular: true, description: 'Student accommodation' },
  { name: 'Near IT City', slug: 'near-it-city', type: 'landmark', popular: false, description: 'Properties for IT professionals' },
  { name: 'Near Lucknow Airport', slug: 'near-airport', type: 'landmark', popular: false, description: 'Properties near airport' },
  { name: 'Near Ekana Stadium', slug: 'near-ekana-stadium', type: 'landmark', popular: false, description: 'Properties near Ekana' }
]

async function seedLocations() {
  console.log('Starting to seed locations...')
  
  // First, create the locations table if it doesn't exist
  // This would typically be done via Supabase dashboard or migrations
  
  for (const location of locations) {
    const { error } = await supabase
      .from('locations')
      .upsert({
        ...location,
        city: 'Lucknow',
        state: 'Uttar Pradesh',
        country: 'India',
        created_at: new Date().toISOString()
      }, { onConflict: 'slug' })
    
    if (error) {
      console.error(`Error seeding ${location.name}:`, error.message)
    } else {
      console.log(`✓ Seeded: ${location.name}`)
    }
  }
  
  console.log('Done seeding locations!')
}

seedLocations()
