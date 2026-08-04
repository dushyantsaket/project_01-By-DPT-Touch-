import { buildInitialCatalog } from './src/utils/catalog/buildCatalog.js';

try {
  const products = buildInitialCatalog();
  console.log("Total products returned by buildInitialCatalog:", products.length);
  
  // Show a count by category or brand
  const brands = {};
  const categories = {};
  products.forEach(p => {
    brands[p.brand] = (brands[p.brand] || 0) + 1;
    categories[p.category] = (categories[p.category] || 0) + 1;
  });
  console.log("Product counts by Brand:", brands);
  console.log("Product counts by Category:", categories);
} catch (err) {
  console.error("Error building initial catalog:", err);
}
