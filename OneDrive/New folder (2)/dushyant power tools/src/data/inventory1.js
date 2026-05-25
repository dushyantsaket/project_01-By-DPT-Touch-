export const inventoryData = [\

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
  { "Item number": "AG750282", "Picture": "/images/products/AG750282.jpg", "Product name": "Angle grinder", "Spare part number": "AG750282-SP-22", "Spare parts name": "Bearing 629", "Spare parts Picture": "/images/spare-parts/AG750282-SP-22.jpg", "Suitable for": ["PS2408", "MC14008", "RS4508", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG71182", "Picture": "/images/products/AG71182.jpg", "Product name": "Angle grinder", "Spare part number": "AG71182-SP-11", "Spare parts name": "Needle Bearing HK0810", "Spare parts Picture": "/images/spare-parts/AG71182-SP-11.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG750282", "Picture": "/images/products/AG750282.jpg", "Product name": "Angle grinder", "Spare part number": "AG750282-SP-12", "Spare parts name": "Needle Bearing HK0810", "Spare parts Picture": "/images/spare-parts/AG750282-SP-12.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "RH150028", "Picture": "/images/products/RH150028.jpg", "Product name": "Rotary hammer", "Spare part number": "RH150028-SP-12", "Spare parts name": "bearing 61907-2RS", "Spare parts Picture": "/images/spare-parts/RH150028-SP-12.jpg", "Suitable for": ["RH16008", "RH150028", "RH18008"] },
  { "Item number": "RH16008", "Picture": "/images/products/RH16008.jpg", "Product name": "Rotary hammer", "Spare part number": "RH16008-SP-10", "Spare parts name": "bearing 61907-2RS", "Spare parts Picture": "/images/spare-parts/RH16008-SP-10.jpg", "Suitable for": ["RH16008", "RH150028", "RH18008"] },
  { "Item number": "AG750282", "Picture": "/images/products/AG750282.jpg", "Product name": "Angle grinder", "Spare part number": "AG750282-SP-9", "Spare parts name": "Bearing 6201", "Spare parts Picture": "/images/spare-parts/AG750282-SP-9.jpg", "Suitable for": ["AP14008", "PDB13008", "PDB17008", "PDB22001", "PBMIS14002", "DP133505", "AG900285"] },
  { "Item number": "PDB13008", "Picture": "/images/products/PDB13008.jpg", "Product name": "Demolition breaker", "Spare part number": "PDB13008-SP-48", "Spare parts name": "Rotor", "Spare parts Picture": "/images/spare-parts/PDB13008-SP-48.jpg", "Suitable for": ["PDB13008"] },
  { "Item number": "PDB13008", "Picture": "/images/products/PDB13008.jpg", "Product name": "Demolition breaker", "Spare part number": "PDB13008-SP-52", "Spare parts name": "Stator", "Spare parts Picture": "/images/spare-parts/PDB13008-SP-52.jpg", "Suitable for": ["PDB13008"] },
  { "Item number": "PDB13008", "Picture": "/images/products/PDB13008.jpg", "Product name": "Demolition breaker", "Spare part number": "PDB13008-SP-69", "Spare parts name": "Switch", "Spare parts Picture": "/images/spare-parts/PDB13008-SP-69.jpg", "Suitable for": ["PDB13008"] },
  { "Item number": "PDB22001", "Picture": "/images/products/PDB22001.jpg", "Product name": "Demolition breaker", "Spare part number": "PDB22001-SP-18", "Spare parts name": "Stator", "Spare parts Picture": "/images/spare-parts/PDB22001-SP-18.jpg", "Suitable for": ["PDB22001"] },
  { "Item number": "PDB22001", "Picture": "/images/products/PDB22001.jpg", "Product name": "Demolition breaker", "Spare part number": "PDB22001-SP-6", "Spare parts name": "Carbon Brush", "Spare parts Picture": "/images/spare-parts/PDB22001-SP-6.jpg", "Suitable for": ["PDB22001"] },
  { "Item number": "PDB22001", "Picture": "/images/products/PDB22001.jpg", "Product name": "Demolition breaker", "Spare part number": "PDB22001-SP-96", "Spare parts name": "Switch", "Spare parts Picture": "/images/spare-parts/PDB22001-SP-96.jpg", "Suitable for": ["PDB22001"] },
  { "Item number": "RH150028", "Picture": "/images/products/RH150028.jpg", "Product name": "Demolition breaker", "Spare part number": "RH150028-SP-3", "Spare parts name": "Steel Frame", "Spare parts Picture": "/images/spare-parts/RH150028-SP-3.jpg", "Suitable for": ["RH150068", "RH150028", "RH150038"] },
  { "Item number": "AG900282", "Picture": "/images/products/AG900282.jpg", "Product name": "Angle grinder", "Spare part number": "AG900282-SP-10", "Spare parts name": "Circlip φ32", "Spare parts Picture": "/images/spare-parts/AG900282-SP-10.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG900282", "Picture": "/images/products/AG900282.jpg", "Product name": "Angle grinder", "Spare part number": "AG900282-SP-19", "Spare parts name": "Nut M6", "Spare parts Picture": "/images/spare-parts/AG900282-SP-19.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028"] },
  { "Item number": "AG750282", "Picture": "/images/products/AG750282.jpg", "Product name": "Angle grinder", "Spare part number": "AG750282-SP-37", "Spare parts name": "Carbon brush holder", "Spare parts Picture": "/images/spare-parts/AG750282-SP-37.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG900282", "Picture": "/images/products/AG900282.jpg", "Product name": "Angle grinder", "Spare part number": "AG900282-SP-37", "Spare parts name": "Carbon brush holder", "Spare parts Picture": "/images/spare-parts/AG900282-SP-37.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG750282", "Picture": "/images/products/AG750282.jpg", "Product name": "Angle grinder", "Spare part number": "AG750282-SP-7", "Spare parts name": "Gear Box Cover", "Spare parts Picture": "/images/spare-parts/AG750282-SP-7.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG900282", "Picture": "/images/products/AG900282.jpg", "Product name": "Angle grinder", "Spare part number": "AG900282-SP-7", "Spare parts name": "Gear Box Cover", "Spare parts Picture": "/images/spare-parts/AG900282-SP-7.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG90028", "Picture": "/images/products/AG90028.jpg", "Product name": "Angle grinder", "Spare part number": "AG90028-SP-7", "Spare parts name": "Gear Box Cover", "Spare parts Picture": "/images/spare-parts/AG90028-SP-7.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG900282", "Picture": "/images/products/AG900282.jpg", "Product name": "Angle grinder", "Spare part number": "AG900282-SP-8", "Spare parts name": "O-Ring Φ46Xφ1", "Spare parts Picture": "/images/spare-parts/AG900282-SP-8.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG110038", "AG110028", "AG1100385"] },
  { "Item number": "AG750282", "Picture": "/images/products/AG750282.jpg", "Product name": "Angle grinder", "Spare part number": "AG750282-SP-18", "Spare parts name": "Gear Box", "Spare parts Picture": "/images/spare-parts/AG750282-SP-18.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG90028", "Picture": "/images/products/AG90028.jpg", "Product name": "Angle grinder", "Spare part number": "AG90028-SP-13", "Spare parts name": "Gear Box", "Spare parts Picture": "/images/spare-parts/AG90028-SP-13.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG750282", "Picture": "/images/products/AG750282.jpg", "Product name": "Angle grinder", "Spare part number": "AG750282-SP-13", "Spare parts name": "Screws St4X22", "Spare parts Picture": "/images/spare-parts/AG750282-SP-13.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG71182", "Picture": "/images/products/AG71182.jpg", "Product name": "Angle grinder", "Spare part number": "AG71182-SP-16", "Spare parts name": "Pin Cap", "Spare parts Picture": "/images/spare-parts/AG71182-SP-16.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG750282", "Picture": "/images/products/AG750282.jpg", "Product name": "Angle grinder", "Spare part number": "AG750282-SP-14", "Spare parts name": "Pin Cap", "Spare parts Picture": "/images/spare-parts/AG750282-SP-14.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG90028", "Picture": "/images/products/AG90028.jpg", "Product name": "Angle grinder", "Spare part number": "AG90028-SP-15", "Spare parts name": "Pin Cap", "Spare parts Picture": "/images/spare-parts/AG90028-SP-15.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG71182", "Picture": "/images/products/AG71182.jpg", "Product name": "Angle grinder", "Spare part number": "AG71182-SP-15", "Spare parts name": "Locking Spring", "Spare parts Picture": "/images/spare-parts/AG71182-SP-15.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG750282", "Picture": "/images/products/AG750282.jpg", "Product name": "Angle grinder", "Spare part number": "AG750282-SP-15", "Spare parts name": "Locking Spring", "Spare parts Picture": "/images/spare-parts/AG750282-SP-15.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG90028", "Picture": "/images/products/AG90028.jpg", "Product name": "Angle grinder", "Spare part number": "AG90028-SP-16", "Spare parts name": "Locking Spring", "Spare parts Picture": "/images/spare-parts/AG90028-SP-16.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG71182", "Picture": "/images/products/AG71182.jpg", "Product name": "Angle grinder", "Spare part number": "AG71182-SP-14", "Spare parts name": "O-Ring Φ6Xφ4Xφ1", "Spare parts Picture": "/images/spare-parts/AG71182-SP-14.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG110038", "AG110028", "AG1100385"] },
  { "Item number": "AG750282", "Picture": "/images/products/AG750282.jpg", "Product name": "Angle grinder", "Spare part number": "AG750282-SP-16", "Spare parts name": "O-Ring Φ6Xφ4Xφ1", "Spare parts Picture": "/images/spare-parts/AG750282-SP-16.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG110038", "AG110028", "AG1100385"] },
  { "Item number": "AG90028", "Picture": "/images/products/AG90028.jpg", "Product name": "Angle grinder", "Spare part number": "AG90028-SP-17", "Spare parts name": "O-Ring Φ6Xφ4Xφ1", "Spare parts Picture": "/images/spare-parts/AG90028-SP-17.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG110038", "AG110028", "AG1100385"] },
  { "Item number": "AG750282", "Picture": "/images/products/AG750282.jpg", "Product name": "Angle grinder", "Spare part number": "AG750282-SP-17", "Spare parts name": "Spindle Lock Pin", "Spare parts Picture": "/images/spare-parts/AG750282-SP-17.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028"] },
  { "Item number": "AG90028", "Picture": "/images/products/AG90028.jpg", "Product name": "Angle grinder", "Spare part number": "AG90028-SP-18", "Spare parts name": "Spindle Lock Pin", "Spare parts Picture": "/images/spare-parts/AG90028-SP-18.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028"] },
  { "Item number": "AG900282", "Picture": "/images/products/AG900282.jpg", "Product name": "Angle grinder", "Spare part number": "AG900282-SP-23", "Spare parts name": "Bearing Washer Φ26Xφ14X1", "Spare parts Picture": "/images/spare-parts/AG900282-SP-23.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028"] },
  { "Item number": "AG750282", "Picture": "/images/products/AG750282.jpg", "Product name": "Angle grinder", "Spare part number": "AG750282-SP-29", "Spare parts name": "Bushing", "Spare parts Picture": "/images/spare-parts/AG750282-SP-29.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG900282", "Picture": "/images/products/AG900282.jpg", "Product name": "Angle grinder", "Spare part number": "AG900282-SP-29", "Spare parts name": "Bushing", "Spare parts Picture": "/images/spare-parts/AG900282-SP-29.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG90028", "Picture": "/images/products/AG90028.jpg", "Product name": "Angle grinder", "Spare part number": "AG90028-SP-30", "Spare parts name": "Bushing", "Spare parts Picture": "/images/spare-parts/AG90028-SP-30.jpg", "Suitable for": ["AG90028", "AG750282", "AG900285", "AG900282", "AG71182"] },
  { "Item number": "AG750282", "Picture": "/images/products/AG750282.jpg", "Product name": "Angle grinder", "Spare part number": "AG750282-SP-30", "Spare parts name": "Wind Baffle", "Spare parts Picture": "/images/spare-parts/AG750282-SP-30.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028"] },
  { "Item number": "AG900282", "Picture": "/images/products/AG900282.jpg", "Product name": "Angle grinder", "Spare part number": "AG900282-SP-30", "Spare parts name": "Wind Baffle", "Spare parts Picture": "/images/spare-parts/AG900282-SP-30.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028"] },
  { "Item number": "AG90028", "Picture": "/images/products/AG90028.jpg", "Product name": "Angle grinder", "Spare part number": "AG90028-SP-34", "Spare parts name": "Housing", "Spare parts Picture": "/images/spare-parts/AG90028-SP-34.jpg", "Suitable for": ["AG900285", "AG90028"] },
  { "Item number": "AG90028", "Picture": "/images/products/AG90028.jpg", "Product name": "Angle grinder", "Spare part number": "AG90028-SP-42", "Spare parts name": "Motor Cover", "Spare parts Picture": "/images/spare-parts/AG90028-SP-42.jpg", "Suitable for": ["AG90028"] },
  { "Item number": "AG90028", "Picture": "/images/products/AG90028.jpg", "Product name": "Angle grinder", "Spare part number": "AG90028-SP-45", "Spare parts name": "Switch Knob", "Spare parts Picture": "/images/spare-parts/AG90028-SP-45.jpg", "Suitable for": ["AG900285", "AG90028"] },
  { "Item number": "AG90028", "Picture": "/images/products/AG90028.jpg", "Product name": "Angle grinder", "Spare part number": "AG90028-SP-46", "Spare parts name": "Pole", "Spare parts Picture": "/images/spare-parts/AG90028-SP-46.jpg", "Suitable for": ["AG900285", "AG90028"] },
  { "Item number": "AG750282", "Picture": "/images/products/AG750282.jpg", "Product name": "Angle grinder", "Spare part number": "AG750282-SP-4", "Spare parts name": "Output Shaft", "Spare parts Picture": "/images/spare-parts/AG750282-SP-4.jpg", "Suitable for": ["AG900282", "AG750282", "AG71182", "AG900285", "AG90028"] },
  { "Item number": "AG900282", "Picture": "/images/products/AG900282.jpg", "Product name": "Angle grinder", "Spare part number": "AG900282-SP-4", "Spare parts name": "Output Shaft", "Spare parts Picture": "/images/spare-parts/AG900282-SP-4.jpg", "Suitable for": ["AG900282", "AG750282", "AG71182", "AG900285", "AG90028"] },
  { "Item number": "AG750282", "Picture": "/images/products/AG750282.jpg", "Product name": "Angle grinder", "Spare part number": "AG750282-SP-38", "Spare parts name": "Carbon Brush", "Spare parts Picture": "/images/spare-parts/AG750282-SP-38.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028"] },
  { "Item number": "AG900282", "Picture": "/images/products/AG900282.jpg", "Product name": "Angle grinder", "Spare part number": "AG900282-SP-38", "Spare parts name": "Carbon Brush", "Spare parts Picture": "/images/spare-parts/AG900282-SP-38.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028"] },
  { "Item number": "AG10108", "Picture": "/images/products/AG10108.jpg", "Product name": "Angle grinder", "Spare part number": "AG10108-SP-10/21", "Spare parts name": "Gear/Pinion", "Spare parts Picture": "/images/spare-parts/AG10108-SP-10-21.jpg", "Suitable for": ["AG900285", "AG900282", "AG750282", "AG90028", "AG71182"] },
  { "Item number": "AG71182", "Picture": "/images/products/AG71182.jpg", "Product name": "Angle grinder", "Spare part number": "AG71182-SP-10", "Spare parts name": "Gear/Pinion", "Spare parts Picture": "/images/spare-parts/AG71182-SP-10.jpg", "Suitable for": ["AG900282", "AG750282", "AG71182", "AG900285", "AG90028"] },
  { "Item number": "AG750282", "Picture": "/images/products/AG750282.jpg", "Product name": "Angle grinder", "Spare part number": "AG750282-SP-11/20", "Spare parts name": "Gear/Pinion", "Spare parts Picture": "/images/spare-parts/AG750282-SP-11-20.jpg", "Suitable for": ["AG900282", "AG750282", "AG71182", "AG900285", "AG90028"] },
  { "Item number": "AG900282", "Picture": "/images/products/AG900282.jpg", "Product name": "Angle grinder", "Spare part number": "AG900282-SP-11/20", "Spare parts name": "Gear/Pinion", "Spare parts Picture": "/images/spare-parts/AG900282-SP-11-20.jpg", "Suitable for": ["AG900282", "AG8006", "AG110018", "AG750282", "AG900285", "AG90028", "AG71182"] },
  { "Item number": "AG8006", "Picture": "/images/products/AG8006.jpg", "Product name": "Angle grinder", "Spare part number": "AG8006-SP-22", "Spare parts name": "Rotor", "Spare parts Picture": "/images/spare-parts/AG8006-SP-22.jpg", "Suitable for": ["AG900282", "AG90028", "AG10108", "AG750282"] },
  { "Item number": "AG110018", "Picture": "/images/products/AG110018.jpg", "Product name": "Angle grinder", "Spare part number": "AG110018-SP-25", "Spare parts name": "Rotor Armature", "Spare parts Picture": "/images/spare-parts/AG110018-SP-25.jpg", "Suitable for": ["AG900282", "AG90028", "AG750282"] },
  { "Item number": "AG750282", "Picture": "/images/products/AG750282.jpg", "Product name": "Angle grinder", "Spare part number": "AG750282-SP-25", "Spare parts name": "Rotor", "Spare parts Picture": "/images/spare-parts/AG750282-SP-25.jpg", "Suitable for": ["AG900282", "AP14008"] },
  { "Item number": "AG900282", "Picture": "/images/products/AG900282.jpg", "Product name": "Angle grinder", "Spare part number": "AG900282-SP-25", "Spare parts name": "Rotor", "Spare parts Picture": "/images/spare-parts/AG900282-SP-25.jpg", "Suitable for": ["AG900282", "AG750282"] },
  { "Item number": "AG90028", "Picture": "/images/products/AG90028.jpg", "Product name": "Angle grinder", "Spare part number": "AG90028-SP-26", "Spare parts name": "Rotor", "Spare parts Picture": "/images/spare-parts/AG90028-SP-26.jpg", "Suitable for": ["AG900282", "AG750282"] },
  { "Item number": "AG10108", "Picture": "/images/products/AG10108.jpg", "Product name": "Angle grinder", "Spare part number": "AG10108-SP-28", "Spare parts name": "Stator", "Spare parts Picture": "/images/spare-parts/AG10108-SP-28.jpg", "Suitable for": ["AG900282", "AG750282"] },
  { "Item number": "AG750282", "Picture": "/images/products/AG750282.jpg", "Product name": "Angle grinder", "Spare part number": "AG750282-SP-32", "Spare parts name": "Stator", "Spare parts Picture": "/images/spare-parts/AG750282-SP-32.jpg", "Suitable for": ["AG900282", "AG750282"] },
  { "Item number": "AG900282", "Picture": "/images/products/AG900282.jpg", "Product name": "Angle grinder", "Spare part number": "AG900282-SP-32", "Spare parts name": "Stator", "Spare parts Picture": "/images/spare-parts/AG900282-SP-32.jpg", "Suitable for": ["AG900282", "AG750282"] },
  { "Item number": "AG90028", "Picture": "/images/products/AG90028.jpg", "Product name": "Angle grinder", "Spare part number": "AG90028-SP-35", "Spare parts name": "Switch", "Spare parts Picture": "/images/spare-parts/AG90028-SP-35.jpg", "Suitable for": ["AG900285", "AG90028", "AG900282", "AG750282"] },
  { "Item number": "AG750282", "Picture": "/images/products/AG750282.jpg", "Product name": "Angle grinder", "Spare part number": "AG750282-SP-35", "Spare parts name": "Switch", "Spare parts Picture": "/images/spare-parts/AG750282-SP-35.jpg", "Suitable for": ["AG900282", "AG750282", "AG71182", "AG900285", "AG90028"] },
  { "Item number": "AG900282", "Picture": "/images/products/AG900282.jpg", "Product name": "Angle grinder", "Spare part number": "AG900282-SP-35", "Spare parts name": "Switch", "Spare parts Picture": "/images/spare-parts/AG900282-SP-35.jpg", "Suitable for": ["AG900282", "AG750282", "AG71182", "AP14008", "AG900285", "AG90028"] },
  { "Item number": "AP14008", "Picture": "/images/products/AP14008.jpg", "Product name": "Polisher", "Spare part number": "AP14008-SP-4", "Spare parts name": "Rotor", "Spare parts Picture": "/images/spare-parts/AP14008-SP-4.jpg", "Suitable for": ["AP14008"] },
  { "Item number": "AG150018", "Picture": "/images/products/AG150018.jpg", "Product name": "Angle grinder", "Spare part number": "AG150018-SP-27", "Spare parts name": "Rotor", "Spare parts Picture": "/images/spare-parts/AG150018-SP-27.jpg", "Suitable for": ["AG150018"] },
  { "Item number": "AP14008", "Picture": "/images/products/AP14008.jpg", "Product name": "Polisher", "Spare part number": "AP14008-SP-29", "Spare parts name": "Stator", "Spare parts Picture": "/images/spare-parts/AP14008-SP-29.jpg", "Suitable for": ["AP14008"] },
];
