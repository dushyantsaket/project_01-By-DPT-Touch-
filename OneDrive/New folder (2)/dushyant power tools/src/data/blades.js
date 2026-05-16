import { newDiamondBlades } from './newDiamondBlades';
import { unboxDiamondBlades } from './unboxDiamondBlades';
import { tataAgricoData } from './tataAgricoData';

export const bladesData = [
  ...tataAgricoData.filter(i => i.category === 'diamond-blades'),
  ...newDiamondBlades,
  ...unboxDiamondBlades,
  {
    "id": 1001,
    "name": "BSC POWER 1900 | 1900W ELECTRIC CHAINSAW",
    "category": "garden-tools",
    "brand": "BSC Power",
    "image": "https://bscpowertools.com/wp-content/uploads/2024/02/BSC-1900-500x500.jpg",
    "description": "High-performance 1900W corded electric chainsaw for efficient wood cutting.",
    "power": "1900W",
    "price_inr": 8500
  },
  {
    "id": 1002,
    "name": "BSC POWER 2200 | 2200W ELECTRIC CHAINSAW",
    "category": "garden-tools",
    "brand": "BSC Power",
    "image": "https://bscpowertools.com/wp-content/uploads/2024/02/2200-1-500x500.jpg",
    "description": "Powerful 2200W electric chain saw for household and professional use.",
    "power": "2200W",
    "price_inr": 9200
  },
  {
    "id": 1003,
    "name": "BSC POWER 2500 | 2500W ELECTRIC CHAINSAW",
    "category": "garden-tools",
    "brand": "BSC Power",
    "image": "https://bscpowertools.com/wp-content/uploads/2024/02/2500-1-500x500.jpg",
    "description": "Heavy duty 2500W corded chain saw engineered for peak performance.",
    "power": "2500W",
    "price_inr": 10500
  },
  {
    "id": 1005,
    "name": "BSC Power 8400 Chain Saw High Power (84cc)",
    "category": "garden-tools",
    "brand": "BSC Power",
    "image": "https://bscpowertools.com/wp-content/uploads/2024/06/8400-500x500.jpg",
    "description": "High power 84cc 2-stroke petrol engine chainsaw for heavy logging.",
    "power": "84cc",
    "price_inr": 18500
  },
  {
    "id": 1006,
    "name": "BSC Power BSC-10500P Chain Saw (105.7cc)",
    "category": "garden-tools",
    "brand": "BSC Power",
    "image": "https://bscpowertools.com/wp-content/uploads/2024/02/BSC-10500P-CHAINSAW-A-500x500.jpg",
    "description": "Extra heavy duty chainsaw with 105.7cc engine for commercial timber tasks.",
    "power": "105.7cc",
    "price_inr": 24000
  },
  {
    "id": 1010,
    "name": "BSC Power Petrol Chainsaw BSC 6000 (60cc)",
    "category": "garden-tools",
    "brand": "BSC Power",
    "image": "https://bscpowertools.com/wp-content/uploads/2024/02/BSC-6000-500x500.jpg",
    "description": "Powerful 60cc petrol chainsaw with automatic chain oiler system.",
    "power": "60cc",
    "price_inr": 8800
  },
  {
    "id": 1013,
    "name": "BSC Power Petrol Chainsaw BSC 7200 (72cc)",
    "category": "garden-tools",
    "brand": "BSC Power",
    "image": "https://bscpowertools.com/wp-content/uploads/2024/02/BSC-7200-main-1-500x500.jpg",
    "description": "Professional 72cc petrol chainsaw for industrial-grade cutting.",
    "power": "72cc",
    "price_inr": 12500
  },
  {
    "id": 1014,
    "name": "BSC Power Petrol Chainsaw BSC 7300 (73cc)",
    "category": "garden-tools",
    "brand": "BSC Power",
    "image": "https://bscpowertools.com/wp-content/uploads/2024/02/61M8wRvz5zL._SL1500_-1-500x500.jpg",
    "description": "High-torque 73cc chainsaw with specialized guide bar for extreme conditions.",
    "power": "73cc",
    "price_inr": 13800
  },

  // --- KEIL ---
  {
    "id": 2001,
    "name": "KEIL KL5810 PRIME",
    "category": "garden-tools",
    "brand": "KEIL",
    "image": "https://keilchainsaw.com/wp-content/uploads/2022/03/58101-600x502.jpg",
    "description": "Robust and long-lasting 58cc chainsaw for all-round harvesting wood.",
    "power": "58cc / 2.6kw",
    "price_inr": 11500
  },
  {
    "id": 2002,
    "name": "KEIL KL5870 (PLATINUM SERIES)",
    "category": "garden-tools",
    "brand": "KEIL",
    "image": "https://keilchainsaw.com/wp-content/uploads/2020/04/IMG_6521-300x300.jpg",
    "description": "Premium platinum series gasoline chainsaw with superior cutting efficiency.",
    "power": "58cc",
    "price_inr": 13500
  },
  {
    "id": 2003,
    "name": "KEIL KL5880 PROFESSIONAL",
    "category": "garden-tools",
    "brand": "KEIL",
    "image": "https://keilchainsaw.com/wp-content/uploads/2023/12/u9JNPi9SIDcJ09e4J2K2pv-lFSVyXVNwm3x_M-kKqM0_plaintext_638320147776809256-300x218.jpg",
    "description": "Commercial-grade technical professional chainsaw for serious users.",
    "power": "58cc",
    "price_inr": 14200
  },
  {
    "id": 2004,
    "name": "KEIL KL726 ROTARY HAMMER 26MM",
    "category": "power-tools",
    "brand": "KEIL",
    "image": "https://keilchainsaw.com/wp-content/uploads/2024/06/Screenshot-2024-06-01-122642-300x247.png",
    "description": "Professional 26mm rotary hammer with ergonomic design for drilling masonry.",
    "power": "800W",
    "price_inr": 4800
  },
  {
    "id": 2005,
    "name": "KEIL KL715 MARBLE CUTTER 5\"",
    "category": "power-tools",
    "brand": "KEIL",
    "image": "https://keilchainsaw.com/wp-content/uploads/2024/05/Screenshot-2024-05-30-185952-300x256.png",
    "description": "Precision marble cutter with powerful motor for stone and tile cutting.",
    "power": "1400W",
    "price_inr": 3400
  },

  // --- DPT ---
  {
    "id": 3001,
    "name": "DPT Angle Grinder 4\" (XS Series)",
    "category": "power-tools",
    "brand": "DPT",
    "image": "https://dptindia.com/admin/Upload_Images/1624076343-8133024.jpg",
    "description": "Compact and efficient 4-inch angle grinder for industrial finishing.",
    "power": "850W",
    "price_inr": 2200
  },
  {
    "id": 3002,
    "name": "DPT ROTARY HAMMER 28MM",
    "category": "power-tools",
    "brand": "DPT",
    "image": "https://dptindia.com/admin/Upload_Images/1678355673-2563973.jpg",
    "description": "High-impact 28mm rotary hammer with variable speed control.",
    "power": "1050W",
    "price_inr": 5500
  },
  {
    "id": 3003,
    "name": "DPT MARBLE CUTTER [2 in 1]",
    "category": "power-tools",
    "brand": "DPT",
    "image": "https://dptindia.com/admin/Upload_Images/1732607259-839580.jpg",
    "description": "Advanced 2-in-1 marble cutter for both wet and dry applications.",
    "power": "1250W",
    "price_inr": 3100
  },
  {
    "id": 3004,
    "name": "DPT DEMOLITION BREAKER 22KG",
    "category": "power-tools",
    "brand": "DPT",
    "image": "https://dptindia.com/admin/Upload_Images/1623929469-9825076.jpg",
    "description": "Heavy-duty 22kg demolition breaker with hex shank for structural tasks.",
    "power": "1800W",
    "price_inr": 21500
  },
  {
    "id": 3005,
    "name": "DPT MITER SAW 12\"",
    "category": "power-tools",
    "brand": "DPT",
    "image": "https://dptindia.com/admin/Upload_Images/1704706430-9421587.jpg",
    "description": "Precision 12-inch miter saw for accurate cross-cuts and bevel angles.",
    "power": "2000W",
    "price_inr": 14500
  },
  {
    "id": 3006,
    "name": "DPT VACUUM CLEANER T60",
    "category": "power-tools",
    "brand": "DPT",
    "image": "https://dptindia.com/admin/Upload_Images/1695642384-359617.jpg",
    "description": "Large capacity industrial vacuum cleaner for workshop maintenance.",
    "power": "1600W",
    "price_inr": 12800
  },

  // --- SUN ---
  {
    "id": 1,
    "name": "SUN 5800 Chain Saw (58cc)",
    "category": "garden-tools",
    "brand": "SUN",
    "image": "https://bscpowertools.com/wp-content/uploads/2024/02/SUN-5800-500x500.jpg",
    "description": "SUN 5800 Chain Saw with 58 CC, 2 Stroke Petrol Engine Power.",
    "power": "58cc",
    "price_inr": 7200
  },
  {
    "id": 2,
    "name": "SUN 6200 Chain Saw (62cc)",
    "category": "garden-tools",
    "brand": "SUN",
    "image": "https://bscpowertools.com/wp-content/uploads/2024/02/SUN-6200-A-500x500.jpg",
    "description": "SUN 6200 Chain Saw with 62 CC, 2 Stroke Petrol Engine Power.",
    "power": "62cc",
    "price_inr": 8500
  },

  // --- POWERBUILD / INDICO / JANMAC (Placeholders for expansion) ---
  {
    "id": 4001,
    "name": "Powerbuild PB-65 Demolition Breaker",
    "category": "power-tools",
    "brand": "Powerbuild",
    "image": "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=500",
    "description": "Heavy-duty powerbuild breaker for construction site foundations.",
    "power": "1500W",
    "price_inr": 18500
  },
  {
    "id": 5001,
    "name": "Indigo Impact Drill ID-13",
    "category": "power-tools",
    "brand": "Indigo",
    "image": "https://images.unsplash.com/photo-1542382156909-92c2a47ff992?auto=format&fit=crop&q=80&w=500",
    "description": "Durable indigo blue impact drill for professional contractors.",
    "power": "650W",
    "price_inr": 3200
  },
  {
    "id": 6001,
    "name": "Janmac JT-600 Cordless Trimmer",
    "category": "garden-tools",
    "brand": "Janmac",
    "image": "https://images.unsplash.com/photo-1590684153482-2180a4321430?auto=format&fit=crop&q=80&w=500",
    "description": "High-efficiency Janmac cordless trimmer for precision landscaping.",
    "power": "18V",
    "price_inr": 5800
  },

  // --- BOSCH INDUSTRIAL ---
  {
    "id": "BOS-GWS-600",
    "name": "BOSCH GWS 600 Professional Angle Grinder",
    "category": "power-tools",
    "brand": "Bosch",
    "image": "https://www.bosch-pt.co.in/binary/ocsmedia/optimized/166x164/o568360v54_GPO_14-180_S_Foam_Pad_Dyn.png",
    "description": "Powerful 600W angle grinder for metalworking and construction tasks.",
    "power": "600W",
    "price_inr": 2850
  },
  {
    "id": "BOS-GBH-220",
    "name": "BOSCH GBH 220 Professional Rotary Hammer",
    "category": "power-tools",
    "brand": "Bosch",
    "image": "https://www.bosch-pt.co.in/binary/ocsmedia/optimized/166x164/o585368v54_GBM38_Dyn.png",
    "description": "Powerful 720W rotary hammer for effortless drilling in concrete.",
    "power": "720W",
    "price_inr": 5200
  },
  {
    "id": "BOS-GDC-141",
    "name": "BOSCH GDC 141 Professional Marble Cutter",
    "category": "power-tools",
    "brand": "Bosch",
    "image": "https://www.bosch-pt.co.in/binary/ocsmedia/optimized/166x164/o417952v54_GDC_140_dyn.png",
    "description": "Compact and powerful 1450W marble cutter for precise stone cutting.",
    "power": "1450W",
    "price_inr": 3650
  }{
    "id": 15,
    "sku": "XPC-DB-4-60",
    "name": "Diamond Saw Blade",
    "specifications": "4\" | #60 Grit",
    "category": "Diamond Saw Blades",
    "sub_category": "Segmented Blades",
    "description": "High-quality diamond blade for fast, clean cuts in concrete, brick, and masonry. Features a segmented rim for efficient dust removal and extended blade life. Size: 4 inches, #60 grit for general purpose cutting.",
    "price_inr": 450,
    "blade_size": "4\" (100mm)",
    "grit": "#60",
    "application": "Concrete, Brick, Masonry",
    "image_url": "https://cdn.pixabay.com/photo/2016/05/04/21/58/circular-saw-1371538_640.jpg"
  },
  {
    "id": 16,
    "sku": "XPC-DB-4-80",
    "name": "Diamond Saw Blade",
    "specifications": "4\" | #80 Grit",
    "category": "Diamond Saw Blades",
    "sub_category": "Segmented Blades",
    "description": "Professional diamond blade with #80 grit for smoother cutting in hard materials. Ideal for tile, granite, and hard concrete. Provides consistent performance and durability with premium diamond crystals.",
    "price_inr": 470,
    "blade_size": "4\" (100mm)",
    "grit": "#80",
    "application": "Tile, Granite, Hard Concrete",
    "image_url": "https://cdn.pixabay.com/photo/2016/05/04/21/58/circular-saw-1371538_640.jpg"
  },
  {
    "id": 17,
    "sku": "XPC-DB-4-120",
    "name": "Diamond Saw Blade",
    "specifications": "4\" | #120 Grit",
    "category": "Diamond Saw Blades",
    "sub_category": "Segmented Blades",
    "description": "Fine-grit diamond blade for precision cutting in ceramic, porcelain, and other brittle materials. Ensures chip-free cuts and excellent finish quality. Ideal for delicate tile work and precision applications.",
    "price_inr": 490,
    "blade_size": "4\" (100mm)",
    "grit": "#120",
    "application": "Ceramic, Porcelain, Marble",
    "image_url": "https://cdn.pixabay.com/photo/2016/05/04/21/58/circular-saw-1371538_640.jpg"
  },
  {
    "id": 18,
    "sku": "XPC-DB-5-60",
    "name": "Diamond Saw Blade",
    "specifications": "5\" | #60 Grit",
    "category": "Diamond Saw Blades",
    "sub_category": "Segmented Blades",
    "description": "5-inch diamond blade designed for general-purpose cutting in masonry and stone. Segmented rim for faster cutting and improved cooling. Perfect for angle grinders and masonry saws.",
    "price_inr": 590,
    "blade_size": "5\" (125mm)",
    "grit": "#60",
    "application": "Masonry, Stone, Concrete",
    "image_url": "https://cdn.pixabay.com/photo/2016/05/04/21/58/circular-saw-1371538_640.jpg"
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
    "id": 19,
    "sku": "XPC-DB-7-60",
    "name": "Diamond Saw Blade",
    "specifications": "7\" | #60 Grit",
    "category": "Diamond Saw Blades",
    "sub_category": "Segmented Blades",
    "description": "7-inch heavy-duty diamond blade for large cutting applications. Ideal for cutting concrete slabs, pavers, and brick walls. High-performance segmented design for fast cutting and long life.",
    "price_inr": 890,
    "blade_size": "7\" (180mm)",
    "grit": "#60",
    "application": "Concrete Slabs, Pavers, Brick",
    "image_url": "https://cdn.pixabay.com/photo/2016/05/04/21/58/circular-saw-1371538_640.jpg"
  },
  {
    "id": 20,
    "sku": "XPC-DB-12-60",
    "name": "Diamond Saw Blade",
    "specifications": "12\" | #60 Grit",
    "category": "Diamond Saw Blades",
    "sub_category": "Segmented Blades",
    "description": "12-inch large diamond blade for industrial cutting applications. Suitable for walk-behind saws and large masonry saws. Provides exceptional cutting speed and durability for professional contractors.",
    "price_inr": 1890,
    "blade_size": "12\" (300mm)",
    "grit": "#60",
    "application": "Industrial Cutting, Heavy Concrete",
    "image_url": "https://cdn.pixabay.com/photo/2016/05/04/21/58/circular-saw-1371538_640.jpg"
  },
  {
    "id": 21,
    "sku": "XPC-DB-14-60",
    "name": "Diamond Saw Blade",
    "specifications": "14\" | #60 Grit",
    "category": "Diamond Saw Blades",
    "sub_category": "Segmented Blades",
    "description": "14-inch industrial-grade diamond blade for the most demanding cutting applications. Designed for high-production cutting of reinforced concrete, asphalt, and stone. Maximum durability and cutting efficiency.",
    "price_inr": 2490,
    "blade_size": "14\" (350mm)",
    "grit": "#60",
    "application": "Reinforced Concrete, Asphalt, Stone",
    "image_url": "https://cdn.pixabay.com/photo/2016/05/04/21/58/circular-saw-1371538_640.jpg"
  },
  {
    "id": 22,
    "sku": "XPC-TCT-W4",
    "name": "TCT Saw Blade",
    "specifications": "4\" | For Wood",
    "category": "TCT Saw Blades",
    "sub_category": "Wood Cutting Blades",
    "description": "Tungsten carbide tipped saw blade for clean and precise cuts in wood, plywood, and MDF. Features a thin kerf design for reduced material waste. Size: 4 inches, ideal for circular saws and miter saws.",
    "price_inr": 320,
    "blade_size": "4\" (100mm)",
    "teeth_count": "24T",
    "application": "Wood, Plywood, MDF",
    "image_url": "https://cdn.pixabay.com/photo/2017/08/09/15/46/saw-2615203_640.jpg"
  },
  {
    "id": 23,
    "sku": "XPC-TCT-A4",
    "name": "TCT Saw Blade",
    "specifications": "4\" | For Aluminum",
    "category": "TCT Saw Blades",
    "sub_category": "Non-Ferrous Metal Blades",
    "description": "Specialized TCT blade for cutting aluminum, non-ferrous metals, and plastics. Provides burr-free cuts and long blade life. Precision-ground teeth with negative hook angle for superior finish and safety.",
    "price_inr": 380,
    "blade_size": "4\" (100mm)",
    "teeth_count": "60T",
    "application": "Aluminum, Copper, Brass, Plastics",
    "image_url": "https://cdn.pixabay.com/photo/2017/08/09/15/46/saw-2615203_640.jpg"
  },
  {
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
    "id": 22929,
    "sku": "ABC-BLD-3T",
    "name": "Alphabet Brush Cutter Blade 3T",
    "specifications": "3 Teeth Design",
    "category": "Brush Cutter Blades",
    "sub_category": "Slashing Blades",
    "description": "3 Teeth style brush cutter metal slashing blade for thick overgrown fields.",
    "price_inr": "Login to See Price",
    "blade_size": "Standard",
    "teeth_count": "3T",
    "application": "Brambles, Thickets",
    "image_url": "https://unboxtools.com/wp-content/uploads/2024/07/Alphabet-Brush-Cutter-Blade-3T-300x300.jpg"
  },
  {
    "id": 61684,
    "sku": "XP-BCB-2T",
    "name": "Xtra Power Brush Cutter Blade 2 Teeth",
    "specifications": "2 Teeth Heavy Duty",
    "category": "Brush Cutter Blades",
    "sub_category": "Slashing Blades",
    "description": "Premium 2 teeth Xtra Power brush blade for toughest grass and shrubs.",
    "price_inr": "Login to See Price",
    "blade_size": "Standard",
    "teeth_count": "2T",
    "application": "Tough Shrubs, Branches",
    "image_url": "https://unboxtools.com/wp-content/uploads/2025/10/50-Xtra-Power-Brush-Cutter-Blade-2-Teeth-300x300.jpg"
  },
  {
    "id": 61696,
    "sku": "XP-BCB-10-40T",
    "name": "Xtra Power Brush Cutter Blade",
    "specifications": "10\" | 40 Teeth",
    "category": "Brush Cutter Blades",
    "sub_category": "Metal Slashing Blades",
    "description": "10 inch steel blade 40 teeth for dense agricultural clearing.",
    "price_inr": "Login to See Price",
    "blade_size": "10\" (255mm)",
    "teeth_count": "40T",
    "application": "Agricultural Clearing",
    "image_url": "https://unboxtools.com/wp-content/uploads/2025/10/52-Xtra-Power-Brush-Cutter-Blade-40-Teeth-300x300.jpg"
  },
  {
    "id": 61708,
    "sku": "XP-BCB-10-60T",
    "name": "Xtra Power Brush Cutter Blade",
    "specifications": "10\" | 60 Teeth",
    "category": "Brush Cutter Blades",
    "sub_category": "Metal Slashing Blades",
    "description": "10 inch steel blade 60 teeth for balanced precision field cutting.",
    "price_inr": "Login to See Price",
    "blade_size": "10\" (255mm)",
    "teeth_count": "60T",
    "application": "Field Cutting, Hard Stems",
    "image_url": "https://unboxtools.com/wp-content/uploads/2025/10/53-Xtra-Power-Brush-Cutter-Blade-10-X60-Teeth-300x300.jpg"
  },
  {
    "id": 61713,
    "sku": "XP-BCB-10-80T",
    "name": "Xtra Power Brush Cutter Blade",
    "specifications": "10\" | 80 Teeth",
    "category": "Brush Cutter Blades",
    "sub_category": "Metal Slashing Blades",
    "description": "10 inch steel blade 80 teeth for extra fine weed slashing.",
    "price_inr": "Login to See Price",
    "blade_size": "10\" (255mm)",
    "teeth_count": "80T",
    "application": "Extra Fine Flashing, Small Weeds",
    "image_url": "https://unboxtools.com/wp-content/uploads/2025/10/54-Xtra-Power-Brush-Cutter-Blade-10-X80-Teeth-300x300.jpg"
  },
  {
    "id": 61688,
    "sku": "XP-BCB-3T",
    "name": "Xtra Power Brush Cutter Blade 3 Teeth",
    "specifications": "3 Teeth Heavy Duty",
    "category": "Brush Cutter Blades",
    "sub_category": "Slashing Blades",
    "description": "Heavy duty 3 teeth brush cutter blade, highly resilient.",
    "price_inr": "Login to See Price",
    "blade_size": "Standard",
    "teeth_count": "3T",
    "application": "Overgrown Weeds, Roots",
    "image_url": "https://unboxtools.com/wp-content/uploads/2025/10/Xtra-Power-Brush-Cutter-Blade-3-Teeth-300x300.png"
  }
];
[
  {
    "id": 22929,
    "sku": "ABC-BLD-3T",
    "name": "Alphabet Brush Cutter Blade 3T",
    "specifications": "3 Teeth Design",
    "category": "Brush Cutter Blades",
    "sub_category": "Slashing Blades",
    "description": "3 Teeth style brush cutter metal slashing blade for thick overgrown fields.",
    "price_inr": "Login to See Price",
    "blade_size": "Standard",
    "teeth_count": "3T",
    "application": "Brambles, Thickets",
    "image_url": "https://unboxtools.com/wp-content/uploads/2024/07/Alphabet-Brush-Cutter-Blade-3T-300x300.jpg"
  },
  {
    "id": 61684,
    "sku": "XP-BCB-2T",
    "name": "Xtra Power Brush Cutter Blade 2 Teeth",
    "specifications": "2 Teeth Heavy Duty",
    "category": "Brush Cutter Blades",
    "sub_category": "Slashing Blades",
    "description": "Premium 2 teeth Xtra Power brush blade for toughest grass and shrubs.",
    "price_inr": "Login to See Price",
    "blade_size": "Standard",
    "teeth_count": "2T",
    "application": "Tough Shrubs, Branches",
    "image_url": "https://unboxtools.com/wp-content/uploads/2025/10/50-Xtra-Power-Brush-Cutter-Blade-2-Teeth-300x300.jpg"
  },
  {
    "id": 61696,
    "sku": "XP-BCB-10-40T",
    "name": "Xtra Power Brush Cutter Blade",
    "specifications": "10\" | 40 Teeth",
    "category": "Brush Cutter Blades",
    "sub_category": "Metal Slashing Blades",
    "description": "10 inch steel blade 40 teeth for dense agricultural clearing.",
    "price_inr": "Login to See Price",
    "blade_size": "10\" (255mm)",
    "teeth_count": "40T",
    "application": "Agricultural Clearing",
    "image_url": "https://unboxtools.com/wp-content/uploads/2025/10/52-Xtra-Power-Brush-Cutter-Blade-40-Teeth-300x300.jpg"
  }
]
