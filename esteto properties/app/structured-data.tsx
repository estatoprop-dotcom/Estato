export default function StructuredData() {
  const baseUrl = 'https://estatoprop.com'
  
  // Organization Schema - For brand recognition
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${baseUrl}/#organization`,
    "name": "EstatoProp",
    "alternateName": ["Estato Prop", "EstatoProp Lucknow", "Estato Properties"],
    "description": "EstatoProp.com - Lucknow's #1 Real Estate Platform. Find 5000+ verified properties for sale & rent. Flats, Houses, Villas, Plots, Commercial Properties in Gomti Nagar, Hazratganj, Indira Nagar & 300+ locations.",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo.png`,
      "width": 512,
      "height": 512
    },
    "image": `${baseUrl}/og-image.jpg`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gomti Nagar, Vibhuti Khand",
      "addressLocality": "Lucknow",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "226010",
      "addressCountry": "IN"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Lucknow",
        "sameAs": "https://en.wikipedia.org/wiki/Lucknow"
      },
      {
        "@type": "State",
        "name": "Uttar Pradesh"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 26.8467,
        "longitude": 80.9462
      },
      "geoRadius": "50000"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-9872364476",
        "contactType": "sales",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-9872364476",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      }
    ],
    "sameAs": [
      "https://facebook.com/estatoprop",
      "https://twitter.com/estatoprop",
      "https://instagram.com/estatoprop",
      "https://linkedin.com/company/estatoprop",
      "https://youtube.com/@estatoprop"
    ],
    "foundingDate": "2024",
    "slogan": "Lucknow's #1 Property Portal",
    "knowsAbout": [
      "Real Estate",
      "Property Sales",
      "Property Rentals",
      "Lucknow Properties",
      "Residential Properties",
      "Commercial Properties"
    ]
  }

  // Website Schema - For sitelinks search box
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "name": "EstatoProp - Lucknow Real Estate",
    "alternateName": "EstatoProp",
    "url": baseUrl,
    "description": "Find 5000+ verified properties in Lucknow. Buy, Sell, Rent flats, houses, villas, plots.",
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/properties?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "inLanguage": ["en-IN", "hi-IN"]
  }

  // Local Business Schema - For Google Maps & Local Pack
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${baseUrl}/#localbusiness`,
    "name": "EstatoProp - Lucknow Real Estate",
    "image": [
      `${baseUrl}/og-image.jpg`,
      `${baseUrl}/office-1.jpg`,
      `${baseUrl}/office-2.jpg`
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Vibhuti Khand, Gomti Nagar",
      "addressLocality": "Lucknow",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "226010",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.8467,
      "longitude": 80.9462
    },
    "url": baseUrl,
    "telephone": "+91-9872364476",
    "priceRange": "₹₹-₹₹₹₹",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "18:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "2847",
      "reviewCount": "1523"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Rahul Sharma"
        },
        "datePublished": "2024-11-15",
        "reviewBody": "Best property portal in Lucknow! Found my dream flat in Gomti Nagar within a week. Highly recommended!",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Priya Singh"
        },
        "datePublished": "2024-11-10",
        "reviewBody": "Excellent service! The team helped me find a perfect rental in Hazratganj. Very professional.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Property Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Property for Sale",
            "description": "Buy flats, houses, villas, plots in Lucknow"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Property for Rent",
            "description": "Rent apartments, houses, PG in Lucknow"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Property Valuation",
            "description": "Free property valuation in Lucknow"
          }
        }
      ]
    }
  }

  // FAQ Schema - For rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best area to buy property in Lucknow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best areas to buy property in Lucknow are Gomti Nagar, Gomti Nagar Extension, Hazratganj, Sushant Golf City, and Vrindavan Yojna. These areas offer excellent connectivity, modern amenities, and good appreciation potential. EstatoProp has 5000+ verified properties in these prime locations."
        }
      },
      {
        "@type": "Question",
        "name": "What is the average property price in Lucknow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Property prices in Lucknow range from ₹2,500/sqft in developing areas like Para to ₹18,000/sqft in premium localities like Butler Colony. Average prices: Gomti Nagar (₹6,000-8,000/sqft), Hazratganj (₹8,000-12,000/sqft), Aliganj (₹4,500-6,000/sqft). Check EstatoProp for current rates."
        }
      },
      {
        "@type": "Question",
        "name": "How to find rental property in Lucknow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Find rental properties in Lucknow on EstatoProp.com. We have 2000+ verified rental listings including flats, houses, PG accommodations. Popular rental areas include Gomti Nagar (₹15,000-40,000/month), Aliganj (₹10,000-25,000/month), and Indira Nagar (₹12,000-30,000/month)."
        }
      },
      {
        "@type": "Question",
        "name": "Is Lucknow good for real estate investment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Lucknow is excellent for real estate investment. The city has seen 10-15% annual appreciation in prime areas. Key factors: IT corridor development, metro expansion, Lulu Mall, and growing infrastructure. Best investment areas: Gomti Nagar Extension, Sushant Golf City, Shaheed Path."
        }
      },
      {
        "@type": "Question",
        "name": "What documents are needed to buy property in Lucknow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Documents needed: Aadhaar Card, PAN Card, Address Proof, Income Proof, Bank Statements (6 months), Property Documents (Sale Deed, Registry, NOC), and Passport-size Photos. EstatoProp provides free documentation guidance for all property transactions."
        }
      }
    ]
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Properties",
        "item": `${baseUrl}/properties`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Locations",
        "item": `${baseUrl}/locations`
      }
    ]
  }

  // ItemList Schema - For property listings
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Top Locations in Lucknow for Property",
    "description": "Best areas to buy and rent property in Lucknow",
    "numberOfItems": 10,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Gomti Nagar", "url": `${baseUrl}/locations/gomti-nagar` },
      { "@type": "ListItem", "position": 2, "name": "Hazratganj", "url": `${baseUrl}/locations/hazratganj` },
      { "@type": "ListItem", "position": 3, "name": "Indira Nagar", "url": `${baseUrl}/locations/indira-nagar` },
      { "@type": "ListItem", "position": 4, "name": "Aliganj", "url": `${baseUrl}/locations/aliganj` },
      { "@type": "ListItem", "position": 5, "name": "Gomti Nagar Extension", "url": `${baseUrl}/locations/gomti-nagar-extension` },
      { "@type": "ListItem", "position": 6, "name": "Sushant Golf City", "url": `${baseUrl}/locations/sushant-golf-city` },
      { "@type": "ListItem", "position": 7, "name": "Jankipuram", "url": `${baseUrl}/locations/jankipuram` },
      { "@type": "ListItem", "position": 8, "name": "Mahanagar", "url": `${baseUrl}/locations/mahanagar` },
      { "@type": "ListItem", "position": 9, "name": "Ashiyana", "url": `${baseUrl}/locations/ashiyana` },
      { "@type": "ListItem", "position": 10, "name": "Vrindavan Yojna", "url": `${baseUrl}/locations/vrindavan-yojna` }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />
    </>
  )
}
