// src/utils/ToolImageAPI.js

class ToolImageAPI {
    constructor() {
        this.version = "1.0.0";
        this.styles = {
            background: "#12161c",
            stroke: "#ffaa33",
            measurement: "#88ccff",
            highlight: "#88ffaa",
            toolBody: "#3a4555",
            toolHighlight: "#2e3b4e"
        };
    }

    /**
     * Main method to generate any tool image
     * @param {string} toolType - Type of tool: 'spanner', 'adjustable', 'chain', 'hook', 'torque', 'filter', 'pipe', 'strap'
     * @param {Object} options - Configuration options (size, color, etc.)
     * @returns {string} SVG string of the tool diagram
     */
    generateToolImage(toolType, options = {}) {
        const tools = {
            'spanner': () => this.drawCombinationSpanner(options),
            'adjustable': () => this.drawAdjustableWrench(options),
            'chain': () => this.drawChainPipeWrench(options),
            'hook': () => this.drawHookWrench(options),
            'torque': () => this.drawTorqueWrench(options),
            'filter': () => this.drawFilterWrench(options),
            'pipe': () => this.drawPipeWrench(options),
            'strap': () => this.drawStrapWrench(options),
            'drill': () => this.drawPowerDrill(options),
            'grinder': () => this.drawAngleGrinder(options),
            'saw': () => this.drawCircularSaw(options),
            'cabinet': () => this.drawToolCabinet(options)
        };
        
        const generator = tools[toolType.toLowerCase()];
        if (!generator) {
            throw new Error(`Unknown tool type: ${toolType}. Available: ${Object.keys(tools).join(', ')}`);
        }
        
        return generator();
    }

    /**
     * Generate ALL tools at once
     * @returns {Object} Object containing all tool SVGs
     */
    generateAllTools() {
        return {
            combinationSpanner: this.drawCombinationSpanner(),
            adjustableWrench: this.drawAdjustableWrench(),
            chainPipeWrench: this.drawChainPipeWrench(),
            hookWrench: this.drawHookWrench(),
            torqueWrench: this.drawTorqueWrench(),
            filterWrench: this.drawFilterWrench(),
            pipeWrench: this.drawPipeWrench(),
            strapWrench: this.drawStrapWrench(),
            powerDrill: this.drawPowerDrill(),
            angleGrinder: this.drawAngleGrinder(),
            circularSaw: this.drawCircularSaw(),
            toolCabinet: this.drawToolCabinet()
        };
    }

    /**
     * Generate a working animation SVG (showing motion)
     * @param {string} toolType - Tool type
     * @returns {string} Animated SVG
     */
    generateAnimatedWorkingImage(toolType) {
        const animations = {
            'spanner': this.drawAnimatedSpanner(),
            'adjustable': this.drawAnimatedAdjustable(),
            'torque': this.drawAnimatedTorque()
        };
        
        return animations[toolType] || this.generateToolImage(toolType);
    }

    // =============== TOOL DRAWING METHODS ===============

    drawCombinationSpanner(options = {}) {
        const size = options.size || 210;
        const openEndSize = options.openEndSize || 24;
        
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 220" width="100%" height="100%">
            <rect width="500" height="220" fill="${this.styles.background}" rx="10"/>
            
            <!-- Title -->
            <text x="250" y="25" fill="${this.styles.stroke}" font-size="14" text-anchor="middle" font-weight="bold">🔧 COMBINATION SPANNER / WRENCH</text>
            <text x="250" y="42" fill="${this.styles.measurement}" font-size="10" text-anchor="middle">Open-end & Box-end | Working Diagram</text>
            
            <!-- Main Shaft -->
            <rect x="120" y="95" width="260" height="26" fill="${this.styles.toolBody}" stroke="${this.styles.stroke}" stroke-width="1.5" rx="2"/>
            
            <!-- Open End (Left) -->
            <path d="M120,108 L90,108 L78,85 L65,85 L65,131 L78,131 L90,108 L120,108" 
                  fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="1.8"/>
            
            <!-- Bolt being turned (working element) -->
            <polygon points="78,108 72,102 78,96 84,102" fill="${this.styles.highlight}" opacity="0.8"/>
            <circle cx="78" cy="108" r="6" fill="none" stroke="${this.styles.highlight}" stroke-width="1.5"/>
            
            <!-- Box End (Right) - with rotation indicator -->
            <circle cx="390" cy="108" r="24" fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="1.8"/>
            <circle cx="390" cy="108" r="14" fill="${this.styles.background}" stroke="${this.styles.measurement}" stroke-width="1.5"/>
            <circle cx="390" cy="108" r="8" fill="none" stroke="${this.styles.highlight}" stroke-width="1" stroke-dasharray="3,2"/>
            
            <!-- Working arrow (rotation) -->
            <path d="M414,108 A24,24 0 0,1 402,130" fill="none" stroke="${this.styles.highlight}" stroke-width="2" marker-end="url(#arrowRotate)"/>
            
            <!-- Dimension Lines -->
            <line x1="65" y1="155" x2="414" y2="155" stroke="${this.styles.measurement}" stroke-width="1" stroke-dasharray="5,3"/>
            <line x1="65" y1="148" x2="65" y2="162" stroke="${this.styles.measurement}" stroke-width="1"/>
            <line x1="414" y1="148" x2="414" y2="162" stroke="${this.styles.measurement}" stroke-width="1"/>
            <text x="240" y="172" fill="${this.styles.measurement}" font-size="11" text-anchor="middle">Working Length: ${size}mm</text>
            
            <!-- Jaw angle indicator -->
            <path d="M78,85 L65,85" stroke="${this.styles.stroke}" stroke-width="1.5"/>
            <text x="50" y="80" fill="${this.styles.stroke}" font-size="9">15° Offset</text>
            
            <!-- Force arrow -->
            <path d="M460,108 L480,108" stroke="#ff6666" stroke-width="2.5" marker-end="url(#arrowForce)"/>
            <text x="475" y="100" fill="#ff6666" font-size="9" text-anchor="middle">Force</text>
            
            <defs>
                <marker id="arrowRotate" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="${this.styles.highlight}"/>
                </marker>
                <marker id="arrowForce" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                    <path d="M0,0 L10,5 L0,10 Z" fill="#ff6666"/>
                </marker>
            </defs>
            
            <!-- Specifications -->
            <text x="250" y="200" fill="${this.styles.measurement}" font-size="9" text-anchor="middle">Sizes: 6-32mm | Torque: 120Nm | Cr-V Steel</text>
        </svg>`;
    }

    drawAdjustableWrench(options = {}) {
        const jawCapacity = options.jawCapacity || 30;
        
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 220" width="100%" height="100%">
            <rect width="500" height="220" fill="${this.styles.background}" rx="10"/>
            
            <text x="250" y="25" fill="${this.styles.stroke}" font-size="14" text-anchor="middle" font-weight="bold">🔧 ADJUSTABLE WRENCH (Crescent)</text>
            <text x="250" y="42" fill="${this.styles.measurement}" font-size="10" text-anchor="middle">IS 6149-1984 | Drop Forged | Working Diagram</text>
            
            <!-- Handle -->
            <rect x="200" y="95" width="240" height="30" fill="${this.styles.toolBody}" stroke="${this.styles.stroke}" stroke-width="1.8" rx="5"/>
            
            <!-- Fixed Jaw -->
            <path d="M200,95 L165,95 L140,70 L140,45 L165,45 L178,58 L200,58 Z" 
                  fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="1.8"/>
            
            <!-- Movable Jaw (showing adjustment) -->
            <path d="M165,125 L140,125 L115,100 L115,75 L140,75 L152,88 L165,88 Z" 
                  fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="1.8" stroke-dasharray="4,2"/>
            
            <!-- Adjustment Knob (Worm Gear) -->
            <circle cx="182" cy="125" r="14" fill="${this.styles.toolBody}" stroke="${this.styles.measurement}" stroke-width="2"/>
            <circle cx="182" cy="125" r="6" fill="${this.styles.stroke}"/>
            <!-- Knurling lines -->
            <line x1="182" y1="111" x2="182" y2="118" stroke="#fff" stroke-width="1"/>
            <line x1="182" y1="132" x2="182" y2="139" stroke="#fff" stroke-width="1"/>
            <line x1="170" y1="125" x2="176" y2="125" stroke="#fff" stroke-width="1"/>
            <line x1="188" y1="125" x2="194" y2="125" stroke="#fff" stroke-width="1"/>
            
            <!-- Adjustment arrow (rotation) -->
            <path d="M196,125 A14,14 0 0,1 190,139" fill="none" stroke="${this.styles.highlight}" stroke-width="2" marker-end="url(#arrowAdj)"/>
            
            <!-- Jaw opening indicator -->
            <line x1="140" y1="70" x2="140" y2="100" stroke="${this.styles.measurement}" stroke-width="1" stroke-dasharray="3"/>
            <line x1="135" y1="70" x2="145" y2="70" stroke="${this.styles.measurement}" stroke-width="1"/>
            <line x1="135" y1="100" x2="145" y2="100" stroke="${this.styles.measurement}" stroke-width="1"/>
            <text x="125" y="88" fill="${this.styles.measurement}" font-size="9" text-anchor="end">${jawCapacity}mm</text>
            
            <!-- Nut being gripped -->
            <polygon points="155,85 163,77 171,85 163,93" fill="none" stroke="${this.styles.highlight}" stroke-width="2"/>
            
            <defs>
                <marker id="arrowAdj" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="${this.styles.highlight}"/>
                </marker>
            </defs>
            
            <text x="250" y="175" fill="${this.styles.measurement}" font-size="10" text-anchor="middle">📐 Knurled Adjustment Knob (Worm Drive Mechanism)</text>
            <text x="250" y="195" fill="${this.styles.measurement}" font-size="9" text-anchor="middle">Sizes: 200, 250, 300, 375mm | Capacity: up to 46mm</text>
            <text x="250" y="210" fill="#ffaa33" font-size="9" text-anchor="middle">ISI Marked | Chrome Vanadium</text>
        </svg>`;
    }

    drawChainPipeWrench(options = {}) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 220" width="100%" height="100%">
            <rect width="500" height="220" fill="${this.styles.background}" rx="10"/>
            
            <text x="250" y="25" fill="${this.styles.stroke}" font-size="14" text-anchor="middle" font-weight="bold">⛓️ CHAIN PIPE WRENCH - HEAVY DUTY</text>
            <text x="250" y="42" fill="${this.styles.measurement}" font-size="10" text-anchor="middle">Double Sided Reversible | Induction Hardened Jaws</text>
            
            <!-- Handle -->
            <rect x="260" y="95" width="190" height="32" fill="${this.styles.toolBody}" stroke="${this.styles.stroke}" stroke-width="1.8" rx="5"/>
            
            <!-- Handle grip texture -->
            <line x1="300" y1="95" x2="300" y2="127" stroke="#666" stroke-width="1"/>
            <line x1="310" y1="95" x2="310" y2="127" stroke="#666" stroke-width="1"/>
            <line x1="320" y1="95" x2="320" y2="127" stroke="#666" stroke-width="1"/>
            
            <!-- Chain -->
            <path d="M260,111 L230,111 L210,135 L180,135 L155,160 L130,160" 
                  fill="none" stroke="${this.styles.measurement}" stroke-width="5" stroke-dasharray="8,4"/>
            
            <!-- Chain links detail -->
            <circle cx="230" cy="111" r="4" fill="none" stroke="#fff" stroke-width="1"/>
            <circle cx="210" cy="123" r="4" fill="none" stroke="#fff" stroke-width="1"/>
            <circle cx="180" cy="135" r="4" fill="none" stroke="#fff" stroke-width="1"/>
            <circle cx="155" cy="148" r="4" fill="none" stroke="#fff" stroke-width="1"/>
            
            <!-- Jaw Hook -->
            <path d="M260,95 L225,95 L205,115 L180,115 L180,150 L205,150 L225,132 L260,132" 
                  fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="1.8"/>
            
            <!-- Pipe being gripped -->
            <circle cx="195" cy="132" r="35" fill="none" stroke="${this.styles.highlight}" stroke-width="3"/>
            <circle cx="195" cy="132" r="22" fill="${this.styles.background}" stroke="${this.styles.highlight}" stroke-width="1.5" stroke-dasharray="4"/>
            
            <!-- Pipe dimensions -->
            <line x1="160" y1="132" x2="160" y2="97" stroke="${this.styles.measurement}" stroke-width="1" stroke-dasharray="3"/>
            <line x1="155" y1="97" x2="165" y2="97" stroke="${this.styles.measurement}" stroke-width="1"/>
            <text x="140" y="115" fill="${this.styles.measurement}" font-size="9">4" Pipe</text>
            
            <!-- Tension arrow -->
            <path d="M380,132 L420,132" stroke="#ff6666" stroke-width="2.5" marker-end="url(#arrowTension)"/>
            <text x="400" y="125" fill="#ff6666" font-size="9" text-anchor="middle">Pull</text>
            
            <defs>
                <marker id="arrowTension" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                    <path d="M0,0 L10,5 L0,10 Z" fill="#ff6666"/>
                </marker>
            </defs>
            
            <text x="250" y="195" fill="${this.styles.measurement}" font-size="10" text-anchor="middle">Chain Length: up to 300mm | Pipe Capacity: 50-200mm</text>
            <text x="250" y="212" fill="#ffaa33" font-size="9" text-anchor="middle">High Tensile Chain | Reversible Jaw</text>
        </svg>`;
    }

    drawHookWrench(options = {}) {
        const sizeRange = options.sizeRange || "16-100mm";
        
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 220" width="100%" height="100%">
            <rect width="500" height="220" fill="${this.styles.background}" rx="10"/>
            
            <text x="250" y="25" fill="${this.styles.stroke}" font-size="14" text-anchor="middle" font-weight="bold">⛏️ HOOK WRENCH (PIN TYPE)</text>
            <text x="250" y="42" fill="${this.styles.measurement}" font-size="10" text-anchor="middle">For Adjustable Collars & Locknuts | C45 Steel</text>
            
            <!-- Shaft -->
            <rect x="160" y="100" width="280" height="24" fill="${this.styles.toolBody}" stroke="${this.styles.stroke}" stroke-width="1.8" rx="3"/>
            
            <!-- Hook end -->
            <path d="M160,100 L125,100 L112,88 L100,88 L100,112 L112,112 L125,102 L160,102" 
                  fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="1.8"/>
            
            <!-- Pin (drive prong) -->
            <circle cx="108" cy="100" r="5" fill="${this.styles.stroke}"/>
            <circle cx="108" cy="100" r="2.5" fill="#fff"/>
            
            <!-- Locknut with holes (working part) -->
            <circle cx="85" cy="100" r="28" fill="none" stroke="${this.styles.measurement}" stroke-width="2.5"/>
            <circle cx="85" cy="100" r="18" fill="none" stroke="${this.styles.measurement}" stroke-width="1.5" stroke-dasharray="4,3"/>
            
            <!-- Drive holes in nut -->
            <circle cx="85" cy="78" r="3.5" fill="${this.styles.measurement}"/>
            <circle cx="85" cy="122" r="3.5" fill="${this.styles.measurement}"/>
            <circle cx="63" cy="100" r="3.5" fill="${this.styles.measurement}"/>
            <circle cx="107" cy="100" r="3.5" fill="${this.styles.measurement}"/>
            <circle cx="70" cy="85" r="3.5" fill="${this.styles.measurement}"/>
            <circle cx="100" cy="85" r="3.5" fill="${this.styles.measurement}"/>
            <circle cx="70" cy="115" r="3.5" fill="${this.styles.measurement}"/>
            <circle cx="100" cy="115" r="3.5" fill="${this.styles.measurement}"/>
            
            <!-- Engagement detail -->
            <circle cx="108" cy="100" r="3.5" fill="#ffaa33" opacity="0.6"/>
            <text x="85" y="65" fill="${this.styles.highlight}" font-size="9" text-anchor="middle">Pin engages drive holes</text>
            
            <!-- Rotation arrow -->
            <path d="M113,100 A28,28 0 0,1 100,128" fill="none" stroke="${this.styles.highlight}" stroke-width="2" marker-end="url(#arrowHook)"/>
            
            <!-- Force indicator -->
            <path d="M380,112 L440,112" stroke="#ff6666" stroke-width="2" marker-end="url(#arrowForce2)"/>
            <text x="410" y="105" fill="#ff6666" font-size="9">Apply Force</text>
            
            <defs>
                <marker id="arrowHook" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="${this.styles.highlight}"/>
                </marker>
                <marker id="arrowForce2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                    <path d="M0,0 L10,5 L0,10 Z" fill="#ff6666"/>
                </marker>
            </defs>
            
            <text x="250" y="180" fill="${this.styles.measurement}" font-size="10" text-anchor="middle">Pin Diameter: 3-6mm | Range: ${sizeRange}</text>
            <text x="250" y="198" fill="${this.styles.measurement}" font-size="10" text-anchor="middle">For Locknuts | Bearing Nuts | Collars</text>
            <text x="250" y="215" fill="#ffaa33" font-size="9" text-anchor="middle">Hardened & Tempered | Induction Hardened Tip</text>
        </svg>`;
    }

    drawTorqueWrench(options = {}) {
        const torqueRange = options.torqueRange || "20-200 Nm";
        
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 220" width="100%" height="100%">
            <rect width="500" height="220" fill="${this.styles.background}" rx="10"/>
            
            <text x="250" y="25" fill="${this.styles.stroke}" font-size="14" text-anchor="middle" font-weight="bold">🎯 TORQUE WRENCH - CLICK TYPE</text>
            <text x="250" y="42" fill="${this.styles.measurement}" font-size="10" text-anchor="middle">Calibration Certified | Accuracy ±4% | Induction Hardened</text>
            
            <!-- Handle with scale -->
            <rect x="260" y="95" width="195" height="34" fill="${this.styles.toolBody}" stroke="${this.styles.stroke}" stroke-width="1.8" rx="6"/>
            
            <!-- Scale markings on handle -->
            <line x1="300" y1="95" x2="300" y2="85" stroke="${this.styles.measurement}" stroke-width="1.5"/>
            <line x1="340" y1="95" x2="340" y2="85" stroke="${this.styles.measurement}" stroke-width="1.5"/>
            <line x1="380" y1="95" x2="380" y2="85" stroke="${this.styles.measurement}" stroke-width="1.5"/>
            <line x1="420" y1="95" x2="420" y2="85" stroke="${this.styles.measurement}" stroke-width="1.5"/>
            
            <text x="300" y="82" fill="${this.styles.measurement}" font-size="8" text-anchor="middle">40</text>
            <text x="340" y="82" fill="${this.styles.measurement}" font-size="8" text-anchor="middle">80</text>
            <text x="380" y="82" fill="${this.styles.measurement}" font-size="8" text-anchor="middle">120</text>
            <text x="420" y="82" fill="${this.styles.measurement}" font-size="8" text-anchor="middle">160</text>
            <text x="455" y="82" fill="${this.styles.measurement}" font-size="8" text-anchor="middle">Nm</text>
            
            <!-- Adjustment indicator line -->
            <line x1="350" y1="95" x2="350" y2="129" stroke="#ffaa33" stroke-width="2"/>
            <circle cx="350" cy="129" r="4" fill="#ffaa33"/>
            
            <!-- Beam / shaft -->
            <rect x="120" y="100" width="145" height="24" fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="1.5"/>
            
            <!-- Square drive head -->
            <rect x="95" y="93" width="30" height="38" fill="${this.styles.toolBody}" stroke="${this.styles.stroke}" stroke-width="1.8" rx="3"/>
            <rect x="102" y="102" width="16" height="20" fill="${this.styles.background}" stroke="${this.styles.measurement}" stroke-width="1.5"/>
            <text x="110" y="145" fill="${this.styles.measurement}" font-size="9" text-anchor="middle">1/2" Drive</text>
            
            <!-- Click mechanism indicator -->
            <circle cx="230" cy="112" r="12" fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="1.5"/>
            <text x="230" y="108" fill="#ffaa33" font-size="8" text-anchor="middle">CLICK</text>
            <text x="230" y="90" fill="${this.styles.highlight}" font-size="7" text-anchor="middle">Audible Signal</text>
            
            <!-- Sound wave lines -->
            <path d="M242,105 Q248,112 242,119" fill="none" stroke="#ffaa33" stroke-width="1"/>
            <path d="M246,102 Q254,112 246,122" fill="none" stroke="#ffaa33" stroke-width="1"/>
            
            <!-- Force arrow -->
            <path d="M455,112 L485,112" stroke="#ff6666" stroke-width="2.5" marker-end="url(#arrowTorque)"/>
            
            <defs>
                <marker id="arrowTorque" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                    <path d="M0,0 L10,5 L0,10 Z" fill="#ff6666"/>
                </marker>
            </defs>
            
            <text x="250" y="180" fill="${this.styles.measurement}" font-size="10" text-anchor="middle">Range: ${torqueRange} | Drive: 1/2", 3/4", 1"</text>
            <text x="250" y="198" fill="${this.styles.measurement}" font-size="10" text-anchor="middle">Calibration Certificate Included with Each Piece</text>
            <text x="250" y="215" fill="#ffaa33" font-size="9" text-anchor="middle">Drop Forged | Hardened & Tempered</text>
        </svg>`;
    }

    drawFilterWrench(options = {}) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 220" width="100%" height="100%">
            <rect width="500" height="220" fill="${this.styles.background}" rx="10"/>
            
            <text x="250" y="25" fill="${this.styles.stroke}" font-size="14" text-anchor="middle" font-weight="bold">🔩 FILTER WRENCH - BELT TYPE</text>
            <text x="250" y="42" fill="${this.styles.measurement}" font-size="10" text-anchor="middle">For Oil Filters | Self-Tightening Mechanism</text>
            
            <!-- Handle -->
            <rect x="230" y="95" width="220" height="28" fill="${this.styles.toolBody}" stroke="${this.styles.stroke}" stroke-width="1.8" rx="5"/>
            
            <!-- Pivot point -->
            <circle cx="230" cy="109" r="10" fill="${this.styles.toolHighlight}" stroke="${this.styles.measurement}" stroke-width="2"/>
            <circle cx="230" cy="109" r="4" fill="${this.styles.stroke}"/>
            
            <!-- Belt around filter -->
            <path d="M230,95 L190,95 L165,118 L140,118 L120,140 L120,162 L140,162 L165,140 L190,140 L230,123" 
                  fill="none" stroke="${this.styles.measurement}" stroke-width="6" stroke-dasharray="3,2"/>
            
            <!-- Belt tension direction -->
            <path d="M230,80 Q250,80 250,95" fill="none" stroke="${this.styles.highlight}" stroke-width="1.5" marker-end="url(#arrowBelt)"/>
            
            <!-- Filter canister -->
            <circle cx="175" cy="128" r="38" fill="none" stroke="${this.styles.highlight}" stroke-width="3"/>
            <circle cx="175" cy="128" r="25" fill="${this.styles.background}" stroke="${this.styles.highlight}" stroke-width="1" stroke-dasharray="3,3"/>
            
            <!-- Filter ridges -->
            <line x1="140" y1="115" x2="140" y2="141" stroke="${this.styles.highlight}" stroke-width="1" opacity="0.5"/>
            <line x1="210" y1="115" x2="210" y2="141" stroke="${this.styles.highlight}" stroke-width="1" opacity="0.5"/>
            
            <text x="175" y="90" fill="${this.styles.highlight}" font-size="10" text-anchor="middle">Oil Filter</text>
            <text x="175" y="180" fill="${this.styles.measurement}" font-size="9" text-anchor="middle">Filter Range: 60-120mm</text>
            
            <!-- Force arrow on handle -->
            <path d="M400,109 L450,109" stroke="#ff6666" stroke-width="2.5" marker-end="url(#arrowFilter)"/>
            <text x="425" y="100" fill="#ff6666" font-size="9" text-anchor="middle">Pull</text>
            
            <defs>
                <marker id="arrowBelt" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="${this.styles.highlight}"/>
                </marker>
                <marker id="arrowFilter" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                    <path d="M0,0 L10,5 L0,10 Z" fill="#ff6666"/>
                </marker>
            </defs>
            
            <text x="250" y="200" fill="${this.styles.measurement}" font-size="10" text-anchor="middle">Lengths: 225mm / 300mm | Heavy Duty Nylon Belt</text>
            <text x="250" y="215" fill="#ffaa33" font-size="9" text-anchor="middle">Self-Tightening Action | Non-Marring</text>
        </svg>`;
    }

    drawPipeWrench(options = {}) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 220" width="100%" height="100%">
            <rect width="500" height="220" fill="${this.styles.background}" rx="10"/>
            
            <text x="250" y="25" fill="${this.styles.stroke}" font-size="14" text-anchor="middle" font-weight="bold">🔧 PIPE WRENCH - STILLSON PATTERN</text>
            <text x="250" y="42" fill="${this.styles.measurement}" font-size="10" text-anchor="middle">IS 4003 | Heavy Duty | Malleable Cast Iron Handle</text>
            
            <!-- Handle -->
            <rect x="250" y="95" width="210" height="30" fill="${this.styles.toolBody}" stroke="${this.styles.stroke}" stroke-width="1.8" rx="4"/>
            
            <!-- Handle grip -->
            <rect x="280" y="95" width="160" height="30" fill="none" stroke="#666" stroke-width="1" stroke-dasharray="8,4"/>
            
            <!-- Hook jaw -->
            <path d="M250,95 L210,95 L190,75 L170,75 L170,125 L190,125 L210,105 L250,105" 
                  fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="1.8"/>
            
            <!-- Heel jaw (movable) -->
            <path d="M210,125 L185,125 L170,140 L155,140 L155,115 L170,115 L185,100 L210,100" 
                  fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="1.5" stroke-dasharray="4,2"/>
            
            <!-- Spring mechanism -->
            <path d="M220,125 Q225,130 230,125 Q235,120 240,125" fill="none" stroke="${this.styles.measurement}" stroke-width="1.5"/>
            
            <!-- Pipe -->
            <circle cx="190" cy="115" r="25" fill="none" stroke="${this.styles.highlight}" stroke-width="3"/>
            <circle cx="190" cy="115" r="15" fill="${this.styles.background}" stroke="${this.styles.highlight}" stroke-width="1"/>
            
            <!-- Teeth marks on jaws -->
            <line x1="175" y1="80" x2="185" y2="80" stroke="#fff" stroke-width="1" opacity="0.6"/>
            <line x1="175" y1="85" x2="185" y2="85" stroke="#fff" stroke-width="1" opacity="0.6"/>
            <line x1="175" y1="90" x2="185" y2="90" stroke="#fff" stroke-width="1" opacity="0.6"/>
            
            <text x="190" y="65" fill="${this.styles.highlight}" font-size="9" text-anchor="middle">Pipe: 1/2" - 4"</text>
            
            <!-- Force -->
            <path d="M400,110 L460,110" stroke="#ff6666" stroke-width="2.5" marker-end="url(#arrowPipe)"/>
            <text x="430" y="103" fill="#ff6666" font-size="9">Pull</text>
            
            <defs>
                <marker id="arrowPipe" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                    <path d="M0,0 L10,5 L0,10 Z" fill="#ff6666"/>
                </marker>
            </defs>
            
            <text x="250" y="180" fill="${this.styles.measurement}" font-size="10" text-anchor="middle">Sizes: 300, 350, 450, 600, 900mm</text>
            <text x="250" y="198" fill="${this.styles.measurement}" font-size="10" text-anchor="middle">Hook & Heel Jaws Induction Hardened</text>
            <text x="250" y="215" fill="#ffaa33" font-size="9" text-anchor="middle">ISI Marked | CM/L No - 9700050015</text>
        </svg>`;
    }

    drawStrapWrench(options = {}) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 220" width="100%" height="100%">
            <rect width="500" height="220" fill="${this.styles.background}" rx="10"/>
            
            <text x="250" y="25" fill="${this.styles.stroke}" font-size="14" text-anchor="middle" font-weight="bold">🔗 STRAP WRENCH</text>
            <text x="250" y="42" fill="${this.styles.measurement}" font-size="10" text-anchor="middle">Drop Forged Handle | Non-Marring Strap</text>
            
            <!-- Handle -->
            <rect x="230" y="95" width="220" height="28" fill="${this.styles.toolBody}" stroke="${this.styles.stroke}" stroke-width="1.8" rx="5"/>
            
            <!-- Drop forged detail -->
            <text x="340" y="85" fill="${this.styles.measurement}" font-size="8" text-anchor="middle">Drop Forged</text>
            
            <!-- Strap connection -->
            <circle cx="230" cy="109" r="8" fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="1.5"/>
            
            <!-- Nylon strap -->
            <path d="M230,95 L200,95 L175,120 L150,120 L130,142 L130,160 L150,160 L175,138 L200,138 L230,123" 
                  fill="none" stroke="${this.styles.measurement}" stroke-width="5"/>
            
            <!-- Object being gripped -->
            <ellipse cx="180" cy="128" rx="30" ry="35" fill="none" stroke="${this.styles.highlight}" stroke-width="2.5"/>
            <ellipse cx="180" cy="128" rx="18" ry="22" fill="${this.styles.background}" stroke="${this.styles.highlight}" stroke-width="1" stroke-dasharray="3"/>
            
            <text x="180" y="90" fill="${this.styles.highlight}" font-size="9" text-anchor="middle">Canister / Filter</text>
            
            <!-- Strap tightness indicator -->
            <path d="M130,142 L125,142" stroke="${this.styles.highlight}" stroke-width="2"/>
            <path d="M130,160 L125,160" stroke="${this.styles.highlight}" stroke-width="2"/>
            
            <defs>
                <marker id="arrowStrap" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                    <path d="M0,0 L10,5 L0,10 Z" fill="#ff6666"/>
                </marker>
            </defs>
            
            <text x="250" y="195" fill="${this.styles.measurement}" font-size="10" text-anchor="middle">Size: 275mm (11") | Heavy Duty Nylon Strap</text>
            <text x="250" y="212" fill="#ffaa33" font-size="9" text-anchor="middle">Non-Slip | Won't Damage Surfaces</text>
        </svg>`;
    }

    // =============== ANIMATED VERSIONS ===============

    drawAnimatedSpanner() {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 220" width="100%" height="100%">
            <rect width="500" height="220" fill="${this.styles.background}" rx="10"/>
            <text x="250" y="25" fill="${this.styles.stroke}" font-size="14" text-anchor="middle">ANIMATED WORKING DIAGRAM</text>
            
            <!-- Rotating bolt -->
            <g>
                <animateTransform attributeName="transform" type="rotate" from="0 78 108" to="360 78 108" dur="4s" repeatCount="indefinite"/>
                <polygon points="78,108 70,100 78,92 86,100" fill="${this.styles.highlight}" stroke="#fff" stroke-width="1"/>
            </g>
            
            <!-- Tool body (static) -->
            <rect x="120" y="95" width="260" height="26" fill="${this.styles.toolBody}" stroke="${this.styles.stroke}" stroke-width="1.5"/>
            <path d="M120,108 L90,108 L78,85 L65,85 L65,131 L78,131 L90,108 L120,108" 
                  fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="1.8"/>
            <circle cx="390" cy="108" r="24" fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="1.8"/>
            <circle cx="390" cy="108" r="14" fill="${this.styles.background}" stroke="${this.styles.measurement}" stroke-width="1.5"/>
            
            <!-- Pulsing force indicator -->
            <circle cx="460" cy="108" r="8" fill="#ff6666" opacity="0.6">
                <animate attributeName="r" values="8;14;8" dur="1.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite"/>
            </circle>
            <path d="M440,108 L455,108" stroke="#ff6666" stroke-width="2.5" marker-end="url(#arrowAnim)"/>
            
            <defs>
                <marker id="arrowAnim" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#ff6666"/>
                </marker>
            </defs>
            
            <text x="250" y="195" fill="${this.styles.measurement}" font-size="11" text-anchor="middle">🔄 ANIMATED: Bolt tightening in progress</text>
        </svg>`;
    }

    drawAnimatedAdjustable() {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 220" width="100%" height="100%">
            <rect width="500" height="220" fill="${this.styles.background}" rx="10"/>
            <text x="250" y="25" fill="${this.styles.stroke}" font-size="14" text-anchor="middle">ANIMATED: Jaw Adjustment</text>
            
            <rect x="200" y="95" width="240" height="30" fill="${this.styles.toolBody}" stroke="${this.styles.stroke}" stroke-width="1.8" rx="5"/>
            <path d="M200,95 L165,95 L140,70 L140,45 L165,45 L178,58 L200,58 Z" 
                  fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="1.8"/>
            
            <!-- Animated movable jaw -->
            <g>
                <animateTransform attributeName="transform" type="translate" values="0,0;-8,0;0,0" dur="3s" repeatCount="indefinite"/>
                <path d="M165,125 L140,125 L115,100 L115,75 L140,75 L152,88 L165,88 Z" 
                      fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="1.8" stroke-dasharray="4,2"/>
            </g>
            
            <!-- Rotating adjustment knob -->
            <g>
                <animateTransform attributeName="transform" type="rotate" from="0 182 125" to="360 182 125" dur="2s" repeatCount="indefinite"/>
                <circle cx="182" cy="125" r="14" fill="${this.styles.toolBody}" stroke="${this.styles.measurement}" stroke-width="2"/>
                <circle cx="182" cy="125" r="6" fill="${this.styles.stroke}"/>
            </g>
            
            <text x="250" y="195" fill="${this.styles.measurement}" font-size="11" text-anchor="middle">🔄 ANIMATED: Worm gear adjusting jaw opening</text>
        </svg>`;
    }

    drawAnimatedTorque() {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 220" width="100%" height="100%">
            <rect width="500" height="220" fill="${this.styles.background}" rx="10"/>
            <text x="250" y="25" fill="${this.styles.stroke}" font-size="14" text-anchor="middle">ANIMATED: Torque Wrench Click Mechanism</text>
            
            <rect x="260" y="95" width="195" height="34" fill="${this.styles.toolBody}" stroke="${this.styles.stroke}" stroke-width="1.8" rx="6"/>
            <rect x="120" y="100" width="145" height="24" fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="1.5"/>
            <rect x="95" y="93" width="30" height="38" fill="${this.styles.toolBody}" stroke="${this.styles.stroke}" stroke-width="1.8" rx="3"/>
            <rect x="102" y="102" width="16" height="20" fill="${this.styles.background}" stroke="${this.styles.measurement}" stroke-width="1.5"/>
            
            <!-- Pulsing click indicator -->
            <circle cx="230" cy="112" r="12" fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="1.5">
                <animate attributeName="r" values="12;15;12" dur="1s" repeatCount="indefinite"/>
            </circle>
            <text x="230" y="108" fill="#ffaa33" font-size="8" text-anchor="middle">CLICK</text>
            
            <!-- Expanding sound waves -->
            <circle cx="242" cy="112" r="5" fill="none" stroke="#ffaa33" stroke-width="1" opacity="0">
                <animate attributeName="r" values="5;20" dur="1s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.8;0" dur="1s" repeatCount="indefinite"/>
            </circle>
            
            <text x="250" y="195" fill="${this.styles.measurement}" font-size="11" text-anchor="middle">🔄 ANIMATED: Audible click when target torque reached</text>
        </svg>`;
    }

    // =============== UTILITY METHODS ===============

    /**
     * Get tool as dataURL (for embedding in img tags)
     */
    getToolAsDataURL(toolType, options = {}) {
        const svg = this.generateToolImage(toolType, options);
        return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    }

    drawPowerDrill(options = {}) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
            <rect width="500" height="400" fill="${this.styles.background}" rx="10"/>
            <text x="250" y="40" fill="${this.styles.stroke}" font-size="20" text-anchor="middle" font-weight="900">POWER DRILL / IMPACT DRIVER</text>
            <path d="M150,150 L350,150 L350,220 L280,220 L280,350 L200,350 L200,220 L150,220 Z" fill="${this.styles.toolBody}" stroke="${this.styles.stroke}" stroke-width="4"/>
            <rect x="350" y="170" width="60" height="15" fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="2"/>
            <circle cx="240" cy="240" r="10" fill="${this.styles.highlight}" opacity="0.6"/>
            <text x="250" y="380" fill="${this.styles.measurement}" font-size="12" text-anchor="middle">PROFESSIONAL POWER SOLUTIONS</text>
        </svg>`;
    }

    drawAngleGrinder(options = {}) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" width="100%" height="100%">
            <rect width="500" height="300" fill="${this.styles.background}" rx="10"/>
            <text x="250" y="40" fill="${this.styles.stroke}" font-size="20" text-anchor="middle" font-weight="900">ANGLE GRINDER / CUTTER</text>
            <path d="M100,150 L350,150 L350,180 L100,180 Z" fill="${this.styles.toolBody}" stroke="${this.styles.stroke}" stroke-width="4"/>
            <circle cx="380" cy="165" r="50" fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="3" opacity="0.8"/>
            <circle cx="380" cy="165" r="10" fill="${this.styles.stroke}"/>
            <path d="M380,115 L430,165" stroke="${this.styles.highlight}" stroke-width="2" stroke-dasharray="5,3"/>
            <text x="250" y="280" fill="${this.styles.measurement}" font-size="12" text-anchor="middle">INDUSTRIAL CUTTING & GRINDING</text>
        </svg>`;
    }

    drawCircularSaw(options = {}) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%">
            <rect width="500" height="400" fill="${this.styles.background}" rx="10"/>
            <text x="250" y="40" fill="${this.styles.stroke}" font-size="20" text-anchor="middle" font-weight="900">CIRCULAR SAW / CUTTING TOOL</text>
            <path d="M150,150 L350,150 L350,250 L150,250 Z" fill="${this.styles.toolBody}" stroke="${this.styles.stroke}" stroke-width="4"/>
            <circle cx="250" cy="280" r="80" fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="3" clip-path="inset(0 0 50% 0)"/>
            <path d="M170,280 L330,280" stroke="${this.styles.stroke}" stroke-width="5"/>
            <text x="250" y="380" fill="${this.styles.measurement}" font-size="12" text-anchor="middle">PRECISION WOOD & METAL CUTTING</text>
        </svg>`;
    }

    drawToolCabinet(options = {}) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="100%" height="100%">
            <rect width="400" height="500" fill="${this.styles.background}" rx="10"/>
            <text x="200" y="40" fill="${this.styles.stroke}" font-size="20" text-anchor="middle" font-weight="900">TOOL CABINET / STORAGE</text>
            <rect x="80" y="80" width="240" height="340" fill="${this.styles.toolBody}" stroke="${this.styles.stroke}" stroke-width="4"/>
            <rect x="90" y="100" width="220" height="40" fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="2"/>
            <rect x="90" y="150" width="220" height="40" fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="2"/>
            <rect x="90" y="200" width="220" height="40" fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="2"/>
            <rect x="90" y="250" width="220" height="40" fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="2"/>
            <rect x="90" y="300" width="220" height="80" fill="${this.styles.toolHighlight}" stroke="${this.styles.stroke}" stroke-width="2"/>
            <circle cx="100" cy="440" r="15" fill="${this.styles.stroke}"/>
            <circle cx="300" cy="440" r="15" fill="${this.styles.stroke}"/>
            <text x="200" y="480" fill="${this.styles.measurement}" font-size="12" text-anchor="middle">INDUSTRIAL STORAGE SOLUTIONS</text>
        </svg>`;
    }

    /**
     * Get all tools as an object with dataURLs
     */
    getAllToolsAsDataURLs() {
        const tools = this.generateAllTools();
        const result = {};
        for (const [key, svg] of Object.entries(tools)) {
            result[key] = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
        }
        return result;
    }
}

export default ToolImageAPI;
