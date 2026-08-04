const API = 'http://localhost:5001/api';

const sampleProducts = [
  {
    name: "Bosch GST 90 E Jigsaw",
    category: "power-tools",
    brand: "Bosch",
    price_inr: 8500,
    mrp_inr: 12000,
    stock_quantity: 15,
    description: "Professional Jigsaw with power 650W, stroke length 90mm, stroke rate 500-3000spm",
    image: "https://via.placeholder.com/300x300?text=Bosch+Jigsaw"
  },
  {
    name: "Dewalt DCD791D2 Cordless Drill",
    category: "cordless-tools",
    brand: "DeWalt",
    price_inr: 6500,
    mrp_inr: 9999,
    stock_quantity: 20,
    description: "Compact 12V cordless drill with 2 batteries, charger and carrying bag",
    image: "https://via.placeholder.com/300x300?text=DeWalt+Drill"
  },
  {
    name: "Makita HR2455 SDS Drill",
    category: "power-tools",
    brand: "Makita",
    price_inr: 7200,
    mrp_inr: 10500,
    stock_quantity: 12,
    description: "Heavy duty SDS rotary hammer drill with 24mm chuck, 780W",
    image: "https://via.placeholder.com/300x300?text=Makita+Drill"
  },
  {
    name: "Stanley Hand Tool Set 100pc",
    category: "hand-tools",
    brand: "Stanley",
    price_inr: 3500,
    mrp_inr: 5999,
    stock_quantity: 50,
    description: "Comprehensive 100-piece hand tool set with hammers, wrenches, screwdrivers and more",
    image: "https://via.placeholder.com/300x300?text=Stanley+Tools"
  },
  {
    name: "Taparia Pliers Set 7pc",
    category: "hand-tools",
    brand: "Taparia",
    price_inr: 1200,
    mrp_inr: 1999,
    stock_quantity: 100,
    description: "7-piece premium pliers set including slip-joint, cutting, curved needle-nose",
    image: "https://via.placeholder.com/300x300?text=Pliers+Set"
  },
  {
    name: "Bahco Adjustable Spanner Set",
    category: "hand-tools",
    brand: "Bahco",
    price_inr: 2800,
    mrp_inr: 4500,
    stock_quantity: 40,
    description: "Set of 4 adjustable spanners from 200mm to 300mm",
    image: "https://via.placeholder.com/300x300?text=Spanner+Set"
  },
  {
    name: "Bosch Angle Grinder GWS 1000",
    category: "power-tools",
    brand: "Bosch",
    price_inr: 5200,
    mrp_inr: 7999,
    stock_quantity: 25,
    description: "1000W angle grinder with 115mm disc, paddle switch, for grinding and cutting",
    image: "https://via.placeholder.com/300x300?text=Angle+Grinder"
  },
  {
    name: "Metabo Circular Saw KS 66",
    category: "power-tools",
    brand: "Metabo",
    price_inr: 4500,
    mrp_inr: 6999,
    stock_quantity: 18,
    description: "1200W circular saw with 190mm blade, laser marking, for wood and plastic cutting",
    image: "https://via.placeholder.com/300x300?text=Circular+Saw"
  },
  {
    name: "Kuvera Compact Tool Box",
    category: "storage",
    brand: "Kuvera",
    price_inr: 1500,
    mrp_inr: 2299,
    stock_quantity: 60,
    description: "Plastic toolbox with compartments, 16 inch, lightweight and durable",
    image: "https://via.placeholder.com/300x300?text=Toolbox"
  },
  {
    name: "3M Safety Helmet Yellow",
    category: "safety",
    brand: "3M",
    price_inr: 650,
    mrp_inr: 999,
    stock_quantity: 200,
    description: "Industrial safety helmet with suspension, adjustable headband",
    image: "https://via.placeholder.com/300x300?text=Safety+Helmet"
  },
  {
    name: "Safety Gloves Leather",
    category: "safety",
    brand: "DPT",
    price_inr: 350,
    mrp_inr: 599,
    stock_quantity: 150,
    description: "Premium leather work gloves with reinforced palm for protection",
    image: "https://via.placeholder.com/300x300?text=Work+Gloves"
  },
  {
    name: "Diamond Cutting Blade 115mm",
    category: "accessories",
    brand: "Bosch",
    price_inr: 450,
    mrp_inr: 749,
    stock_quantity: 80,
    description: "Segmented diamond blade for cutting concrete, stone and tile",
    image: "https://via.placeholder.com/300x300?text=Diamond+Blade"
  },
];

async function addProducts() {
  console.log('Starting to add sample products...\n');
  
  // Login first
  console.log('🔐 Authenticating as admin...');
  let token = null;
  try {
    const loginRes = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'Dushyant', password: 'password123' })
    });
    
    if (loginRes.ok) {
      const loginData = await loginRes.json();
      token = loginData.token;
      console.log('✓ Authenticated successfully\n');
    } else {
      const error = await loginRes.json();
      console.log('✗ Authentication failed:', error.error);
      return;
    }
  } catch (error) {
    console.log('✗ Authentication error:', error.message);
    return;
  }

  // Add products
  for (const product of sampleProducts) {
    try {
      const response = await fetch(`${API}/products`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...product,
          isActive: true,
          isAdminAdded: true
        }),
      });
      
      if (response.ok) {
        const saved = await response.json();
        console.log(`✓ Added: ${product.name}`);
      } else {
        const error = await response.text();
        console.log(`✗ Failed: ${product.name} - ${response.status}`);
      }
    } catch (error) {
      console.log(`✗ Error: ${product.name} - ${error.message}`);
    }
  }
  
  console.log('\n✅ Done! All sample products have been processed.');
}

addProducts();
