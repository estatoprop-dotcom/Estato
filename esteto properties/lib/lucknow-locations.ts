// Complete Lucknow Locations Database for SEO Domination
// All areas, colonies, landmarks for property listings

// Import types and sub-location files
import { coloniesAndSectors } from './lucknow-colonies'
import { allMohallas } from './lucknow-mohallas'

// Re-export the type from lucknow-types
export type { LucknowLocation } from './lucknow-types'
import type { LucknowLocation } from './lucknow-types'

// Top 20 High-Traffic Locations
export const topLocations: LucknowLocation[] = [
  {
    id: 'gomti-nagar',
    name: 'Gomti Nagar',
    slug: 'gomti-nagar',
    type: 'area',
    description: 'Premium residential & commercial hub with excellent connectivity',
    propertyTypes: ['1BHK', '2BHK', '3BHK', 'Villa', 'PG', 'Shop', 'Office'],
    nearbyLandmarks: ['Singapore Mall', 'Fun Republic', 'CMS School', 'Sahara Hospital'],
    pincode: '226010',
    popular: true
  },
  {
    id: 'gomti-nagar-extension',
    name: 'Gomti Nagar Extension',
    slug: 'gomti-nagar-extension',
    type: 'area',
    description: 'Rapidly developing area with modern apartments and villas',
    propertyTypes: ['2BHK', '3BHK', '4BHK', 'Villa', 'Plot', 'Commercial'],
    nearbyLandmarks: ['Lulu Mall', 'Phoenix Palassio', 'Ekana Stadium'],
    pincode: '226010',
    popular: true
  },
  {
    id: 'hazratganj',
    name: 'Hazratganj',
    slug: 'hazratganj',
    type: 'area',
    description: 'Heart of Lucknow with premium commercial and heritage properties',
    propertyTypes: ['Shop', 'Office', '2BHK', '3BHK', 'Commercial'],
    nearbyLandmarks: ['Sahara Ganj Mall', 'GPO', 'Vidhan Sabha'],
    pincode: '226001',
    popular: true
  },
  {
    id: 'aliganj',
    name: 'Aliganj',
    slug: 'aliganj',
    type: 'area',
    description: 'Well-established residential area with good schools and markets',
    propertyTypes: ['1BHK', '2BHK', '3BHK', 'PG', 'Shop'],
    nearbyLandmarks: ['Aliganj Market', 'Sector H', 'Kapoorthala'],
    pincode: '226024',
    popular: true
  },
  {
    id: 'jankipuram',
    name: 'Jankipuram',
    slug: 'jankipuram',
    type: 'area',
    description: 'Affordable residential area with growing infrastructure',
    propertyTypes: ['1BHK', '2BHK', '3BHK', 'PG', 'Plot'],
    nearbyLandmarks: ['BBD University', 'Jankipuram Extension', 'Sector 6'],
    pincode: '226021',
    popular: true
  },
  {
    id: 'indira-nagar',
    name: 'Indira Nagar',
    slug: 'indira-nagar',
    type: 'area',
    description: 'Prime residential locality with excellent connectivity',
    propertyTypes: ['2BHK', '3BHK', 'Villa', 'PG', 'Shop'],
    nearbyLandmarks: ['Munshi Pulia', 'Faizabad Road', 'Wave Mall'],
    pincode: '226016',
    popular: true
  },
  {
    id: 'mahanagar',
    name: 'Mahanagar',
    slug: 'mahanagar',
    type: 'area',
    description: 'Central location with mix of residential and commercial',
    propertyTypes: ['2BHK', '3BHK', 'Shop', 'Office', 'PG'],
    nearbyLandmarks: ['Mahanagar Extension', 'Sector A-K'],
    pincode: '226006',
    popular: true
  },
  {
    id: 'arjunganj',
    name: 'Arjunganj',
    slug: 'arjunganj',
    type: 'area',
    description: 'Developing area near Sultanpur Road with affordable options',
    propertyTypes: ['1BHK', '2BHK', 'Plot', 'PG'],
    nearbyLandmarks: ['Sultanpur Road', 'Lucknow Airport'],
    pincode: '226002',
    popular: true
  },
  {
    id: 'telibagh',
    name: 'Telibagh',
    slug: 'telibagh',
    type: 'area',
    description: 'Emerging residential area with new developments',
    propertyTypes: ['2BHK', '3BHK', 'Plot', 'Villa'],
    nearbyLandmarks: ['Raebareli Road', 'South City'],
    pincode: '226002',
    popular: true
  },
  {
    id: 'vrindavan-colony',
    name: 'Vrindavan Colony',
    slug: 'vrindavan-colony',
    type: 'colony',
    description: 'Peaceful residential colony with good amenities',
    propertyTypes: ['2BHK', '3BHK', 'Villa', 'PG'],
    nearbyLandmarks: ['Aliganj', 'Sector J'],
    pincode: '226024',
    popular: true
  },
  {
    id: 'ashiyana',
    name: 'Ashiyana',
    slug: 'ashiyana',
    type: 'area',
    description: 'Well-planned residential area with parks and schools',
    propertyTypes: ['2BHK', '3BHK', 'Villa', 'Plot'],
    nearbyLandmarks: ['Ashiyana Park', 'Kanpur Road'],
    pincode: '226012',
    popular: true
  },
  {
    id: 'chowk',
    name: 'Chowk',
    slug: 'chowk',
    type: 'area',
    description: 'Historic commercial area with traditional markets',
    propertyTypes: ['Shop', 'Commercial', '1BHK', '2BHK'],
    nearbyLandmarks: ['Aminabad', 'Akbari Gate', 'Chowk Market'],
    pincode: '226003',
    popular: true
  },
  {
    id: 'charbagh',
    name: 'Charbagh',
    slug: 'charbagh',
    type: 'area',
    description: 'Transport hub with commercial and residential options',
    propertyTypes: ['Shop', 'Office', '1BHK', '2BHK', 'PG'],
    nearbyLandmarks: ['Charbagh Railway Station', 'Metro Station', 'Bus Stand'],
    pincode: '226004',
    popular: true
  },
  {
    id: 'alambagh',
    name: 'Alambagh',
    slug: 'alambagh',
    type: 'area',
    description: 'Commercial area with good connectivity',
    propertyTypes: ['Shop', 'Office', '2BHK', '3BHK', 'Commercial'],
    nearbyLandmarks: ['Alambagh Bus Station', 'Kanpur Road'],
    pincode: '226005',
    popular: true
  },
  {
    id: 'transport-nagar',
    name: 'Transport Nagar',
    slug: 'transport-nagar',
    type: 'area',
    description: 'Commercial hub for transport and logistics',
    propertyTypes: ['Shop', 'Warehouse', 'Office', 'Commercial'],
    nearbyLandmarks: ['Kanpur Road', 'Alambagh'],
    pincode: '226012',
    popular: true
  },
  {
    id: 'rajajipuram',
    name: 'Rajajipuram',
    slug: 'rajajipuram',
    type: 'area',
    description: 'Established residential area with sectors',
    propertyTypes: ['2BHK', '3BHK', 'PG', 'Shop'],
    nearbyLandmarks: ['Rajajipuram Market', 'Sectors A-K'],
    pincode: '226017',
    popular: true
  },
  {
    id: 'faizabad-road',
    name: 'Faizabad Road',
    slug: 'faizabad-road',
    type: 'road',
    description: 'Major arterial road with residential and commercial properties',
    propertyTypes: ['2BHK', '3BHK', 'Shop', 'Office', 'Commercial'],
    nearbyLandmarks: ['Indira Nagar', 'Chinhat', 'Wave Mall'],
    pincode: '226016',
    popular: true
  },
  {
    id: 'raebareli-road',
    name: 'Raebareli Road',
    slug: 'raebareli-road',
    type: 'road',
    description: 'Developing corridor with new projects',
    propertyTypes: ['2BHK', '3BHK', 'Plot', 'Villa', 'Commercial'],
    nearbyLandmarks: ['South City', 'Telibagh', 'SGPGI'],
    pincode: '226002',
    popular: true
  },
  {
    id: 'kanpur-road',
    name: 'Kanpur Road',
    slug: 'kanpur-road',
    type: 'road',
    description: 'Major commercial and industrial corridor',
    propertyTypes: ['Shop', 'Office', 'Warehouse', 'Commercial', '2BHK'],
    nearbyLandmarks: ['Alambagh', 'Ashiyana', 'Transport Nagar'],
    pincode: '226012',
    popular: true
  },
  {
    id: 'bijnor-road',
    name: 'Bijnor Road',
    slug: 'bijnor-road',
    type: 'road',
    description: 'Residential area with affordable options',
    propertyTypes: ['1BHK', '2BHK', 'PG', 'Plot'],
    nearbyLandmarks: ['Aliganj', 'Vikas Nagar'],
    pincode: '226024',
    popular: true
  }
]

// Next 40 Micro-Locations
export const microLocations: LucknowLocation[] = [
  { id: 'kapoorthala', name: 'Kapoorthala', slug: 'kapoorthala', type: 'colony', description: 'Premium residential colony near Aliganj', propertyTypes: ['2BHK', '3BHK', 'Villa'], nearbyLandmarks: ['Aliganj Market'], popular: false },
  { id: 'nishatganj', name: 'Nishatganj', slug: 'nishatganj', type: 'area', description: 'Central location with heritage properties', propertyTypes: ['2BHK', '3BHK', 'Shop'], nearbyLandmarks: ['Hazratganj'], popular: false },
  { id: 'vikas-nagar', name: 'Vikas Nagar', slug: 'vikas-nagar', type: 'area', description: 'Residential area with good connectivity', propertyTypes: ['1BHK', '2BHK', 'PG'], nearbyLandmarks: ['Aliganj'], popular: false },
  { id: 'khurram-nagar', name: 'Khurram Nagar', slug: 'khurram-nagar', type: 'area', description: 'Developing residential locality', propertyTypes: ['2BHK', '3BHK', 'Plot'], nearbyLandmarks: ['Faizabad Road'], popular: false },
  { id: 'kursi-road', name: 'Kursi Road', slug: 'kursi-road', type: 'road', description: 'Emerging area with new developments', propertyTypes: ['2BHK', '3BHK', 'Plot'], nearbyLandmarks: ['Jankipuram'], popular: false },
  { id: 'deva-road', name: 'Deva Road', slug: 'deva-road', type: 'road', description: 'Industrial and residential corridor', propertyTypes: ['Plot', 'Warehouse', 'Commercial'], nearbyLandmarks: ['Chinhat'], popular: false },
  { id: 'polytechnic-chauraha', name: 'Polytechnic Chauraha', slug: 'polytechnic-chauraha', type: 'landmark', description: 'Central junction with commercial properties', propertyTypes: ['Shop', 'Office', '2BHK'], nearbyLandmarks: ['Aliganj', 'Mahanagar'], popular: false },
  { id: 'patrakarpuram', name: 'Patrakarpuram', slug: 'patrakarpuram', type: 'area', description: 'Residential area in Gomti Nagar', propertyTypes: ['2BHK', '3BHK', 'Shop'], nearbyLandmarks: ['Gomti Nagar'], popular: false },
  { id: 'sector-6-jankipuram', name: 'Sector 6, Jankipuram', slug: 'sector-6-jankipuram', type: 'area', description: 'Planned sector with residential plots', propertyTypes: ['2BHK', '3BHK', 'Plot'], nearbyLandmarks: ['Jankipuram'], popular: false },
  { id: 'sector-h-aliganj', name: 'Sector H, Aliganj', slug: 'sector-h-aliganj', type: 'area', description: 'Premium sector in Aliganj', propertyTypes: ['2BHK', '3BHK', 'Villa'], nearbyLandmarks: ['Aliganj Market'], popular: false },
  { id: 'viram-khand', name: 'Viram Khand', slug: 'viram-khand', type: 'area', description: 'Sector in Gomti Nagar', propertyTypes: ['2BHK', '3BHK', 'Shop'], nearbyLandmarks: ['Gomti Nagar'], popular: false },
  { id: 'vishal-khand', name: 'Vishal Khand', slug: 'vishal-khand', type: 'area', description: 'Residential sector in Gomti Nagar', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Gomti Nagar'], popular: false },
  { id: 'vipul-khand', name: 'Vipul Khand', slug: 'vipul-khand', type: 'area', description: 'Premium sector in Gomti Nagar', propertyTypes: ['2BHK', '3BHK', '4BHK'], nearbyLandmarks: ['Gomti Nagar'], popular: false },
  { id: 'vinamra-khand', name: 'Vinamra Khand', slug: 'vinamra-khand', type: 'area', description: 'Residential sector in Gomti Nagar', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Gomti Nagar'], popular: false },
  { id: 'vibhav-khand', name: 'Vibhav Khand', slug: 'vibhav-khand', type: 'area', description: 'Sector in Gomti Nagar', propertyTypes: ['2BHK', '3BHK', 'Shop'], nearbyLandmarks: ['Gomti Nagar'], popular: false },
  { id: 'vasant-kunj', name: 'Vasant Kunj', slug: 'vasant-kunj', type: 'colony', description: 'Residential colony', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Gomti Nagar'], popular: false },
  { id: 'butler-colony', name: 'Butler Colony', slug: 'butler-colony', type: 'colony', description: 'Heritage residential area', propertyTypes: ['Villa', '3BHK', '4BHK'], nearbyLandmarks: ['Civil Lines'], popular: false },
  { id: 'daliganj', name: 'Daliganj', slug: 'daliganj', type: 'area', description: 'Traditional residential area', propertyTypes: ['1BHK', '2BHK', 'Shop'], nearbyLandmarks: ['Sitapur Road'], popular: false },
  { id: 'dubagga', name: 'Dubagga', slug: 'dubagga', type: 'area', description: 'Developing area with affordable options', propertyTypes: ['1BHK', '2BHK', 'Plot'], nearbyLandmarks: ['Sitapur Road'], popular: false },
  { id: 'mohanlalganj', name: 'Mohanlalganj', slug: 'mohanlalganj', type: 'area', description: 'Suburban area with plots', propertyTypes: ['Plot', '2BHK', 'Villa'], nearbyLandmarks: ['Raebareli Road'], popular: false },
  { id: 'sgpgi', name: 'SGPGI', slug: 'sgpgi', type: 'landmark', description: 'Area near SGPGI Hospital', propertyTypes: ['2BHK', '3BHK', 'PG'], nearbyLandmarks: ['Raebareli Road', 'SGPGI Hospital'], popular: false },
  { id: 'south-city', name: 'South City', slug: 'south-city', type: 'area', description: 'Premium residential township', propertyTypes: ['2BHK', '3BHK', 'Villa', 'Plot'], nearbyLandmarks: ['Raebareli Road'], popular: false },
  { id: 'tiwariganj', name: 'Tiwariganj', slug: 'tiwariganj', type: 'area', description: 'Residential area near Faizabad Road', propertyTypes: ['2BHK', '3BHK', 'Plot'], nearbyLandmarks: ['Faizabad Road'], popular: false },
  { id: 'munshi-pulia', name: 'Munshi Pulia', slug: 'munshi-pulia', type: 'landmark', description: 'Major junction with commercial properties', propertyTypes: ['Shop', 'Office', '2BHK'], nearbyLandmarks: ['Indira Nagar'], popular: false },
  { id: 'ring-road', name: 'Ring Road', slug: 'ring-road', type: 'road', description: 'Outer ring road with new developments', propertyTypes: ['Plot', 'Commercial', '2BHK'], nearbyLandmarks: ['Various'], popular: false },
  { id: 'husainganj', name: 'Husainganj', slug: 'husainganj', type: 'area', description: 'Central area near Hazratganj', propertyTypes: ['Shop', 'Office', '2BHK'], nearbyLandmarks: ['Hazratganj'], popular: false },
  { id: 'sushant-golf-city', name: 'Sushant Golf City', slug: 'sushant-golf-city', type: 'area', description: 'Premium township with golf course', propertyTypes: ['3BHK', '4BHK', 'Villa', 'Plot'], nearbyLandmarks: ['Ansal API'], popular: true },
  { id: 'ansal-api', name: 'Ansal API', slug: 'ansal-api', type: 'area', description: 'Integrated township', propertyTypes: ['2BHK', '3BHK', 'Villa'], nearbyLandmarks: ['Sushant Golf City'], popular: false },
  { id: 'shaheed-path', name: 'Shaheed Path', slug: 'shaheed-path', type: 'road', description: 'Major road with new developments', propertyTypes: ['2BHK', '3BHK', 'Commercial'], nearbyLandmarks: ['Gomti Nagar Extension'], popular: false },
  { id: 'eldeco-city', name: 'Eldeco City', slug: 'eldeco-city', type: 'area', description: 'Residential township', propertyTypes: ['2BHK', '3BHK', 'Villa'], nearbyLandmarks: ['Raebareli Road'], popular: false },
  { id: 'paper-mill-colony', name: 'Paper Mill Colony', slug: 'paper-mill-colony', type: 'colony', description: 'Residential colony', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Nishatganj'], popular: false },
  { id: 'aminabad', name: 'Aminabad', slug: 'aminabad', type: 'area', description: 'Historic commercial market area', propertyTypes: ['Shop', 'Commercial'], nearbyLandmarks: ['Chowk', 'Hazratganj'], popular: false },
  { id: 'kaiserbagh', name: 'Kaiserbagh', slug: 'kaiserbagh', type: 'area', description: 'Heritage area with government offices', propertyTypes: ['Shop', 'Office', '2BHK'], nearbyLandmarks: ['Hazratganj'], popular: false },
  { id: 'madiyaon', name: 'Madiyaon', slug: 'madiyaon', type: 'area', description: 'Developing suburban area', propertyTypes: ['Plot', '2BHK', 'Villa'], nearbyLandmarks: ['Kursi Road'], popular: false },
  { id: 'tedhi-puliya', name: 'Tedhi Puliya', slug: 'tedhi-puliya', type: 'landmark', description: 'Junction area with mixed properties', propertyTypes: ['Shop', '2BHK', 'PG'], nearbyLandmarks: ['Daliganj'], popular: false },
  { id: 'bhitauli', name: 'Bhitauli', slug: 'bhitauli', type: 'area', description: 'Suburban area with plots', propertyTypes: ['Plot', '2BHK'], nearbyLandmarks: ['Sitapur Road'], popular: false },
  { id: 'kalyanpur', name: 'Kalyanpur', slug: 'kalyanpur', type: 'area', description: 'Residential area', propertyTypes: ['2BHK', '3BHK', 'Plot'], nearbyLandmarks: ['Kanpur Road'], popular: false },
  { id: 'chandganj', name: 'Chandganj', slug: 'chandganj', type: 'area', description: 'Residential locality', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Aliganj'], popular: false },
  { id: 'yahiyaganj', name: 'Yahiyaganj', slug: 'yahiyaganj', type: 'area', description: 'Commercial area', propertyTypes: ['Shop', 'Office'], nearbyLandmarks: ['Hazratganj'], popular: false },
  { id: 'thakurganj', name: 'Thakurganj', slug: 'thakurganj', type: 'area', description: 'Traditional residential area', propertyTypes: ['1BHK', '2BHK', 'Shop'], nearbyLandmarks: ['Chowk'], popular: false }
]

// Landmark-based locations (for "near X" searches)
export const landmarkLocations: LucknowLocation[] = [
  { id: 'near-lulu-mall', name: 'Near Lulu Mall', slug: 'near-lulu-mall', type: 'landmark', description: 'Properties near Lulu Mall', propertyTypes: ['2BHK', '3BHK', 'PG', 'Shop'], nearbyLandmarks: ['Lulu Mall', 'Gomti Nagar Extension'], popular: true },
  { id: 'near-phoenix-palassio', name: 'Near Phoenix Palassio', slug: 'near-phoenix-palassio', type: 'landmark', description: 'Properties near Phoenix Palassio Mall', propertyTypes: ['2BHK', '3BHK', 'Shop'], nearbyLandmarks: ['Phoenix Palassio'], popular: true },
  { id: 'near-bbd-university', name: 'Near BBD University', slug: 'near-bbd-university', type: 'landmark', description: 'PG and rooms for students', propertyTypes: ['PG', '1BHK', '2BHK'], nearbyLandmarks: ['BBD University', 'Jankipuram'], popular: true },
  { id: 'near-cms-school', name: 'Near CMS School', slug: 'near-cms-school', type: 'landmark', description: 'Family properties near CMS', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['CMS School'], popular: false },
  { id: 'near-medanta-hospital', name: 'Near Medanta Hospital', slug: 'near-medanta-hospital', type: 'landmark', description: 'Properties near Medanta', propertyTypes: ['2BHK', '3BHK', 'PG'], nearbyLandmarks: ['Medanta Hospital'], popular: false },
  { id: 'near-charbagh-metro', name: 'Near Charbagh Metro Station', slug: 'near-charbagh-metro', type: 'landmark', description: 'Properties near metro station', propertyTypes: ['1BHK', '2BHK', 'PG', 'Shop'], nearbyLandmarks: ['Charbagh Metro'], popular: true },
  { id: 'near-lucknow-university', name: 'Near Lucknow University', slug: 'near-lucknow-university', type: 'landmark', description: 'Student accommodation', propertyTypes: ['PG', '1BHK', '2BHK'], nearbyLandmarks: ['Lucknow University'], popular: true },
  { id: 'near-it-city', name: 'Near IT City', slug: 'near-it-city', type: 'landmark', description: 'Properties for IT professionals', propertyTypes: ['2BHK', '3BHK', 'PG'], nearbyLandmarks: ['IT City', 'Gomti Nagar'], popular: false },
  { id: 'near-airport', name: 'Near Lucknow Airport', slug: 'near-airport', type: 'landmark', description: 'Properties near airport', propertyTypes: ['2BHK', '3BHK', 'Villa'], nearbyLandmarks: ['Amausi Airport'], popular: false },
  { id: 'near-ekana-stadium', name: 'Near Ekana Stadium', slug: 'near-ekana-stadium', type: 'landmark', description: 'Properties near Ekana', propertyTypes: ['2BHK', '3BHK', 'Villa'], nearbyLandmarks: ['Ekana Stadium'], popular: false }
]

// All locations combined (300+ locations for SEO domination)
export const allLucknowLocations = [
  ...topLocations, 
  ...microLocations, 
  ...landmarkLocations,
  ...coloniesAndSectors,
  ...allMohallas
]

// Property types for SEO
export const propertyTypes = [
  { id: 'buy', name: 'Buy', slug: 'buy', description: 'Properties for sale' },
  { id: 'rent', name: 'Rent', slug: 'rent', description: 'Properties for rent' },
  { id: 'pg', name: 'PG/Rooms', slug: 'pg-rooms', description: 'Paying guest and rooms' },
  { id: 'commercial', name: 'Commercial', slug: 'commercial', description: 'Commercial properties' },
  { id: 'plots', name: 'Plots', slug: 'plots', description: 'Residential and commercial plots' },
  { id: 'new-projects', name: 'New Projects', slug: 'new-projects', description: 'New residential projects' }
]

// Get location by slug
export const getLocationBySlug = (slug: string): LucknowLocation | undefined => {
  return allLucknowLocations.find(loc => loc.slug === slug)
}

// Get popular locations
export const getPopularLocations = (): LucknowLocation[] => {
  return allLucknowLocations.filter(loc => loc.popular)
}

// Search locations
export const searchLocations = (query: string): LucknowLocation[] => {
  const q = query.toLowerCase()
  return allLucknowLocations.filter(loc => 
    loc.name.toLowerCase().includes(q) || 
    loc.slug.includes(q) ||
    loc.nearbyLandmarks.some(l => l.toLowerCase().includes(q))
  )
}
