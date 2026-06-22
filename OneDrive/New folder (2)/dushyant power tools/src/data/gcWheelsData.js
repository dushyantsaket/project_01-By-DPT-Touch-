import { tataAgricoData } from './tataAgricoData';

// GC Wheels & WA Grinding Wheels – Abrasives Section
export const gcWheelsData = [
  ...tataAgricoData.filter(i => i.category === 'abrasives'),
  {
    id: 16528,
    name: "Akari 4 Inch Black Gc Wheel 100Mm",
    brand: "Akari",
    category: "abrasives",
    sub_category: "GC & WA Wheels",
    image: "https://unboxtools.com/wp-content/uploads/2024/04/03-Akari-Gc-Wheel-4-Inch-2-5-Mm-Black-300x300.jpg",
    hover_image: null,
    url: "https://unboxtools.com/product/akari-4-inch-black-gc-wheel-100mm/",
    regular_price: 23.00,
    sale_price: 17.71,
    wheel_type: "GC",
    color: "Black",
    size: "4 Inch / 100mm"
  },
  {
    "productId": "APLI20303",
    "name": "Impact wrench",
    "url": "/in/product/impact-wrench/APLI20303",
    "image": "https://example.com/images/wrench.jpg",
    "tags": ["NEW"],
    "description": {
      "voltage": "20V",
      "noLoadSpeed": "0-2400rpm",
      "spec": "Max torque: 300Nm"
    },
    "prices": {}
  }, {
    "id": 24,
    "sku": "XPC-TCT-W5",
    "name": "TCT Saw Blade",
    "specifications": "5\" | For Wood",
    "category": "TCT Saw Blades",
    "sub_category": "Wood Cutting Blades",
    "description": "High-quality 5-inch TCT blade ideal for circular saws. Delivers smooth cuts in hardwoods and softwoods. Heat-resistant carbide tips ensure long-lasting sharpness and consistent performance.",
    "price_inr": 420,
    "blade_size": "5\" (125mm)",
    "teeth_count": "30T",
    "application": "Hardwood, Softwood, Plywood",
    "image_url": "https://cdn.pixabay.com/photo/2017/08/09/15/46/saw-2615203_640.jpg"
  },
  {
    "id": 25,
    "sku": "XPC-TCT-W7",
    "name": "TCT Saw Blade",
    "specifications": "7\" | For Wood",
    "category": "TCT Saw Blades",
    "sub_category": "Wood Cutting Blades",
    "description": "7-inch professional TCT blade for precision woodworking. Ideal for table saws, miter saws, and circular saws. Laser-cut body for reduced vibration and ultra-smooth cuts.",
    "price_inr": 590,
    "blade_size": "7\" (180mm)",
    "teeth_count": "40T",
    "application": "Hardwood, Softwood, Trim Work",
    "image_url": "https://cdn.pixabay.com/photo/2017/08/09/15/46/saw-2615203_640.jpg"
  },
  {
    "id": 26,
    "sku": "XPC-TCT-W10",
    "name": "TCT Saw Blade",
    "specifications": "10\" | For Wood",
    "category": "TCT Saw Blades",
    "sub_category": "Wood Cutting Blades",
    "description": "10-inch industrial TCT blade for high-production wood cutting. Features high-grade carbide tips and expansion slots for heat dissipation. Perfect for table saws and radial arm saws.",
    "price_inr": 890,
    "blade_size": "10\" (250mm)",
    "teeth_count": "60T",
    "application": "Hardwood, Softwood, Cabinet Making",
    "image_url": "https://cdn.pixabay.com/photo/2017/08/09/15/46/saw-2615203_640.jpg"
  },
  {
    "id": 27,
    "sku": "XPC-TCT-W12",
    "name": "TCT Saw Blade",
    "specifications": "12\" | For Wood",
    "category": "TCT Saw Blades",
    "sub_category": "Wood Cutting Blades",
    "description": "12-inch heavy-duty TCT blade for industrial woodworking. Ideal for beam cutting, timber framing, and large-scale woodworking projects. Premium carbide tips for extended blade life.",
    "price_inr": 1290,
    "blade_size": "12\" (300mm)",
    "teeth_count": "80T",
    "application": "Beam Cutting, Timber Framing",
    "image_url": "https://cdn.pixabay.com/photo/2017/08/09/15/46/saw-2615203_640.jpg"
  },
  {
    "id": 28,
    "sku": "XPC-TCT-W14",
    "name": "TCT Saw Blade",
    "specifications": "14\" | For Wood",
    "category": "TCT Saw Blades",
    "sub_category": "Wood Cutting Blades",
    "description": "14-inch professional TCT blade for heavy-duty wood cutting applications. Designed for industrial table saws and panel saws. Provides exceptional cut quality and long service life.",
    "price_inr": 1690,
    "blade_size": "14\" (350mm)",
    "teeth_count": "100T",
    "application": "Industrial Wood Cutting, Panels",
    "image_url": "https://cdn.pixabay.com/photo/2017/08/09/15/46/saw-2615203_640.jpg"
  },
  {
    "id": 22922,
    "sku": "ABC-BLD-10-40T",
    "name": "Alphabet Brush Cutter Blade",
    "specifications": "10\" | 40 Teeth",
    "category": "Brush Cutter Blades",
    "sub_category": "Metal Slashing Blades",
    "description": "10 inch steel brush cutter blade with 40 cutting teeth for clearing thick bushes and weeds.",
    "price_inr": "Login to See Price",
    "blade_size": "10\" (255mm)",
    "teeth_count": "40T",
    "application": "Brush Cultivation, Weeds, Harvesting",
    "image_url": "https://unboxtools.com/wp-content/uploads/2024/07/Alphabet-Brush-Cutter-Blade-10%E2%80%B3-X40-Teeth-300x300.jpg"
  },
  {
    "id": 22924,
    "sku": "ABC-BLD-10-80T",
    "name": "Alphabet Brush Cutter Blade",
    "specifications": "10\" | 80 Teeth",
    "category": "Brush Cutter Blades",
    "sub_category": "Metal Slashing Blades",
    "description": "10 inch steel brush cutter blade with 80 fine cutting teeth for smoother harvesting.",
    "price_inr": "Login to See Price",
    "blade_size": "10\" (255mm)",
    "teeth_count": "80T",
    "application": "Heavy Weeds, Shrubbery, Grass",
    "image_url": "https://unboxtools.com/wp-content/uploads/2024/07/Alphabet-Brush-Cutter-Blade-10%E2%80%B3-X80-Teeth-300x300.jpg"
  },
  {
    "id": 22927,
    "sku": "ABC-BLD-2T",
    "name": "Alphabet Brush Cutter Blade 2T",
    "specifications": "2 Teeth Design",
    "category": "Brush Cutter Blades",
    "sub_category": "Slashing Blades",
    "description": "2 Teeth style brush cutter metal slashing blade for heavy duty field clearing.",
    "price_inr": "Login to See Price",
    "blade_size": "Standard",
    "teeth_count": "2T",
    "application": "Thick Grass, Saplings",
    "image_url": "https://unboxtools.com/wp-content/uploads/2024/07/Alphabet-Brush-Cutter-Blade-2T-300x300.jpg"
  },
  {
    "productId": "APLI20404",
    "name": "Angle grinder",
    "url": "/in/product/angle-grinder/APLI20404",
    "image": "https://example.com/images/grinder.jpg",
    "tags": ["SALE"],
    "description": {
      "voltage": "20V",
      "noLoadSpeed": "8500rpm",
      "spec": "Disc diameter: 100mm"
    },
    "prices": {}
  },
  {
    "productId": "APLI20505",
    "name": "Cordless chainsaw",
    "url": "/in/product/cordless-chainsaw/APLI20505",
    "image": "https://example.com/images/chainsaw.jpg",
    "tags": ["NEW"],
    "description": {
      "voltage": "40V",
      "noLoadSpeed": "4500rpm",
      "spec": "Bar length: 16 inch"
    },
    "prices": {}
  },
  {
    "productId": "APLI20606",
    "name": "Electric blower",
    "url": "/in/product/electric-blower/APLI20606",
    "image": "https://example.com/images/blower.jpg",
    "tags": ["HOT"],
    "description": {
      "voltage": "20V",
      "noLoadSpeed": "16000rpm",
      "spec": "Air volume: 2.8m3/min"
    },
    "prices": {}
  },
  {
    "productId": "APLI20707",
    "name": "Cordless screwdriver",
    "url": "/in/product/cordless-screwdriver/APLI20707",
    "image": "https://example.com/images/screwdriver.jpg",
    "tags": ["NEW"],
    "description": {
      "voltage": "12V",
      "noLoadSpeed": "0-500rpm",
      "spec": "Torque settings: 18+1"
    },
    "prices": {}
  },
  {
    "productId": "APLI20808",
    "name": "Rotary hammer",
    "url": "/in/product/rotary-hammer/APLI20808",
    "image": "https://example.com/images/hammer.jpg",
    "tags": ["SALE"],
    "description": {
      "voltage": "20V",
      "noLoadSpeed": "0-1200rpm",
      "spec": "Impact energy: 2.5J"
    },
    "prices": {}
  },
  {
    "productId": "APLI20909",
    "name": "Cordless jigsaw",
    "url": "/in/product/cordless-jigsaw/APLI20909",
    "image": "https://example.com/images/jigsaw.jpg",
    "tags": ["NEW"],
    "description": {
      "voltage": "20V",
      "noLoadSpeed": "2400rpm",
      "spec": "Cutting depth: 80mm"
    },
    "prices": {}
  },
  {
    "productId": "APLI21010",
    "name": "Heat gun",
    "url": "/in/product/heat-gun/APLI21010",
    "image": "https://example.com/images/heatgun.jpg",
    "tags": ["HOT"],
    "description": {
      "voltage": "220V",
      "noLoadSpeed": "N/A",
      "spec": "Temperature range: 50-600°C"
    },
    "prices": {}
  },
  {
    "productId": "APLI21111",
    "name": "Cordless vacuum cleaner",
    "url": "/in/product/cordless-vacuum/APLI21111",
    "image": "https://example.com/images/vacuum.jpg",
    "tags": ["NEW"],
    "description": {
      "voltage": "20V",
      "noLoadSpeed": "18000rpm",
      "spec": "Dust capacity: 0.8L"
    },
    "prices": {}
  },
    {
      "productId": "APLI20151",
      "name": "Cordless polisher",
      "url": "/in/product/cordless-polisher/APLI20151",
      "image": "https://res-sg.togroup.com/stc/home_product/ingco/userfiles/1/images/photo/20251217190023137/APLI20151.jpg",
      "tags": ["NEW"],
      "description": {
        "voltage": "20V",
        "noLoadSpeed": "2000-4500rpm",
        "spec": "Polishing pad diameter: 150mm"
      },
      "prices": {}
    },
    {
      "productId": "CRHLI201881",
      "name": "Cordless rotary hammer",
      "url": "/in/product/cordless-rotary-hammer/CRHLI201881",
      "image": "https://res-sg.togroup.com/stc/home_product/ingco/userfiles/1/images/photo/20241213210022778/CRHLI201881.jpg",
      "tags": ["NEW"],
      "description": {
        "voltage": "20V",
        "noLoadSpeed": "0-850rpm",
        "impactRate": "0-5100bpm"
      },
      "prices": {}
    },
    {
      "productId": "CRHLI20208",
      "name": "Cordless rotary hammer",
      "url": "/in/product/cordless-rotary-hammer/CRHLI20208",
      "image": "https://res-sg.togroup.com/stc/home_product/ingco/userfiles/1/images/photo/20241011200122872/CRHLI20208.jpg",
      "tags": ["NEW"],
      "description": {
        "voltage": "20V",
        "noLoadSpeed": "0-1100rpm",
        "impactRate": "0-5400bpm"
      },
      "prices": {}
    },
    {
      "productId": "CRHLI202081",
      "name": "Cordless rotary hammer",
      "url": "/in/product/cordless-rotary-hammer/CRHLI202081",
      "image": "https://res-sg.togroup.com/stc/home_product/ingco/userfiles/1/images/photo/20250721120023796/CRHLI202081.jpg",
      "tags": ["HOT", "NEW"],
      "description": {
        "voltage": "20V",
        "noLoadSpeed": "0-1100rpm",
        "impactRate": "0-5400bpm"
      },
      "prices": {}
    },
    {
      "productId": "CRHLI202287",
      "name": "Cordless rotary hammer",
      "url": "/in/product/cordless-rotary-hammer/CRHLI202287",
      "image": "https://res-sg.togroup.com/stc/home_product/ingco/userfiles/1/images/photo/20260120120023243/CRHLI202287.jpg",
      "tags": ["HOT", "NEW"],
      "description": {
        "feature": "Brushless motor",
        "voltage": "20V",
        "noLoadSpeed": "0-1100rpm"
      },
      "prices": {}
    },
  {
    id: 16456,
    name: "Akari 4 Inch Green Wa Wheel 100Mm",
    brand: "Akari",
    category: "abrasives",
    sub_category: "GC & WA Wheels",
    image: "https://unboxtools.com/wp-content/uploads/2024/06/01-Akari-04-Inch-36-Grit-Wa-Wheel-100-Mm-300x300.png",
    hover_image: null,
    url: "https://unboxtools.com/product/akari-04-inch-green-wa-wheel-100mm/",
    regular_price: 23.00,
    sale_price: 17.71,
    wheel_type: "WA",
    color: "Green",
    size: "4 Inch / 100mm"
  },
  {
    id: 17717,
    name: "Alpha 4 Inch Black Gc Wheel 100Mm",
    brand: "Alpha",
    category: "abrasives",
    sub_category: "GC & WA Wheels",
    image: "https://unboxtools.com/wp-content/uploads/2024/06/01-Alpha-4-Inch-46-Grit-Gc-Wheel-100-Mm-1-300x300.png",
    hover_image: "https://unboxtools.com/wp-content/uploads/2024/06/WhatsApp_Image_2024_06_29_at_16_36_51_734cc242-300x300.png",
    url: "https://unboxtools.com/product/alpha-4-inch-black-gc-wheel-100mm/",
    regular_price: 23.21,
    sale_price: 17.87,
    wheel_type: "GC",
    color: "Black",
    size: "4 Inch / 100mm"
  },
  {
    id: 17725,
    name: "Alpha 4 Inch Green Wa Wheel 100Mm Champ",
    brand: "Alpha",
    category: "abrasives",
    sub_category: "GC & WA Wheels",
    image: "https://unboxtools.com/wp-content/uploads/2024/06/01-Alpha-4-Inch-46-Grit-Gc-Wheel-100-Mm-1-300x300.png",
    hover_image: "https://unboxtools.com/wp-content/uploads/2024/06/wa-wheel-300x300.png",
    url: "https://unboxtools.com/product/alpha-4-inch-green-gc-wheel-100mm/",
    regular_price: 23.21,
    sale_price: 17.87,
    wheel_type: "WA",
    color: "Green",
    size: "4 Inch / 100mm"
  },
  {
    id: 27106,
    name: "Camron Pro 4 Inch Black Gc Wheel 100Mm",
    brand: "Camron Pro",
    category: "abrasives",
    sub_category: "GC & WA Wheels",
    image: "https://unboxtools.com/wp-content/uploads/2024/08/Camron-Pro-GC-Wheel-1-300x300.jpg",
    hover_image: null,
    url: "https://unboxtools.com/product/camron-pro-4-inch-black-gc-wheel-100mm/",
    regular_price: 25.74,
    sale_price: 19.82,
    wheel_type: "GC",
    color: "Black",
    size: "4 Inch / 100mm"
  },
  {
    id: 19255,
    name: "Divs Gold 4 Inch Black Gc Wheel 100Mm",
    brand: "Divs Gold",
    category: "abrasives",
    sub_category: "GC & WA Wheels",
    image: "https://unboxtools.com/wp-content/uploads/2024/07/Divs-Gold-4-Inch-Green-Gc-Wheel-100-Mm-300x300.png",
    hover_image: null,
    url: "https://unboxtools.com/product/divs-gold-4-inch-green-gc-wheel-100mm/",
    regular_price: 22.16,
    sale_price: 17.06,
    wheel_type: "GC",
    color: "Green",
    size: "4 Inch / 100mm"
  },
  {
    id: 30059,
    name: "Ideal 4 Inch Black Gc Wheel 100Mm",
    brand: "Ideal",
    category: "abrasives",
    sub_category: "GC & WA Wheels",
    image: "https://unboxtools.com/wp-content/uploads/2024/10/01-Ideal-4-Inch-220-Grit-Gc-Wheel-100-Mm-1-300x300.png",
    hover_image: "https://unboxtools.com/wp-content/uploads/2024/10/01-Ideal-4-Inch-220-Grit-Gc-Wheel-100-Mm-2-300x300.png",
    url: "https://unboxtools.com/product/ideal-4-inch-yelow-gc-wheel-100mm/",
    regular_price: 24.70,
    sale_price: 19.02,
    wheel_type: "GC",
    color: "Yellow",
    size: "4 Inch / 100mm"
  },
  {
    id: 61902,
    name: "Xtra Power 4 Inch Black Gc Wheel 103Mm",
    brand: "Xtra Power",
    category: "abrasives",
    sub_category: "GC & WA Wheels",
    image: "https://unboxtools.com/wp-content/uploads/2025/10/01-Xtra-Power-4-Inch-46-Grit-Gc-Wheel-103Mm-300x300.jpg",
    hover_image: "https://unboxtools.com/wp-content/uploads/2025/10/01-Xtra-Power-4-Inch-46-Grit-Gc-Wheel-103Mm-1-300x300.jpg",
    url: "https://unboxtools.com/product/xtra-power-4-inch-black-gc-wheel-103mm/",
    regular_price: 26.54,
    sale_price: 20.44,
    wheel_type: "GC",
    color: "Black",
    size: "4 Inch / 103mm"
  },
  {
    id: 17251,
    name: "Xtra Power 4 Inch Black Gc Wheel 103Mm Gx",
    brand: "Xtra Power",
    category: "abrasives",
    sub_category: "GC & WA Wheels",
    image: "https://unboxtools.com/wp-content/uploads/2024/05/07-Xtra-Power-4-Inch-Gc-Wheel-103-Mm-46-Grit-16-Mm-Gx-300x300.png",
    hover_image: null,
    url: "https://unboxtools.com/product/xtra-power-4-inch-black-gc-wheel-103mm-gx/",
    regular_price: 39.15,
    sale_price: 30.15,
    wheel_type: "GC",
    color: "Black",
    size: "4 Inch / 103mm (GX)"
  },
  {
    id: 21973,
    name: "Xtra Power 4 Inch Green Wa Wheel 100Mm Premium",
    brand: "Xtra Power",
    category: "abrasives",
    sub_category: "GC & WA Wheels",
    image: "https://unboxtools.com/wp-content/uploads/2024/05/15-Xtra-Power-4-Inch-Wa-Wheel-103-Mm-36-Grit-Premium-300x300.png",
    hover_image: null,
    url: "https://unboxtools.com/product/xtra-power-4-inch-green-wa-wheel-100mm-premium/",
    regular_price: 40.65,
    sale_price: 31.30,
    wheel_type: "WA",
    color: "Green",
    size: "4 Inch / 103mm (Premium)"
  },
  {
    id: 21985,
    name: "Xtra Power 4 Inch Green Wa Wheel 100Mm Sx",
    brand: "Xtra Power",
    category: "abrasives",
    sub_category: "GC & WA Wheels",
    image: "https://unboxtools.com/wp-content/uploads/2024/07/Xtra-Power-4-Inch-Green-Wa-Wheel-100Mm-Sx-300x300.jpg",
    hover_image: "https://unboxtools.com/wp-content/uploads/2024/07/Xtra-Power-4-Inch-Green-Wa-Wheel-100Mm-Sx-1-300x300.jpg",
    url: "https://unboxtools.com/product/akari-4-inch-green-wa-wheel-100mm-sx/",
    regular_price: 27.62,
    sale_price: 21.27,
    wheel_type: "WA",
    color: "Green",
    size: "4 Inch / 100mm (SX)"
  },
  {
    "id": "XP-CW-4",
    "name": "Xtra Power 4 Inch Cut Off Wheel for Metal & SS",
    "brand": "Xtra Power",
    "category": "abrasives",
    "sub_category": "GC & WA Wheels",
    "image": "https://images.unsplash.com/photo-1572206114142-f3bd049b49f9?auto=format&fit=crop&q=80&w=400",
    "regular_price": 25,
    "sale_price": 18,
    "wheel_type": "Cut-off",
    "size": "105mm x 1mm"
  },
  {
    "id": "XP-GW-4",
    "name": "Xtra Power 4 Inch Grinding Wheel for Metal",
    "brand": "Xtra Power",
    "category": "abrasives",
    "sub_category": "GC & WA Wheels",
    "image": "https://images.unsplash.com/photo-1542382156909-92c2a47ff992?auto=format&fit=crop&q=80&w=400",
    "regular_price": 45,
    "sale_price": 32,
    "wheel_type": "Grinding",
    "size": "100mm x 6mm"
  }
];
