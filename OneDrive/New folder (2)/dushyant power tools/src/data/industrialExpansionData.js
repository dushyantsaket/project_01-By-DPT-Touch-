import { tataAgricoData } from './tataAgricoData';

export const industrialExpansionData = [
  ...tataAgricoData.filter(i => i.category === 'welding-tools').map(i => ({...i, category: "Welding & Industrial"})),
  // --- Welding Machines ---
  {
    "id": "msng9vn4p1edkp",
    "sku": "M200-105",
    "name": "iBELL M200-105 IGBT Inverter 2 in 1 Flux Core/Solid Wire MAG Welding Machine",
    "image_url": "https://cdn.moglix.com/p/o0Awh6Q8zy0zi-medium.jpg",
    "product_url": "https://www.moglix.com/ibell-m200-105-igbt-inverter-2-in-1-flux-core-solid-wire-mag-welding-machine-with-2-years-warranty/mp/msng9vn4p1edkp",
    "rating": 4.7,
    "reviewCount": 20,
    "sale_price": "₹12,699",
    "regular_price": "₹17,900",
    "discount": "29% OFF",
    "category": "Welding & Industrial",
    "sub_category": "Welding Machines",
    "brand": "iBELL"
  },
  {
    "id": "msn19z2q6rr853",
    "sku": "VR-M200-21",
    "name": "Vormir 200A Inverter MMA/MAG & TIG Welding Machine with Hot Start",
    "image_url": "https://cdn.moglix.com/p/POP1moUWfiFIK-medium.jpg",
    "product_url": "https://www.moglix.com/vormir-200a-inverter-mma-mag-tig-welding-machine-with-hot-start-anti-stick-functions-vr-m200-21/mp/msn19z2q6rr853",
    "rating": 4.8,
    "reviewCount": 33,
    "sale_price": "₹8,185",
    "regular_price": "₹16,500",
    "discount": "50% OFF",
    "category": "Welding & Industrial",
    "sub_category": "Welding Machines",
    "brand": "Vormir"
  },

  // --- Cordless Tools ---
  {
    "id": "ING-CD-20",
    "sku": "CD-20",
    "name": "Ingco 20V Cordless Lithium-Ion Drill Machine with 2 Batteries",
    "image_url": "https://images.unsplash.com/photo-1504148455328-497c5ae69495?auto=format&fit=crop&q=80&w=400",
    "rating": 4.8,
    "reviewCount": 45,
    "sale_price": "₹4,899",
    "regular_price": "₹7,500",
    "category": "Welding & Industrial",
    "sub_category": "Cordless Tools",
    "brand": "Ingco"
  },
  {
    "id": "IB-ID-20",
    "sku": "ID-20",
    "name": "iBELL 20V Cordless Brushless Impact Drill, Heavy Duty",
    "image_url": "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=400",
    "rating": 4.9,
    "reviewCount": 28,
    "sale_price": "₹6,400",
    "regular_price": "₹9,200",
    "category": "Welding & Industrial",
    "sub_category": "Cordless Tools",
    "brand": "iBELL"
  },
  {
    "id": "ING-CG-20",
    "sku": "CG-20",
    "name": "Ingco 20V Cordless Brushless Angle Grinder, 100mm",
    "image_url": "https://images.unsplash.com/photo-1572206114142-f3bd049b49f9?auto=format&fit=crop&q=80&w=400",
    "rating": 4.7,
    "reviewCount": 15,
    "sale_price": "₹7,200",
    "regular_price": "₹11,500",
    "category": "Welding & Industrial",
    "sub_category": "Cordless Tools",
    "brand": "Ingco"
  },
  {
    "id": "ING-CSD-4",
    "sku": "CSD-4",
    "name": "Ingco 4V Cordless Screwdriver with 40pcs Bits Set",
    "image_url": "https://images.unsplash.com/photo-1542382156909-92c2a47ff992?auto=format&fit=crop&q=80&w=400",
    "rating": 4.5,
    "reviewCount": 62,
    "sale_price": "₹1,850",
    "regular_price": "₹2,900",
    "category": "Welding & Industrial",
    "sub_category": "Cordless Tools",
    "brand": "Ingco"
  },

  // --- Air Blowers & Heat Guns ---
  {
    "id": "IB-AB-600",
    "sku": "AB-600",
    "name": "iBELL 600W Electric Air Blower with Vacuum Function",
    "image_url": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400",
    "rating": 4.6,
    "reviewCount": 85,
    "sale_price": "₹1,450",
    "regular_price": "₹2,200",
    "category": "Welding & Industrial",
    "sub_category": "Blowers & Heat Guns",
    "brand": "iBELL"
  },
  {
    "id": "ING-HG-2000",
    "sku": "HG-2000",
    "name": "Ingco 2000W Industrial Heat Gun with Variable Temperature",
    "image_url": "https://images.unsplash.com/photo-1530124560677-bdaeaeb2fd91?auto=format&fit=crop&q=80&w=400",
    "rating": 4.7,
    "reviewCount": 34,
    "sale_price": "₹1,699",
    "regular_price": "₹2,500",
    "category": "Welding & Industrial",
    "sub_category": "Blowers & Heat Guns",
    "brand": "Ingco"
  },

  // --- Welding Accessories ---
  {
    "id": "GCT-101",
    "sku": "GCT-101",
    "name": "Professional Gas Cutting Torch with Tips",
    "image_url": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=400",
    "rating": 4.4,
    "reviewCount": 12,
    "sale_price": "₹2,400",
    "regular_price": "₹3,800",
    "category": "Welding & Industrial",
    "sub_category": "Welding Accessories",
    "brand": "Generic"
  },
  {
    "id": "WE-6013-10",
    "sku": "6013-10",
    "name": "Mild Steel Welding Electrodes 6013, 10kg Pack",
    "image_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400",
    "rating": 4.8,
    "reviewCount": 110,
    "sale_price": "₹1,800",
    "regular_price": "₹2,400",
    "category": "Welding & Industrial",
    "sub_category": "Welding Accessories",
    "brand": "Ador"
  },
  {
    "id": "EH-600A",
    "sku": "EH-600A",
    "name": "Heavy Duty 600A Welding Electrode Holder",
    "image_url": "https://images.unsplash.com/photo-1590477943249-01a58f9f19a5?auto=format&fit=crop&q=80&w=400",
    "rating": 4.5,
    "reviewCount": 42,
    "sale_price": "₹450",
    "regular_price": "₹750",
    "category": "Welding & Industrial",
    "sub_category": "Welding Accessories",
    "brand": "Sceptre"
  },

  // --- Other Industrial ---
  {
    "id": "msn2w6jmk95to3",
    "sku": "BREEZE-PBM-1",
    "name": "Breeze 1-2.5mm Mild Steel Manual Pipe Bending Machine",
    "image_url": "https://cdn.moglix.com/p/YsFPiUC1VGhvC-medium.jpg",
    "product_url": "https://www.moglix.com/breeze-1-25mm-mild-steel-manual-pipe-bending-machine/mp/msn2w6jmk95to3",
    "rating": 4.7,
    "reviewCount": 16,
    "sale_price": "₹6,900",
    "regular_price": "₹17,000",
    "discount": "59% OFF",
    "category": "Welding & Industrial",
    "sub_category": "Bending Machines",
    "brand": "Breeze"
  },
  {
    "id": "ML-100",
    "sku": "ML-100",
    "name": "Industrial 100kg Permanent Magnetic Lifter",
    "image_url": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400",
    "rating": 4.9,
    "reviewCount": 8,
    "sale_price": "₹4,500",
    "regular_price": "₹6,800",
    "category": "Welding & Industrial",
    "sub_category": "Lifting & Support",
    "brand": "Generic"
  },
  {
    "id": "CB-1T-3M",
    "sku": "CB-1T-3M",
    "name": "Heavy Duty 1 Ton Manual Chain Block, 3m Lift",
    "image_url": "https://images.unsplash.com/photo-1504148455328-497c5ae69495?auto=format&fit=crop&q=80&w=400",
    "rating": 4.7,
    "reviewCount": 15,
    "sale_price": "₹3,200",
    "regular_price": "₹4,500",
    "category": "Welding & Industrial",
    "sub_category": "Lifting & Support",
    "brand": "Generic"
  },
  {
    "id": "WE-WS-L",
    "sku": "WS-L",
    "name": "Heavy Duty Leather Welding Sheet (4x6 ft)",
    "image_url": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=400",
    "rating": 4.6,
    "reviewCount": 18,
    "sale_price": "₹2,800",
    "regular_price": "₹4,200",
    "category": "Welding & Industrial",
    "sub_category": "Welding Accessories",
    "brand": "Generic"
  },
  {
    "id": "WE-WB-P",
    "sku": "WB-P",
    "name": "Portable Welding Fume Extractor Blower",
    "image_url": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400",
    "rating": 4.7,
    "reviewCount": 9,
    "sale_price": "₹5,600",
    "regular_price": "₹8,500",
    "category": "Welding & Industrial",
    "sub_category": "Welding Accessories",
    "brand": "iBELL"
  }
];
