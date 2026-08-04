import React, { useEffect, useState } from "react";
import {
  buildInitialCatalog,
  CATALOG_VERSION,
  normalizeCatalogProduct,
} from "../utils/catalog/buildCatalog";
import { InventoryContext } from "./inventory-context";

export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const savedVersion = localStorage.getItem("dpt_catalog_version");
    if (savedVersion === CATALOG_VERSION) {
      const savedInventory = localStorage.getItem("dpt_inventory");
      if (savedInventory) {
        try {
          return JSON.parse(savedInventory);
        } catch {
          // Rebuild the catalog if cached data is corrupted.
        }
      }
    }

    localStorage.setItem("dpt_catalog_version", CATALOG_VERSION);
    return buildInitialCatalog();
  });

  useEffect(() => {
    let isCancelled = false;
    const apiBase = import.meta.env.VITE_API_URL || "";

    fetch(`${apiBase}/api/products?limit=2000`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Unable to fetch remote catalog");
        const data = await res.json();
        if (isCancelled) return;
        const activeProducts = Array.isArray(data.products)
          ? data.products
          : data;
        if (Array.isArray(activeProducts) && activeProducts.length > 0) {
          setProducts(
            activeProducts.map((product) =>
              normalizeCatalogProduct({
                ...product,
                id:
                  product._id || product.id || product.productId || product.sku,
              }),
            ),
          );
        }
      })
      .catch(() => {
        // keep local fallback catalog if backend is unavailable
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const [sales, setSales] = useState(() => {
    const savedSales = localStorage.getItem("dpt_sales");
    return savedSales ? JSON.parse(savedSales) : [];
  });

  const [warrantyClaims, setWarrantyClaims] = useState(() => {
    const savedClaims = localStorage.getItem("dpt_warranty_claims");
    return savedClaims ? JSON.parse(savedClaims) : [];
  });

  const [serviceRequests, setServiceRequests] = useState(() => {
    const savedRequests = localStorage.getItem("dpt_service_requests");
    return savedRequests ? JSON.parse(savedRequests) : [];
  });

  useEffect(() => {
    localStorage.setItem("dpt_inventory", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("dpt_sales", JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem("dpt_warranty_claims", JSON.stringify(warrantyClaims));
  }, [warrantyClaims]);

  useEffect(() => {
    localStorage.setItem(
      "dpt_service_requests",
      JSON.stringify(serviceRequests),
    );
  }, [serviceRequests]);

  const addProduct = (product) => {
    setProducts((previousProducts) => [
      {
        ...normalizeCatalogProduct(product),
        id: Date.now().toString(),
        sold_quantity: 0,
        isActive: true,
      },
      ...previousProducts,
    ]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product,
      ),
    );
  };

  const deleteProduct = (id) => {
    setProducts((previousProducts) =>
      previousProducts.filter((product) => product.id !== id),
    );
  };

  const toggleProductStatus = (id) => {
    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        product.id === id
          ? { ...product, isActive: !product.isActive }
          : product,
      ),
    );
  };

  const resetInventory = () => {
    localStorage.removeItem("dpt_inventory");
    setProducts(buildInitialCatalog());
  };

  const processSale = (cartItems, customerInfo = null) => {
    setProducts((previousProducts) =>
      previousProducts.map((product) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        if (!cartItem) return product;

        return {
          ...product,
          stock_quantity: Math.max(
            0,
            product.stock_quantity - cartItem.quantity,
          ),
          sold_quantity: (product.sold_quantity || 0) + cartItem.quantity,
        };
      }),
    );

    const newSale = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      items: cartItems,
      customer: customerInfo,
      total: cartItems.reduce(
        (sum, item) => sum + item.price_inr * item.quantity,
        0,
      ),
      timestamp: new Date().toISOString(),
    };

    setSales((previousSales) => [newSale, ...previousSales]);

    if (customerInfo) {
      const savedLeads = JSON.parse(localStorage.getItem("adminLeads") || "[]");
      const newLead = {
        id: `L-${Date.now().toString().slice(-4)}`,
        customer: customerInfo.name,
        company: customerInfo.company || "Direct Buyer",
        product: cartItems.map((item) => item.name).join(", "),
        type: "Order Request",
        time: "Just now",
        status: "Shipped",
        phone: customerInfo.phone,
      };
      localStorage.setItem(
        "adminLeads",
        JSON.stringify([newLead, ...savedLeads]),
      );
    }
  };

  const addWarrantyClaim = (claim) => {
    setWarrantyClaims((previousClaims) => [
      {
        ...claim,
        id: Date.now().toString(),
        status: "Pending",
        submittedAt: new Date().toISOString(),
      },
      ...previousClaims,
    ]);
  };

  const addServiceRequest = (request) => {
    setServiceRequests((previousRequests) => [
      {
        ...request,
        id: `SRV-${Date.now().toString().slice(-6)}`,
        status: "Pending",
        timestamp: new Date().toISOString(),
      },
      ...previousRequests,
    ]);
  };

  const updateWarrantyStatus = (id, newStatus) => {
    setWarrantyClaims((previousClaims) =>
      previousClaims.map((claim) =>
        claim.id === id ? { ...claim, status: newStatus } : claim,
      ),
    );
  };

  return (
    <InventoryContext.Provider
      value={{
        products,
        sales,
        warrantyClaims,
        serviceRequests,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStatus,
        resetInventory,
        processSale,
        addWarrantyClaim,
        addServiceRequest,
        updateWarrantyStatus,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
