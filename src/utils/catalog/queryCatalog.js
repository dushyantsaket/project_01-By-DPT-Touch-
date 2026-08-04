import { normalizeCatalogValue, resolveCategoryConfig } from '../../data/categoryCatalogConfig.js';

export const getNumericPrice = (product = {}) => {
  const directPrice = Number(product.price_inr);
  if (Number.isFinite(directPrice) && directPrice > 0) return directPrice;

  const salePrice = parseFloat(String(product.sale_price || '').replace(/[^\d.]/g, ''));
  if (Number.isFinite(salePrice) && salePrice > 0) return salePrice;

  const mrpPrice = parseFloat(
    String(product.regular_price || product.mrp || product.mrp_inr || '').replace(/[^\d.]/g, '')
  );
  return Number.isFinite(mrpPrice) && mrpPrice > 0 ? mrpPrice : 0;
};

const searchableFields = (product = {}) => [
  product.name,
  product.brand,
  product.description,
  product.sub_category,
  product.subCategory,
  product.category,
  product.sku,
  product.id,
]
  .filter(Boolean)
  .join(' ')
  .toLowerCase();

export const productMatchesCategory = (product, categoryInput) => {
  const category = typeof categoryInput === 'string' ? resolveCategoryConfig(categoryInput) : categoryInput;
  if (!product) return false;
  if (category.showAll) return true;

  const productCategory = normalizeCatalogValue(product.category);
  const productSubCategory = normalizeCatalogValue(product.sub_category || product.subCategory);
  const productName = normalizeCatalogValue(product.name);
  const productBrand = normalizeCatalogValue(product.brand);

  if (productCategory === category.id || productSubCategory === category.id) {
    return true;
  }

  if (category.inventoryCategories.includes(productCategory)) {
    return true;
  }

  if (!category.subcategoryTerms.length) {
    return false;
  }

  return category.subcategoryTerms.some((term) =>
    [productSubCategory, productName, productBrand].some((value) => value.includes(term))
  );
};

export const getCategoryProducts = (products = [], categoryInput) => {
  const category = typeof categoryInput === 'string' ? resolveCategoryConfig(categoryInput) : categoryInput;
  return products.filter((product) => productMatchesCategory(product, category));
};

export const buildCatalogFacets = (products = []) => {
  const brands = [...new Set(products.map((product) => product.brand).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );

  const subCategories = [
    ...new Set(
      products
        .map((product) => product.sub_category || product.subCategory)
        .filter(Boolean)
    ),
  ].sort((a, b) => a.localeCompare(b));

  const prices = products
    .map((product) => getNumericPrice(product))
    .filter((value) => Number.isFinite(value) && value > 0);

  return {
    brands,
    subCategories,
    priceMin: prices.length ? Math.min(...prices) : 0,
    priceMax: prices.length ? Math.max(...prices) : 0,
  };
};

export const sortCatalogProducts = (products = [], sort = 'featured') => {
  const items = [...products];

  switch (sort) {
    case 'price-low':
      return items.sort((a, b) => getNumericPrice(a) - getNumericPrice(b));
    case 'price-high':
      return items.sort((a, b) => getNumericPrice(b) - getNumericPrice(a));
    case 'name-asc':
      return items.sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')));
    case 'popular':
      return items.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    case 'rating':
      return items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'newest':
      return items.sort((a, b) => String(b.id || '').localeCompare(String(a.id || '')));
    case 'featured':
    default:
      return items.sort((a, b) => {
        const stockDelta = Number(b.stock_quantity || 0) - Number(a.stock_quantity || 0);
        if (stockDelta !== 0) return stockDelta;

        const ratingDelta = Number(b.rating || 0) - Number(a.rating || 0);
        if (ratingDelta !== 0) return ratingDelta;

        return getNumericPrice(b) - getNumericPrice(a);
      });
  }
};

export const filterCatalogProducts = (products = [], filters = {}) => {
  const {
    search = '',
    brand = 'all',
    subCategory = 'all',
    inStock = 'all',
    minPrice = 0,
    maxPrice = Number.POSITIVE_INFINITY,
    sort = 'featured',
  } = filters;

  const normalizedSearch = String(search).trim().toLowerCase();
  const normalizedBrand = normalizeCatalogValue(brand);
  const normalizedSubCategory = normalizeCatalogValue(subCategory);
  const parsedMinPrice = Number(minPrice) || 0;
  const parsedMaxPrice = Number.isFinite(Number(maxPrice)) && Number(maxPrice) > 0 ? Number(maxPrice) : Number.POSITIVE_INFINITY;

  const filtered = products.filter((product) => {
    const matchesSearch =
      !normalizedSearch || searchableFields(product).includes(normalizedSearch);

    const matchesBrand =
      normalizedBrand === 'all' || normalizeCatalogValue(product.brand) === normalizedBrand;

    const productSubCategory = normalizeCatalogValue(product.sub_category || product.subCategory);
    const matchesSubCategory =
      normalizedSubCategory === 'all' || productSubCategory === normalizedSubCategory;

    const price = getNumericPrice(product);
    const matchesPrice =
      (price === 0 && parsedMinPrice === 0) ||
      (price >= parsedMinPrice && price <= parsedMaxPrice);

    const stock = Number(product.stock_quantity ?? 0);
    const matchesStock =
      inStock === 'all' ||
      (inStock === 'true' && stock > 0) ||
      (inStock === 'false' && stock <= 0);

    return matchesSearch && matchesBrand && matchesSubCategory && matchesPrice && matchesStock;
  });

  return sortCatalogProducts(filtered, sort);
};

export const paginateCatalogProducts = (products = [], page = 1, limit = 12) => {
  const safeLimit = Math.max(1, Number(limit) || 12);
  const total = products.length;
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));
  const safePage = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const startIndex = (safePage - 1) * safeLimit;
  const endIndex = Math.min(startIndex + safeLimit, total);

  return {
    items: products.slice(startIndex, endIndex),
    total,
    totalPages,
    page: safePage,
    limit: safeLimit,
    start: total === 0 ? 0 : startIndex + 1,
    end: endIndex,
  };
};
