import { buildInitialCatalog } from "../src/utils/catalog/buildCatalog.js";
import mongoose from "mongoose";

console.log("Successfully imported buildInitialCatalog!");
try {
  const products = buildInitialCatalog();
  console.log("Found products:", products.length);
} catch (err) {
  console.error("Error executing buildInitialCatalog:", err);
}
process.exit(0);
