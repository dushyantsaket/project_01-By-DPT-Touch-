// src/data/tools-api.js
// Complete Product API with Working Images for Deneers Insulated & Taparia Tools
// ========================================================

const ToolsAPI = {
    version: "1.0.0",
    baseUrl: "https://api.deneerstools.com/v1",
    
    // All product data with embedded working image SVGs
    products: {
        // ============= INSULATED TOOLS (DENEERS) =============
        insulated: {
            adjustableWrench: {
                id: "INS-ADJ-001",
                name: "Adjustable Wrench - Insulated",
                category: "Non Sparking Insulated Tools",
                sizes: ["18×150mm", "24×200mm", "30×250mm", "36×300mm"],
                material: "Chrome Vanadium Steel with PVC Insulation",
                insulationRating: "1000V IEC 60900",
                workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
                    <rect width="400" height="300" fill="#1a1a2e" rx="10"/>
                    <text x="200" y="30" fill="#ffaa33" font-size="14" text-anchor="middle" font-weight="bold">🔧 ADJUSTABLE WRENCH</text>
                    <text x="200" y="48" fill="#88ccff" font-size="10" text-anchor="middle">1000V Insulated | IEC 60900</text>
                    <rect x="120" y="120" width="200" height="35" fill="#2d2d44" stroke="#ffaa33" stroke-width="2" rx="5"/>
                    <rect x="120" y="120" width="200" height="35" fill="none" stroke="#88ffaa" stroke-width="1" stroke-dasharray="8,4" rx="5"/>
                    <text x="220" y="142" fill="#88ffaa" font-size="11" text-anchor="middle">INSULATED HANDLE - 1000V</text>
                    <path d="M120,137 L85,137 L65,110 L65,80 L85,80 L100,95 L120,95" fill="#2d2d44" stroke="#ffaa33" stroke-width="2"/>
                    <path d="M85,157 L60,157 L40,130 L40,100 L60,100 L75,115 L85,115" fill="#2d2d44" stroke="#ffaa33" stroke-width="2" stroke-dasharray="4,2"/>
                    <circle cx="75" cy="157" r="12" fill="#1a1a2e" stroke="#88ccff" stroke-width="2"/>
                    <text x="75" y="200" fill="#88ccff" font-size="9" text-anchor="middle">Adjustment Knob</text>
                    <polygon points="65,110 55,105 55,115" fill="#ffaa33"/>
                    <polygon points="65,80 55,75 55,85" fill="#ffaa33"/>
                    <text x="200" y="250" fill="#88ccff" font-size="11" text-anchor="middle">⚡ Double Insulated | Non-Sparking</text>
                    <text x="200" y="270" fill="#ffaa33" font-size="10" text-anchor="middle">Sizes: 150-300mm | Jaw Capacity: 36mm</text>
                    <rect x="20" y="280" width="360" height="1" fill="#ffaa33" opacity="0.3"/>
                    <text x="200" y="295" fill="#666" font-size="9" text-anchor="middle">WORKING DIAGRAM - INSULATED TOOL</text>
                </svg>`,
                thumbnail: "https://deneerstools.com/wp-content/uploads/2020/07/Adjustable-Wrench-3.jpg",
                status: "active"
            },
            
            combinationPlier: {
                id: "INS-PLR-002",
                name: "Combination Plier - Insulated",
                category: "Non Sparking Insulated Tools",
                sizes: ["150mm (6\")", "175mm (7\")", "200mm (8\")"],
                material: "CR-V Steel with Bi-Material Insulated Grip",
                insulationRating: "1000V VDE Certified",
                workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
                    <rect width="400" height="300" fill="#1a1a2e" rx="10"/>
                    <text x="200" y="30" fill="#ffaa33" font-size="14" text-anchor="middle" font-weight="bold">🔧 COMBINATION PLIER</text>
                    <text x="200" y="48" fill="#88ccff" font-size="10" text-anchor="middle">1000V VDE Insulated | Bi-Material Grip</text>
                    <rect x="200" y="110" width="160" height="30" fill="#2d2d44" stroke="#ffaa33" stroke-width="2" rx="5"/>
                    <rect x="200" y="110" width="160" height="30" fill="none" stroke="#88ffaa" stroke-width="1" stroke-dasharray="8,4" rx="5"/>
                    <text x="280" y="130" fill="#88ffaa" font-size="10" text-anchor="middle">INSULATED HANDLE</text>
                    <path d="M200,125 L170,125 L155,105 L140,105 L140,145 L155,145 L170,125 L200,125" fill="#2d2d44" stroke="#ffaa33" stroke-width="2"/>
                    <path d="M200,155 L170,155 L155,175 L140,175 L140,135 L155,135 L170,155 L200,155" fill="#2d2d44" stroke="#ffaa33" stroke-width="2"/>
                    <circle cx="170" cy="140" r="5" fill="#88ccff"/>
                    <circle cx="170" cy="140" r="2" fill="#ffaa33"/>
                    <text x="155" y="90" fill="#ffaa33" font-size="9" text-anchor="middle">Gripping Zone</text>
                    <text x="155" y="200" fill="#ffaa33" font-size="9" text-anchor="middle">Cutting Edge</text>
                    <line x1="140" y1="105" x2="140" y2="175" stroke="#ffaa33" stroke-width="1" stroke-dasharray="3"/>
                    <line x1="135" y1="105" x2="145" y2="105" stroke="#ffaa33" stroke-width="1"/>
                    <line x1="135" y1="175" x2="145" y2="175" stroke="#ffaa33" stroke-width="1"/>
                    <text x="125" y="140" fill="#ffaa33" font-size="9">45mm</text>
                    <text x="200" y="250" fill="#88ccff" font-size="11" text-anchor="middle">⚡ VDE Tested | 1000V Safe</text>
                    <text x="200" y="270" fill="#ffaa33" font-size="10" text-anchor="middle">Sizes: 6\", 7\", 8\" | Induction Hardened</text>
                    <rect x="20" y="280" width="360" height="1" fill="#ffaa33" opacity="0.3"/>
                    <text x="200" y="295" fill="#666" font-size="9" text-anchor="middle">WORKING DIAGRAM - INSULATED TOOL</text>
                </svg>`,
                thumbnail: "https://deneerstools.com/wp-content/uploads/2020/07/COMBINATION-PLIER-3.jpg",
                status: "active"
            },
            
            longNosePlier: {
                id: "INS-PLR-003",
                name: "Long Nose Plier / Snipe Nose Plier",
                category: "Non Sparking Insulated Tools",
                sizes: ["150mm (6\")", "200mm (8\")"],
                material: "Chrome Vanadium Steel",
                insulationRating: "1000V IEC 60900",
                workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
                    <rect width="400" height="300" fill="#1a1a2e" rx="10"/>
                    <text x="200" y="30" fill="#ffaa33" font-size="14" text-anchor="middle" font-weight="bold">🔧 LONG NOSE PLIER</text>
                    <text x="200" y="48" fill="#88ccff" font-size="10" text-anchor="middle">Snipe Nose | 1000V Insulated</text>
                    <rect x="200" y="120" width="150" height="30" fill="#2d2d44" stroke="#ffaa33" stroke-width="2" rx="5"/>
                    <text x="275" y="140" fill="#88ffaa" font-size="10" text-anchor="middle">INSULATED GRIP</text>
                    <path d="M200,135 L160,135 L140,115 L120,95 L110,85 L100,85 L100,105 L110,115 L130,135 L150,155 L170,155 L200,155" fill="#2d2d44" stroke="#ffaa33" stroke-width="2"/>
                    <path d="M200,165 L160,165 L140,185 L120,205 L110,215 L100,215 L100,195 L110,185 L130,165 L150,145 L170,145 L200,145" fill="#2d2d44" stroke="#ffaa33" stroke-width="2"/>
                    <circle cx="160" cy="150" r="6" fill="#88ccff"/>
                    <circle cx="160" cy="150" r="2.5" fill="#ffaa33"/>
                    <text x="105" y="80" fill="#ffaa33" font-size="8" text-anchor="middle">Fine Tip</text>
                    <text x="200" y="250" fill="#88ccff" font-size="11" text-anchor="middle">⚡ Precision Gripping | Fine Tip Design</text>
                    <text x="200" y="270" fill="#ffaa33" font-size="10" text-anchor="middle">Sizes: 150mm, 200mm | Serrated Jaws</text>
                    <rect x="20" y="280" width="360" height="1" fill="#ffaa33" opacity="0.3"/>
                    <text x="200" y="295" fill="#666" font-size="9" text-anchor="middle">WORKING DIAGRAM - INSULATED TOOL</text>
                </svg>`,
                thumbnail: "https://deneerstools.com/wp-content/uploads/2020/07/Long-Nose-Pliers-1.jpg",
                status: "active"
            },
            
            diagonalCuttingPlier: {
                id: "INS-PLR-004",
                name: "Diagonal Cutting Plier",
                category: "Non Sparking Insulated Tools",
                sizes: ["150mm (6\")", "200mm (8\")"],
                material: "CR-V Steel with Insulated Handle",
                insulationRating: "1000V",
                workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
                    <rect width="400" height="300" fill="#1a1a2e" rx="10"/>
                    <text x="200" y="30" fill="#ffaa33" font-size="14" text-anchor="middle" font-weight="bold">✂️ DIAGONAL CUTTING PLIER</text>
                    <text x="200" y="48" fill="#88ccff" font-size="10" text-anchor="middle">1000V Insulated | Flush Cutting</text>
                    <rect x="210" y="120" width="150" height="30" fill="#2d2d44" stroke="#ffaa33" stroke-width="2" rx="5"/>
                    <text x="285" y="140" fill="#88ffaa" font-size="10" text-anchor="middle">INSULATED HANDLE</text>
                    <path d="M210,135 L170,135 L150,120 L130,110 L120,105" fill="none" stroke="#ffaa33" stroke-width="3"/>
                    <path d="M210,165 L170,165 L150,180 L130,190 L120,195" fill="none" stroke="#ffaa33" stroke-width="3"/>
                    <path d="M120,105 L110,100 L100,105 L110,110 Z" fill="#2d2d44" stroke="#ffaa33" stroke-width="1.5"/>
                    <path d="M120,195 L110,200 L100,195 L110,190 Z" fill="#2d2d44" stroke="#ffaa33" stroke-width="1.5"/>
                    <circle cx="170" cy="150" r="5" fill="#88ccff"/>
                    <circle cx="170" cy="150" r="2" fill="#ffaa33"/>
                    <text x="125" y="95" fill="#ffaa33" font-size="8" text-anchor="middle">Cutting Edge</text>
                    <text x="200" y="250" fill="#88ccff" font-size="11" text-anchor="middle">⚡ Flush Cutting | Induction Hardened Blades</text>
                    <text x="200" y="270" fill="#ffaa33" font-size="10" text-anchor="middle">Sizes: 6\", 8\" | Cuts up to 2.5mm Wire</text>
                    <rect x="20" y="280" width="360" height="1" fill="#ffaa33" opacity="0.3"/>
                    <text x="200" y="295" fill="#666" font-size="9" text-anchor="middle">WORKING DIAGRAM - INSULATED TOOL</text>
                </svg>`,
                thumbnail: "https://deneerstools.com/wp-content/uploads/2020/07/logo-400x250.jpg",
                status: "active"
            },
            
            wireStripper: {
                id: "INS-STR-005",
                name: "Wire Stripper - Insulated",
                category: "Non Sparking Insulated Tools",
                sizes: ["170mm"],
                material: "CR-V Steel with Insulated Grip",
                insulationRating: "1000V",
                workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
                    <rect width="400" height="300" fill="#1a1a2e" rx="10"/>
                    <text x="200" y="30" fill="#ffaa33" font-size="14" text-anchor="middle" font-weight="bold">🔌 WIRE STRIPPER</text>
                    <text x="200" y="48" fill="#88ccff" font-size="10" text-anchor="middle">1000V Insulated | Adjustable Wire Gauge</text>
                    <rect x="200" y="120" width="160" height="30" fill="#2d2d44" stroke="#ffaa33" stroke-width="2" rx="5"/>
                    <text x="280" y="140" fill="#88ffaa" font-size="10" text-anchor="middle">INSULATED GRIP</text>
                    <path d="M200,135 L160,135 L140,125 L120,125" fill="none" stroke="#ffaa33" stroke-width="3"/>
                    <path d="M200,165 L160,165 L140,175 L120,175" fill="none" stroke="#ffaa33" stroke-width="3"/>
                    <circle cx="120" cy="125" r="8" fill="#1a1a2e" stroke="#88ccff" stroke-width="2"/>
                    <circle cx="120" cy="175" r="8" fill="#1a1a2e" stroke="#88ccff" stroke-width="2"/>
                    <text x="120" y="115" fill="#88ccff" font-size="8" text-anchor="middle">Strip</text>
                    <text x="120" y="200" fill="#88ccff" font-size="8" text-anchor="middle">Cut</text>
                    <circle cx="170" cy="150" r="5" fill="#88ccff"/>
                    <circle cx="170" cy="150" r="2" fill="#ffaa33"/>
                    <text x="200" y="250" fill="#88ccff" font-size="11" text-anchor="middle">⚡ AWG 10-22 | Precision Stripping Holes</text>
                    <text x="200" y="270" fill="#ffaa33" font-size="10" text-anchor="middle">Length: 170mm | Spring Return Action</text>
                    <rect x="20" y="280" width="360" height="1" fill="#ffaa33" opacity="0.3"/>
                    <text x="200" y="295" fill="#666" font-size="9" text-anchor="middle">WORKING DIAGRAM - INSULATED TOOL</text>
                </svg>`,
                thumbnail: "https://deneerstools.com/wp-content/uploads/2020/07/logo-400x250.jpg",
                status: "active"
            },

            hammerBallPein: {
                id: "INS-HAM-010",
                name: "Hammer Ball Pein - Insulated",
                category: "Non Sparking Insulated Tools",
                sizes: ["230g", "340g", "450g", "680g", "910g", "1130g"],
                material: "Drop Forged Steel with Insulated Handle",
                insulationRating: "1000V",
                workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
                    <rect width="400" height="300" fill="#1a1a2e" rx="10"/>
                    <text x="200" y="30" fill="#ffaa33" font-size="14" text-anchor="middle" font-weight="bold">🔨 HAMMER - BALL PEIN</text>
                    <text x="200" y="48" fill="#88ccff" font-size="10" text-anchor="middle">1000V Insulated Handle | Drop Forged</text>
                    <rect x="160" y="130" width="180" height="28" fill="#2d2d44" stroke="#ffaa33" stroke-width="2" rx="5"/>
                    <text x="250" y="149" fill="#88ffaa" font-size="10" text-anchor="middle">INSULATED HANDLE</text>
                    <ellipse cx="130" cy="144" rx="35" ry="22" fill="#2d2d44" stroke="#ffaa33" stroke-width="2"/>
                    <ellipse cx="130" cy="144" rx="15" ry="15" fill="none" stroke="#88ccff" stroke-width="1.5"/>
                    <text x="130" y="120" fill="#ffaa33" font-size="9" text-anchor="middle">Ball Pein</text>
                    <text x="130" y="190" fill="#ffaa33" font-size="9" text-anchor="middle">Striking Face</text>
                    <line x1="160" y1="130" x2="160" y2="158" stroke="#ffaa33" stroke-width="1.5"/>
                    <text x="200" y="250" fill="#88ccff" font-size="11" text-anchor="middle">⚡ Double Insulated | Shock-Absorbing Grid</text>
                    <text x="200" y="270" fill="#ffaa33" font-size="10" text-anchor="middle">Weights: 230g - 1130g | Forged Steel Head</text>
                    <rect x="20" y="280" width="360" height="1" fill="#ffaa33" opacity="0.3"/>
                    <text x="200" y="295" fill="#666" font-size="9" text-anchor="middle">WORKING DIAGRAM - INSULATED TOOL</text>
                </svg>`,
                thumbnail: "https://deneerstools.com/wp-content/uploads/2020/07/hammer_ball_pen1-400x250.jpg",
                status: "active"
            }
        },

        // ============= TAPARIA TOOLS =============
        taparia: {
            miniPliers: [
                {
                    id: "1401",
                    prodNo: "1401",
                    name: "Flat Nose Mini Plier",
                    slug: "flat-nose-mini-plier",
                    description: "Made from high grade carbon steel. Springs provided between legs and Dip coated sleeves.",
                    specifications: { A: "125", B: "28", C: "-", D: "12", E: "6.5", F: "-", weightGms: "60" },
                    images: {
                        thumbnail: "images/product_images/mini_pliers/flat_nose_mini_plier_th.jpg",
                        large: "images/product_images/mini_pliers/flat_nose_mini_plier_la.jpg",
                        popup: "images/product_images/mini_pliers/flat_nose_mini_plier_big.jpg"
                    },
                    workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                        <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                        <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">FLAT NOSE MINI PLIER</text>
                        <text x="150" y="40" fill="#555" font-size="8" text-anchor="middle">Prod No: 1401 | Carbon Steel</text>
                        <rect x="100" y="75" width="120" height="20" fill="#2c3e50" rx="3"/>
                        <text x="160" y="89" fill="#ecf0f1" font-size="8" text-anchor="middle">DIP COATED SLEEVE</text>
                        <path d="M100,85 L75,85 L60,65 L50,50" fill="none" stroke="#c0392b" stroke-width="2.5"/>
                        <path d="M100,105 L75,105 L60,125 L50,140" fill="none" stroke="#c0392b" stroke-width="2.5"/>
                        <rect x="50" y="47" width="12" height="6" fill="#bdc3c7" stroke="#c0392b" stroke-width="1"/>
                        <rect x="50" y="137" width="12" height="6" fill="#bdc3c7" stroke="#c0392b" stroke-width="1"/>
                        <circle cx="85" cy="95" r="4" fill="#3498db"/>
                        <text x="150" y="170" fill="#2c3e50" font-size="8" text-anchor="middle">A:125 | B:28 | D:12 | E:6.5 | WT:60g</text>
                        <text x="150" y="185" fill="#888" font-size="7" text-anchor="middle">Spring loaded | Corrosion resistant</text>
                    </svg>`
                },
                {
                    id: "1402",
                    prodNo: "1402",
                    name: "Round Nose Mini Plier",
                    slug: "round-nose-mini-plier",
                    description: "Made from high grade carbon steel. Springs provided between legs and Dip coated sleeves.",
                    specifications: { A: "125", B: "28", C: "-", D: "12", E: "6.5", F: "2.0", weightGms: "55" },
                    images: {
                        thumbnail: "images/product_images/mini_pliers/round_nose_mini_plier_th.jpg",
                        large: "images/product_images/mini_pliers/round_nose_mini_plier_la.jpg",
                        popup: "images/product_images/mini_pliers/round_nose_mini_plier_big.jpg"
                    },
                    workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                        <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                        <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">ROUND NOSE MINI PLIER</text>
                        <text x="150" y="40" fill="#555" font-size="8" text-anchor="middle">Prod No: 1402 | For Wire Looping</text>
                        <rect x="100" y="75" width="120" height="20" fill="#2c3e50" rx="3"/>
                        <text x="160" y="89" fill="#ecf0f1" font-size="8" text-anchor="middle">DIP COATED SLEEVE</text>
                        <path d="M100,85 L75,85 L60,65 L50,55" fill="none" stroke="#c0392b" stroke-width="2.5"/>
                        <path d="M100,105 L75,105 L60,125 L50,135" fill="none" stroke="#c0392b" stroke-width="2.5"/>
                        <circle cx="50" cy="55" r="5" fill="none" stroke="#c0392b" stroke-width="1.5"/>
                        <circle cx="50" cy="135" r="5" fill="none" stroke="#c0392b" stroke-width="1.5"/>
                        <circle cx="85" cy="95" r="4" fill="#3498db"/>
                        <text x="150" y="170" fill="#2c3e50" font-size="8" text-anchor="middle">A:125 | B:28 | F:2.0 | WT:55g</text>
                        <text x="150" y="185" fill="#888" font-size="7" text-anchor="middle">Round jaws for bending loops</text>
                    </svg>`
                },
                {
                    id: "1403",
                    prodNo: "1403",
                    name: "Long Nose Mini Plier",
                    slug: "long-nose-mini-plier",
                    description: "Made from high grade carbon steel. Springs provided between legs and Dip coated sleeves.",
                    specifications: { A: "125", B: "35", C: "8", D: "12", E: "6.5", F: "1.5", weightGms: "55" },
                    images: {
                        thumbnail: "images/product_images/mini_pliers/long_nose_mini_plier_th.jpg",
                        large: "images/product_images/mini_pliers/long_nose_mini_plier_la.jpg",
                        popup: "images/product_images/mini_pliers/long_nose_mini_plier_big.jpg"
                    },
                    workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                        <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                        <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">LONG NOSE MINI PLIER</text>
                        <text x="150" y="40" fill="#555" font-size="8" text-anchor="middle">Prod No: 1403 | Precision Work</text>
                        <rect x="100" y="75" width="120" height="20" fill="#2c3e50" rx="3"/>
                        <text x="160" y="89" fill="#ecf0f1" font-size="8" text-anchor="middle">DIP COATED SLEEVE</text>
                        <path d="M100,85 L70,85 L50,60 L35,45" fill="none" stroke="#c0392b" stroke-width="2.5"/>
                        <path d="M100,105 L70,105 L50,130 L35,145" fill="none" stroke="#c0392b" stroke-width="2.5"/>
                        <rect x="35" y="42" width="8" height="6" fill="#bdc3c7" stroke="#c0392b" stroke-width="1"/>
                        <rect x="35" y="142" width="8" height="6" fill="#bdc3c7" stroke="#c0392b" stroke-width="1"/>
                        <circle cx="85" cy="95" r="4" fill="#3498db"/>
                        <text x="150" y="170" fill="#2c3e50" font-size="8" text-anchor="middle">A:125 | B:35 | C:8 | WT:55g</text>
                        <text x="150" y="185" fill="#888" font-size="7" text-anchor="middle">Extended reach for tight spaces</text>
                    </svg>`
                }
            ],
            wheelSpanners: [
                {
                    id: "1720",
                    name: "Box Spanners",
                    slug: "box-spanners",
                    standard: "Generally Conforming to IS 2030-1989",
                    description: "Up set forged from high grade manganese steel. Scientifically heat treated to give maximum strength, wear resistance and long life.",
                    variants: [
                        { prodNo: "1720/HD 1720", sizes: "30 x 32" },
                        { prodNo: "HD1725", sizes: "27 x 30" },
                        { prodNo: "1728", sizes: "24 x 27" }
                    ],
                    images: {
                        thumbnail: "images/product_images/wheel_spanners_sets/box_th.jpg"
                    },
                    workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                        <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                        <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">BOX SPANNERS</text>
                        <text x="150" y="40" fill="#555" font-size="8" text-anchor="middle">IS 2030-1989 | Manganese Steel</text>
                        <rect x="80" y="80" width="140" height="12" fill="#2c3e50" rx="2"/>
                        <path d="M80,86 L60,86 L50,76 L50,66 L60,66 L70,76" fill="none" stroke="#c0392b" stroke-width="2"/>
                        <path d="M220,86 L240,86 L250,76 L250,66 L240,66 L230,76" fill="none" stroke="#c0392b" stroke-width="2"/>
                        <text x="150" y="130" fill="#2c3e50" font-size="8" text-anchor="middle">Sizes: 24x27 | 27x30 | 30x32 | 32x33</text>
                    </svg>`
                }
            ]
        }
    },

    // ============================================================
    // API METHODS
    // ============================================================
    
    // Get all mini pliers
    getAllMiniPliers: function() {
        return this.products.taparia.miniPliers;
    },
    
    // Get single mini plier by ID
    getMiniPlierById: function(id) {
        return this.products.taparia.miniPliers.find(p => p.id === id);
    },
    
    // Get all wheel spanners
    getAllWheelSpanners: function() {
        return this.products.taparia.wheelSpanners;
    },
    
    // Get insulated tools
    getInsulatedTools: function() {
        return Object.values(this.products.insulated);
    },
    
    // Search across all products
    search: function(query) {
        const searchTerm = query.toLowerCase();
        const results = [];
        
        // Search in Insulated
        for (const [key, tool] of Object.entries(this.products.insulated)) {
            if (tool.name.toLowerCase().includes(searchTerm)) {
                results.push({ ...tool, brand: 'Deneers' });
            }
        }
        
        // Search in Taparia
        this.products.taparia.miniPliers.forEach(p => {
            if (p.name.toLowerCase().includes(searchTerm)) {
                results.push({ ...p, brand: 'Taparia' });
            }
        });
        
        this.products.taparia.wheelSpanners.forEach(w => {
            if (w.name.toLowerCase().includes(searchTerm)) {
                results.push({ ...w, brand: 'Taparia' });
            }
        });
        
        return results;
    }
};

export default ToolsAPI;
