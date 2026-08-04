// src/data/taparia-tools-api.js
// Complete API for TAPARIA Tools - Mini Pliers & Wheel Spanners
// All images are embedded as working SVG diagrams

const TapariaToolsAPI = (() => {
    // ============================================================
    // 1. MINI PLIERS DATA
    // ============================================================
    const miniPliers = [
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
        },
        {
            id: "1404",
            prodNo: "1404",
            name: "Bent Nose Mini Plier",
            slug: "bent-nose-mini-plier",
            description: "Made from high grade carbon steel. Springs provided between legs and Dip coated sleeves.",
            specifications: { A: "125", B: "-", C: "-", D: "12", E: "6.5", F: "13", weightGms: "60" },
            images: {
                thumbnail: "images/product_images/mini_pliers/bent_nose_mini_plier_th.jpg",
                large: "images/product_images/mini_pliers/bent_nose_mini_plier_la.jpg",
                popup: "images/product_images/mini_pliers/bent_nose_mini_plier_big.jpg"
            },
            workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">BENT NOSE MINI PLIER</text>
                <text x="150" y="40" fill="#555" font-size="8" text-anchor="middle">Prod No: 1404 | 45° Angled Jaw</text>
                <rect x="100" y="75" width="120" height="20" fill="#2c3e50" rx="3"/>
                <text x="160" y="89" fill="#ecf0f1" font-size="8" text-anchor="middle">DIP COATED SLEEVE</text>
                <path d="M100,85 L75,85 L60,65 L45,55" fill="none" stroke="#c0392b" stroke-width="2.5"/>
                <path d="M100,105 L75,105 L60,125 L45,135" fill="none" stroke="#c0392b" stroke-width="2.5"/>
                <circle cx="45" cy="55" r="4" fill="none" stroke="#c0392b" stroke-width="1.5"/>
                <circle cx="45" cy="135" r="4" fill="none" stroke="#c0392b" stroke-width="1.5"/>
                <circle cx="85" cy="95" r="4" fill="#3498db"/>
                <text x="150" y="170" fill="#2c3e50" font-size="8" text-anchor="middle">A:125 | F:13 | WT:60g</text>
                <text x="150" y="185" fill="#888" font-size="7" text-anchor="middle">45° bent tip for hard-to-reach areas</text>
            </svg>`
        },
        {
            id: "1405",
            prodNo: "1405",
            name: "Side Cutting Mini Plier",
            slug: "side-cutting-mini-plier",
            description: "Made from high grade carbon steel. Springs provided between legs and Dip coated sleeves.",
            specifications: { A: "125", B: "16", C: "-", D: "12", E: "6.5", F: "-", weightGms: "60" },
            images: {
                thumbnail: "images/product_images/mini_pliers/side_cutting_mini_plier_th.jpg",
                large: "images/product_images/mini_pliers/side_cutting_mini_plier_la.jpg",
                popup: "images/product_images/mini_pliers/side_cutting_mini_plier_big.jpg"
            },
            workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">SIDE CUTTING MINI PLIER</text>
                <text x="150" y="40" fill="#555" font-size="8" text-anchor="middle">Prod No: 1405 | Flush Cut</text>
                <rect x="100" y="75" width="120" height="20" fill="#2c3e50" rx="3"/>
                <text x="160" y="89" fill="#ecf0f1" font-size="8" text-anchor="middle">DIP COATED SLEEVE</text>
                <path d="M100,85 L75,85 L60,70 L50,60" fill="none" stroke="#c0392b" stroke-width="2.5"/>
                <path d="M100,105 L75,105 L60,120 L50,130" fill="none" stroke="#c0392b" stroke-width="2.5"/>
                <path d="M50,60 L40,55 L35,60 L45,65 Z" fill="#bdc3c7" stroke="#c0392b" stroke-width="1"/>
                <path d="M50,130 L40,135 L35,130 L45,125 Z" fill="#bdc3c7" stroke="#c0392b" stroke-width="1"/>
                <circle cx="85" cy="95" r="4" fill="#3498db"/>
                <text x="150" y="170" fill="#2c3e50" font-size="8" text-anchor="middle">A:125 | B:16 | WT:60g</text>
                <text x="150" y="185" fill="#888" font-size="7" text-anchor="middle">Flush cutting edge for clean cuts</text>
            </svg>`
        },
        {
            id: "1406",
            prodNo: "1406",
            name: "End Cutting Mini Plier",
            slug: "end-cutting-mini-plier",
            description: "Made from high grade carbon steel. Springs provided between legs and Dip coated sleeves.",
            specifications: { A: "110", B: "8", C: "-", D: "18", E: "13", F: "-", weightGms: "70" },
            images: {
                thumbnail: "images/product_images/mini_pliers/end_cutting_mini_plier_th.jpg",
                large: "images/product_images/mini_pliers/end_cutting_mini_plier_la.jpg",
                popup: "images/product_images/mini_pliers/end_cutting_mini_plier_big.jpg"
            },
            workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">END CUTTING MINI PLIER</text>
                <text x="150" y="40" fill="#555" font-size="8" text-anchor="middle">Prod No: 1406 | Flush End Cut</text>
                <rect x="100" y="75" width="120" height="20" fill="#2c3e50" rx="3"/>
                <text x="160" y="89" fill="#ecf0f1" font-size="8" text-anchor="middle">DIP COATED SLEEVE</text>
                <path d="M100,85 L80,85 L65,75 L55,65" fill="none" stroke="#c0392b" stroke-width="2.5"/>
                <path d="M100,105 L80,105 L65,115 L55,125" fill="none" stroke="#c0392b" stroke-width="2.5"/>
                <rect x="55" y="62" width="10" height="6" fill="#bdc3c7" stroke="#c0392b" stroke-width="1"/>
                <rect x="55" y="122" width="10" height="6" fill="#bdc3c7" stroke="#c0392b" stroke-width="1"/>
                <circle cx="85" cy="95" r="4" fill="#3498db"/>
                <text x="150" y="170" fill="#2c3e50" font-size="8" text-anchor="middle">A:110 | B:8 | D:18 | WT:70g</text>
                <text x="150" y="185" fill="#888" font-size="7" text-anchor="middle">End cutting for flush trimming</text>
            </svg>`
        },
        {
            id: "1407",
            prodNo: "1407",
            name: "Combination Mini Plier",
            slug: "combination-mini-plier",
            description: "Made from high grade carbon steel. Springs provided between legs and Dip coated sleeves.",
            specifications: { A: "125", B: "19", C: "-", D: "17", E: "9.5", F: "-", weightGms: "110" },
            images: {
                thumbnail: "images/product_images/mini_pliers/combination_mini_plier_th.jpg",
                large: "images/product_images/mini_pliers/combination_mini_plier_la.jpg",
                popup: "images/product_images/mini_pliers/combination_mini_plier_big.jpg"
            },
            workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">COMBINATION MINI PLIER</text>
                <text x="150" y="40" fill="#555" font-size="8" text-anchor="middle">Prod No: 1407 | Grip + Cut</text>
                <rect x="100" y="75" width="120" height="20" fill="#2c3e50" rx="3"/>
                <text x="160" y="89" fill="#ecf0f1" font-size="8" text-anchor="middle">DIP COATED SLEEVE</text>
                <path d="M100,85 L75,85 L60,70 L50,60" fill="none" stroke="#c0392b" stroke-width="2.5"/>
                <path d="M100,105 L75,105 L60,120 L50,130" fill="none" stroke="#c0392b" stroke-width="2.5"/>
                <path d="M50,60 L40,55 L35,60 L45,65 Z" fill="#bdc3c7" stroke="#c0392b" stroke-width="1"/>
                <circle cx="85" cy="95" r="4" fill="#3498db"/>
                <text x="150" y="170" fill="#2c3e50" font-size="8" text-anchor="middle">A:125 | B:19 | WT:110g</text>
                <text x="150" y="185" fill="#888" font-size="7" text-anchor="middle">Gripping + Cutting in one tool</text>
            </svg>`
        },
        {
            id: "1408",
            prodNo: "1408",
            name: "Long Needle Nose Mini Plier",
            slug: "long-needle-nose-mini-plier",
            description: "Made from high grade carbon steel. Springs provided between legs and Dip coated sleeves.",
            specifications: { A: "150", B: "55", C: "-", D: "11.5", E: "6", F: "2.5", weightGms: "60" },
            images: {
                thumbnail: "images/product_images/mini_pliers/long_needle_nose_mini_plier_th.jpg",
                large: "images/product_images/mini_pliers/long_needle_nose_mini_plier_la.jpg",
                popup: "images/product_images/mini_pliers/long_needle_nose_mini_plier_big.jpg"
            },
            workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                <text x="150" y="25" fill="#c0392b" font-size="11" text-anchor="middle" font-weight="bold">LONG NEEDLE NOSE MINI PLIER</text>
                <text x="150" y="40" fill="#555" font-size="8" text-anchor="middle">Prod No: 1408 | Extra Long Reach</text>
                <rect x="100" y="75" width="120" height="20" fill="#2c3e50" rx="3"/>
                <text x="160" y="89" fill="#ecf0f1" font-size="8" text-anchor="middle">DIP COATED SLEEVE</text>
                <path d="M100,85 L65,85 L40,55 L25,40" fill="none" stroke="#c0392b" stroke-width="2.5"/>
                <path d="M100,105 L65,105 L40,135 L25,150" fill="none" stroke="#c0392b" stroke-width="2.5"/>
                <rect x="25" y="37" width="6" height="6" fill="#bdc3c7" stroke="#c0392b" stroke-width="1"/>
                <rect x="25" y="147" width="6" height="6" fill="#bdc3c7" stroke="#c0392b" stroke-width="1"/>
                <circle cx="85" cy="95" r="4" fill="#3498db"/>
                <text x="150" y="170" fill="#2c3e50" font-size="8" text-anchor="middle">A:150 | B:55 | WT:60g</text>
                <text x="150" y="185" fill="#888" font-size="7" text-anchor="middle">Extra long needle nose for deep access</text>
            </svg>`
        },
        {
            id: "1409",
            prodNo: "1409",
            name: "Long Needle Bend Nose Mini Plier",
            slug: "long-needle-bend-nose-mini-plier",
            description: "Made from high grade carbon steel. Springs provided between legs and Dip coated sleeves.",
            specifications: { A: "145", B: "-", C: "-", D: "12", E: "6", F: "12", weightGms: "60" },
            images: {
                thumbnail: "images/product_images/mini_pliers/long_needle_bend_nose_mini_plier_th.jpg",
                large: "images/product_images/mini_pliers/long_needle_bend_nose_mini_plier_la.jpg",
                popup: "images/product_images/mini_pliers/long_needle_bend_nose_mini_plier_big.jpg"
            },
            workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                <text x="150" y="25" fill="#c0392b" font-size="11" text-anchor="middle" font-weight="bold">LONG NEEDLE BEND NOSE PLIER</text>
                <text x="150" y="40" fill="#555" font-size="8" text-anchor="middle">Prod No: 1409 | Angled Extra Long</text>
                <rect x="100" y="75" width="120" height="20" fill="#2c3e50" rx="3"/>
                <text x="160" y="89" fill="#ecf0f1" font-size="8" text-anchor="middle">DIP COATED SLEEVE</text>
                <path d="M100,85 L70,85 L50,60 L35,45" fill="none" stroke="#c0392b" stroke-width="2.5"/>
                <path d="M100,105 L70,105 L50,130 L35,145" fill="none" stroke="#c0392b" stroke-width="2.5"/>
                <circle cx="35" cy="45" r="3" fill="none" stroke="#c0392b" stroke-width="1.5"/>
                <circle cx="35" cy="145" r="3" fill="none" stroke="#c0392b" stroke-width="1.5"/>
                <circle cx="85" cy="95" r="4" fill="#3498db"/>
                <text x="150" y="170" fill="#2c3e50" font-size="8" text-anchor="middle">A:145 | F:12 | WT:60g</text>
                <text x="150" y="185" fill="#888" font-size="7" text-anchor="middle">Angled tip + extra long reach</text>
            </svg>`
        }
    ];

    // ============================================================
    // 2. WHEEL SPANNERS & SETS DATA
    // ============================================================
    const wheelSpanners = [
        {
            id: "1720",
            name: "Box Spanners",
            slug: "box-spanners",
            standard: "Generally Conforming to IS 2030-1989",
            description: "Up set forged from high grade manganese steel. Scientifically heat treated to give maximum strength, wear resistance and long life. Available with bright finish in Nickle Chrome and black phosphate finish for protection from corrosion.",
            variants: [
                { prodNo: "1720/HD 1720", sizes: "30 x 32", weightGms: "-" },
                { prodNo: "HD1725", sizes: "27 x 30", weightGms: "-" },
                { prodNo: "1728", sizes: "24 x 27", weightGms: "-" },
                { prodNo: "HD 1730", sizes: "27 x 33", weightGms: "-" },
                { prodNo: "1731", sizes: "27 x 27", weightGms: "-" },
                { prodNo: "HD 3030", sizes: "30 x 30", weightGms: "-" },
                { prodNo: "1740", sizes: "32 x 32", weightGms: "-" },
                { prodNo: "CHD 1740", sizes: "32 x 32", weightGms: "-" },
                { prodNo: "HD 3233", sizes: "32 x 33", weightGms: "-" },
                { prodNo: "1741", sizes: "33 x 33", weightGms: "-" },
                { prodNo: "CHD 1741", sizes: "33 x 33", weightGms: "-" },
                { prodNo: "1750", sizes: "Tommy Bar", weightGms: "-" },
                { prodNo: "1751", sizes: "Tommy Bar", weightGms: "-" }
            ],
            images: {
                thumbnail: "images/product_images/wheel_spanners_sets/box_th.jpg",
                large: "images/product_images/wheel_spanners_sets/box_big.jpg"
            },
            workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">BOX SPANNERS</text>
                <text x="150" y="40" fill="#555" font-size="8" text-anchor="middle">IS 2030-1989 | Manganese Steel</text>
                <rect x="80" y="80" width="140" height="12" fill="#2c3e50" rx="2"/>
                <text x="150" y="89" fill="#ecf0f1" font-size="7" text-anchor="middle">Nickle Chrome / Black Phosphate</text>
                <path d="M80,86 L60,86 L50,76 L50,66 L60,66 L70,76" fill="none" stroke="#c0392b" stroke-width="2"/>
                <path d="M220,86 L240,86 L250,76 L250,66 L240,66 L230,76" fill="none" stroke="#c0392b" stroke-width="2"/>
                <circle cx="55" cy="86" r="6" fill="none" stroke="#c0392b" stroke-width="1.5"/>
                <circle cx="245" cy="86" r="6" fill="none" stroke="#c0392b" stroke-width="1.5"/>
                <text x="150" y="130" fill="#2c3e50" font-size="8" text-anchor="middle">Sizes: 24x27 | 27x30 | 30x32 | 32x33</text>
                <text x="150" y="145" fill="#555" font-size="7" text-anchor="middle">Tommy Bar available (Prod: 1750, 1751)</text>
                <text x="150" y="180" fill="#888" font-size="7" text-anchor="middle">Heat treated | Wear resistant</text>
            </svg>`
        },
        {
            id: "1535",
            name: "L. Spanners",
            slug: "l-spanners",
            standard: "Generally Conforming to IS 2030-1989",
            variants: [
                { prodNo: "1535", sizes: "18A/F", weightGms: "-" },
                { prodNo: "1536S", sizes: "19A/F", weightGms: "-" },
                { prodNo: "1536", sizes: "19A/F", weightGms: "-" },
                { prodNo: "1537", sizes: "21A/F", weightGms: "-" }
            ],
            images: {
                thumbnail: "images/product_images/wheel_spanners_sets/l_th.jpg",
                large: "images/product_images/wheel_spanners_sets/l_big.jpg"
            },
            workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">L. SPANNERS</text>
                <text x="150" y="40" fill="#555" font-size="8" text-anchor="middle">IS 2030-1989 | L-Shaped Design</text>
                <path d="M100,140 L100,70 L160,70" fill="none" stroke="#c0392b" stroke-width="3" stroke-linecap="round"/>
                <circle cx="100" cy="70" r="8" fill="none" stroke="#c0392b" stroke-width="2"/>
                <text x="100" y="55" fill="#c0392b" font-size="7" text-anchor="middle">18-21 A/F</text>
                <text x="150" y="160" fill="#2c3e50" font-size="8" text-anchor="middle">Sizes: 18, 19, 21 A/F</text>
                <text x="150" y="180" fill="#888" font-size="7" text-anchor="middle">Forged | Heat treated</text>
            </svg>`
        },
        {
            id: "CW0314",
            name: "Cross Rim Wrench",
            slug: "cross-rim-wrench",
            standard: "Generally Conforming to IS 2030-1989",
            variants: [
                { prodNo: "CW0314", sizes: "10 x 13, 11 x 14", weightGms: "-" },
                { prodNo: "CW7981", sizes: "17 x 19, 18 x 21", weightGms: "-" }
            ],
            images: {
                thumbnail: "images/product_images/wheel_spanners_sets/cross_th.jpg",
                large: "images/product_images/wheel_spanners_sets/cross_big.jpg"
            },
            workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">CROSS RIM WRENCH</text>
                <text x="150" y="40" fill="#555" font-size="8" text-anchor="middle">4-Way Cross Design</text>
                <line x1="80" y1="100" x2="220" y2="100" stroke="#c0392b" stroke-width="3"/>
                <line x1="150" y1="50" x2="150" y2="150" stroke="#c0392b" stroke-width="3"/>
                <circle cx="150" cy="100" r="15" fill="#2c3e50"/>
                <circle cx="150" cy="100" r="10" fill="none" stroke="#ecf0f1" stroke-width="2"/>
                <text x="150" y="103" fill="#ecf0f1" font-size="7" text-anchor="middle">X</text>
                <text x="80" y="90" fill="#c0392b" font-size="7" text-anchor="middle">10x13</text>
                <text x="220" y="90" fill="#c0392b" font-size="7" text-anchor="middle">11x14</text>
                <text x="150" y="175" fill="#2c3e50" font-size="8" text-anchor="middle">Sizes: 10x13/11x14 & 17x19/18x21</text>
            </svg>`
        },
        {
            id: "TS-6x7",
            name: "Tubular Box Spanners",
            slug: "tubular-box-spanners",
            standard: "Generally Conforming to IS 2030-1989",
            variants: [
                { prodNo: "TS 6 x 7", sizes: "6 x 7", weightGms: "-" },
                { prodNo: "TS 8 x 9", sizes: "6 x 7", weightGms: "-" },
                { prodNo: "TS 10 x 11", sizes: "6 x 7", weightGms: "-" },
                { prodNo: "TS 12 x 13", sizes: "12 x 13", weightGms: "-" },
                { prodNo: "TS 14 x 15", sizes: "14 x 15", weightGms: "-" },
                { prodNo: "TS 16 x 17", sizes: "16 x 17", weightGms: "-" },
                { prodNo: "TS 18 x 19", sizes: "18 x 19", weightGms: "-" },
                { prodNo: "TS 20 x 22", sizes: "20 x 22", weightGms: "-" },
                { prodNo: "TS 21 x 23", sizes: "21 x 23", weightGms: "-" },
                { prodNo: "TS 24 x 27", sizes: "24 x 27", weightGms: "-" },
                { prodNo: "TS 25 x 28", sizes: "25 x 28", weightGms: "-" },
                { prodNo: "TS 30 x 32", sizes: "30 x 32", weightGms: "-" }
            ],
            images: {
                thumbnail: "images/product_images/wheel_spanners_sets/tubularbox-_th.jpg",
                large: "images/product_images/wheel_spanners_sets/tubularbox-_big.jpg"
            },
            workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">TUBULAR BOX SPANNERS</text>
                <text x="150" y="40" fill="#555" font-size="8" text-anchor="middle">IS 2030-1989 | Hollow Tube Design</text>
                <rect x="70" y="70" width="160" height="12" fill="#2c3e50" rx="3"/>
                <text x="150" y="79" fill="#ecf0f1" font-size="7" text-anchor="middle">TUBULAR BODY</text>
                <circle cx="70" cy="76" r="10" fill="none" stroke="#c0392b" stroke-width="2"/>
                <circle cx="230" cy="76" r="10" fill="none" stroke="#c0392b" stroke-width="2"/>
                <text x="70" y="80" fill="#c0392b" font-size="6" text-anchor="middle">6-30mm</text>
                <text x="150" y="120" fill="#2c3e50" font-size="8" text-anchor="middle">Sizes: 6x7 to 30x32</text>
                <text x="150" y="140" fill="#555" font-size="7" text-anchor="middle">Tommy Bar compatible</text>
                <text x="150" y="180" fill="#888" font-size="7" text-anchor="middle">Double ended | Hollow for leverage</text>
            </svg>`
        },
        {
            id: "TS08",
            name: "Tubular Spanners Set",
            slug: "tubular-spanners-set",
            standard: "Generally Conforming to IS 2030-1989",
            contents: "6x7, 8x9, 10x11, 12x13, 14x15, 16x17, 18x19, 20x22 | Tommy Bar: 1) Dia 12 x 250mm , 2) Special Tommy Bar",
            images: {
                thumbnail: "images/product_images/wheel_spanners_sets/tubular_set_th.jpg",
                large: "images/product_images/wheel_spanners_sets/tubular_set_big.jpg"
            },
            workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">TUBULAR SPANNERS SET</text>
                <text x="150" y="40" fill="#555" font-size="8" text-anchor="middle">Complete Set with Tommy Bars</text>
                <rect x="50" y="65" width="200" height="45" fill="#2c3e50" rx="5"/>
                <text x="150" y="80" fill="#ecf0f1" font-size="8" text-anchor="middle">SET CONTENTS</text>
                <text x="150" y="95" fill="#88ccff" font-size="7" text-anchor="middle">6x7,8x9,10x11,12x13,14x15,16x17,18x19,20x22</text>
                <text x="150" y="108" fill="#ffaa33" font-size="7" text-anchor="middle">+ Tommy Bar (12x250mm) + Special Tommy Bar</text>
                <text x="150" y="170" fill="#2c3e50" font-size="8" text-anchor="middle">Prod No: TS 08</text>
                <text x="150" y="185" fill="#888" font-size="7" text-anchor="middle">Complete tubular spanner collection</text>
            </svg>`
        }
    ];

    // ============================================================
    // 3. SCREW DRIVER BITS & SETS DATA
    // ============================================================
    const screwDriverBits = [
        {
            id: "SBP250",
            prodNo: "SBP250",
            name: "Philips Head Bits",
            slug: "philips-head-bits",
            standard: "Generally Conforming to IS 12168 Part II 1987",
            description: "Accurately hardened & Tempered to 56-60 HRC. Withstand high torque and high wear resistance.",
            specifications: { SIZE: "0", B: "4", C: "15", L: "25", weightGms: "5.0" },
            images: {
                thumbnail: "images/product_images/screw_ driver bits_sets/philips_head_bits_th.jpg"
            },
            workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">PHILIPS HEAD BIT</text>
                <text x="150" y="40" fill="#555" font-size="8" text-anchor="middle">IS 12168 | 56-60 HRC</text>
                <rect x="130" y="70" width="40" height="10" fill="#2c3e50" rx="1"/>
                <path d="M170,72 L185,72 L195,75 L195,75 L185,78 L170,78" fill="#bdc3c7" stroke="#2c3e50" stroke-width="1"/>
                <path d="M195,75 L205,75" fill="none" stroke="#c0392b" stroke-width="2" stroke-linecap="round"/>
                <text x="150" y="110" fill="#2c3e50" font-size="8" text-anchor="middle">Hardened Tip | High Torque</text>
            </svg>`
        },
        {
            id: "BS80",
            prodNo: "BS80",
            name: "Screw Driver Bits Set (80 Pcs)",
            slug: "screw-driver-bits-set",
            description: "80 pcs screw driver bit set is an ideal buy for work shops. Nickel chrome plated.",
            details: "Contains: Hex, Flat, Torx, Philips bits, Adaptors, Ratchet Bit Driver Handle.",
            images: {
                thumbnail: "images/product_images/screw_ driver bits_sets/screwdriver_bits_set_th.jpg"
            },
            workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">BIT SET - 80 PCS</text>
                <text x="150" y="40" fill="#555" font-size="8" text-anchor="middle">Model: BS80 | Nickel Chrome Plated</text>
                <rect x="80" y="60" width="140" height="80" fill="#2c3e50" rx="5"/>
                <rect x="90" y="70" width="20" height="10" fill="#bdc3c7" rx="1"/>
                <rect x="115" y="70" width="20" height="10" fill="#bdc3c7" rx="1"/>
                <rect x="140" y="70" width="20" height="10" fill="#bdc3c7" rx="1"/>
                <rect x="165" y="70" width="20" height="10" fill="#bdc3c7" rx="1"/>
                <rect x="190" y="70" width="20" height="10" fill="#bdc3c7" rx="1"/>
                <text x="150" y="120" fill="#ecf0f1" font-size="7" text-anchor="middle">COMPLETE WORKSHOP KIT</text>
            </svg>`
        }
    ];

    // ============================================================
    // 4. SOCKETS DATA
    // ============================================================
    const sockets = [
        {
            id: "sockets-1by4-inch",
            name: "Sockets 1/4\" Square Drive",
            slug: "sockets-1by4-inch-square-drive",
            standard: "Generally Conforming to IS 7381-1986",
            description: "Forged from high grade Chrome Vanadium steel. Nickel Chrome plating finish to enable rust prevention.",
            variants: [
                { prodNo: "A 4 H", size: "4mm", weightGms: 10 },
                { prodNo: "A 8 H", size: "8mm", weightGms: 10 },
                { prodNo: "A 14 H", size: "14mm", weightGms: 30 }
            ],
            images: {
                thumbnail: "images/product_images/sockets_ accessories_ocket_ sets/sockets/sockets_14_square_drive_th.jpg"
            },
            workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">1/4" SQUARE DRIVE SOCKET</text>
                <text x="150" y="40" fill="#555" font-size="9" text-anchor="middle">Chrome Vanadium | 6-Point</text>
                <rect x="125" y="55" width="50" height="90" fill="#bdc3c7" stroke="#2c3e50" stroke-width="2"/>
                <rect x="135" y="60" width="30" height='80' fill='#95a5a6'/>
                <circle cx='150' cy='55' r='8' fill='#2c3e50'/>
                <text x='150' y='160' fill='#2c3e50' font-size='9' text-anchor='middle'>Sizes: 4mm to 14mm</text>
            </svg>`
        },
        {
            id: "sockets-3by8-inch",
            name: "Socket 3/8\" Square Drive",
            slug: "socket-3by8-inch-square-drive",
            standard: "Generally Conforming to IS 7381-1986",
            description: "Flank Drive Chrome Vanadium steel sockets for mid-range torque.",
            variants: [
                { prodNo: "B 6 H", size: "6mm", weightGms: 25 },
                { prodNo: "B 22 H", size: "22mm", weightGms: 80 }
            ],
            images: {
                thumbnail: "images/product_images/sockets_ accessories_ocket_ sets/sockets/socket_38_sd_th.jpg"
            },
            workingImage: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect width='300' height='200' fill='#f5f5f5' rx='8'/><text x='150' y='25' fill='#c0392b' font-size='12' text-anchor='middle' font-weight='bold'>3/8" SQUARE DRIVE SOCKET</text><text x='150' y='40' fill='#555' font-size='9' text-anchor='middle'>Flank Drive | Cr-V Steel</text><rect x='120' y='55' width='60' height='95' fill='#bdc3c7' stroke='#2c3e50' stroke-width='2' rx='3'/><circle cx='150' cy='56' r='9' fill='#2c3e50'/><text x='150' y='165' fill='#2c3e50' font-size='9' text-anchor='middle'>Sizes: 6mm to 22mm</text></svg>`
        },
        {
            id: "sockets-half-inch-flank",
            name: "Sockets 1/2\" Square Drive",
            slug: "sockets-half-inch-flank-drive",
            standard: "Generally Conforming to IS 6131-1980 & 7381-1986",
            description: "Forged from high grade Chrome Vanadium steel. Scientifically heat treated for strength.",
            variants: [
                { prodNo: "8", size: "8mm", weightGms: 45 },
                { prodNo: "19", size: "19mm", weightGms: 90 },
                { prodNo: "34", size: "34mm", weightGms: 190 }
            ],
            images: {
                thumbnail: "images/product_images/sockets_ accessories_ocket_ sets/sockets/s12.7mm_flankdrive_th.jpg"
            },
            workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">1/2" SQUARE DRIVE - FLANK DRIVE</text>
                <text x="150" y="40" fill="#555" font-size="9" text-anchor="middle">Hexagonal & Bi-Hexagonal | Cr-V</text>
                <rect x="115" y="55" width="70" height="100" fill="#bdc3c7" stroke="#2c3e50" stroke-width="2" rx="3"/>
                <circle cx="150" cy="55" r="10" fill="#2c3e50"/>
                <text x="150" y="170" fill="#2c3e50" font-size="9" text-anchor="middle">Sizes: 8mm to 34mm</text>
            </svg>`
        },
        {
            id: "deep-sockets-half-inch",
            name: "Deep Sockets 1/2\" Square Drive",
            slug: "deep-sockets-half-inch-square-drive",
            description: "Extended length sockets for deep reach applications.",
            variants: [
                { prodNo: "L8H", size: "8mm", weightGms: 110 },
                { prodNo: "L30H", size: "34mm", weightGms: 350 }
            ],
            images: {
                thumbnail: "images/product_images/sockets_ accessories_ocket_ sets/sockets/deep_sockets_12.7mm-_12_th.jpg"
            },
            workingImage: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect width='300' height='200' fill='#f5f5f5' rx='8'/><text x='150' y='25' fill='#c0392b' font-size='12' text-anchor='middle' font-weight='bold'>DEEP SOCKETS - 1/2" DRIVE</text><text x='150' y='40' fill='#555' font-size='9' text-anchor='middle'>Extended Length for Deep Reach</text><rect x='125' y='50' width='50' height='110' fill='#bdc3c7' stroke='#2c3e50' stroke-width='2' rx='3'/><circle cx='150' cy='51' r='9' fill='#2c3e50'/><text x='150' y='170' fill='#2c3e50' font-size='9' text-anchor='middle'>Length: 76mm | Sizes: 8mm to 34mm</text></svg>`
        },
        {
            id: "impact-sockets-half-inch",
            name: "Impact Sockets 1/2\" Square Drive",
            slug: "impact-sockets-hexagonal-half-inch",
            standard: "Generally Conforming to IS 7993-1988",
            description: "Forged from high grade alloy steel. Used with air impact wrenches.",
            variants: [
                { prodNo: "IM8", size: "8mm", weightGms: 60 },
                { prodNo: "IM32", size: "32mm", weightGms: 245 }
            ],
            images: {
                thumbnail: "images/product_images/sockets_ accessories_ocket_ sets/sockets/impact_th.jpg"
            },
            workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">IMPACT SOCKETS</text>
                <text x="150" y="40" fill="#555" font-size="9" text-anchor="middle">1/2" Drive | IS 7993-1988</text>
                <rect x="115" y="55" width="70" height="100" fill="#2c3e50" stroke="#c0392b" stroke-width="2" rx="3"/>
                <circle cx="150" cy="55" r="10" fill="#c0392b"/>
                <text x="150" y="170" fill="#2c3e50" font-size="9" text-anchor="middle">Impact Rated | Sizes: 8mm to 32mm</text>
            </svg>`
        },
        {
            id: "hex-bit-sockets-half-inch",
            name: "Hex Bit Sockets - 1/2\" Square Drive",
            slug: "hex-bit-sockets-half-inch",
            description: "Integrated hex bit for driving hexagonal socket screws.",
            variants: [
                { prodNo: "BSH4", size: "4mm", weightGms: "-" },
                { prodNo: "BSH19", size: "19mm", weightGms: "-" }
            ],
            images: {
                thumbnail: "images/demo_th.jpg"
            },
            workingImage: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect width='300' height='200' fill='#f5f5f5' rx='8'/><text x='150' y='25' fill='#c0392b' font-size='12' text-anchor='middle' font-weight='bold'>HEX BIT SOCKETS</text><text x='150' y='40' fill='#555' font-size='9' text-anchor='middle'>1/2" Drive | Hex Bit Type</text><rect x='125' y='55' width='50' height='90' fill='#bdc3c7' stroke='#2c3e50' stroke-width='2' rx='3'/><rect x='140' y='130' width='20' height='20' fill='#2c3e50'/><text x='150' y='165' fill='#2c3e50' font-size='9' text-anchor='middle'>Sizes: BSH4 to BSH19</text></svg>`
        },
        {
            id: "sockets-19mm-3by4-inch",
            name: "Sockets 3/4\" Square Drive",
            slug: "sockets-19mm-square-drive",
            standard: "Generally Conforming to IS 7381-1986",
            description: "Forged from Chrome Vanadium steel for heavy duty applications.",
            variants: [
                { prodNo: "C22", size: "22mm", weightGms: 215 },
                { prodNo: "C70", size: "70mm", weightGms: 1680 }
            ],
            images: {
                thumbnail: "images/product_images/sockets_ accessories_ocket_ sets/sockets/sockets_19mmsd_th.jpg"
            },
            workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">3/4" SQUARE DRIVE SOCKET</text>
                <text x="150" y="40" fill="#555" font-size="9" text-anchor="middle">Heavy Duty | Cr-V | IS 7381-1986</text>
                <rect x="110" y="55" width="80" height="100" fill="#bdc3c7" stroke="#2c3e50" stroke-width="2.5" rx="4"/>
                <circle cx="150" cy="55" r="14" fill="#2c3e50"/>
                <text x="150" y="170" fill="#2c3e50" font-size="9" text-anchor="middle">Sizes: 19mm to 70mm</text>
            </svg>`
        }
    ];


    // ============================================================
    // 5. SPIRIT LEVELS DATA
    // ============================================================
    const spiritLevels = [
        {
            id: "SL-1012",
            prodNo: "SL 1012",
            name: "Spirit Level (1.0mm accuracy)",
            slug: "spirit-level-1mm-accuracy",
            description: "Aluminum frame strong and precision extruded. Solid spirit bulb. 1.0mm/meter accuracy.",
            specifications: { SIZE: "30 cm", A: "300", B: "50", C: "20", weightGms: "165" },
            images: {
                thumbnail: "images/product_images/spirit Level/piritlevel_1mm_withoutmagnet_th.jpg"
            },
            workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">SPIRIT LEVEL - 1.0mm ACCURACY</text>
                <rect x="50" y="70" width="200" height="30" fill="#bdc3c7" stroke="#2c3e50" stroke-width="2"/>
                <rect x="135" y="75" width="30" height="10" rx="5" fill="#2ecc71" stroke="#27ae60" stroke-width="1"/>
                <circle cx="150" cy="80" r="2" fill="white" opacity="0.8"/>
                <text x="150" y="130" fill="#555" font-size="8" text-anchor="middle">Aluminum Extruded Body | 30cm to 120cm</text>
                <text x="150" y="150" fill="#2c3e50" font-size="7" text-anchor="middle">Precision Milled Base</text>
            </svg>`
        },
        {
            id: "SLM05-12",
            prodNo: "SLM05 12",
            name: "Spirit Level (0.5mm accuracy with Magnet)",
            slug: "spirit-level-0-5mm-accuracy-magnetic",
            description: "High precision 0.50mm/meter accuracy. Magnetic base for hands-free work on steel structures.",
            specifications: { SIZE: "30 cm", A: "300", B: "57", C: "22", weightGms: "240" },
            images: {
                thumbnail: "images/product_images/spirit Level/piritlevel_0.5mm_withoutmagnet_th.jpg"
            },
            workingImage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
                <rect width="300" height="200" fill="#f5f5f5" rx="8"/>
                <text x="150" y="25" fill="#c0392b" font-size="12" text-anchor="middle" font-weight="bold">MAGNETIC SPIRIT LEVEL - 0.5mm</text>
                <rect x="50" y="70" width="200" height="35" fill="#bdc3c7" stroke="#c0392b" stroke-width="2"/>
                <rect x="135" y="78" width="30" height="8" rx="4" fill="#2ecc71" stroke="#27ae60" stroke-width="1"/>
                <rect x="50" y="105" width="200" height="5" fill="#2c3e50"/>
                <text x="150" y="130" fill="#555" font-size="8" text-anchor="middle">High Precision | Strong Magnet Base</text>
            </svg>`
        }
    ];

    // ============================================================
    // 6. SOCKET ACCESSORIES DATA
    // ============================================================
    const socketAccessories = [
        {
            id: "1715",
            prodNo: "1715",
            name: "Reversible Ratchet Handle - 1/2\"",
            slug: "reversible-ratchet-handle",
            description: "High grade alloy steel. 72-tooth mechanism for fine ratcheting action.",
            specifications: { length: "250mm", drive: "1/2\"" },
            images: { thumbnail: "images/product_images/sockets_ accessories_ocket_ sets/accessories/ratchet_th.jpg" },
            workingImage: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect width='300' height='200' fill='#f5f5f5' rx='8'/><text x='150' y='25' fill='#c0392b' font-size='12' text-anchor='middle' font-weight='bold'>REVERSIBLE RATCHET</text><rect x='50' y='85' width='200' height='10' rx='5' fill='#bdc3c7'/><circle cx='250' cy='90' r='15' fill='#2c3e50'/><rect x='245' y='75' width='10' height='10' fill='#bdc3c7'/><text x='150' y='140' fill='#555' font-size='8' text-anchor='middle'>Forged Alloy Steel | Quick Release</text></svg>`
        },
        {
            id: "1753",
            prodNo: "1753",
            name: "Extension Bar - 125mm",
            slug: "extension-bar-125",
            description: "Chrome Vanadium steel. Forged and heat treated.",
            specifications: { length: "125mm", drive: "1/2\"" },
            images: { thumbnail: "images/product_images/sockets_ accessories_ocket_ sets/accessories/extension_th.jpg" },
            workingImage: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect width='300' height='200' fill='#f5f5f5' rx='8'/><text x='150' y='25' fill='#c0392b' font-size='12' text-anchor='middle' font-weight='bold'>EXTENSION BAR</text><rect x='80' y='90' width='140' height='8' fill='#bdc3c7'/><rect x='210' y='85' width='15' height='18' fill='#2c3e50'/><text x='150' y='140' fill='#555' font-size='8' text-anchor='middle'>Drive: 1/2\" | Length: 125mm</text></svg>`
        }
    ];

    // ============================================================
    // 7. API METHODS
    // ============================================================



    return {
        // Get all mini pliers
        getAllMiniPliers: () => [...miniPliers],
        
        // Get single mini plier by ID
        getMiniPlierById: (id) => miniPliers.find(p => p.id === id),
        
        // Get mini plier by product number
        getMiniPlierByProdNo: (prodNo) => miniPliers.find(p => p.prodNo === prodNo),
        
        // Get all wheel spanners categories
        getAllWheelSpanners: () => [...wheelSpanners],

        // Get all screw driver bits
        getAllScrewDriverBits: () => [...screwDriverBits],

        // Get all sockets
        getAllSockets: () => [...sockets],

        // Get all spirit levels
        getAllSpiritLevels: () => [...spiritLevels],

        // Get all socket accessories
        getAllSocketAccessories: () => [...socketAccessories],
        
        // Get wheel spanner by ID



        getWheelSpannerById: (id) => wheelSpanners.find(w => w.id === id),
        
        // Get all products (combined)
        getAllProducts: () => ({
            miniPliers: [...miniPliers],
            wheelSpanners: [...wheelSpanners],
            screwDriverBits: [...screwDriverBits],
            sockets: [...sockets],
            spiritLevels: [...spiritLevels],
            socketAccessories: [...socketAccessories]
        }),




        
        // Render mini plier working image to DOM
        renderMiniPlierImage: (productId, targetElementId) => {
            const product = miniPliers.find(p => p.id === productId);
            const target = document.getElementById(targetElementId);
            if (product && target) {
                target.innerHTML = product.workingImage;
            }
            return product;
        },
        
        // Render wheel spanner image
        renderWheelSpannerImage: (spannerId, targetElementId) => {
            const spanner = wheelSpanners.find(w => w.id === spannerId);
            const target = document.getElementById(targetElementId);
            if (spanner && target) {
                target.innerHTML = spanner.workingImage;
            }
            return spanner;
        },
        
        // Search across all products
        search: (query) => {
            const searchTerm = query.toLowerCase();
            const miniResults = miniPliers.filter(p => 
                p.name.toLowerCase().includes(searchTerm) || 
                p.prodNo.includes(searchTerm)
            );
            const spannerResults = wheelSpanners.filter(w => 
                w.name.toLowerCase().includes(searchTerm)
            );
            return { miniPliers: miniResults, wheelSpanners: spannerResults };
        },
        
        // Get product specifications as table-ready data
        getSpecsForTable: (product) => {
            if (product.specifications) {
                return product.specifications;
            }
            return null;
        },
        
        // Version info
        version: "1.0.0",
        lastUpdated: "2024-01-15"
    };
})();

// Expose the API on window for legacy browser consumers.
if (typeof window !== 'undefined') {
    window.TapariaToolsAPI = TapariaToolsAPI;
}

export default TapariaToolsAPI;
