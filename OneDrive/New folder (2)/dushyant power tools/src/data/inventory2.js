export const inventoryData2 = [
    {
      "productId": "CSHSLI20141",
      "name": "Cordless sheet sander",
      "url": "/in/product/cordless-sheet-sander/CSHSLI20141",
      "image": "https://res-sg.togroup.com/stc/home_product/ingco/userfiles/1/images/photo/20251016201227170/CSHSLI20141.jpg",
      "tags": ["HOT", "NEW"],
      "description": {
        "voltage": "20V",
        "noLoadSpeed": "12000rpm",
        "spec": "Bottom size:110mmx100mm"
      },
      "prices": {}
    },  {
      "id": "taparia-masonry-3-13mm",
      "name": "Taparia 3.00 - 13 mm Masonry Drill Bits",
      "brand": "Taparia",
      "min_price": 27.75,
      "max_price": 104,
      "currency": "₹",
      "discount": "25%",
      "type": "series",
      "product_url": "/s/taparia-3-00-13-mm-masonry-drill-bits",
      "image_url": "https://images.toolbuy.com/resources/images/series/series150122112610AMMD360.jpg"
    },
    {
      "productId": "CPSLI2014",
      "name": "Cordless palm sander",
      "url": "/in/product/cordless-palm-sander/CPSLI2014",
      "image": "https://res-sg.togroup.com/stc/home_product/ingco/userfiles/1/images/photo/20251209110024989/CPSLI2014.jpg",
      "tags": ["NEW"],
      "description": {
        "voltage": "20V",
        "noLoadSpeed": "12000rpm",
        "packaging": "Packed by color box"
      },
      "prices": {}
    },
    {
      "productId": "CROSLI2002",
      "name": "Cordless random orbit sander",
      "url": "/in/product/cordless-random-orbit-sander/CROSLI2002",
      "image": "https://res-sg.togroup.com/stc/home_product/ingco/userfiles/1/images/photo/20241121020143575/CROSLI2002.jpg",
      "tags": ["NEW"],
      "description": {
        "voltage": "20V",
        "noLoadSpeed": "8000-13000rpm",
        "spec": "Bottom size:125mm"
      },
      "prices": {}
    },
    {
      "productId": "CSGLI2004",
      "name": "Cordless spray gun",
      "url": "/in/product/cordless-spray-gun/CSGLI2004",
      "image": "https://res-sg.togroup.com/stc/home_product/ingco/userfiles/1/images/photo/20250712160022198/CSGLI2004.jpg",
      "tags": ["NEW"],
      "description": {
        "voltage": "20V",
        "maxFlow": "800ml/min",
        "maxViscosity": "120DIN-s"
      },
      "prices": {}
    },
    {
      "productId": "CSGLI20042",
      "name": "Cordless spray gun",
      "url": "/in/product/cordless-spray-gun/CSGLI20042",
      "image": "https://res-sg.togroup.com/stc/home_product/ingco/userfiles/1/images/photo/20250712160022198/CSGLI20042.jpg",
      "tags": ["NEW"],
      "description": {
        "voltage": "20V",
        "maxFlow": "800ml/min",
        "maxViscosity": "120DIN-s"
      },
      "prices": {}
    },
    {
      "productId": "CABLI20028",
      "name": "Cordless blower",
      "url": "/in/product/cordless-blower/CABLI20028",
      "image": "https://res-sg.togroup.com/stc/home_product/ingco/userfiles/1/images/photo/20240428160123362/CABLI20028.jpg",
      "tags": ["HOT", "NEW"],
      "description": {
        "voltage": "20V",
        "noLoadSpeed": "18000rpm",
        "maxAirVolume": "2.7m³/min"
      },
      "prices": {}
    },
    {
      "productId": "CABLI200281",
      "name": "Cordless blower",
      "url": "/in/product/cordless-blower/CABLI200281",
      "image": "https://res-sg.togroup.com/stc/home_product/ingco/userfiles/1/images/photo/20240428160123362/CABLI200281.jpg",
      "tags": ["NEW"],
      "description": {
        "voltage": "20V",
        "noLoadSpeed": "18000rpm",
        "maxAirVolume": "2.7m³/min"
      },
      "prices": {}
    },
    {
      "productId": "COSLI240998",
      "name": "2 Pcs Cordless combo kit",
      "url": "/in/product/2-pcs-cordless-combo-kit/COSLI240998",
      "image": "https://res-sg.togroup.com/stc/home_product/ingco/userfiles/1/images/photo/20260311210052816/COSLI240998.jpg",
      "tags": ["NEW"],
      "description": {
        "voltage": "20V",
        "vacuumPressure": "≥9kpa",
        "maxAirVolume": "2.7m³/min"
      },
      "prices": {}
    },
    {
      "productId": "CABLI20018",
      "name": "Cordless blower",
      "url": "/in/product/cordless-blower/CABLI20018",
      "image": "https://res-sg.togroup.com/stc/home_product/ingco/userfiles/1/images/photo/20251217140023279/CABLI20018.jpg",
      "tags": ["HOT"],
      "description": {
        "voltage": "20V",
        "noLoadSpeed": "0-9000/0-18000rpm",
        "maxAirVolume": "2.7m³/min"
      },
      "prices": {}
    },
    {
      "id": 11,
      "name": "Get Spare Parts",
      "method": "GET",
      "endpoint": "/spare-parts",
      "description": "Fetch all spare parts"
    },
    {
      "id": 12,
      "name": "Get Spare Part By Order No",
      "method": "GET",
      "endpoint": "/spare-parts/:order_no",
      "description": "Fetch spare part details"
    },
    {
      "id": 13,
      "name": "Create Spare Part",
      "method": "POST",
      "endpoint": "/spare-parts",
      "description": "Add new spare part"
    },
    {
      "id": 14,
      "name": "Update Spare Part",
      "method": "PUT",
      "endpoint": "/spare-parts/:order_no",
      "description": "Update spare part"
    },
    {
      "id": 15,
      "name": "Delete Spare Part",
      "method": "DELETE",
      "endpoint": "/spare-parts/:order_no",
      "description": "Delete spare part"
    },

    {
      "id": 16,
      "name": "Get Users",
      "method": "GET",
      "endpoint": "/users",
      "description": "Fetch all users"
    },
    {
      "id": 17,
      "name": "Get User Profile",
      "method": "GET",
      "endpoint": "/users/:id",
      "description": "Fetch user profile"
    },
    {
      "id": 18,
      "name": "Register User",
      "method": "POST",
      "endpoint": "/auth/register",
      "description": "Register new user"
    },
    {
      "id": 19,
      "name": "Login User",
      "method": "POST",
      "endpoint": "/auth/login",
      "description": "Login user"
    },
    {
      "id": 20,
      "name": "Logout User",
      "method": "POST",
      "endpoint": "/auth/logout",
      "description": "Logout user"
    },

    {
      "id": 21,
      "name": "Create Order",
      "method": "POST",
      "endpoint": "/orders",
      "description": "Place new order"
    },
    {
      "id": 22,
      "name": "Get Orders",
      "method": "GET",
      "endpoint": "/orders",
      "description": "Fetch all orders"
    },
    {
      "id": 23,
      "name": "Get Order Details",
      "method": "GET",
      "endpoint": "/orders/:id",
      "description": "Fetch order details"
    },
    {
      "id": 24,
      "name": "Update Order Status",
      "method": "PATCH",
      "endpoint": "/orders/:id/status",
      "description": "Update order status"
    },
    {
      "id": 25,
      "name": "Cancel Order",
      "method": "DELETE",
      "endpoint": "/orders/:id",
      "description": "Cancel order"
    },

    {
      "id": 26,
      "name": "Upload Product Image",
      "method": "POST",
      "endpoint": "/upload/product-image",
      "description": "Upload image"
    },
    {
      "id": 27,
      "name": "Upload Category Icon",
      "method": "POST",
      "endpoint": "/upload/category-icon",
      "description": "Upload category icon"
    },
    {
      "id": 28,
      "name": "Search Products",
      "method": "GET",
      "endpoint": "/search/products?q=",
      "description": "Search products"
    },
    {
      "id": 29,
      "name": "Search Spare Parts",
      "method": "GET",
      "endpoint": "/search/spare-parts?q=",
      "description": "Search spare parts"
    },
    {
      "id": 30,
      "name": "Get Dashboard Stats",
      "method": "GET",
      "endpoint": "/admin/dashboard",
      "description": "Fetch dashboard analytics"
    }

    
  ]
},
[
  {
    "item_no": 1,
    "pc": 1,
    "order_no": "1 619 P09 772",
    "description": "Motor Housing",
    "price_inr": 160.00,
    "category": "Housing",
    "image": "https://api.bosch-spares.com/images/parts/1_619_P09_772.png",
    "compatibility": ["GWS 600"]
  },
  {
    "item_no": 2,
    "pc": 1,
    "order_no": "1 607 200 179",
    "description": "On-Off Switch",
    "price_inr": 180.00,
    "category": "Electrical",
    "image": "https://api.bosch-spares.com/images/parts/1_607_200_179.png",
    "compatibility": ["GWS 600"]
  },
  {
    "item_no": 3,
    "pc": 1,
    "order_no": "1 604 460 72V",
    "description": "Power supply cord IND",
    "price_inr": 110.00,
    "category": "Electrical",
    "image": "https://api.bosch-spares.com/images/parts/1_604_460_72V.png",
    "compatibility": ["GWS 600"]
  },
  {
    "item_no": 4,
    "pc": 1,
    "order_no": "1F 002 G31 081",
    "description": "Grommet",
    "price_inr": 29.00,
    "category": "Accessories",
    "image": "https://api.bosch-spares.com/images/parts/1F_002_G31_081.png",
    "compatibility": ["GWS 600"]
  },
  {
    "item_no": 5,
    "pc": 1,
    "order_no": "1 601 302 017",
    "description": "Fastening Clamp",
    "price_inr": 29.00,
    "category": "Hardware",
    "image": "https://api.bosch-spares.com/images/parts/1_601_302_017.png",
    "compatibility": ["GWS 600"]
  },
  {
    "item_no": 6,
    "pc": 1,
    "order_no": "1 619 P11 239",
    "description": "groove ball bearing",
    "price_inr": 30.00,
    "category": "Mechanical",
    "image": "https://api.bosch-spares.com/images/parts/1_619_P11_239.png",
    "compatibility": ["GWS 600"]
  },
  {
    "item_no": 7,
    "pc": 1,
    "order_no": "1 619 P11 240",
    "description": "groove ball bearing",
    "price_inr": 63.00,
    "category": "Mechanical",
    "image": "https://api.bosch-spares.com/images/parts/1_619_P11_240.png",
    "compatibility": ["GWS 600"]
  },
  {
    "item_no": 8,
    "pc": 1,
    "order_no": "1 619 P01 811",
    "description": "Brush Holder",
    "price_inr": 2925.00,
    "category": "Electrical",
    "image": "https://api.bosch-spares.com/images/parts/1_619_P01_811.png",
    "compatibility": ["GWS 600"]
  },
  {
    "item_no": 9,
    "pc": 1,
    "order_no": "1 604 652 013",
    "description": "Spiral Spring",
    "price_inr": 43.00,
    "category": "Hardware",
    "image": "https://api.bosch-spares.com/images/parts/1_604_652_013.png",
    "compatibility": ["GWS 600"]
  },
  
  {
    "item_no": 10,
    "pc": 1,
    "order_no": "1 619 P12 159",
    "description": "Clamping-Flange",
    "price_inr": 48.00,
    "category": "Accessories",
    "image": "https://api.bosch-spares.com/images/parts/1_619_P12_159.png",
    "compatibility": ["GWS 600"]
  },
  {
    "item_no": 11,
    "pc": 1,
    "order_no": "1 619 P10 088",
    "description": "Protective Cover",
    "price_inr": 22.00,
    "category": "Safety",
    "image": "https://api.bosch-spares.com/images/parts/1_619_P10_088.png",
    "compatibility": ["GWS 600"]
  },
  {
    "item_no": 12,
    "pc": 1,
    "order_no": "1 604 220 328",
    "description": "Field 220-240V",
    "price_inr": 358.00,
    "category": "Electrical",
    "image": "https://api.bosch-spares.com/images/parts/1_604_220_328.png",
    "compatibility": ["GWS 600"]
  },
  {
    "item_no": 13,
    "pc": 1,
    "order_no": "1 604 010 626",
    "description": "Armature 220-240V",
    "price_inr": 503.00,
    "category": "Electrical",
    "image": "https://api.bosch-spares.com/images/parts/1_604_010_626.png",
    "compatibility": ["GWS 600"]
  },
  {
    "item_no": 14,
    "pc": 1,
    "order_no": "1 607 014 145",
    "description": "Carbon-Brush Set",
    "price_inr": 91.00,
    "category": "Wear Parts",
    "image": "https://api.bosch-spares.com/images/parts/1_607_014_145.png",
    "compatibility": ["GWS 600"],
    "note": "Normal wear and tear part - not covered under warranty"
  },
  {
    "item_no": 15,
    "pc": 1,
    "order_no": "1 605 806 466",
    "description": "Gear Housing",
    "price_inr": 455.00,
    "category": "Housing",
    "image": "https://api.bosch-spares.com/images/parts/1_605_806_466.png",
    "compatibility": ["GWS 600"]
  },
  {
    "item_no": 16,
    "pc": 1,
    "order_no": "1 605 805 090",
    "description": "Bearing Flange BLACK",
    "price_inr": 382.00,
    "category": "Mechanical",
    "image": "https://api.bosch-spares.com/images/parts/1_605_805_090.png",
    "compatibility": ["GWS 600"]
  },
  {
    "item_no": 17,
    "pc": 1,
    "order_no": "1 600 A02 92J",
    "description": "Bevel Gear Set",
    "price_inr": 355.00,
    "category": "Mechanical",
    "image": "https://api.bosch-spares.com/images/parts/1_600_A02_92J.png",
    "compatibility": ["GWS 600"]
  },
  {
    "item_no": 18,
    "pc": 1,
    "order_no": "1 603 523 111",
    "description": "Grinding Spindle M10",
    "price_inr": 158.00,
    "category": "Mechanical",
    "image": "https://api.bosch-spares.com/images/parts/1_603_523_111.png",
    "compatibility": ["GWS 600"]
  },
   {
    id: "AGRC-77",
    name: "WELDING ELECTRODE -TATA-E6013 3.15X350MM (P12) - MSE012",
    category: "welding-tools",
    sub_category: "Electrodes",
    brand: "Tata Agrico",
    image: "https://s7ap1.scene7.com/is/image/TslDXP/IMG-_0845",
    description: "Low spill and smoke emissions are made up of prime steel wire rods. It is one of the most user-friendly welding rods, ensures low electricity consumption. The mild steel electrodes are ISI grades.",
    price_inr: 380.0,
    regular_price: 555.0,
    discount: "31%",
    price_prefix: "Per Box"
  },
  {
    id: "AGRC-114",
    name: "SELF DRILLING SCREWS DSDT05",
    category: "hand-tools",
    sub_category: "Screws & Fasteners",
    brand: "Tata Agrico",
    image: "https://s7ap1.scene7.com/is/image/tatasteelltd/125036_1?fmt=webp",
    description: "Double Thread Teflon Coating | Used for Outdoor/ Roofing Application",
    price_inr: 1410.0,
    regular_price: 2070.0,
    discount: "31%",
    price_prefix: "Per Box"
  },
  {
    id: "AGRC-74",
    name: "TATA-E6013 3.15X450MM (P12) - MSE014",
    category: "welding-tools",
    sub_category: "Electrodes",
    brand: "Tata Agrico",
    image: "https://s7ap1.scene7.com/is/image/tatasteelltd/113134_1?fmt=webp",
    description: "Low spill and smoke emissions are made up of prime steel wire rods. It is one of the most user-friendly welding rods, ensures low electricity consumption. The mild steel electrodes are ISI grades.",
    price_inr: 510.0,
    regular_price: 741.0,
    discount: "31%",
    price_prefix: "Per Box"
  },
  {
    id: "AGRC-97",
    name: "ABRASIVES CUTTING WHEEL-4 INCHES- ACW401",
    category: "abrasives",
    wheel_type: "Cutting",
    brand: "Tata Agrico",
    image: "https://s7ap1.scene7.com/is/image/TslDXP/CUTTING%20WHEEL%204",
    description: "Made from prime quality of steel | Produces fine cuts and gives extraordinary results | Cost-effective",
    price_inr: 800.0,
    regular_price: 1250.0,
    discount: "36%",
    price_prefix: "Per Box"
  },
  {
    id: "AGRC-78",
    name: "WELDING ELECTRODE -TATA-E6013 2.50X350MM (P12) - MSE011",
    category: "welding-tools",
    sub_category: "Electrodes",
    brand: "Tata Agrico",
    image: "https://s7ap1.scene7.com/is/image/TslDXP/IMG-_0845",
    description: "Low spill and smoke emissions are made up of prime steel wire rods. It is one of the most user-friendly welding rods, ensures low electricity consumption. The mild steel electrodes are ISI grades.",
    price_inr: 380.0,
    regular_price: 541.0,
    discount: "29%",
    price_prefix: "Per Box"
  },
  
  {
    id: "AGRC-76",
    name: "WELDING ELECTRODE-TATA-E6013 4.00X450MM (P12) - MSE015",
    category: "welding-tools",
    sub_category: "Electrodes",
    brand: "Tata Agrico",
    image: "https://s7ap1.scene7.com/is/image/TslDXP/IMG-_0845",
    description: "Low spill and smoke emissions are made up of prime steel wire rods. It is one of the most user-friendly welding rods, ensures low electricity consumption. The mild steel electrodes are ISI grades.",
    price_inr: 510.0,
    regular_price: 749.0,
    discount: "31%",
    price_prefix: "Per Box"
  },
   {
    "id": 7421,
    "name": "Akari Flush Trim Router Bit L2 5003 8Mm Shank",
    "image": "https://unboxtools.com/wp-content/uploads/2024/04/06-Akari-Flush-Trim-Router-Bit-8-Mm-300x300.jpg",
    "brand": "Akari",
    "category": "power-tool-accessories"
  },
  {
    "id": 7422,
    "name": "Akari Flush Trim Router Bit L2 5004 8Mm Shank",
    "image": "https://unboxtools.com/wp-content/uploads/2024/04/07-Akari-Flush-Trim-Router-Bit-8-Mm-300x300.jpg",
    "brand": "Akari",
    "category": "power-tool-accessories"
  },
  {
    "id": 7947,
    "name": "Akari G10Ss Angle Grinder 100Mm Armature",
    "image": "https://unboxtools.com/wp-content/uploads/2024/04/g10ss-1-300x300.jpg",
    "brand": "Akari",
    "category": "spare-parts"
  },
  {
    "id": 7951,
    "name": "Akari G15Sa2 Angle Grinder 125Mm Armature",
    "image": "https://unboxtools.com/wp-content/uploads/2024/04/G15Sa2-1-300x300.jpg",
    "brand": "Akari",
    "category": "spare-parts"
  },
  {
    "id": 7061,
    "name": "Akari Gasoline Back Pack Brush Cutter 2 Stroke 52Cc Aptbc2Tbp",
    "image": "https://unboxtools.com/wp-content/uploads/2025/03/Akari-Gasoline-Back-Pack-Brush-Cutter-2-Stroke-52-Cc-Aptbc2-Tbp-300x300.png",
    "brand": "Akari",
    "category": "agriculture-tools"
  },
  {
    "id": 7063,
    "name": "Akari Gasoline Back Pack Brush Cutter 4 Stroke 36Cc Aptbc4Tbp",
    "image": "https://unboxtools.com/wp-content/uploads/2025/03/Akari-Gasoline-Back-Pack-Brush-Cutter-4-Stroke-36-Cc-Aptbc4-Tbp-1-300x300.jpg",
    "brand": "Akari",
    "category": "agriculture-tools"
  },
  {
    "id": 7060,
    "name": "Akari Gasoline Brush Cutter 2 Stroke 52Cc Aptbc2T",
    "image": "https://unboxtools.com/wp-content/uploads/2025/03/Akari-Gasoline-Brush-Cutter-2-Stroke-52-Cc-Aptbc2-T-1-300x300.jpg",
    "brand": "Akari",
    "category": "agriculture-tools"
  },
  {
    "id": 8486,
    "name": "Akari Gasoline Chain Saw Cylinder Kit 62Cc",
    "image": "https://unboxtools.com/wp-content/uploads/2024/04/Alphabet-Gasoline-Chain-Saw-Cylinder-Kit-62Cc-300x300.jpg",
    "brand": "Akari",
    "category": "spare-parts"
  },
  {
    "id": 8491,
    "name": "Akari Gasoline Chain Saw Spark Plug",
    "image": "https://unboxtools.com/wp-content/uploads/2024/04/Alphabet-Gasoline-Chain-Saw-Spark-Plug-300x300.jpg",
    "brand": "Akari",
    "category": "spare-parts"
  },
  {
    "id": 8239,
    "name": "Akari Gco14-02 Cut Off Machine 355Mm Armature",
    "image": "https://unboxtools.com/wp-content/uploads/2024/04/14-02-1-300x300.jpg",
    "brand": "Akari",
    "category": "spare-parts"
  },
  {
    "id": 8243,
    "name": "Akari Gco200 Cut Off Machine 355Mm Armature",
    "image": "https://unboxtools.com/wp-content/uploads/2024/04/GCO200-1-1-300x300.jpg",
    "brand": "Akari",
    "category": "spare-parts"
  },
  {
    "id": 8269,
    "name": "Akari Gco200 Cut Off Machine 355Mm Stator",
    "image": "https://unboxtools.com/wp-content/uploads/2024/04/gco200-300x300.jpg",
    "brand": "Akari",
    "category": "spare-parts"
  },
  {
    "id": 7896,
    "name": "Akari Gsb13Re Drill Machine 13Mm Armature",
    "image": "https://unboxtools.com/wp-content/uploads/2024/04/13re-300x300.jpg",
    "brand": "Akari",
    "category": "spare-parts"
  },
  {
    "id": 7903,
    "name": "Akari Gsb13Re Drill Machine 13Mm Stator",
    "image": "https://unboxtools.com/wp-content/uploads/2024/04/13re-1-300x300.jpg",
    "brand": "Akari",
    "category": "spare-parts"
  },
  {
    "id": 7203,
    "name": "Akari Heat Gun 2500W Apthg2500",
    "image": "https://unboxtools.com/wp-content/uploads/2025/03/Akari-Heat-Gun-2500-W-Apthg2500-1-300x300.jpg",
    "brand": "Akari",
    "power": "2500W",
    "category": "power-tools"
  },
  {
    "id": 7733,
    "name": "Akari Igbt Welding Machine 310Amp 1+2 Phase Aptawm3102F",
    "image": "https://unboxtools.com/wp-content/uploads/2025/03/Akari-Igbt-Welding-Machine-310-Amp-2-Phase-Aptawm3102-F-300x300.png",
    "brand": "Akari",
    "category": "welding-tools"
  },
  {
    "id": 7129,
    "name": "Akari Impact Drill Machine 550W 13Mm Aptid13B",
    "image": "https://unboxtools.com/wp-content/uploads/2024/04/Akari-Impact-Drill-Machine-550W-13mm-Aptid13B-300x300.jpg",
    "brand": "Akari",
    "power": "550W",
    "category": "drills"
  },
  {
    "id": 7132,
    "name": "Akari Impact Drill Machine With Kit 650W 13Mm Aptidk33Kit",
    "image": "https://unboxtools.com/wp-content/uploads/2025/03/Akari-Impact-Drill-Machine-With-Kit-650-W-13mm-Aptidk33-Kit-300x300.jpg",
    "brand": "Akari",
    "power": "650W",
    "category": "drills"
  },
  {
    "id": 7249,
    "name": "Akari Jig Saw 550W 65Mm Aptjs65B",
    "image": "https://unboxtools.com/wp-content/uploads/2025/03/Akari-Jig-Saw-550-W-65mm-Aptjs65-B-1-300x300.jpg",
    "brand": "Akari",
    "power": "550W",
    "category": "saws"
  },
  {
    "id": 7250,
    "name": "Akari Jig Saw 550W 70Mm Aptjs70",
    "image": "https://unboxtools.com/wp-content/uploads/2025/03/Akari-Jig-Saw-550-W-70mm-Aptjs70-1-300x300.jpg",
    "brand": "Akari",
    "power": "550W",
    "category": "saws"
  },
  {
    "id": 8889,
    "name": "Akari Jig Saw Blade T144D",
    "image": "https://unboxtools.com/wp-content/uploads/2024/04/01-Akari-Jig-Saw-Blade-T144-D-300x300.png",
    "brand": "Akari",
    "category": "power-tool-accessories"
  },
  {
    "id": 8891,
    "name": "Akari Jig Saw Blade T244D",
    "image": "https://unboxtools.com/wp-content/uploads/2024/04/02-Akari-Jig-Saw-Blade-T244-D-300x300.png",
    "brand": "Akari",
    "category": "power-tool-accessories"
  },
  {
    "id": 8217,
    "name": "Akari Js70 Jig Saw 70Mm Armature",
    "image": "https://unboxtools.com/wp-content/uploads/2024/04/js70-1-300x300.jpg",
    "brand": "Akari",
    "category": "spare-parts"
  },
  {
    "id": 8233,
    "name": "Akari Lg355 Cut Off Machine 355Mm Armature",
    "image": "https://unboxtools.com/wp-content/uploads/2024/04/LG355-1-300x300.jpg",
    "brand": "Akari",
    "category": "spare-parts"
  },
  {
    "id": 8337,
    "name": "Akari Lg355 Cut Off Machine 355Mm Carbon Brush",
    "image": "https://unboxtools.com/wp-content/uploads/2024/04/LG355-1-1-300x300.jpg",
    "brand": "Akari",
    "category": "spare-parts"
  },
  {
    "id": 8263,
    "name": "Akari Lg355 Cut Off Machine 355Mm Stator",
    "image": "https://unboxtools.com/wp-content/uploads/2024/04/lg355-300x300.jpg",
    "brand": "Akari",
    "category": "spare-parts"
  },
  {
    id: "AGRC-98",
    name: "ABRASIVES CUTTING WHEEL-14 INCHES- ACW143",
    category: "abrasives",
    wheel_type: "Cutting",
    brand: "Tata Agrico",
    image: "https://s7ap1.scene7.com/is/image/TslDXP/CUTTING%20WHEEL%2014%20(2)",
    description: "Made from prime quality of steel | Produces fine cuts and gives extraordinary results | Cost-effective",
    price_inr: 735.0,
    regular_price: 1250.0,
    discount: "41%",
    price_prefix: "Per Box"
  },
  {
    id: "AGRC-211",
    name: "DRY WALL SCREWS 6X 38- ADW638",
    category: "hand-tools",
    sub_category: "Screws & Fasteners",
    brand: "Tata Agrico",
    image: "https://s7ap1.scene7.com/is/image/TslDXP/drywall-screw_2",
    description: "6 inch screw | Black Phosphate Finish | Used Securing POP Channels and Gypsum Boards | Suitable for Attaching Metal Studs, Tracks, and Joist in Construction Projects | Assembling Sheet Metal Components in Appliances, Furniture, and Machinery",
    price_inr: 213.0,
    regular_price: 355.0,
    discount: "40%",
    price_prefix: "Per Box"
  },
  {
    "id": "AKARI_31742",
    "name": "Akari 3 Inch Diamond Cup Wheel Seg 75Mm B5200",
    "image": "https://unboxtools.com/wp-content/uploads/2024/11/Akari-3-Inch-Diamond-Cup-Wheel-Seg-75Mm-B5200-300x300.jpg",
    "price_inr": 65,
    "mrp": 84,
    "discount": "23% OFF",
    "category": "abrasives",
    "sub_category": "Diamond Cup Wheels",
    "brand": "Akari",
    "description": "High-performance diamond cup wheel for grinding stone and concrete."
  },
  {
    "id": "AKARI_19535",
    "name": "Akari 4 Inch 9 Seg Diamond Saw Blade 100Mm A-1718",
    "image": "https://unboxtools.com/wp-content/uploads/2024/07/Akari-4-Inch-9-Seg-Diamond-Saw-Blade-100Mm-A1718-300x300.jpg",
    "price_inr": 60,
    "mrp": 78,
    "discount": "23% OFF",
    "category": "abrasives",
    "sub_category": "Diamond Saw Blades",
    "brand": "Akari",
    "description": "Premium 9-segment diamond blade for precise marble and granite cutting."
  },
  {
    "id": "AKARI_7520",
    "name": "Akari 4 Inch 9 Seg Diamond Saw Blade 110Mm A-1800",
    "image": "https://unboxtools.com/wp-content/uploads/2024/04/Akari-4-Inch-6-Seg-Diamond-Saw-Blade-110mm-A1800-300x300.jpg",
    "price_inr": 56,
    "mrp": 72,
    "discount": "23% OFF",
    "category": "abrasives",
    "sub_category": "Diamond Saw Blades",
    "brand": "Akari",
    "description": "110mm diamond saw blade for heavy duty stone cutting."
  },
  {
    "id": "AKARI_31297",
    "name": "Akari 4 Inch Cup Brush Straight 100Mm M14",
    "image": "https://unboxtools.com/wp-content/uploads/2024/10/Akari-4-Inch-Cup-Brush-Straight-100Mm-M14-300x300.png",
    "price_inr": 111,
    "mrp": 144,
    "discount": "23% OFF",
    "category": "abrasives",
    "sub_category": "Cup Brushes",
    "brand": "Akari",
    "description": "Straight wire cup brush for surface cleaning and rust removal."
  },
  {
    "id": "AKARI_31303",
    "name": "Akari 4 Inch Cup Brush Twisted 100Mm M14",
    "image": "https://unboxtools.com/wp-content/uploads/2024/10/Akari-4-Inch-Cup-Brush-Twisted-100Mm-M14-300x300.png",
    "price_inr": 118,
    "mrp": 154,
    "discount": "23% OFF",
    "category": "abrasives",
    "sub_category": "Cup Brushes",
    "brand": "Akari",
    "description": "Twisted wire cup brush for aggressive cleaning and deburring."
  },
  {
    "id": "AKARI_31745",
    "name": "Akari 4 Inch Diamond Cup Wheel Seg 100Mm Double Row B5600",
    "image": "https://unboxtools.com/wp-content/uploads/2024/11/B-5600-1-300x300.png",
    "price_inr": 160,
    "mrp": 208,
    "discount": "23% OFF",
    "category": "abrasives",
    "sub_category": "Diamond Cup Wheels",
    "brand": "Akari",
    "description": "Double row diamond segments for fast and smooth concrete grinding."
  },
    {
        id: "AKARI_9046",
        name: "Akari 125Mm Velcro Pad 5 Inch M10",
        model: "9046",
        category: "abrasives",
        sub_category: "Velcro Pads",
        brand: "Akari",
        price_inr: 38.50,
        regular_price: 50.00,
        discount: "23%",
        image: "https://unboxtools.com/wp-content/uploads/2024/04/01-Akari-125-Mm-Valcro-Pad-5-Inch-M10-300x300.png",
        description: "Akari 125mm Velcro Pad for 5 inch angle grinders. M10 thread. High-quality hook and loop backing for quick disc changes.",
        inStock: true
    },
    {
        id: "AKARI_9047",
        name: "Akari 125Mm Velcro Pad 5 Inch M14",
        model: "9047",
        category: "abrasives",
        sub_category: "Velcro Pads",
        brand: "Akari",
        price_inr: 38.50,
        regular_price: 50.00,
        discount: "23%",
        image: "https://unboxtools.com/wp-content/uploads/2024/04/01-Akari-125-Mm-Valcro-Pad-5-Inch-M10-300x300.png",
        description: "Akari 125mm Velcro Pad for 5 inch angle grinders. M14 thread. Professional grade for automotive and wood polishing.",
        inStock: true
    },
    {
        id: "AKARI_16528",
        name: "Akari 4 Inch Black Gc Wheel 100Mm",
        model: "16528",
        category: "abrasives",
        sub_category: "Gc & Wa Wheels",
        brand: "Akari",
        price_inr: 17.71,
        regular_price: 23.00,
        discount: "23%",
        image: "https://unboxtools.com/wp-content/uploads/2024/04/03-Akari-Gc-Wheel-4-Inch-2-5-Mm-Black-300x300.jpg",
        description: "Akari Black GC (Green Silicon Carbide) Wheel, 4 inch (100mm). Ideal for grinding non-ferrous metals and masonry.",
        inStock: true
    },
    {
        id: "AKARI_16427",
        name: "Akari 4 Inch Diamond Polishing Pad For Marble & Granite 100Mm",
        model: "16427",
        category: "abrasives",
        sub_category: "Polishing Pads",
        brand: "Akari",
        price_inr: 42.35,
        regular_price: 55.00,
        discount: "23%",
        image: "https://unboxtools.com/wp-content/uploads/2024/04/01-Akari-Diamond-Polishing-Pad-For-Marble-Granite-4-Inch-0-Grit-300x300.jpg",
        description: "Professional diamond polishing pad for marble and granite. 100mm diameter. Long-lasting and high gloss finish.",
        inStock: true
    },
  { "Item number": "AG24008", "Picture": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQoqt7RJghZCqtlq3OzAFq521H6NB68-ZuWGg6JNM3AnIcXut8lLD5Nco-bypT-yzeysPShEMLzvhrnCSF3Enm3UokybyUHGJZTcSu_3sjJzQQiyrA_NmMXlO8", "Product name": "Angle grinder", "Spare part number": "AG24008-SP-39", "Spare parts name": "Carbon Brush", "Spare parts Picture": "/images/spare-parts/AG24008-SP-39.jpg", "Suitable for": ["AG24008"] },
  { "Item number": "AG220018", "Picture": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRiflRHEVEHFhJy9VeSwnbL4aBegwlErLkajBtoVOSWFgqGTNnnXoaRQwbEuwEhrfR9FhIrzRudTvWeT-IP56T7alZKbz1glPASTLrxxCpaF7sANbXPNa_N", "Product name": "Angle grinder", "Spare part number": "AG220018-SP-15/25", "Spare parts name": "Gear/Pinion", "Spare parts Picture": "/images/spare-parts/AG220018-SP-15-25.jpg", "Suitable for": ["AG220018"] },
  { "Item number": "AG220018", "Picture": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSKlqsykTUEZWU55WL8qZ11308BkgJiGjFr6HuFlDlMzZFHxzQWJXiHsHeRbNMGUabcnxxB-h37E0bImOAZW6DMqxBz-Tq6Dw", "Product name": "Angle grinder", "Spare part number": "AG220018-SP-28", "Spare parts name": "Rotor", "Spare parts Picture": "/images/spare-parts/AG220018-SP-28.jpg", "Suitable for": ["AG220018"] },
  { "Item number": "AG220018", "Picture": "", "Product name": "Angle grinder", "Spare part number": "AG220018-SP-34", "Spare parts name": "Stator", "Spare parts Picture": "/images/spare-parts/AG220018-SP-34.jpg", "Suitable for": ["AG220018", "AG200018"] },
  { "Item number": "AG200018", "Picture": "", "Product name": "Angle grinder", "Spare part number": "AG200018-SP-44/47/48", "Spare parts name": "Switch", "Spare parts Picture": "/images/spare-parts/AG200018-SP-44-47-48.jpg", "Suitable for": ["AG220018", "AG200018", "AG24008", "AG30008"] },
  { "Item number": "ID6808", "Picture": "", "Product name": "Impact drill", "Spare part number": "ID6808-SP-3", "Spare parts name": "Spindle", "Spare parts Picture": "/images/spare-parts/ID6808-SP-3.jpg", "Suitable for": ["ID6808"] },
  { "Item number": "ID6808", "Picture": "", "Product name": "Impact drill", "Spare part number": "ID6808-SP-11", "Spare parts name": "Impact Bracket", "Spare parts Picture": "/images/spare-parts/ID6808-SP-11.jpg", "Suitable for": ["ID6808"] },
  { "Item number": "ID8508", "Picture": "", "Product name": "Impact drill", "Spare part number": "ID8508-SP-26", "Spare parts name": "Carbon Brush", "Spare parts Picture": "/images/spare-parts/ID8508-SP-26.jpg", "Suitable for": ["ID8508"] },
  { "Item number": "ID6808", "Picture": "", "Product name": "Impact drill", "Spare part number": "ID6808-SP-15", "Spare parts name": "Rotor", "Spare parts Picture": "/images/spare-parts/ID6808-SP-15.jpg", "Suitable for": ["ID6808"] },
  { "Item number": "ID6808", "Picture": "", "Product name": "Impact drill", "Spare part number": "ID6808-SP-16", "Spare parts name": "Stator", "Spare parts Picture": "/images/spare-parts/ID6808-SP-16.jpg", "Suitable for": ["ID6808"] },
  { "Item number": "ED50028", "Picture": "/pg", "Product name": "Electric drill", "Spare part number": "ED50028-SP-17", "Spare parts name": "Gear", "Spare parts Picture": "/images/spare-parts/ED50028-SP-17.jpg", "Suitable for": ["ED50028"] },
  { "Item number": "ED500282", "Picture": ".jpg", "Product name": "Electric drill", "Spare part number": "ED500282-SP-19", "Spare parts name": "spindle", "Spare parts Picture": "/images/spare-parts/ED500282-SP-19.jpg", "Suitable for": ["ED500282"] },
  { "Item number": "ED4508", "Picture": "/i", "Product name": "Electric drill", "Spare part number": "ED4508-SP-10", "Spare parts name": "Carbon Brush", "Spare parts Picture": "/images/spare-parts/ED4508-SP-10.jpg", "Suitable for": ["ED4508", "ED500282", "ED2808", "ED50028"] },
  { "Item number": "ED500282", "Picture": ".jpg", "Product name": "Electric drill", "Spare part number": "ED500282-SP-14", "Spare parts name": "Carbon Brush", "Spare parts Picture": "/images/spare-parts/ED500282-SP-14.jpg", "Suitable for": ["ED50028", "ED500282"] },
  { "Item number": "ED2808", "Picture": "/i", "Product name": "Electric drill", "Spare part number": "ED2808-SP-8", "Spare parts name": "Rotor", "Spare parts Picture": "/images/spare-parts/ED2808-SP-8.jpg", "Suitable for": ["ED2808"] },
  { "Item number": "ED50028", "Picture": "/pg", "Product name": "Electric drill", "Spare part number": "ED50028-SP-13", "Spare parts name": "Rotor", "Spare parts Picture": "/images/spare-parts/ED50028-SP-13.jpg", "Suitable for": ["ED50028", "ED500282"] },
  { "Item number": "ED500282", "Picture": ".jpg", "Product name": "Electric drill", "Spare part number": "ED500282-SP-12", "Spare parts name": "Rotor", "Spare parts Picture": "/images/spare-parts/ED500282-SP-12.jpg", "Suitable for": ["ED50028", "ED500282"] },
  { "Item number": "ED50028", "Picture": "/pg", "Product name": "Electric drill", "Spare part number": "ED50028-SP-11", "Spare parts name": "Stator", "Spare parts Picture": "/images/spare-parts/ED50028-SP-11.jpg", "Suitable for": ["ED50028", "ED500282"] },
  { "Item number": "ED500282", "Picture": ".jpg", "Product name": "Electric drill", "Spare part number": "ED500282-SP-10", "Spare parts name": "Stator", "Spare parts Picture": "/images/spare-parts/ED500282-SP-10.jpg", "Suitable for": ["ED50028", "ED500282"] },
  { "Item number": "ID6808", "Picture": "/i", "Product name": "Impact drill", "Spare part number": "ID6808-SP-22", "Spare parts name": "Switch", "Spare parts Picture": "/images/spare-parts/ID6808-SP-22.jpg", "Suitable for": ["ED50028", "ED500282", "ED4508", "ID6808"] },
  { "Item number": "ED50028", "Picture": "/pg", "Product name": "Electric drill", "Spare part number": "ED50028-SP-6", "Spare parts name": "Switch", "Spare parts Picture": "/images/spare-parts/ED50028-SP-6.jpg", "Suitable for": ["ED50028", "ED500282", "ED4508", "ID6808"] },
  { "Item number": "ED500282", "Picture": ".jpg", "Product name": "Electric drill", "Spare part number": "ED500282-SP-6", "Spare parts name": "Switch", "Spare parts Picture": "/images/spare-parts/ED500282-SP-6.jpg", "Suitable for": ["ED50028", "ED500282", "ED4508", "ID6808"] },
  { "Item number": "JS57028", "Picture": "/pg", "Product name": "Jig saw", "Spare part number": "JS57028-SP-5", "Spare parts name": "Bolt M6*8", "Spare parts Picture": "/images/spare-parts/JS57028-SP-5.jpg", "Suitable for": ["JS57028"] },
  { "Item number": "JS57028", "Picture": "/pg", "Product name": "Jig saw", "Spare part number": "JS57028-SP-7", "Spare parts name": "Collar", "Spare parts Picture": "/images/spare-parts/JS57028-SP-7.jpg", "Suitable for": ["JS57028"] },
  { "Item number": "JS57028", "Picture": "/pg", "Product name": "Jig saw", "Spare part number": "JS57028-SP-9", "Spare parts name": "Steel Bushing 5*8*5", "Spare parts Picture": "/images/spare-parts/JS57028-SP-9.jpg", "Suitable for": ["JS57028"] },
  { "Item number": "JS57028", "Picture": "/pg", "Product name": "Jig saw", "Spare part number": "JS57028-SP-13", "Spare parts name": "Gear", "Spare parts Picture": "/images/spare-parts/JS57028-SP-13.jpg", "Suitable for": ["JS57028"] },
  { "Item number": "JS57028", "Picture": "/pg", "Product name": "Jig saw", "Spare part number": "JS57028-SP-21", "Spare parts name": "Rotor", "Spare parts Picture": "/images/spare-parts/JS57028-SP-21.jpg", "Suitable for": ["JS57028"] },
  { "Item number": "JS57028", "Picture": "/pg", "Product name": "Jig saw", "Spare part number": "JS57028-SP-36", "Spare parts name": "Carbon Brush", "Spare parts Picture": "/images/spare-parts/JS57028-SP-36.jpg", "Suitable for": ["JS57028"] },
  { "Item number": "JS400285", "Picture": ".jpg", "Product name": "Jig saw", "Spare part number": "JS400285-SP-21", "Spare parts name": "Gear", "Spare parts Picture": "/images/spare-parts/JS400285-SP-21.jpg", "Suitable for": ["JS400285"] },
  { "Item number": "JS400285", "Picture": ".jpg", "Product name": "Jig saw", "Spare part number": "JS400285-SP-10", "Spare parts name": "Carbon Brush", "Spare parts Picture": "/images/spare-parts/JS400285-SP-10.jpg", "Suitable for": ["JS400285"] },
  { "Item number": "JS400285", "Picture": ".jpg", "Product name": "Jig saw", "Spare part number": "JS400285-SP-15", "Spare parts name": "Rotor", "Spare parts Picture": "/images/spare-parts/JS400285-SP-15.jpg", "Suitable for": ["JS400285"] },
  { "Item number": "JS57028", "Picture": "/pg", "Product name": "Jig saw", "Spare part number": "JS57028-SP-23", "Spare parts name": "Stator", "Spare parts Picture": "/images/spare-parts/JS57028-SP-23.jpg", "Suitable for": ["JS57028"] },
  { "Item number": "CS2358", "Picture": "/i", "Product name": "Circular saw", "Spare part number": "CS2358-SP-58", "Spare parts name": "Carbon Brush", "Spare parts Picture": "/images/spare-parts/CS2358-SP-58.jpg", "Suitable for": ["CS2358"] },
  { "Item number": "CS18578", "Picture": "/pg", "Product name": "Circular saw", "Spare part number": "CS18578-SP-60", "Spare parts name": "Carbon Brush", "Spare parts Picture": "/images/spare-parts/CS18578-SP-60.jpg", "Suitable for": ["CS18568", "CS18538", "CS18578"] },
  { "Item number": "CS18568", "Picture": "/pg", "Product name": "Circular saw", "Spare part number": "CS18568-SP-51", "Spare parts name": "Carbon Brush", "Spare parts Picture": "/images/spare-parts/CS18568-SP-51.jpg", "Suitable for": ["CS18568", "CS18538", "CS18578"] },
  { "Item number": "CS18568", "Picture": "/pg", "Product name": "Circular saw", "Spare part number": "CS18568-SP-41", "Spare parts name": "Rotor", "Spare parts Picture": "/images/spare-parts/CS18568-SP-41.jpg", "Suitable for": ["CS18568"] },
  { "Item number": "FS3208", "Picture": "/i", "Product name": "Finishing sander", "Spare part number": "FS3208-SP-1", "Spare parts name": "foam plate", "Spare parts Picture": "/images/spare-parts/FS3208-SP-1.jpg", "Suitable for": ["FS3208"] },
  { "Item number": "FS3208", "Picture": "/i", "Product name": "Finishing sander", "Spare part number": "FS3208-SP-3", "Spare parts name": "Thin Plate", "Spare parts Picture": "/images/spare-parts/FS3208-SP-3.jpg", "Suitable for": ["FS3208"] },
  { "Item number": "FS3208", "Picture": "/i", "Product name": "Finishing sander", "Spare part number": "FS3208-SP-5", "Spare parts name": "aluminum plate", "Spare parts Picture": "/images/spare-parts/FS3208-SP-5.jpg", "Suitable for": ["FS3208"] },
  { "Item number": "FS3208", "Picture": "/i", "Product name": "Finishing sander", "Spare part number": "FS3208-SP-28", "Spare parts name": "Carbon Brush", "Spare parts Picture": "/images/spare-parts/FS3208-SP-28.jpg", "Suitable for": ["FS3208"] },
  { "Item number": "FS3208", "Picture": "/i", "Product name": "Finishing sander", "Spare part number": "FS3208-SP-34", "Spare parts name": "Rotor", "Spare parts Picture": "/images/spare-parts/FS3208-SP-34.jpg", "Suitable for": ["FS3208"] },
  { "Item number": "FS3208", "Picture": "/i", "Product name": "Finishing sander", "Spare part number": "FS3208-SP-30", "Spare parts name": "Stator", "Spare parts Picture": "/images/spare-parts/FS3208-SP-30.jpg", "Suitable for": ["FS3208"] },
  { "Item number": "FS3208", "Picture": "/i", "Product name": "Finishing sander", "Spare part number": "FS3208-SP-23", "Spare parts name": "Switch", "Spare parts Picture": "/images/spare-parts/FS3208-SP-23.jpg", "Suitable for": ["FS3208"] },
  { "Item number": "MC140068", "Picture": ".jpg", "Product name": "Marble cutter", "Spare part number": "MC140068-SP-49", "Spare parts name": "Base Plate", "Spare parts Picture": "/images/spare-parts/MC140068-SP-49.jpg", "Suitable for": ["MC14008", "MC140068"] },
  { "Item number": "MC14008", "Picture": "/pg", "Product name": "Marble cutter", "Spare part number": "MC14008-SP-30/38", "Spare parts name": "Gear/Pinion", "Spare parts Picture": "/images/spare-parts/MC14008-SP-30-38.jpg", "Suitable for": ["MC14008", "MC140068"] },
  { "Item number": "MC14008", "Picture": "/pg", "Product name": "Marble cutter", "Spare part number": "MC14008-SP-3", "Spare parts name": "Stator", "Spare parts Picture": "/images/spare-parts/MC14008-SP-3.jpg", "Suitable for": ["MC14008", "MC140068"] },
  { "Item number": "MC140068", "Picture": ".jpg", "Product name": "Marble cutter", "Spare part number": "MC140068-SP-16", "Spare parts name": "Switch", "Spare parts Picture": "/images/spare-parts/MC140068-SP-16.jpg", "Suitable for": ["MC14008", "MC140068"] },
  { "Item number": "MC14008", "Picture": "/pg", "Product name": "Marble cutter", "Spare part number": "MC14008-SP-10", "Spare parts name": "Switch", "Spare parts Picture": "/images/spare-parts/MC14008-SP-10.jpg", "Suitable for": ["MC14008", "MC140068"] },
  { "Item number": "MX214008", "Picture": ".jpg", "Product name": "Mixer", "Spare part number": "MX214008-SP-32", "Spare parts name": "Rotor", "Spare parts Picture": "/images/spare-parts/MX214008-SP-32.jpg", "Suitable for": ["MX214008"] },
  { "Item number": "MX214008", "Picture": ".jpg", "Product name": "Mixer", "Spare part number": "MX214008-SP-36", "Spare parts name": "Stator", "Spare parts Picture": "/images/spare-parts/MX214008-SP-36.jpg", "Suitable for": ["MX214008"] },
  { "Item number": "DWS10501", "Picture": ".jpg", "Product name": "Drywall sander", "Spare part number": "DWS10501-SP-6", "Spare parts name": "switch button", "Spare parts Picture": "/images/spare-parts/DWS10501-SP-6.jpg", "Suitable for": ["DWS10501"] },
  { "Item number": "DWS10501", "Picture": ".jpg", "Product name": "Drywall sander", "Spare part number": "DWS10501-SP-79", "Spare parts name": "Small Switch", "Spare parts Picture": "/images/spare-parts/DWS10501-SP-79.jpg", "Suitable for": ["DWS10501"] },
  { "Item number": "DWS10501", "Picture": ".jpg", "Product name": "Drywall sander", "Spare part number": "DWS10501-SP-96", "Spare parts name": "big gear", "Spare parts Picture": "/images/spare-parts/DWS10501-SP-96.jpg", "Suitable for": ["DWS10501"] },
  { "Item number": "DWS10501", "Picture": ".jpg", "Product name": "Drywall sander", "Spare part number": "DWS10501-SP-55", "Spare parts name": "Carbon Brush", "Spare parts Picture": "/images/spare-parts/DWS10501-SP-55.jpg", "Suitable for": ["DWS10501"] },
  { "Item number": "DWS10501", "Picture": ".jpg", "Product name": "Drywall sander", "Spare part number": "DWS10501-SP-68", "Spare parts name": "Rotor", "Spare parts Picture": "/images/spare-parts/DWS10501-SP-68.jpg", "Suitable for": ["DWS10501"] },
  { "Item number": "DWS10501", "Picture": ".jpg", "Product name": "Drywall sander", "Spare part number": "DWS10501-SP-64", "Spare parts name": "Stator-220V", "Spare parts Picture": "/images/spare-parts/DWS10501-SP-64.jpg", "Suitable for": ["DWS10501"] },
  { "Item number": "RT160028", "Picture": ".jpg", "Product name": "Electric router", "Spare part number": "RT160028-SP-16", "Spare parts name": "Collet Nut 12mm", "Spare parts Picture": "/images/spare-parts/RT160028-SP-16.jpg", "Suitable for": ["RT160028"] },
  { "Item number": "RT160028", "Picture": ".jpg", "Product name": "Electric router", "Spare part number": "RT160028-SP-5", "Spare parts name": "Rotor", "Spare parts Picture": "/images/spare-parts/RT160028-SP-5.jpg", "Suitable for": ["RT160028"] },
  { "Item number": "RT160028", "Picture": ".jpg", "Product name": "Electric router", "Spare part number": "RT160028-SP-2", "Spare parts name": "Stator", "Spare parts Picture": "/images/spare-parts/RT160028-SP-2.jpg", "Suitable for": ["RT160028"] }
];
,[
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
