import { MetadataRoute } from 'next'

// All Lucknow location pages for comprehensive SEO coverage
const locationPages = [
  // Premium Areas (High Priority)
  { slug: 'gomti-nagar', priority: 0.95 },
  { slug: 'gomti-nagar-extension', priority: 0.95 },
  { slug: 'hazratganj', priority: 0.95 },
  { slug: 'indira-nagar', priority: 0.9 },
  { slug: 'aliganj', priority: 0.9 },
  { slug: 'jankipuram', priority: 0.9 },
  { slug: 'mahanagar', priority: 0.9 },
  { slug: 'ashiyana', priority: 0.9 },
  { slug: 'sushant-golf-city', priority: 0.9 },
  { slug: 'vrindavan-yojna', priority: 0.9 },
  // Popular Areas
  { slug: 'rajajipuram', priority: 0.85 },
  { slug: 'alambagh', priority: 0.85 },
  { slug: 'charbagh', priority: 0.85 },
  { slug: 'aminabad', priority: 0.85 },
  { slug: 'chowk', priority: 0.85 },
  { slug: 'kaiserbagh', priority: 0.85 },
  { slug: 'vikas-nagar', priority: 0.85 },
  { slug: 'nirala-nagar', priority: 0.85 },
  { slug: 'husainganj', priority: 0.85 },
  // Developing Areas
  { slug: 'telibagh', priority: 0.8 },
  { slug: 'chinhat', priority: 0.8 },
  { slug: 'faizabad-road', priority: 0.8 },
  { slug: 'kanpur-road', priority: 0.8 },
  { slug: 'sitapur-road', priority: 0.8 },
  { slug: 'raebareli-road', priority: 0.8 },
  { slug: 'shaheed-path', priority: 0.8 },
  { slug: 'transport-nagar', priority: 0.8 },
  { slug: 'lda-colony', priority: 0.8 },
  // Special Areas
  { slug: 'near-lulu-mall', priority: 0.85 },
  { slug: 'lucknow-cantonment', priority: 0.85 },
  { slug: 'butler-colony', priority: 0.85 },
  { slug: 'eldeco-udyan', priority: 0.8 },
  { slug: 'gomti-riverfront', priority: 0.8 },
  { slug: 'it-city', priority: 0.85 },
  { slug: 'amausi', priority: 0.8 },
  { slug: 'kursi-road', priority: 0.8 },
  { slug: 'para', priority: 0.75 },
  { slug: 'arjunganj', priority: 0.75 },
  { slug: 'vrindavan-colony', priority: 0.75 },
]

// Property type pages for SEO
const propertyTypePages = [
  { path: 'properties?type=flat', priority: 0.9 },
  { path: 'properties?type=house', priority: 0.9 },
  { path: 'properties?type=villa', priority: 0.85 },
  { path: 'properties?type=plot', priority: 0.85 },
  { path: 'properties?type=commercial', priority: 0.8 },
  { path: 'properties?type=pg', priority: 0.8 },
  { path: 'properties?listing_type=sale', priority: 0.9 },
  { path: 'properties?listing_type=rent', priority: 0.9 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://estatoprop.com'
  const currentDate = new Date()

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: currentDate,
      changeFrequency: 'hourly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Location pages - Critical for local SEO
  const locationSitemap: MetadataRoute.Sitemap = locationPages.map((location) => ({
    url: `${baseUrl}/locations/${location.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: location.priority,
  }))

  // Property type filter pages
  const propertyTypeSitemap: MetadataRoute.Sitemap = propertyTypePages.map((page) => ({
    url: `${baseUrl}/${page.path}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: page.priority,
  }))

  return [...corePages, ...locationSitemap, ...propertyTypeSitemap]
}
