/**
 * import_catalog.js
 * Seeds MongoDB with ALL products from the frontend catalog data files.
 * Run from the /backend directory:
 *   node import_catalog.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

// ── Import all data files from frontend ──────────────────────────────────────
import { ingcoData } from '../src/data/ingcoData.js';
import { premiumBrandsData } from '../src/data/premiumBrandsData.js';
import { handToolsData } from '../src/data/handToolsData.js';
import { agricultureGardenData } from '../src/data/agricultureGardenData.js';
import { akariAbrasivesData } from '../src/data/akariAbrasivesData.js';
import { gcWheelsData } from '../src/data/gcWheelsData.js';
import { polishingPadsData } from '../src/data/polishingPadsData.js';
import { sandPaperData } from '../src/data/sandPaperData.js';
import { bladesData } from '../src/data/blades.js';
import { newDiamondBlades } from '../src/data/newDiamondBlades.js';
import { unboxDiamondBlades } from '../src/data/unboxDiamondBlades.js';
import { angleGrindersData } from '../src/data/angleGrindersData.js';
import { cordlessData } from '../src/data/cordlessData.js';
import { planersData } from '../src/data/planersData.js';
import { xtraPowerData } from '../src/data/xtraPowerData.js';
import { allProductsEditionData } from '../src/data/allProductsEditionData.js';
import { miscProducts } from '../src/data/miscProductsData.js';
import { allenKeysData } from '../src/data/allenKeysData.js';
import { chiselsPunchesData } from '../src/data/chiselsPunchesData.js';
import { clampsVicesData } from '../src/data/clampsVicesData.js';
import { diesTapsData } from '../src/data/diesTapsData.js';
import { filesData } from '../src/data/filesData.js';
import { greaseGunsPumpsData } from '../src/data/greaseGunsPumpsData.js';
import { hacksawFramesBladesData } from '../src/data/hacksawFramesBladesData.js';
import { pliersCuttersData } from '../src/data/pliersCuttersData.js';
import { ratchetSocketsData } from '../src/data/ratchetSocketsData.js';
import { spannersWrenchesData } from '../src/data/spannersWrenchesData.js';
import { toolKitsData } from '../src/data/toolKitsData.js';
import { accessoriesData } from '../src/data/accessoriesData.js';
import { armatureData } from '../src/data/armatureData.js';
import { carbonBrushes } from '../src/data/carbonBrushesData.js';
import { grinderPartsData } from '../src/data/grinderPartsData.js';
import { agriculturalPartsData } from '../src/data/agriculturalPartsData.js';
import { tataAgricoData } from '../src/data/tataAgricoData.js';
import { safetyData } from '../src/data/safetyData.js';
import { storageData } from '../src/data/storageData.js';
import { akariSpecialOffersData } from '../src/data/akariSpecialOffersData.js';
import { industrialExpansionData } from '../src/data/industrialExpansionData.js';
import { dashboardProducts as dashboardProductsRaw } from '../src/data/dashboardProducts.js';
import TapariaToolsAPI from '../src/data/taparia-tools-api.js';

// ── Slug helper ───────────────────────────────────────────────────────────────
function toSlug(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ── Normalize a raw product to match the Mongoose Product schema ──────────────
function normalizeProduct(raw, index) {
  const image =
    raw.image ||
    raw.image_url ||
    raw.Picture ||
    'https://images.unsplash.com/photo-1542382156909-92c2a47ff992?auto=format&fit=crop&q=80&w=400';

  let price = raw.price_inr;
  if (price == null || price === 'Login to See Price') {
    price =
      raw.sale_price != null
        ? parseFloat(String(raw.sale_price).replace(/[^\d.]/g, '')) || 0
        : raw.price != null
          ? parseFloat(String(raw.price).replace(/[^\d.]/g, '')) || 0
          : raw.mrp != null
            ? Number(raw.mrp) || 0
            : 0;
  }
  price = typeof price === 'number' ? price : parseFloat(price) || 0;

  const mrp = parseFloat(String(raw.mrp_inr || raw.regular_price || raw.mrp || price).replace(/[^\d.]/g, '')) || 0;

  const category = String(raw.category || 'general')
    .toLowerCase()
    .replace(/\s+/g, '-');

  const rawId =
    raw.id != null ? String(raw.id) : raw._id ? String(raw._id) : null;

  // Build a unique slug: use name + index suffix to prevent collisions
  const baseSlug = toSlug(raw.name || `product-${index}`);
  const slug = `${baseSlug}-${index}`;

  // Build a unique productId — always unique by appending index
  const productId = `CAT-${index}-${baseSlug}`.slice(0, 100);

  const stockQty = Number(raw.stock_quantity ?? 50);

  return {
    name: String(raw.name || 'Unnamed Product').trim(),
    slug,
    productId,
    brand: raw.brand || raw.make || 'DPT Original',
    category,
    subCategory: raw.sub_category || raw.subCategory || '',
    description: String(raw.description || raw.spec || raw.feature || '').slice(0, 1000),
    price_inr: price,
    mrp_inr: mrp || price,
    discount: mrp > 0 && price > 0 && mrp > price
      ? Math.round(((mrp - price) / mrp) * 100)
      : 0,
    image,
    images: raw.images || (image ? [image] : []),
    stock_quantity: stockQty,
    sold_quantity: Number(raw.sold_quantity || 0),
    stockStatus: stockQty <= 0 ? 'Out of Stock' : stockQty < 5 ? 'Low Stock' : 'In Stock',
    voltage: raw.voltage || '',
    noLoadSpeed: raw.noLoadSpeed || '',
    spec: raw.spec || '',
    feature: raw.feature || '',
    includes: raw.includes || '',
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    isActive: raw.isActive !== false,
    isAdminAdded: false,
    status: 'active',
  };
}

// ── Assemble all raw products ─────────────────────────────────────────────────
const measuringToolsData = (TapariaToolsAPI.getAllSpiritLevels?.() || []).map((item) => ({
  id: item.id,
  name: item.name,
  brand: 'Taparia',
  category: 'measuring-tools',
  sub_category: 'Spirit Levels',
  description: item.description,
  image:
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=600',
}));

const dashboardProducts = (dashboardProductsRaw || []).map((p, i) => ({
  id: `DASH-${p.sku || i}`,
  name: p.title || p.name || 'Product',
  image: (p.images && p.images[0]) || p.image || '',
  brand: p.brand || 'Tata Agrico',
  category: 'all-products',
  sub_category: (p.categories && p.categories[0]) || 'General',
  price_inr: p.finalPrice || p.price_inr || 0,
  regular_price: p.regularPrice || null,
  description: p.keyFeatures || '',
}));

const cordlessProducts = Array.isArray(cordlessData?.products)
  ? cordlessData.products.map((p) => ({
      id: p.productId,
      name: p.name,
      image: p.image,
      brand: 'Ingco',
      category: 'cordless-tools',
      sub_category: 'Cordless Tools',
      description: [
        p.description?.feature,
        p.description?.voltage ? `Voltage: ${p.description.voltage}` : null,
        p.description?.spec,
      ]
        .filter(Boolean)
        .join(' | '),
      price_inr: 0,
      tags: p.tags || [],
    }))
  : [];

const allRaw = [
  ...ingcoData,
  ...premiumBrandsData,
  ...handToolsData,
  ...agricultureGardenData,
  ...(akariAbrasivesData || []),
  ...(gcWheelsData || []),
  ...(polishingPadsData || []),
  ...(sandPaperData || []),
  ...bladesData,
  ...newDiamondBlades,
  ...unboxDiamondBlades,
  ...angleGrindersData,
  ...cordlessProducts,
  ...(planersData || []),
  ...(xtraPowerData || []),
  ...allProductsEditionData,
  ...miscProducts,
  ...(allenKeysData || []),
  ...(chiselsPunchesData || []),
  ...(clampsVicesData || []),
  ...(diesTapsData || []),
  ...(filesData || []),
  ...(greaseGunsPumpsData || []),
  ...(hacksawFramesBladesData || []),
  ...(pliersCuttersData || []),
  ...(ratchetSocketsData || []),
  ...(spannersWrenchesData || []),
  ...(toolKitsData || []),
  ...(accessoriesData || []),
  ...armatureData,
  ...(carbonBrushes || []),
  ...(grinderPartsData || []),
  ...(agriculturalPartsData || []),
  ...(tataAgricoData || []),
  ...safetyData,
  ...storageData,
  ...measuringToolsData,
  ...(akariSpecialOffersData || []),
  ...(industrialExpansionData || []),
  ...dashboardProducts,
  // Edition/cross-category duplicates (for catalog filtering)
  ...handToolsData.map((p) => ({ ...p, category: 'hand-tools-edition' })),
  ...ratchetSocketsData.map((p) => ({ ...p, category: 'hand-tools-edition' })),
  ...spannersWrenchesData.map((p) => ({ ...p, category: 'hand-tools-edition' })),
  ...allenKeysData.map((p) => ({ ...p, category: 'hand-tools-edition' })),
  ...industrialExpansionData
    .filter((p) => p.sub_category === 'Lifting & Support')
    .map((p) => ({ ...p, category: 'lifting-equipments-edition' })),
  ...industrialExpansionData
    .filter(
      (p) =>
        p.name?.toLowerCase().includes('air') ||
        p.sub_category?.toLowerCase().includes('pneumatic'),
    )
    .map((p) => ({ ...p, category: 'pneumatic-tools-edition' })),
  ...allProductsEditionData
    .filter(
      (p) =>
        p.name?.toLowerCase().includes('air') ||
        p.sub_category?.toLowerCase().includes('pneumatic'),
    )
    .map((p) => ({ ...p, category: 'pneumatic-tools-edition' })),
];

// ── Main import function ─────────────────────────────────────────────────────
async function importCatalog() {
  const MONGO_URI =
    process.env.MONGO_URI || 'mongodb://localhost:27017/dushyant_power_tools';

  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log(' 🚀 DPT Catalog Import Script');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`📡 Connecting to: ${MONGO_URI}`);

  await mongoose.connect(MONGO_URI);
  console.log('✅ MongoDB connected!\n');

  const db = mongoose.connection.db;

  // 1. Normalize all products and de-duplicate by slug/productId
  console.log(`📦 Total raw product entries: ${allRaw.length}`);
  const normalizedMap = new Map();
  allRaw.forEach((raw, index) => {
    const doc = normalizeProduct(raw, index);
    if (!normalizedMap.has(doc.slug)) {
      normalizedMap.set(doc.slug, doc);
    }
  });

  const toInsert = Array.from(normalizedMap.values());
  console.log(`✨ Unique products after deduplication: ${toInsert.length}`);

  // 2. Clear existing products
  console.log('\n🗑️  Clearing existing products collection...');
  const deleteResult = await db.collection('products').deleteMany({});
  console.log(`   Deleted ${deleteResult.deletedCount} existing product(s).`);

  // 3. Bulk insert in batches of 500
  const BATCH_SIZE = 500;
  let inserted = 0;
  for (let i = 0; i < toInsert.length; i += BATCH_SIZE) {
    const batch = toInsert.slice(i, i + BATCH_SIZE);
    await db.collection('products').insertMany(batch, { ordered: false });
    inserted += batch.length;
    console.log(`   ✓ Inserted batch ${Math.ceil(i / BATCH_SIZE) + 1}: ${inserted}/${toInsert.length} products`);
  }

  // 4. Final count verification
  const finalCount = await db.collection('products').countDocuments();
  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`✅ IMPORT COMPLETE! Total products in DB: ${finalCount}`);
  console.log('═══════════════════════════════════════════════════════');

  await mongoose.disconnect();
  process.exit(0);
}

importCatalog().catch((err) => {
  console.error('❌ Import failed:', err.message);
  process.exit(1);
});
