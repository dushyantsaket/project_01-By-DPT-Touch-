import { categoriesData } from './categories.js';

export const normalizeCatalogValue = (value = '') =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const prettyNameFromSlug = (slug = '') =>
  String(slug)
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const baseCategoryConfig = {
  collectionLabel: 'Industrial Collection',
  description: 'High-performance industrial grade tools designed for maximum efficiency and durability.',
  inventoryCategories: [],
  subcategoryTerms: [],
  showAll: false,
  defaultSort: 'featured',
  featureHighlights: [
    { icon: 'shield', title: 'Industrial Grade', subtitle: 'Built for daily site use' },
    { icon: 'zap', title: 'High Performance', subtitle: 'Reliable output and precision' },
    { icon: 'package', title: 'Fast Supply', subtitle: 'Ready for immediate dispatch' },
  ],
};

const categoryOverrides = {
  'garden-tools': {
    inventoryCategories: ['agriculture-tools'],
    description: 'Chainsaws, brush cutters, water pumps, tillers, lawn mowers, and more for high-output landscaping and field work.',
    featureHighlights: [
      { icon: 'shield', title: 'Field Ready', subtitle: 'Durable machines for outdoor workloads' },
      { icon: 'leaf', title: 'Garden Focus', subtitle: 'Tools for cutting, spraying, and maintenance' },
      { icon: 'wrench', title: 'Service Support', subtitle: 'Built for repeat seasonal use' },
    ],
  },
  'agriculture-tools': {
    inventoryCategories: ['agriculture-tools'],
    description: 'Efficient tools for farming, irrigation, land preparation, and landscaping tasks.',
    featureHighlights: [
      { icon: 'shield', title: 'Farm Grade', subtitle: 'Heavy-duty outdoor equipment' },
      { icon: 'leaf', title: 'Land Care', subtitle: 'Made for crop and garden upkeep' },
      { icon: 'package', title: 'Reliable Supply', subtitle: 'Popular field equipment in stock' },
    ],
  },
  'power-tools': {
    inventoryCategories: ['power-tools', 'angle-grinders', 'drills'],
    description: 'A complete range of high-performance electric and portable tools for fabrication, construction, and repair.',
    featureHighlights: [
      { icon: 'shield', title: 'Professional Grade', subtitle: 'Heavy-duty workshop performance' },
      { icon: 'zap', title: 'High Output', subtitle: 'Consistent torque and speed' },
      { icon: 'battery', title: 'Workshop Ready', subtitle: 'Built for demanding tasks' },
    ],
  },
  'heavy-duty': {
    inventoryCategories: ['power-tools', 'small-construction', 'welding-tools', 'welding-industrial'],
    description: 'Heavy-duty machines and tools engineered for intensive industrial use and long operating cycles.',
    featureHighlights: [
      { icon: 'shield', title: 'Heavy Duty', subtitle: 'Made for industrial environments' },
      { icon: 'wrench', title: 'Rugged Build', subtitle: 'Stronger materials and components' },
      { icon: 'package', title: 'Deployment Ready', subtitle: 'Procurement-friendly catalog' },
    ],
  },
  'cordless-tools': {
    inventoryCategories: ['cordless-tools'],
    description: 'Cordless tools that combine freedom of movement with pro-grade performance and battery platform compatibility.',
    featureHighlights: [
      { icon: 'shield', title: 'Industrial Grade', subtitle: 'Extreme durability' },
      { icon: 'zap', title: 'Brushless Tech', subtitle: 'Maximum efficiency' },
      { icon: 'battery', title: 'Smart Battery', subtitle: 'Platform-ready cordless range' },
    ],
  },
  drills: {
    inventoryCategories: ['drills', 'power-tools'],
    subcategoryTerms: ['drill', 'impact-drill', 'rotary-hammer'],
    description: 'Drills, impact drills, and rotary solutions for wood, metal, concrete, and general fabrication.',
  },
  'diamond-tech': {
    inventoryCategories: ['abrasives', 'power-tool-accessories'],
    subcategoryTerms: ['diamond', 'marble', 'blade', 'cutting'],
    description: 'Diamond blades, cutters, and abrasive solutions for stone, tile, concrete, and precision cutting.',
  },
  'angle-grinders': {
    inventoryCategories: ['angle-grinders', 'power-tools'],
    subcategoryTerms: ['angle-grinder', 'grinder'],
    description: 'Angle grinders and related assets for cutting, grinding, deburring, and polishing applications.',
  },
  saws: {
    inventoryCategories: ['power-tools', 'agriculture-tools'],
    subcategoryTerms: ['saw', 'chainsaw'],
    description: 'Cutting solutions for wood, metal, demolition, and outdoor work.',
  },
  'high-pressure': {
    inventoryCategories: ['power-tools', 'agriculture-tools'],
    subcategoryTerms: ['pressure-washer', 'washer', 'water-pump'],
    description: 'Cleaning and pressure systems designed for industrial, workshop, and agricultural maintenance.',
  },
  accessories: {
    inventoryCategories: ['accessories', 'power-tool-accessories', 'abrasives'],
    description: 'Attachments, consumables, and accessories that extend tool performance across multiple jobs.',
  },
  'all-products': {
    showAll: true,
    inventoryCategories: [],
    description: 'Browse our full industrial catalog with fast filters for brand, sub-category, stock, and pricing.',
    featureHighlights: [
      { icon: 'package', title: 'Full Catalog', subtitle: 'One place for every product line' },
      { icon: 'shield', title: 'Procurement Ready', subtitle: 'Built for fast sourcing decisions' },
      { icon: 'zap', title: 'Smart Filters', subtitle: 'Search and sort large inventories quickly' },
    ],
  },
  abrasives: {
    inventoryCategories: ['abrasives'],
    description: 'Grinding, cutting, polishing, and finishing consumables for metal, stone, and general fabrication.',
  },
  'hand-tools': {
    inventoryCategories: ['hand-tools', 'hand-tools-edition'],
    description: 'Professional hand tools for service, assembly, electrical work, and precision maintenance.',
    featureHighlights: [
      { icon: 'shield', title: 'Shop Floor Ready', subtitle: 'Reliable everyday hand tools' },
      { icon: 'wrench', title: 'Precision Grip', subtitle: 'Built for controlled manual work' },
      { icon: 'package', title: 'Wide Range', subtitle: 'Multiple sizes and formats available' },
    ],
  },
  'lifting-equipments': {
    inventoryCategories: ['lifting-equipments-edition'],
    subcategoryTerms: ['lifting', 'chain-block', 'support'],
    description: 'Lifting and support equipment for safer handling of heavy parts, machines, and materials.',
  },
  'measuring-tools': {
    inventoryCategories: ['measuring-tools'],
    subcategoryTerms: ['measuring', 'meter', 'multimeter', 'caliper', 'level', 'tape', 'tester', 'laser-distance'],
    description: 'Precision measurement tools for alignment, testing, dimension checks, and electrical diagnostics.',
    featureHighlights: [
      { icon: 'shield', title: 'Precision Built', subtitle: 'Reliable readings for daily inspection' },
      { icon: 'zap', title: 'Fast Testing', subtitle: 'Quick diagnostic and field measurement' },
      { icon: 'wrench', title: 'Workshop Utility', subtitle: 'Essential tools for setup and QA' },
    ],
  },
  'painting-tools': {
    inventoryCategories: ['power-tool-accessories'],
    subcategoryTerms: ['paint', 'spray'],
    description: 'Painting and coating accessories designed for smoother finishing and controlled application.',
  },
  'pneumatic-tools': {
    inventoryCategories: ['pneumatic-tools', 'pneumatic-tools-edition'],
    subcategoryTerms: ['air', 'blower', 'pneumatic', 'heat-gun'],
    description: 'Air-driven tools and related systems for fast industrial workflows and service operations.',
  },
  'power-tool-accessories': {
    inventoryCategories: ['power-tool-accessories', 'accessories', 'abrasives'],
    description: 'Bits, blades, chucks, attachments, and accessories that expand tool capability.',
  },
  'small-construction': {
    inventoryCategories: ['small-construction'],
    description: 'Portable construction equipment for jobsite mixing, vibration, compaction, and support tasks.',
  },
  'spare-parts': {
    inventoryCategories: ['spare-parts'],
    description: 'Replacement parts and repair components to keep tools running with minimal downtime.',
  },
  'welding-tools': {
    inventoryCategories: ['welding-tools', 'welding-industrial'],
    description: 'Welding machines, holders, and fabrication essentials for industrial joining and repair work.',
  },
  'safety-ppe': {
    inventoryCategories: ['safety-ppe'],
    description: 'Protective equipment for safer operations across workshops, factories, and field environments.',
  },
  'tool-storage': {
    inventoryCategories: ['tool-storage'],
    description: 'Storage and organization systems for keeping tools secure, accessible, and deployment-ready.',
  },
};

export const getBaseCategoryRecord = (categoryId) => {
  const normalizedId = normalizeCatalogValue(categoryId);
  return categoriesData.find((entry) => normalizeCatalogValue(entry.id) === normalizedId);
};

export const resolveCategoryConfig = (categoryId) => {
  const normalizedId = normalizeCatalogValue(categoryId);
  const baseRecord = getBaseCategoryRecord(normalizedId);
  const override = categoryOverrides[normalizedId] || {};

  return {
    ...baseCategoryConfig,
    id: normalizedId,
    name: override.name || baseRecord?.name || prettyNameFromSlug(normalizedId) || 'Product Catalog',
    description: override.description || baseRecord?.description || baseCategoryConfig.description,
    image: override.image || baseRecord?.image || '',
    type: override.type || baseRecord?.type || 'Industrial',
    ...override,
    inventoryCategories: (override.inventoryCategories || [normalizedId]).map(normalizeCatalogValue),
    subcategoryTerms: (override.subcategoryTerms || []).map(normalizeCatalogValue),
  };
};
