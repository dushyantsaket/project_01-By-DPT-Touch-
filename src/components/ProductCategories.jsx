import React from "react";
import { categoriesData } from "../data/categories";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCategories = () => {
  return (
    <section id="categories" style={{ padding: "64px 0", background: "#fff" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
        {/* Section header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "end",
            marginBottom: "48px",
            gap: "24px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  height: "4px",
                  width: "24px",
                  background: "#dc2626",
                  borderRadius: "0",
                }}
              ></div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "#9ca3af",
                }}
              >
                Inventory Categories
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 900,
                color: "#111",
                textTransform: "uppercase",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              Professional <br />
              <span style={{ color: "#dc2626" }}>Power Solutions</span>
            </h2>
          </div>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#6b7280",
              maxWidth: "400px",
              lineHeight: 1.6,
            }}
          >
            Engineered for high-performing professionals who demand precision,
            durability, and results in every procurement.
          </p>
        </div>

        {/* Category cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
            marginBottom: "64px",
          }}
        >
          {categoriesData.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              onClick={() => window.scrollTo(0, 0)}
              style={{
                textDecoration: "none",
                background: "#fff",
                borderRadius: "0",
                border: "1px solid #f0f0f0",
                overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0,0,0,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.03)";
              }}
            >
              <div
                style={{
                  height: "200px",
                  background: "#f3f4f6",
                  position: "relative",
                }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "#111",
                    color: "#fff",
                    padding: "4px 10px",
                    borderRadius: "0",
                    fontSize: "9px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {category.type}
                </span>
              </div>
              <div style={{ padding: "24px" }}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 900,
                    color: "#111",
                    textTransform: "uppercase",
                    letterSpacing: "-0.02em",
                    marginBottom: "8px",
                  }}
                >
                  {category.name}
                </h3>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#6b7280",
                    fontWeight: 600,
                    lineHeight: 1.5,
                    marginBottom: "16px",
                    height: "33px",
                    overflow: "hidden",
                  }}
                >
                  {category.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#dc2626",
                    fontSize: "10px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  View Range <ChevronRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Feature promo strip */}
        <div
          style={{
            background: "#111",
            borderRadius: "0",
            overflow: "hidden",
            display: "flex",
            flexWrap: "wrap",
            border: "1px solid #1f2937",
          }}
        >
          <div style={{ flex: "1 1 300px", background: "#000" }}>
            <div style={{ position: "relative", paddingTop: "177.77%" }}>
              <iframe
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                src="https://www.youtube-nocookie.com/embed/9aUNFW43xFU?feature=oembed&autoplay=1&mute=1&modestbranding=1&loop=1&rel=0&playlist=9aUNFW43xFU&iv_load_policy=3&controls=0"
                title="INGCO 20V Cordless Tools"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <div
            style={{
              flex: "1 1 400px",
              padding: "clamp(32px, 5vw, 64px)",
              color: "#fff",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: "#dc2626",
                color: "#fff",
                padding: "4px 12px",
                borderRadius: "0",
                fontSize: "9px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "16px",
              }}
            >
              Featured Category
            </span>
            <h3
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.04em",
                marginBottom: "16px",
                lineHeight: 1.1,
              }}
            >
              INGCO 20V Cordless Tools
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#9ca3af",
                fontWeight: 600,
                lineHeight: 1.7,
                marginBottom: "24px",
              }}
            >
              Power meets innovation. Our latest range of 20V cordless tools
              provides professionals with unparalleled performance and
              versatility.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginBottom: "32px",
              }}
            >
              {[
                "One Battery Fits All Tools",
                "Rapid Charge Technology",
                "Heavy Duty Brushless Motors",
              ].map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "11px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  <CheckCircle2 size={16} style={{ color: "#dc2626" }} />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <Link
              to="/cordless-tools"
              onClick={() => window.scrollTo(0, 0)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#fff",
                color: "#111",
                padding: "16px 32px",
                borderRadius: "0",
                fontWeight: 800,
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                textDecoration: "none",
              }}
            >
              Explore Cordless Range <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;

// import React, { useState, useEffect, useMemo, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// import { useInventory } from "../context/useInventory";
// import {
//   ShoppingCart,
//   CheckCircle,
//   ChevronLeft,
//   ChevronRight,
//   Star,
// } from "lucide-react";
// import ToolImage from "./ToolImage";

// // ------------------------------
// // 1. IMPORTS OF ALL YOUR DATA FILES
// // ------------------------------
// import { inventoryData } from "../data/inventory";
// import { handToolsData as baseHandToolsData } from "../data/handToolsData";
// import { allenKeysData } from "../data/allenKeysData";
// import { chiselsPunchesData } from "../data/chiselsPunchesData";
// import { clampsVicesData } from "../data/clampsVicesData";
// import { filesData } from "../data/filesData";
// import { diesTapsData } from "../data/diesTapsData";
// import { greaseGunsPumpsData } from "../data/greaseGunsPumpsData";
// import { hacksawFramesBladesData } from "../data/hacksawFramesBladesData";
// import { toolKitsData } from "../data/toolKitsData";
// import { planersData } from "../data/planersData";
// import { pliersCuttersData } from "../data/pliersCuttersData";
// import { ratchetSocketsData } from "../data/ratchetSocketsData";
// import { spannersWrenchesData } from "../data/spannersWrenchesData";
// import { safetyData } from "../data/safetyData";
// import { industrialExpansionData } from "../data/industrialExpansionData";
// import { agricultureGardenData } from "../data/agricultureGardenData";
// import { storageData } from "../data/storageData";
// import { powerToolsData } from "../data/powerTools";
// import { ingcoData } from "../data/ingcoData";
// import { polishingPadsData } from "../data/polishingPadsData";
// import { akariSpecialOffersData } from "../data/akariSpecialOffersData";
// import { xtraPowerData } from "../data/xtraPowerData";
// import { allProductsEditionData } from "../data/allProductsEditionData";
// import { premiumBrandsData } from "../data/premiumBrandsData";

// // ------------------------------
// // 2. DYNAMIC IMPORTS FOR PROBLEMATIC FILES
// // ------------------------------
// let accessoriesData = [];
// let agriculturalPartsData = [];
// let akariAbrasivesData = [];
// let armatureData = [];
// let bladesData = [];
// let carbonBrushesData = [];
// let dashboardProducts = [];
// let gcWheelsData = [];
// let grinderPartsData = [];
// let miscProductsData = [];
// let newDiamondBlades = [];
// let sandPaperData = [];
// let tataAgricoData = [];
// let unboxDiamondBlades = [];

// // Safe dynamic imports with fallback to empty array
// try {
//   const accessoriesModule = await import("../data/accessoriesData.js");
//   accessoriesData =
//     accessoriesModule.accessoriesData || accessoriesModule.default || [];
// } catch (e) {
//   console.warn("accessoriesData not loaded", e.message);
// }

// try {
//   const agriculturalPartsModule =
//     await import("../data/agriculturalPartsData.js");
//   agriculturalPartsData =
//     agriculturalPartsModule.agriculturalPartsData ||
//     agriculturalPartsModule.default ||
//     [];
// } catch (e) {
//   console.warn("agriculturalPartsData not loaded", e.message);
// }

// try {
//   const akariAbrasivesModule = await import("../data/akariAbrasivesData.js");
//   akariAbrasivesData =
//     akariAbrasivesModule.akariAbrasivesData ||
//     akariAbrasivesModule.default ||
//     [];
// } catch (e) {
//   console.warn("akariAbrasivesData not loaded", e.message);
// }

// try {
//   const armatureModule = await import("../data/armatureData.js");
//   armatureData = armatureModule.armatureData || armatureModule.default || [];
// } catch (e) {
//   console.warn("armatureData not loaded", e.message);
// }

// try {
//   const bladesModule = await import("../data/bladesData.js");
//   bladesData = bladesModule.bladesData || bladesModule.default || [];
// } catch (e) {
//   console.warn("bladesData not loaded", e.message);
// }

// try {
//   const carbonBrushesModule = await import("../data/carbonBrushesData.js");
//   carbonBrushesData =
//     carbonBrushesModule.carbonBrushesData || carbonBrushesModule.default || [];
// } catch (e) {
//   console.warn("carbonBrushesData not loaded", e.message);
// }

// try {
//   const dashboardModule = await import("../data/dashboardProducts.js");
//   dashboardProducts =
//     dashboardModule.dashboardProducts || dashboardModule.default || [];
// } catch (e) {
//   console.warn("dashboardProducts not loaded", e.message);
// }

// try {
//   const gcWheelsModule = await import("../data/gcWheelsData.js");
//   gcWheelsData = gcWheelsModule.gcWheelsData || gcWheelsModule.default || [];
// } catch (e) {
//   console.warn("gcWheelsData not loaded", e.message);
// }

// try {
//   const grinderPartsModule = await import("../data/grinderPartsData.js");
//   grinderPartsData =
//     grinderPartsModule.grinderPartsData || grinderPartsModule.default || [];
// } catch (e) {
//   console.warn("grinderPartsData not loaded", e.message);
// }

// try {
//   const miscProductsModule = await import("../data/miscProductsData.js");
//   miscProductsData =
//     miscProductsModule.miscProductsData || miscProductsModule.default || [];
// } catch (e) {
//   console.warn("miscProductsData not loaded", e.message);
// }

// try {
//   const newDiamondBladesModule = await import("../data/newDiamondBlades.js");
//   newDiamondBlades =
//     newDiamondBladesModule.newDiamondBlades ||
//     newDiamondBladesModule.default ||
//     [];
// } catch (e) {
//   console.warn("newDiamondBlades not loaded", e.message);
// }

// try {
//   const sandPaperModule = await import("../data/sandPaperData.js");
//   sandPaperData =
//     sandPaperModule.sandPaperData || sandPaperModule.default || [];
// } catch (e) {
//   console.warn("sandPaperData not loaded", e.message);
// }

// try {
//   const tataModule = await import("../data/tataAgricoData.js");
//   tataAgricoData = tataModule.tataAgricoData || tataModule.default || [];
// } catch (e) {
//   console.warn("tataAgricoData not loaded", e.message);
// }

// try {
//   const unboxModule = await import("../data/unboxDiamondBlades.js");
//   unboxDiamondBlades =
//     unboxModule.unboxDiamondBlades || unboxModule.default || [];
// } catch (e) {
//   console.warn("unboxDiamondBlades not loaded", e.message);
// }

// // ------------------------------
// // 3. NORMALIZE REMOTE PRODUCTS
// // ------------------------------
// const API = "/api";
// const normalizeRemoteProduct = (product) => ({
//   ...product,
//   id:
//     product._id ||
//     product.id ||
//     product.productId ||
//     product.sku ||
//     String(Math.random()).slice(2),
//   image:
//     product.image ||
//     (Array.isArray(product.images) ? product.images[0] : "") ||
//     "",
//   price_inr:
//     Number(product.price_inr ?? product.price ?? product.sale_price ?? 0) || 0,
//   category: String(product.category || "")
//     .toLowerCase()
//     .replace(/\s+/g, "-"),
//   stockStatus:
//     product.stockStatus ||
//     (product.stock_quantity > 0 ? "In Stock" : "Out of Stock"),
// });

// // ------------------------------
// // 4. COMBINE LOCAL DATA
// // ------------------------------
// const combinedHandToolsData = [
//   ...baseHandToolsData,
//   ...allenKeysData,
//   ...chiselsPunchesData,
//   ...clampsVicesData,
//   ...filesData,
//   ...diesTapsData,
//   ...greaseGunsPumpsData,
//   ...hacksawFramesBladesData,
//   ...toolKitsData,
//   ...planersData,
//   ...pliersCuttersData,
//   ...ratchetSocketsData,
//   ...spannersWrenchesData,
//   ...ingcoData.filter((i) => i.category === "hand-tools"),
//   ...premiumBrandsData.filter((i) => i.category === "hand-tools"),
// ].filter((item) => item && typeof item === "object");

// const combinedMachinesData = [
//   ...powerToolsData,
//   ...ingcoData.filter(
//     (i) => i.category === "machines" || i.category === "power-tools",
//   ),
//   ...akariSpecialOffersData.filter(
//     (i) => i.category === "power-tools" || i.category === "machines",
//   ),
//   ...xtraPowerData.filter(
//     (i) => i.category === "power-tools" || i.category === "machines",
//   ),
//   ...allProductsEditionData.filter(
//     (i) => i.category === "power-tools" || i.category === "machines",
//   ),
//   ...premiumBrandsData.filter(
//     (i) => i.category === "power-tools" || i.category === "machines",
//   ),
// ].filter((item) => item && typeof item === "object");

// const combinedSparePartsData = (() => {
//   const uniquePartsMap = new Map();
//   if (inventoryData && Array.isArray(inventoryData)) {
//     inventoryData.forEach((item) => {
//       if (
//         item &&
//         item["Spare part number"] &&
//         !uniquePartsMap.has(item["Spare part number"])
//       ) {
//         uniquePartsMap.set(item["Spare part number"], {
//           id: item["Spare part number"],
//           name: item["Spare parts name"],
//           image: item["Spare parts Picture"],
//           suitableFor: item["Suitable for"] || [],
//           partNumber: item["Spare part number"],
//           category: "Spare Parts",
//         });
//       }
//     });
//   }
//   const partsList = Array.from(uniquePartsMap.values()).filter(
//     (p) => p && p.name,
//   );
//   return [
//     ...partsList,
//     ...armatureData,
//     ...carbonBrushesData,
//     ...grinderPartsData,
//   ].filter((item) => item && typeof item === "object");
// })();

// const combinedSafetyData = [...safetyData].filter(
//   (item) => item && typeof item === "object",
// );
// const combinedWeldingData = [
//   ...industrialExpansionData,
//   ...gcWheelsData,
// ].filter((item) => item && typeof item === "object");
// const combinedAgricultureData = [
//   ...agricultureGardenData,
//   ...agriculturalPartsData,
//   ...tataAgricoData,
// ].filter((item) => item && typeof item === "object");
// const combinedStorageData = [...storageData].filter(
//   (item) => item && typeof item === "object",
// );
// const combinedAccessoriesData = [
//   ...accessoriesData,
//   ...akariAbrasivesData,
//   ...bladesData,
//   ...newDiamondBlades,
//   ...unboxDiamondBlades,
//   ...sandPaperData,
//   ...polishingPadsData,
// ].filter((item) => item && typeof item === "object");

// const allProductsData = [
//   ...combinedHandToolsData,
//   ...combinedMachinesData,
//   ...combinedSparePartsData,
//   ...combinedSafetyData,
//   ...combinedWeldingData,
//   ...combinedAgricultureData,
//   ...combinedStorageData,
//   ...combinedAccessoriesData,
//   ...miscProductsData,
//   ...dashboardProducts,
// ].filter((item) => item && typeof item === "object");

// // ------------------------------
// // 5. HELPER COMPONENTS (Amazon style)
// // ------------------------------
// const StarRating = ({ rating, reviewCount }) => {
//   if (!rating || rating === 0) return null;
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 >= 0.5;
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: "4px",
//         margin: "6px 0",
//       }}
//     >
//       <div style={{ display: "flex", gap: "2px" }}>
//         {[...Array(5)].map((_, i) => (
//           <Star
//             key={i}
//             size={12}
//             fill={i < fullStars ? "#f5a623" : "none"}
//             color="#f5a623"
//             style={{ strokeWidth: i < fullStars ? 0 : 1 }}
//           />
//         ))}
//         {hasHalfStar && (
//           <Star
//             size={12}
//             fill="#f5a623"
//             color="#f5a623"
//             style={{ opacity: 0.5 }}
//           />
//         )}
//       </div>
//       {reviewCount > 0 && (
//         <span style={{ fontSize: "12px", color: "#565959" }}>
//           {reviewCount}
//         </span>
//       )}
//     </div>
//   );
// };

// const PrimeBadge = () => (
//   <div style={{ marginTop: "4px" }}>
//     <img
//       src="https://m.media-amazon.com/images/G/31/x-locale/checkout/prime/prime-lockup._CB485946312_.png"
//       alt="Prime"
//       style={{ height: "18px" }}
//     />
//   </div>
// );

// const DeliveryMessage = () => (
//   <div style={{ fontSize: "12px", color: "#565959", marginTop: "8px" }}>
//     FREE delivery <span style={{ fontWeight: "bold" }}>Tomorrow</span>
//   </div>
// );

// // ------------------------------
// // 6. MAIN PRODUCTS COMPONENT
// // ------------------------------
// const Products = () => {
//   const { isLoggedIn } = useAuth();
//   const { addToCart } = useCart();
//   const { products: inventoryProducts } = useInventory();
//   const navigate = useNavigate();
//   const scrollContainerRef = useRef(null);
//   const [activeTab, setActiveTab] = useState("All Products");
//   const [cartToast, setCartToast] = useState(null);
//   const [remoteProducts, setRemoteProducts] = useState(null);
//   const [visibleCount, setVisibleCount] = useState(25);
//   const [showLeftScroll, setShowLeftScroll] = useState(false);
//   const [showRightScroll, setShowRightScroll] = useState(true);

//   // Fetch remote products
//   useEffect(() => {
//     let isCancelled = false;
//     const apiBase = import.meta.env.VITE_API_URL || "";
//     fetch(`${apiBase}${API}/products?limit=400`)
//       .then(async (res) => {
//         if (!res.ok) throw new Error("Failed to load products from server");
//         const data = await res.json();
//         if (!isCancelled) {
//           const products = Array.isArray(data.products) ? data.products : data;
//           setRemoteProducts(products.map(normalizeRemoteProduct));
//         }
//       })
//       .catch((error) => console.warn("Failed to load remote products:", error));
//     return () => {
//       isCancelled = true;
//     };
//   }, []);

//   const updateScrollButtons = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } =
//         scrollContainerRef.current;
//       setShowLeftScroll(scrollLeft > 0);
//       setShowRightScroll(scrollLeft + clientWidth < scrollWidth - 10);
//     }
//   };

//   const handleScroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const amount = direction === "left" ? -300 : 300;
//       scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });
//       setTimeout(updateScrollButtons, 300);
//     }
//   };

//   const handleAddToCart = (e, item) => {
//     e.preventDefault();
//     e.stopPropagation();
//     addToCart(item);
//     setCartToast(item.name);
//     setTimeout(() => setCartToast(null), 2500);
//   };

//   const filteredItems = useMemo(() => {
//     const categoryFilter = (item) => {
//       if (!item || !item.category) return activeTab === "All Products";
//       const cat = String(item.category).toLowerCase();
//       const map = {
//         Machines: [
//           "machines",
//           "power-tools",
//           "power tools",
//           "industrial",
//           "angle grinder",
//           "cordless",
//         ],
//         HandTools: [
//           "hand-tools",
//           "hand tools",
//           "handtools",
//           "taparia",
//           "tools",
//         ],
//         SpareParts: [
//           "spare-parts",
//           "spare parts",
//           "armature",
//           "carbon brush",
//           "grinder part",
//         ],
//         Safety: ["safety", "protective", "ppe"],
//         Welding: ["welding", "gc wheels"],
//         Agriculture: [
//           "agriculture",
//           "agriculture garden",
//           "garden",
//           "tata agrico",
//         ],
//         Storage: ["storage", "tool storage", "cases"],
//         Accessories: [
//           "accessories",
//           "abrasives",
//           "blades",
//           "diamond blades",
//           "sand paper",
//           "polishing pads",
//         ],
//       };
//       if (activeTab === "All Products") return true;
//       return (
//         map[activeTab.replace(" ", "")]?.some((kw) => cat.includes(kw)) ?? false
//       );
//     };

//     const getLocalData = () => {
//       switch (activeTab) {
//         case "All Products":
//           return allProductsData;
//         case "Machines":
//           return combinedMachinesData;
//         case "Hand Tools":
//           return combinedHandToolsData;
//         case "Spare Parts":
//           return combinedSparePartsData;
//         case "Safety":
//           return combinedSafetyData;
//         case "Welding":
//           return combinedWeldingData;
//         case "Agriculture":
//           return combinedAgricultureData;
//         case "Storage":
//           return combinedStorageData;
//         case "Accessories":
//           return combinedAccessoriesData;
//         default:
//           return allProductsData;
//       }
//     };

//     const merged = remoteProducts?.length
//       ? (() => {
//           const localMap = new Map(
//             (inventoryProducts || []).map((p) => [String(p.id), p]),
//           );
//           const remoteMap = new Map(
//             remoteProducts.map((p) => [String(p.id), p]),
//           );
//           const mergedRemote = remoteProducts.map((remote) => ({
//             ...(localMap.get(String(remote.id)) || {}),
//             ...remote,
//           }));
//           const extras = (inventoryProducts || []).filter(
//             (local) => !remoteMap.has(String(local.id)),
//           );
//           return [...mergedRemote, ...extras];
//         })()
//       : inventoryProducts?.length
//         ? inventoryProducts
//         : getLocalData();

//     const items = merged
//       .filter((p) => p && p.isActive !== false)
//       .filter(categoryFilter);
//     const unique = [];
//     const seen = new Set();
//     for (const item of items) {
//       const id = String(item.id || item.sku || item.name || Math.random());
//       if (!seen.has(id)) {
//         seen.add(id);
//         unique.push(item);
//       }
//     }
//     return unique.map((p) => ({
//       ...p,
//       image:
//         p.image || p.image_url || (Array.isArray(p.images) ? p.images[0] : ""),
//       stockStatus:
//         p.stockStatus ||
//         (p.stock_quantity <= 0
//           ? "Out of Stock"
//           : p.stock_quantity < 5
//             ? "Low Stock"
//             : "In Stock"),
//       price_inr:
//         Number(
//           p.price_inr ??
//             (p.sale_price
//               ? parseFloat(String(p.sale_price).replace(/[^\d.]/g, ""))
//               : p.price || 0),
//         ) || 0,
//       rating: p.rating || p.averageRating || 0,
//       reviewCount: p.reviewCount || p.numReviews || 0,
//       mrp: p.mrp || p.list_price || 0,
//     }));
//   }, [activeTab, remoteProducts, inventoryProducts]);

//   useEffect(() => {
//     updateScrollButtons();
//     window.addEventListener("resize", updateScrollButtons);
//     return () => window.removeEventListener("resize", updateScrollButtons);
//   }, [filteredItems]);

//   const displayed = filteredItems.slice(0, visibleCount);
//   const hasMore = visibleCount < filteredItems.length;
//   const loadMore = () => setVisibleCount((prev) => prev + 25);

//   const tabs = [
//     "All Products",
//     "Machines",
//     "Hand Tools",
//     "Spare Parts",
//     "Safety",
//     "Welding",
//     "Agriculture",
//     "Storage",
//     "Accessories",
//   ];

//   return (
//     <section id="products" style={{ padding: "40px 0", background: "#fff" }}>
//       <div style={{ maxWidth: "1500px", margin: "0 auto", padding: "0 20px" }}>
//         {/* Header */}
//         <div style={{ marginBottom: "24px" }}>
//           <h2 style={{ fontSize: "21px", fontWeight: "700", color: "#0f1111" }}>
//             Hardware Solutions – {activeTab}
//           </h2>
//         </div>

//         {/* Tabs */}
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: "8px",
//             marginBottom: "20px",
//             borderBottom: "1px solid #e7e7e7",
//             paddingBottom: "8px",
//           }}
//         >
//           {tabs.map((t) => (
//             <button
//               key={t}
//               onClick={() => {
//                 setActiveTab(t);
//                 setVisibleCount(25);
//               }}
//               style={{
//                 padding: "8px 16px",
//                 fontSize: "14px",
//                 fontWeight: activeTab === t ? "700" : "400",
//                 border: "none",
//                 background: "none",
//                 cursor: "pointer",
//                 color: activeTab === t ? "#c45500" : "#0f1111",
//                 borderBottom: activeTab === t ? "2px solid #c45500" : "none",
//               }}
//             >
//               {t}
//             </button>
//           ))}
//         </div>

//         {/* Horizontal scroll carousel + load more grid */}
//         <div style={{ position: "relative" }}>
//           {showLeftScroll && (
//             <button
//               onClick={() => handleScroll("left")}
//               style={{
//                 position: "absolute",
//                 left: "-20px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 zIndex: 10,
//                 width: "40px",
//                 height: "80px",
//                 borderRadius: "4px",
//                 background: "#fff",
//                 border: "1px solid #e7e7e7",
//                 boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <ChevronLeft size={20} />
//             </button>
//           )}
//           {showRightScroll && (
//             <button
//               onClick={() => handleScroll("right")}
//               style={{
//                 position: "absolute",
//                 right: "-20px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 zIndex: 10,
//                 width: "40px",
//                 height: "80px",
//                 borderRadius: "4px",
//                 background: "#fff",
//                 border: "1px solid #e7e7e7",
//                 boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <ChevronRight size={20} />
//             </button>
//           )}
//           <div
//             ref={scrollContainerRef}
//             onScroll={updateScrollButtons}
//             style={{
//               display: "flex",
//               gap: "20px",
//               overflowX: "auto",
//               scrollbarWidth: "thin",
//               padding: "10px 0 20px",
//               scrollBehavior: "smooth",
//             }}
//           >
//             {displayed.length === 0 ? (
//               <div
//                 style={{
//                   textAlign: "center",
//                   width: "100%",
//                   padding: "40px",
//                   color: "#565959",
//                 }}
//               >
//                 No products found in this category.
//               </div>
//             ) : (
//               displayed.map((item, idx) => (
//                 <div
//                   key={item.id || idx}
//                   style={{
//                     flex: "0 0 auto",
//                     width: "200px",
//                     background: "#fff",
//                     borderRadius: "8px",
//                     padding: "12px",
//                     border: "1px solid #f0f0f0",
//                     cursor: "pointer",
//                   }}
//                   onClick={() =>
//                     navigate(
//                       activeTab === "Spare Parts"
//                         ? `/spare-parts/${item.id}`
//                         : `/product/${item.id}`,
//                     )
//                   }
//                 >
//                   <div
//                     style={{
//                       height: "160px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       marginBottom: "12px",
//                     }}
//                   >
//                     {item.image ? (
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         style={{
//                           maxWidth: "100%",
//                           maxHeight: "100%",
//                           objectFit: "contain",
//                         }}
//                       />
//                     ) : (
//                       <ToolImage
//                         toolName={item.name}
//                         category={item.category || activeTab}
//                         style={{ width: "100%", height: "100%" }}
//                       />
//                     )}
//                   </div>
//                   <div
//                     style={{
//                       fontWeight: "500",
//                       fontSize: "14px",
//                       lineHeight: "1.2",
//                       height: "42px",
//                       overflow: "hidden",
//                       marginBottom: "4px",
//                     }}
//                   >
//                     {item.name?.length > 60
//                       ? item.name.slice(0, 60) + "…"
//                       : item.name}
//                   </div>
//                   <StarRating
//                     rating={item.rating}
//                     reviewCount={item.reviewCount}
//                   />
//                   <div
//                     style={{
//                       fontWeight: "700",
//                       fontSize: "16px",
//                       marginTop: "4px",
//                     }}
//                   >
//                     {isLoggedIn ? (
//                       <>
//                         ₹{item.price_inr?.toLocaleString()}
//                         {item.mrp > item.price_inr && (
//                           <span
//                             style={{
//                               fontSize: "12px",
//                               color: "#565959",
//                               textDecoration: "line-through",
//                               marginLeft: "8px",
//                             }}
//                           >
//                             ₹{item.mrp.toLocaleString()}
//                           </span>
//                         )}
//                       </>
//                     ) : (
//                       <span
//                         style={{
//                           fontSize: "12px",
//                           color: "#c45500",
//                           fontWeight: "400",
//                         }}
//                       >
//                         Sign in for price
//                       </span>
//                     )}
//                   </div>
//                   <PrimeBadge />
//                   <DeliveryMessage />
//                   <button
//                     onClick={(e) => handleAddToCart(e, item)}
//                     disabled={item.stockStatus === "Out of Stock"}
//                     style={{
//                       width: "100%",
//                       marginTop: "12px",
//                       padding: "8px",
//                       background:
//                         item.stockStatus === "Out of Stock"
//                           ? "#ccc"
//                           : "#ffd814",
//                       border: "none",
//                       borderRadius: "20px",
//                       fontWeight: "600",
//                       fontSize: "13px",
//                       cursor:
//                         item.stockStatus === "Out of Stock"
//                           ? "not-allowed"
//                           : "pointer",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       gap: "6px",
//                     }}
//                   >
//                     <ShoppingCart size={14} /> Add to cart
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Load More Button */}
//         {hasMore && (
//           <div style={{ textAlign: "center", marginTop: "32px" }}>
//             <button
//               onClick={loadMore}
//               style={{
//                 background: "none",
//                 border: "1px solid #c45500",
//                 padding: "8px 24px",
//                 borderRadius: "20px",
//                 fontSize: "13px",
//                 fontWeight: "600",
//                 color: "#c45500",
//                 cursor: "pointer",
//               }}
//             >
//               Load 25 more products ({filteredItems.length - visibleCount}{" "}
//               remaining)
//             </button>
//           </div>
//         )}
//         {!hasMore && visibleCount > 25 && (
//           <div
//             style={{
//               textAlign: "center",
//               marginTop: "16px",
//               fontSize: "13px",
//               color: "#565959",
//             }}
//           >
//             Showing all {filteredItems.length} products
//           </div>
//         )}
//       </div>

//       {/* Cart Toast */}
//       {cartToast && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: "40px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             zIndex: 1000,
//             background: "#0f172a",
//             color: "#fff",
//             padding: "16px 24px",
//             borderRadius: "16px",
//             display: "flex",
//             alignItems: "center",
//             gap: "16px",
//             boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
//             animation: "slideUp 0.3s ease",
//           }}
//         >
//           <CheckCircle size={20} style={{ color: "#22c55e" }} />
//           <div style={{ fontSize: "13px", fontWeight: 600 }}>
//             {cartToast} added to cart
//           </div>
//           <Link
//             to="/cart"
//             style={{
//               background: "#dc2626",
//               color: "#fff",
//               padding: "8px 16px",
//               borderRadius: "8px",
//               fontSize: "11px",
//               fontWeight: 700,
//               textDecoration: "none",
//             }}
//           >
//             Checkout
//           </Link>
//         </div>
//       )}

//       <style>{`
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateX(-50%) translateY(20px); }
//           to { opacity: 1; transform: translateX(-50%) translateY(0); }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Products;
