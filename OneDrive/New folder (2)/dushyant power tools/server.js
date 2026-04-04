import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Data Load Helper
const loadData = (fileName) => {
  const filePath = path.join(__dirname, 'data', fileName);
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Error reading ${fileName}: `, error.message);
    return [];
  }
};

/* ==========================================
 * ENDPOINTS: GENERAL / BSC & KEIL CATALOGUE
 * ========================================== */

app.get('/api/products', (req, res) => {
  res.json(loadData('products.json'));
});

app.get('/api/products/:id', (req, res) => {
  const products = loadData('products.json');
  const product = products.find(p => p.id == req.params.id);
  if (product) return res.json(product);
  res.status(404).json({ error: 'Product not found' });
});

app.get('/api/categories', (req, res) => {
  res.json(loadData('categories.json'));
});

app.get('/api/category/:name', (req, res) => {
  const products = loadData('products.json');
  const data = products.filter(p => p.category.toLowerCase() === req.params.name.toLowerCase());
  res.json(data);
});

app.get('/api/search', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  const products = loadData('products.json');
  if (!query) return res.json(products);
  const results = products.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.brand?.toLowerCase().includes(query) ||
    p.description?.toLowerCase().includes(query)
  );
  res.json(results);
});


/* ==========================================
 * ENDPOINTS: API V1 (BOSCH SPARES & TOOLS)
 * ========================================== */

// Tools List
app.get('/api/v1/tools', (req, res) => {
  let tools = loadData('tools.json');
  const { category, page, limit } = req.query;
  
  if (category) {
    tools = tools.filter(t => t.category.toLowerCase() === category.toLowerCase());
  }
  
  // Basic Pagination Simulation
  if (page && limit) {
    const p = parseInt(page);
    const l = parseInt(limit);
    const start = (p - 1) * l;
    tools = tools.slice(start, start + l);
  }
  
  res.json(tools);
});

// Single Tool
app.get('/api/v1/tools/:model_code', (req, res) => {
  const tools = loadData('tools.json');
  // Format the URL param back if it's passed with underscores (e.g. 0_601_375_0X5 -> 0 601 375 0X5)
  const code = req.params.model_code.replace(/_/g, ' '); 
  
  const tool = tools.find(t => t.model_code === code || t.model_number.toLowerCase() === code.toLowerCase());
  if (tool) return res.json(tool);
  res.status(404).json({ error: 'Tool not found' });
});

// Spare Parts for Tool
app.get('/api/v1/tools/:model_code/parts', (req, res) => {
  const parts = loadData('spare_parts.json');
  const catFilter = req.query.category?.toLowerCase();
  
  // For demonstration, map the GWS 600 parts specifically.
  // In a real DB this would filter against parts where `compatibility` includes the targeted tool.
  let toolParts = parts;
  if (catFilter) toolParts = toolParts.filter(p => p.category.toLowerCase() === catFilter);
  
  res.json(toolParts);
});

// Search Parts
app.get('/api/v1/parts/search', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  const toolModel = req.query.tool_model?.toLowerCase();
  
  let parts = loadData('spare_parts.json');
  if (toolModel) {
    parts = parts.filter(p => p.compatibility && p.compatibility.some(c => c.toLowerCase() === toolModel));
  }
  if (query) {
    parts = parts.filter(p => 
      p.description.toLowerCase().includes(query) || 
      p.order_no.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }
  
  res.json(parts);
});

// Lubricants
app.get('/api/v1/lubricants', (req, res) => {
  const lubes = loadData('lubricants.json');
  const typeFilter = req.query.type?.toLowerCase();
  
  let results = lubes.products || [];
  if (typeFilter) {
    results = results.filter(l => l.type?.toLowerCase() === typeFilter);
  }
  
  res.json(results);
});

// Labour Charges
app.get('/api/v1/labour-charges', (req, res) => {
  const tools = loadData('tools.json');
  const toolCategory = req.query.tool_category?.toLowerCase();
  
  let result = tools.map(t => ({
    model: t.model_number,
    category: t.category,
    charges: t.labour_charge
  }));
  
  if (toolCategory) {
    result = result.filter(r => r.category.toLowerCase() === toolCategory);
  }
  
  res.json(result);
});

// Accessories
app.get('/api/v1/accessories', (req, res) => {
  let accessories = loadData('accessories.json');
  const compFilter = req.query.compatibility?.toLowerCase();
  
  if (compFilter) {
    accessories = accessories.filter(a => a.compatibility && a.compatibility.some(c => c.toLowerCase() === compFilter));
  }
  res.json(accessories);
});

// Mock Cart Add
app.post('/api/v1/cart/add', (req, res) => {
  const { order_no, quantity } = req.body;
  if (!order_no || !quantity) return res.status(400).json({ error: "Missing order_no or quantity "});
  
  res.json({
    status: 'success',
    message: 'Item added to cart',
    cart_item: { order_no, quantity }
  });
});

// Mock Order
app.post('/api/v1/orders', (req, res) => {
  const { items, customer_info } = req.body;
  if (!items || !customer_info) return res.status(400).json({ error: "Invalid order data" });
  
  res.json({
    status: 'success',
    order_id: 'ORD-' + Math.floor(Math.random() * 1000000),
    message: 'Order placed successfully'
  });
});


// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`✅ Multi-Vendor Power Tools API Backend Running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`-------------------------------------------------`);
  console.log(`  v1 Core Endpoints Available:`);
  console.log(` - GET /api/v1/tools`);
  console.log(` - GET /api/v1/tools/:model_code`);
  console.log(` - GET /api/v1/tools/:model_code/parts`);
  console.log(` - GET /api/v1/parts/search?q=...`);
  console.log(` - GET /api/v1/lubricants`);
  console.log(` - GET /api/v1/labour-charges`);
  console.log(` - GET /api/v1/accessories`);
  console.log(` - POST /api/v1/cart/add`);
  console.log(` - POST /api/v1/orders`);
  console.log(`=================================================`);
});
