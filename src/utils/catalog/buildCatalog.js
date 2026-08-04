import { ingcoData } from '../../data/ingcoData.js';
import { premiumBrandsData } from '../../data/premiumBrandsData.js';
import { handToolsData } from '../../data/handToolsData.js';
import { agricultureGardenData } from '../../data/agricultureGardenData.js';

import { akariAbrasivesData } from '../../data/akariAbrasivesData.js';
import { gcWheelsData } from '../../data/gcWheelsData.js';
import { polishingPadsData } from '../../data/polishingPadsData.js';
import { sandPaperData } from '../../data/sandPaperData.js';
import { bladesData } from '../../data/blades.js';
import { newDiamondBlades } from '../../data/newDiamondBlades.js';
import { unboxDiamondBlades } from '../../data/unboxDiamondBlades.js';

import { angleGrindersData } from '../../data/angleGrindersData.js';
import { cordlessData } from '../../data/cordlessData.js';
import { planersData } from '../../data/planersData.js';
import { xtraPowerData } from '../../data/xtraPowerData.js';
import { allProductsEditionData } from '../../data/allProductsEditionData.js';
import { miscProducts } from '../../data/miscProductsData.js';

import { allenKeysData } from '../../data/allenKeysData.js';
import { chiselsPunchesData } from '../../data/chiselsPunchesData.js';
import { clampsVicesData } from '../../data/clampsVicesData.js';
import { diesTapsData } from '../../data/diesTapsData.js';
import { filesData } from '../../data/filesData.js';
import { greaseGunsPumpsData } from '../../data/greaseGunsPumpsData.js';
import { hacksawFramesBladesData } from '../../data/hacksawFramesBladesData.js';
import { pliersCuttersData } from '../../data/pliersCuttersData.js';
import { ratchetSocketsData } from '../../data/ratchetSocketsData.js';
import { spannersWrenchesData } from '../../data/spannersWrenchesData.js';
import { toolKitsData } from '../../data/toolKitsData.js';
import { accessoriesData } from '../../data/accessoriesData.js';

import { armatureData } from '../../data/armatureData.js';
import { carbonBrushes } from '../../data/carbonBrushesData.js';
import { grinderPartsData } from '../../data/grinderPartsData.js';

import { agriculturalPartsData } from '../../data/agriculturalPartsData.js';
import { tataAgricoData } from '../../data/tataAgricoData.js';

import { safetyData } from '../../data/safetyData.js';
import { storageData } from '../../data/storageData.js';

import { akariSpecialOffersData } from '../../data/akariSpecialOffersData.js';
import { industrialExpansionData } from '../../data/industrialExpansionData.js';
import { dashboardProducts as dashboardProductsRaw } from '../../data/dashboardProducts.js';
import TapariaToolsAPI from '../../data/taparia-tools-api.js';

export const CATALOG_VERSION = 'v2.1-category-catalog';

const dashboardProducts = (dashboardProductsRaw || []).map((product, index) => ({
  id: `DASH-${product.sku || index}`,
  name: product.title || product.name || 'Product',
  image:
    (product.images && product.images[0]) ||
    product.image ||
    'https://images.unsplash.com/photo-1542382156909-92c2a47ff992?auto=format&fit=crop&q=80&w=400',
  brand: product.brand || 'Tata Agrico',
  category: 'all-products',
  sub_category: (product.categories && product.categories[0]) || 'General',
  price_inr: product.finalPrice || product.price_inr || 0,
  regular_price: product.regularPrice || null,
  description: product.keyFeatures || '',
}));

export const normalizeCatalogProduct = (product) => {
  const image =
    product.image ||
    product.image_url ||
    product.Picture ||
    'https://images.unsplash.com/photo-1542382156909-92c2a47ff992?auto=format&fit=crop&q=80&w=400';

  let price = product.price_inr;
  if (price == null || price === 'Login to See Price') {
    price =
      product.sale_price != null
        ? parseFloat(String(product.sale_price).replace(/[^\d.]/g, '')) || 0
        : product.price != null
          ? parseFloat(String(product.price).replace(/[^\d.]/g, '')) || 0
          : product.mrp != null
            ? product.mrp
            : 0;
  }

  let regularPrice = product.regular_price || product.mrp || null;
  if (regularPrice != null) {
    regularPrice = parseFloat(String(regularPrice).replace(/[^\d.]/g, '')) || null;
  }

  const category = String(product.category || '')
    .toLowerCase()
    .replace(/\s+/g, '-');

  return {
    ...product,
    image,
    price_inr: typeof price === 'number' ? price : parseFloat(price) || 0,
    regular_price: regularPrice,
    category,
    stock_quantity: product.stock_quantity ?? 10,
    sold_quantity: product.sold_quantity ?? 0,
    isActive: product.isActive ?? true,
    id: product.id != null ? String(product.id) : Math.random().toString(36).slice(2, 11),
  };
};

const measuringToolsData = (TapariaToolsAPI.getAllSpiritLevels?.() || []).map((item) => ({
  id: item.id,
  sku: item.prodNo,
  name: item.name,
  brand: 'Taparia',
  category: 'measuring-tools',
  sub_category: 'Spirit Levels',
  description: item.description,
  image:
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=600',
  spec: item.specifications?.SIZE ? `Size: ${item.specifications.SIZE}` : '',
}));

export const buildInitialCatalog = () => {
  const rawProducts = [
    ...ingcoData,
    ...premiumBrandsData,
    ...handToolsData,
    ...agricultureGardenData,

    ...akariAbrasivesData,
    ...(gcWheelsData || []),
    ...(polishingPadsData || []),
    ...(sandPaperData || []),
    ...bladesData,
    ...newDiamondBlades,
    ...unboxDiamondBlades,

    ...angleGrindersData,
    ...(cordlessData?.products
      ? cordlessData.products.map((product) => ({
          id: product.productId,
          name: product.name,
          image: product.image,
          brand: 'Ingco',
          category: 'cordless-tools',
          sub_category: 'Cordless Tools',
          voltage: product.description?.voltage,
          noLoadSpeed: product.description?.noLoadSpeed,
          impactRate: product.description?.impactRate,
          spec: product.description?.spec,
          feature: product.description?.feature,
          includes: product.description?.includes,
          driveRate: product.description?.driveRate,
          maxFlow: product.description?.maxFlow,
          maxAirVolume: product.description?.maxAirVolume,
          tags: product.tags || [],
          description: [
            product.description?.feature,
            product.description?.voltage ? `Voltage: ${product.description.voltage}` : null,
            product.description?.noLoadSpeed ? `No-Load Speed: ${product.description.noLoadSpeed}` : null,
            product.description?.impactRate ? `Impact Rate: ${product.description.impactRate}` : null,
            product.description?.spec,
            product.description?.includes,
          ]
            .filter(Boolean)
            .join(' | '),
          price_inr: 0,
        }))
      : []),
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
    ...(dashboardProducts || []),

    ...handToolsData.map((product) => ({ ...product, category: 'hand-tools-edition' })),
    ...ratchetSocketsData.map((product) => ({ ...product, category: 'hand-tools-edition' })),
    ...spannersWrenchesData.map((product) => ({ ...product, category: 'hand-tools-edition' })),
    ...allenKeysData.map((product) => ({ ...product, category: 'hand-tools-edition' })),

    ...industrialExpansionData
      .filter((product) => product.sub_category === 'Lifting & Support')
      .map((product) => ({ ...product, category: 'lifting-equipments-edition' })),

    ...industrialExpansionData
      .filter(
        (product) =>
          product.name?.toLowerCase().includes('air') ||
          product.sub_category?.toLowerCase().includes('pneumatic')
      )
      .map((product) => ({ ...product, category: 'pneumatic-tools-edition' })),
    ...allProductsEditionData
      .filter(
        (product) =>
          product.name?.toLowerCase().includes('air') ||
          product.sub_category?.toLowerCase().includes('pneumatic')
      )
      .map((product) => ({ ...product, category: 'pneumatic-tools-edition' })),
  ];

  const normalizedProducts = rawProducts.map(normalizeCatalogProduct);
  const seen = new Set();

  return normalizedProducts.filter((product) => {
    if (seen.has(product.id)) return false;
    seen.add(product.id);
    return true;
  });
};
