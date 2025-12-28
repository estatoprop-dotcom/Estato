// Top 100 Colonies / Sectors / Blocks of Lucknow
import { LucknowLocation } from './lucknow-types'

export const coloniesAndSectors: LucknowLocation[] = [
  // Gomti Nagar Khands
  { id: 'gomti-nagar-khand-1', name: 'Gomti Nagar Khand 1', slug: 'gomti-nagar-khand-1', type: 'colony', parent: 'gomti-nagar', description: 'Premium residential sector in Gomti Nagar', propertyTypes: ['2BHK', '3BHK', '4BHK', 'Villa'], nearbyLandmarks: ['Gomti Nagar'], popular: true },
  { id: 'gomti-nagar-khand-2', name: 'Gomti Nagar Khand 2', slug: 'gomti-nagar-khand-2', type: 'colony', parent: 'gomti-nagar', description: 'Residential sector in Gomti Nagar', propertyTypes: ['2BHK', '3BHK', '4BHK'], nearbyLandmarks: ['Gomti Nagar'], popular: true },
  { id: 'gomti-nagar-khand-3', name: 'Gomti Nagar Khand 3', slug: 'gomti-nagar-khand-3', type: 'colony', parent: 'gomti-nagar', description: 'Residential sector in Gomti Nagar', propertyTypes: ['2BHK', '3BHK', '4BHK'], nearbyLandmarks: ['Gomti Nagar'], popular: true },
  { id: 'vipul-khand', name: 'Vipul Khand', slug: 'vipul-khand', type: 'colony', parent: 'gomti-nagar', description: 'Premium sector in Gomti Nagar', propertyTypes: ['2BHK', '3BHK', '4BHK'], nearbyLandmarks: ['Gomti Nagar'], popular: true },
  { id: 'vishal-khand', name: 'Vishal Khand', slug: 'vishal-khand', type: 'colony', parent: 'gomti-nagar', description: 'Residential sector in Gomti Nagar', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Gomti Nagar'], popular: true },
  { id: 'vibhav-khand', name: 'Vibhav Khand', slug: 'vibhav-khand', type: 'colony', parent: 'gomti-nagar', description: 'Sector in Gomti Nagar', propertyTypes: ['2BHK', '3BHK', 'Shop'], nearbyLandmarks: ['Gomti Nagar'], popular: true },
  { id: 'vinamra-khand', name: 'Vinamra Khand', slug: 'vinamra-khand', type: 'colony', parent: 'gomti-nagar', description: 'Residential sector in Gomti Nagar', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Gomti Nagar'], popular: false },
  { id: 'viram-khand', name: 'Viram Khand', slug: 'viram-khand', type: 'colony', parent: 'gomti-nagar', description: 'Sector in Gomti Nagar', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Gomti Nagar'], popular: false },
  { id: 'vikas-khand', name: 'Vikas Khand', slug: 'vikas-khand', type: 'colony', parent: 'gomti-nagar', description: 'Sector in Gomti Nagar', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Gomti Nagar'], popular: false },
  { id: 'patrakarpuram', name: 'Patrakarpuram', slug: 'patrakarpuram', type: 'colony', parent: 'gomti-nagar', description: 'Residential area in Gomti Nagar', propertyTypes: ['2BHK', '3BHK', 'Shop'], nearbyLandmarks: ['Gomti Nagar'], popular: true },

  // Indira Nagar Sectors
  { id: 'indira-nagar-sector-10', name: 'Indira Nagar Sector 10', slug: 'indira-nagar-sector-10', type: 'colony', parent: 'indira-nagar', description: 'Residential sector in Indira Nagar', propertyTypes: ['2BHK', '3BHK', 'PG'], nearbyLandmarks: ['Indira Nagar', 'Munshi Pulia'], popular: false },
  { id: 'indira-nagar-sector-11', name: 'Indira Nagar Sector 11', slug: 'indira-nagar-sector-11', type: 'colony', parent: 'indira-nagar', description: 'Residential sector in Indira Nagar', propertyTypes: ['2BHK', '3BHK', 'PG'], nearbyLandmarks: ['Indira Nagar'], popular: false },
  { id: 'indira-nagar-sector-12', name: 'Indira Nagar Sector 12', slug: 'indira-nagar-sector-12', type: 'colony', parent: 'indira-nagar', description: 'Residential sector in Indira Nagar', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Indira Nagar'], popular: false },
  { id: 'indira-nagar-sector-13', name: 'Indira Nagar Sector 13', slug: 'indira-nagar-sector-13', type: 'colony', parent: 'indira-nagar', description: 'Residential sector in Indira Nagar', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Indira Nagar'], popular: false },
  { id: 'indira-nagar-sector-14', name: 'Indira Nagar Sector 14', slug: 'indira-nagar-sector-14', type: 'colony', parent: 'indira-nagar', description: 'Residential sector in Indira Nagar', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Indira Nagar'], popular: false },
  { id: 'indira-nagar-sector-15', name: 'Indira Nagar Sector 15', slug: 'indira-nagar-sector-15', type: 'colony', parent: 'indira-nagar', description: 'Residential sector in Indira Nagar', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Indira Nagar'], popular: false },
  { id: 'indira-nagar-sector-16', name: 'Indira Nagar Sector 16', slug: 'indira-nagar-sector-16', type: 'colony', parent: 'indira-nagar', description: 'Residential sector in Indira Nagar', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Indira Nagar'], popular: false },

  // Jankipuram Sectors
  { id: 'jankipuram-sector-a', name: 'Jankipuram Sector A', slug: 'jankipuram-sector-a', type: 'colony', parent: 'jankipuram', description: 'Residential sector in Jankipuram', propertyTypes: ['2BHK', '3BHK', 'Plot'], nearbyLandmarks: ['Jankipuram'], popular: false },
  { id: 'jankipuram-sector-b', name: 'Jankipuram Sector B', slug: 'jankipuram-sector-b', type: 'colony', parent: 'jankipuram', description: 'Residential sector in Jankipuram', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Jankipuram'], popular: false },
  { id: 'jankipuram-sector-c', name: 'Jankipuram Sector C', slug: 'jankipuram-sector-c', type: 'colony', parent: 'jankipuram', description: 'Residential sector in Jankipuram', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Jankipuram'], popular: false },
  { id: 'jankipuram-sector-d', name: 'Jankipuram Sector D', slug: 'jankipuram-sector-d', type: 'colony', parent: 'jankipuram', description: 'Residential sector in Jankipuram', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Jankipuram'], popular: false },
  { id: 'jankipuram-vistar', name: 'Jankipuram Vistar', slug: 'jankipuram-vistar', type: 'colony', parent: 'jankipuram', description: 'Extended area of Jankipuram', propertyTypes: ['2BHK', '3BHK', 'Plot'], nearbyLandmarks: ['Jankipuram'], popular: true },

  // Mahanagar & Aliganj
  { id: 'mahanagar-extension', name: 'Mahanagar Extension', slug: 'mahanagar-extension', type: 'colony', parent: 'mahanagar', description: 'Extension of Mahanagar', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Mahanagar'], popular: false },
  { id: 'aliganj-sector-h', name: 'Aliganj Sector H', slug: 'aliganj-sector-h', type: 'colony', parent: 'aliganj', description: 'Premium sector in Aliganj', propertyTypes: ['2BHK', '3BHK', 'Villa'], nearbyLandmarks: ['Aliganj'], popular: true },
  { id: 'aliganj-sector-g', name: 'Aliganj Sector G', slug: 'aliganj-sector-g', type: 'colony', parent: 'aliganj', description: 'Residential sector in Aliganj', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Aliganj'], popular: false },
  { id: 'aliganj-sector-j', name: 'Aliganj Sector J', slug: 'aliganj-sector-j', type: 'colony', parent: 'aliganj', description: 'Residential sector in Aliganj', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Aliganj'], popular: false },

  // Other Colonies
  { id: 'kapoorthala-colony', name: 'Kapoorthala Colony', slug: 'kapoorthala-colony', type: 'colony', description: 'Premium residential colony', propertyTypes: ['2BHK', '3BHK', 'Villa'], nearbyLandmarks: ['Aliganj'], popular: true },
  { id: 'tedhi-puliya-colony', name: 'Tedhi Puliya Colony', slug: 'tedhi-puliya-colony', type: 'colony', description: 'Residential colony near Tedhi Puliya', propertyTypes: ['2BHK', '3BHK', 'PG'], nearbyLandmarks: ['Tedhi Puliya'], popular: false },
  { id: 'polytechnic-colony', name: 'Polytechnic Colony', slug: 'polytechnic-colony', type: 'colony', description: 'Colony near Polytechnic', propertyTypes: ['2BHK', '3BHK', 'PG'], nearbyLandmarks: ['Polytechnic Chauraha'], popular: false },
  { id: 'faizabad-road-colony', name: 'Faizabad Road Colony', slug: 'faizabad-road-colony', type: 'colony', description: 'Colony on Faizabad Road', propertyTypes: ['2BHK', '3BHK', 'Shop'], nearbyLandmarks: ['Faizabad Road'], popular: false },
  { id: 'munshipulia-colony', name: 'Munshipulia Colony', slug: 'munshipulia-colony', type: 'colony', description: 'Colony near Munshi Pulia', propertyTypes: ['2BHK', '3BHK', 'PG'], nearbyLandmarks: ['Munshi Pulia'], popular: false },
  { id: 'vasant-kunj-lucknow', name: 'Vasant Kunj, Lucknow', slug: 'vasant-kunj-lucknow', type: 'colony', description: 'Residential colony', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Gomti Nagar'], popular: false },
  { id: 'butler-colony', name: 'Butler Colony', slug: 'butler-colony', type: 'colony', description: 'Heritage residential colony', propertyTypes: ['Villa', '3BHK', '4BHK'], nearbyLandmarks: ['Civil Lines'], popular: true },
  { id: 'paper-mill-colony', name: 'Paper Mill Colony', slug: 'paper-mill-colony', type: 'colony', description: 'Residential colony', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Nishatganj'], popular: false },
  { id: 'nirala-nagar', name: 'Nirala Nagar', slug: 'nirala-nagar', type: 'colony', description: 'Residential area', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Mahanagar'], popular: false },
  { id: 'daliganj-colony', name: 'Daliganj Colony', slug: 'daliganj-colony', type: 'colony', description: 'Traditional residential colony', propertyTypes: ['1BHK', '2BHK', 'Shop'], nearbyLandmarks: ['Daliganj'], popular: false },
  { id: 'keshav-nagar', name: 'Keshav Nagar', slug: 'keshav-nagar', type: 'colony', description: 'Residential colony', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Aliganj'], popular: false },
  { id: 'chandralok-colony', name: 'Chandralok Colony', slug: 'chandralok-colony', type: 'colony', description: 'Residential colony', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Aliganj'], popular: false },
  { id: 'chandganj-garden', name: 'Chandganj Garden', slug: 'chandganj-garden', type: 'colony', description: 'Garden colony in Chandganj', propertyTypes: ['2BHK', '3BHK', 'Villa'], nearbyLandmarks: ['Chandganj'], popular: false },
  { id: 'sunder-bagh-colony', name: 'Sunder Bagh Colony', slug: 'sunder-bagh-colony', type: 'colony', description: 'Residential colony', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Hazratganj'], popular: false },

  // Rajajipuram Blocks
  { id: 'rajajipuram-c-block', name: 'Rajajipuram C Block', slug: 'rajajipuram-c-block', type: 'colony', parent: 'rajajipuram', description: 'C Block in Rajajipuram', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Rajajipuram'], popular: false },
  { id: 'rajajipuram-d-block', name: 'Rajajipuram D Block', slug: 'rajajipuram-d-block', type: 'colony', parent: 'rajajipuram', description: 'D Block in Rajajipuram', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Rajajipuram'], popular: false },
  { id: 'rajajipuram-a-block', name: 'Rajajipuram A Block', slug: 'rajajipuram-a-block', type: 'colony', parent: 'rajajipuram', description: 'A Block in Rajajipuram', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Rajajipuram'], popular: false },
  { id: 'rajajipuram-b-block', name: 'Rajajipuram B Block', slug: 'rajajipuram-b-block', type: 'colony', parent: 'rajajipuram', description: 'B Block in Rajajipuram', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Rajajipuram'], popular: false },

  // Ashiyana Sectors
  { id: 'ashiyana-sector-a', name: 'Ashiyana Sector A', slug: 'ashiyana-sector-a', type: 'colony', parent: 'ashiyana', description: 'Sector A in Ashiyana', propertyTypes: ['2BHK', '3BHK', 'Villa'], nearbyLandmarks: ['Ashiyana'], popular: false },
  { id: 'ashiyana-sector-b', name: 'Ashiyana Sector B', slug: 'ashiyana-sector-b', type: 'colony', parent: 'ashiyana', description: 'Sector B in Ashiyana', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Ashiyana'], popular: false },
  { id: 'ashiyana-sector-c', name: 'Ashiyana Sector C', slug: 'ashiyana-sector-c', type: 'colony', parent: 'ashiyana', description: 'Sector C in Ashiyana', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Ashiyana'], popular: false },
  { id: 'ashiyana-sector-d', name: 'Ashiyana Sector D', slug: 'ashiyana-sector-d', type: 'colony', parent: 'ashiyana', description: 'Sector D in Ashiyana', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Ashiyana'], popular: false },
  { id: 'ashiyana-colony-extension', name: 'Ashiyana Colony Extension', slug: 'ashiyana-colony-extension', type: 'colony', parent: 'ashiyana', description: 'Extension of Ashiyana Colony', propertyTypes: ['2BHK', '3BHK', 'Plot'], nearbyLandmarks: ['Ashiyana'], popular: false },
  { id: 'ashiyana-kishan-nagar', name: 'Ashiyana Kishan Nagar', slug: 'ashiyana-kishan-nagar', type: 'colony', parent: 'ashiyana', description: 'Kishan Nagar in Ashiyana', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Ashiyana'], popular: false },

  // Telibagh & Omaxe
  { id: 'telibagh-colony', name: 'Telibagh Colony', slug: 'telibagh-colony', type: 'colony', parent: 'telibagh', description: 'Residential colony in Telibagh', propertyTypes: ['2BHK', '3BHK', 'Plot'], nearbyLandmarks: ['Telibagh'], popular: false },
  { id: 'omaxe-residency-colony', name: 'Omaxe Residency Colony', slug: 'omaxe-residency-colony', type: 'colony', description: 'Omaxe residential township', propertyTypes: ['2BHK', '3BHK', 'Villa'], nearbyLandmarks: ['Raebareli Road'], popular: true },
  { id: 'omaxe-metro-city', name: 'Omaxe Metro City', slug: 'omaxe-metro-city', type: 'colony', description: 'Omaxe Metro City township', propertyTypes: ['2BHK', '3BHK', 'Villa'], nearbyLandmarks: ['Raebareli Road'], popular: true },
  { id: 'omaxe-city-raebareli-road', name: 'Omaxe City, Raebareli Road', slug: 'omaxe-city-raebareli-road', type: 'colony', description: 'Omaxe City on Raebareli Road', propertyTypes: ['2BHK', '3BHK', 'Villa', 'Plot'], nearbyLandmarks: ['Raebareli Road'], popular: true },

  // Sushant Golf City
  { id: 'sushant-golf-city-phase-1', name: 'Sushant Golf City Phase 1', slug: 'sushant-golf-city-phase-1', type: 'colony', parent: 'sushant-golf-city', description: 'Phase 1 of Sushant Golf City', propertyTypes: ['3BHK', '4BHK', 'Villa'], nearbyLandmarks: ['Sushant Golf City'], popular: true },
  { id: 'sushant-golf-city-phase-2', name: 'Sushant Golf City Phase 2', slug: 'sushant-golf-city-phase-2', type: 'colony', parent: 'sushant-golf-city', description: 'Phase 2 of Sushant Golf City', propertyTypes: ['3BHK', '4BHK', 'Villa'], nearbyLandmarks: ['Sushant Golf City'], popular: true },
  { id: 'sushant-golf-city-sector-a', name: 'Sushant Golf City Sector A', slug: 'sushant-golf-city-sector-a', type: 'colony', parent: 'sushant-golf-city', description: 'Sector A in Sushant Golf City', propertyTypes: ['3BHK', '4BHK', 'Villa'], nearbyLandmarks: ['Sushant Golf City'], popular: false },
  { id: 'sushant-golf-city-sector-b', name: 'Sushant Golf City Sector B', slug: 'sushant-golf-city-sector-b', type: 'colony', parent: 'sushant-golf-city', description: 'Sector B in Sushant Golf City', propertyTypes: ['3BHK', '4BHK', 'Villa'], nearbyLandmarks: ['Sushant Golf City'], popular: false },

  // Ansal API & South City
  { id: 'arjunganj-defence-colony', name: 'Arjunganj Defence Colony', slug: 'arjunganj-defence-colony', type: 'colony', parent: 'arjunganj', description: 'Defence colony in Arjunganj', propertyTypes: ['2BHK', '3BHK', 'Villa'], nearbyLandmarks: ['Arjunganj'], popular: false },
  { id: 'ansal-api-sushant-city', name: 'Ansal API Sushant City', slug: 'ansal-api-sushant-city', type: 'colony', description: 'Ansal API Sushant City township', propertyTypes: ['2BHK', '3BHK', 'Villa'], nearbyLandmarks: ['Sushant Golf City'], popular: false },
  { id: 'ansal-api-krishna-city', name: 'Ansal API Krishna City', slug: 'ansal-api-krishna-city', type: 'colony', description: 'Ansal API Krishna City', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Ansal API'], popular: false },
  { id: 'south-city-block-a', name: 'South City Block A', slug: 'south-city-block-a', type: 'colony', parent: 'south-city', description: 'Block A in South City', propertyTypes: ['2BHK', '3BHK', 'Villa'], nearbyLandmarks: ['South City'], popular: false },
  { id: 'south-city-block-b', name: 'South City Block B', slug: 'south-city-block-b', type: 'colony', parent: 'south-city', description: 'Block B in South City', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['South City'], popular: false },
  { id: 'south-city-block-c', name: 'South City Block C', slug: 'south-city-block-c', type: 'colony', parent: 'south-city', description: 'Block C in South City', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['South City'], popular: false },
  { id: 'south-city-block-d', name: 'South City Block D', slug: 'south-city-block-d', type: 'colony', parent: 'south-city', description: 'Block D in South City', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['South City'], popular: false },

  // More Colonies
  { id: 'krishna-nagar-colony', name: 'Krishna Nagar Colony', slug: 'krishna-nagar-colony', type: 'colony', description: 'Krishna Nagar residential colony', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Kanpur Road'], popular: false },
  { id: 'lal-kuan-colony', name: 'Lal Kuan Colony', slug: 'lal-kuan-colony', type: 'colony', description: 'Lal Kuan residential colony', propertyTypes: ['1BHK', '2BHK', 'Shop'], nearbyLandmarks: ['Chowk'], popular: false },
  { id: 'yahiyaganj-colony', name: 'Yahiyaganj', slug: 'yahiyaganj-colony', type: 'colony', description: 'Commercial and residential area', propertyTypes: ['Shop', 'Office', '2BHK'], nearbyLandmarks: ['Hazratganj'], popular: false },
  { id: 'aminabad-estate', name: 'Aminabad Estate', slug: 'aminabad-estate', type: 'colony', description: 'Historic commercial area', propertyTypes: ['Shop', 'Commercial'], nearbyLandmarks: ['Aminabad'], popular: false },
  { id: 'husainganj-colony', name: 'Husainganj Colony', slug: 'husainganj-colony', type: 'colony', description: 'Central residential colony', propertyTypes: ['2BHK', '3BHK', 'Shop'], nearbyLandmarks: ['Hazratganj'], popular: false },
  { id: 'saheed-path-colony', name: 'Saheed Path Colony', slug: 'saheed-path-colony', type: 'colony', description: 'Colony on Shaheed Path', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Shaheed Path'], popular: false },
  { id: 'telibagh-extension', name: 'Telibagh Extension', slug: 'telibagh-extension', type: 'colony', parent: 'telibagh', description: 'Extension of Telibagh', propertyTypes: ['2BHK', '3BHK', 'Plot'], nearbyLandmarks: ['Telibagh'], popular: false },
  { id: 'bijnor-road-colony', name: 'Bijnor Road Colony', slug: 'bijnor-road-colony', type: 'colony', description: 'Colony on Bijnor Road', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Bijnor Road'], popular: false },
  { id: 'mohanlalganj-town-colony', name: 'Mohanlalganj Town Colony', slug: 'mohanlalganj-town-colony', type: 'colony', description: 'Colony in Mohanlalganj', propertyTypes: ['2BHK', 'Plot'], nearbyLandmarks: ['Mohanlalganj'], popular: false },
  { id: 'dubagga-housing-colony', name: 'Dubagga Housing Colony', slug: 'dubagga-housing-colony', type: 'colony', description: 'Housing colony in Dubagga', propertyTypes: ['2BHK', '3BHK', 'Plot'], nearbyLandmarks: ['Dubagga'], popular: false },
  { id: 'sitapur-road-yojna', name: 'Sitapur Road Yojna', slug: 'sitapur-road-yojna', type: 'colony', description: 'Planned colony on Sitapur Road', propertyTypes: ['2BHK', '3BHK', 'Plot'], nearbyLandmarks: ['Sitapur Road'], popular: false },
  { id: 'iim-road-colony', name: 'IIM Road Colony', slug: 'iim-road-colony', type: 'colony', description: 'Colony near IIM Road', propertyTypes: ['2BHK', '3BHK', 'PG'], nearbyLandmarks: ['IIM Lucknow'], popular: false },
  { id: 'khurram-nagar-extension', name: 'Khurram Nagar Extension', slug: 'khurram-nagar-extension', type: 'colony', description: 'Extension of Khurram Nagar', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Khurram Nagar'], popular: false },

  // Vikas Nagar Sectors
  { id: 'vikas-nagar-sector-1', name: 'Vikas Nagar Sector 1', slug: 'vikas-nagar-sector-1', type: 'colony', parent: 'vikas-nagar', description: 'Sector 1 in Vikas Nagar', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Vikas Nagar'], popular: false },
  { id: 'vikas-nagar-sector-2', name: 'Vikas Nagar Sector 2', slug: 'vikas-nagar-sector-2', type: 'colony', parent: 'vikas-nagar', description: 'Sector 2 in Vikas Nagar', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Vikas Nagar'], popular: false },
  { id: 'vikas-nagar-sector-3', name: 'Vikas Nagar Sector 3', slug: 'vikas-nagar-sector-3', type: 'colony', parent: 'vikas-nagar', description: 'Sector 3 in Vikas Nagar', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Vikas Nagar'], popular: false },
  { id: 'vikas-nagar-sector-4', name: 'Vikas Nagar Sector 4', slug: 'vikas-nagar-sector-4', type: 'colony', parent: 'vikas-nagar', description: 'Sector 4 in Vikas Nagar', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Vikas Nagar'], popular: false },
  { id: 'vikas-nagar-sector-5', name: 'Vikas Nagar Sector 5', slug: 'vikas-nagar-sector-5', type: 'colony', parent: 'vikas-nagar', description: 'Sector 5 in Vikas Nagar', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Vikas Nagar'], popular: false },

  // More Colonies
  { id: 'madiyaon-housing-colony', name: 'Madiyaon Housing Colony', slug: 'madiyaon-housing-colony', type: 'colony', description: 'Housing colony in Madiyaon', propertyTypes: ['2BHK', 'Plot'], nearbyLandmarks: ['Madiyaon'], popular: false },
  { id: 'jiamau-colony', name: 'Jiamau Colony', slug: 'jiamau-colony', type: 'colony', description: 'Residential colony', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Gomti Nagar Extension'], popular: false },
  { id: 'kaiserbagh-colony', name: 'Kaiserbagh Colony', slug: 'kaiserbagh-colony', type: 'colony', description: 'Heritage area colony', propertyTypes: ['2BHK', '3BHK', 'Shop'], nearbyLandmarks: ['Kaiserbagh'], popular: false },
  { id: 'rahimnagar-colony', name: 'Rahimnagar Colony', slug: 'rahimnagar-colony', type: 'colony', description: 'Residential colony', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Aliganj'], popular: false },
  { id: 'alambagh-shringar-nagar', name: 'Alambagh Shringar Nagar', slug: 'alambagh-shringar-nagar', type: 'colony', parent: 'alambagh', description: 'Shringar Nagar in Alambagh', propertyTypes: ['2BHK', '3BHK', 'Shop'], nearbyLandmarks: ['Alambagh'], popular: false },
  { id: 'charbagh-colony', name: 'Charbagh Colony', slug: 'charbagh-colony', type: 'colony', parent: 'charbagh', description: 'Colony near Charbagh', propertyTypes: ['1BHK', '2BHK', 'PG', 'Shop'], nearbyLandmarks: ['Charbagh'], popular: false },
  { id: 'hazratganj-extension', name: 'Hazratganj Extension', slug: 'hazratganj-extension', type: 'colony', parent: 'hazratganj', description: 'Extension of Hazratganj', propertyTypes: ['2BHK', '3BHK', 'Shop'], nearbyLandmarks: ['Hazratganj'], popular: false },
  { id: 'nishatganj-colony', name: 'Nishatganj Colony', slug: 'nishatganj-colony', type: 'colony', description: 'Residential colony in Nishatganj', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Nishatganj'], popular: false },
  { id: 'nadan-mahal-colony', name: 'Nadan Mahal Colony', slug: 'nadan-mahal-colony', type: 'colony', description: 'Colony near Nadan Mahal', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Nadan Mahal'], popular: false },
  { id: 'wazirganj-colony', name: 'Wazirganj Colony', slug: 'wazirganj-colony', type: 'colony', description: 'Residential colony in Wazirganj', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Hazratganj'], popular: false },
  { id: 'chowk-sarai', name: 'Chowk Sarai', slug: 'chowk-sarai', type: 'colony', parent: 'chowk', description: 'Traditional area in Chowk', propertyTypes: ['Shop', '1BHK', '2BHK'], nearbyLandmarks: ['Chowk'], popular: false },
  { id: 'thakurganj-colony', name: 'Thakurganj Colony', slug: 'thakurganj-colony', type: 'colony', description: 'Residential colony in Thakurganj', propertyTypes: ['1BHK', '2BHK'], nearbyLandmarks: ['Thakurganj'], popular: false },
  { id: 'kashmiri-mohalla', name: 'Kashmiri Mohalla', slug: 'kashmiri-mohalla', type: 'colony', description: 'Traditional mohalla', propertyTypes: ['1BHK', '2BHK', 'Shop'], nearbyLandmarks: ['Chowk'], popular: false },
  { id: 'golaganj-colony', name: 'Golaganj', slug: 'golaganj-colony', type: 'colony', description: 'Commercial and residential area', propertyTypes: ['Shop', '2BHK'], nearbyLandmarks: ['Hazratganj'], popular: false },
  { id: 'sarojini-nagar-colony', name: 'Sarojini Nagar Colony', slug: 'sarojini-nagar-colony', type: 'colony', description: 'Residential colony', propertyTypes: ['2BHK', '3BHK'], nearbyLandmarks: ['Kanpur Road'], popular: false },
  { id: 'banthra-colony', name: 'Banthra Colony', slug: 'banthra-colony', type: 'colony', description: 'Suburban colony', propertyTypes: ['2BHK', 'Plot'], nearbyLandmarks: ['Banthra'], popular: false },
  { id: 'telibagh-balaji-vihar', name: 'Telibagh Balaji Vihar', slug: 'telibagh-balaji-vihar', type: 'colony', parent: 'telibagh', description: 'Balaji Vihar in Telibagh', propertyTypes: ['2BHK', '3BHK', 'Villa'], nearbyLandmarks: ['Telibagh'], popular: false },
]
