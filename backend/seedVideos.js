import mongoose from "mongoose";
import dotenv from "dotenv";
import Video from "./models/Video.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/dushyant_power_tools";

const CHANNELS_INFO = [
  { id: "dpt-power-tools", name: "Dushyant Power Tools", logo: "https://picsum.photos/seed/dptlogo/120/120" },
  { id: "makita-pro", name: "Makita Pro Crew", logo: "https://picsum.photos/seed/makitap/120/120" },
  { id: "bosch-professional", name: "Bosch Professional India", logo: "https://picsum.photos/seed/boschlogo/120/120" },
  { id: "dewalt-expert", name: "DeWalt Expert Labs", logo: "https://picsum.photos/seed/dewalt/120/120" },
  { id: "ingco-world", name: "Ingco World Official", logo: "https://picsum.photos/seed/ingco/120/120" }
];

const categories = ["Drills", "Grinders", "Saws", "Cordless Tools", "Maintenance", "Unboxing", "Safety", "Live Reviews"];

const shortsTitles = [
  "Ingco 20V Cordless Drill Speed Test ⚡",
  "DeWalt FlexVolt Angle Grinder in Action! 🔥",
  "Makita Hammer Drill vs Reinforced Concrete 🧱",
  "How to change grinder blades safely in 15s ⚠️",
  "Unboxing the Bosch 18V Brushless Impact Driver 📦",
  "Sanding wood like a pro - DIY Cordless Sander 🪵",
  "Power Tool Battery Lifespan Hack! 🔋",
  "Angle Grinder precision cutting demo ⚙️",
  "Milwaukee vs Dewalt: Ultimate Drill Showdown 🥊",
  "DIY Workbench Organization Tips 🛠️",
  "Ingco Electric Blower Speed Hack! 💨",
  "Stanley Level Laser setup tutorial 📐",
  "Cutting steel bars with Makita metal cut-off saw 🪵",
  "Best Cordless Power Tools for beginners in 2026 🥇",
  "How to clean and oil your drill chuck 🛢️",
  "Safety First: Always wear eye protection! 🥽",
  "Testing cheap vs expensive drill bits 🔩",
  "Restoring an old rusty vintage bench vice 🛠️",
  "Bosch multi-tool attachment swap routine ⏱️",
  "Angle Grinder sparks: which direction is safer? 🤔",
  "Drilling perfect 90 degree holes every time! 📐",
  "Cordless circular saw cutting depth setup 🪚",
  "Why your power tool battery is dying fast 🔋",
  "Ingco rotary hammer drill drilling speed demo 🧱",
  "DeWalt vs Bosch: Brushless Motor teardown 🔧",
  "Angle grinder wire brush rust removal test 🪒",
  "Impact driver vs standard drill: What's the difference? ⚙️",
  "How to make custom workshop cabinet shelves 🪵",
  "Ingco cordless impact wrench tire swap test 🏎️",
  "Bosch professional jig saw curve cutting demo 🪚",
  "How to detect hidden cables before drilling 🔌",
  "Reviewing Dushyant Power Tools best-seller cordless drill 🏆",
  "Angle Grinder carving wood disc review 🪵",
  "Unboxing Makita cordless combo kit 🎁",
  "Ingco 100-piece hand toolset review 💼",
  "Dewalt laser distance measurer testing 📏",
  "Solder iron tips: How to tin and clean them 🌡️",
  "Restoring carbon brushes in an old angle grinder ⚡",
  "Testing cordless heat gun paint stripping speed 🔥",
  "Best circular saw blade for clean plywood cuts 🪚",
  "Ingco cordless chainsaw trimming trees 🌲",
  "Bosch professional laser level calibration guide 📐",
  "Makita brushless router woodworking demo 🪵",
  "How to select the right anchor bolt for concrete 🔩",
  "Unboxing the heavy-duty demolition jack hammer 🧱",
  "Stanley socket wrench set torque limit test ⚙️",
  "Angle Grinder flap disc polishing steel 💿",
  "Ingco wet tile cutter speed review 🧱"
];

const youtubeShortsLinks = [
  "https://m.youtube.com/shorts/6Vcey2pLBLc",
  "https://www.youtube.com/shorts/8HslDMSAr3c",
  "https://www.youtube.com/shorts/SaP7Fe4hyCQ",
  "https://www.youtube.com/shorts/2kK0bIwbRFo",
  "https://www.youtube.com/shorts/nMwXLxoBt1Q",
  "https://www.youtube.com/shorts/35Uj2g2fw6s",
  "https://www.youtube.com/shorts/Nus7MfF2ytw",
  "https://www.youtube.com/shorts/lXSlAdTemRM",
  "https://www.youtube.com/shorts/3YLIrC1OSfk",
  "https://www.youtube.com/shorts/VCOAeS10ySw",
  "https://www.youtube.com/shorts/-XBG_PS9VNE",
  "https://www.youtube.com/shorts/wIjashhmRIg",
  "https://www.youtube.com/shorts/0ZvmEA-20hY",
  "https://www.youtube.com/shorts/7Ifqavnm7N4",
  "https://www.youtube.com/shorts/zqeds4VtJFg",
  "https://m.youtube.com/shorts/A4iersC38oU",
  "https://www.youtube.com/shorts/LSnU4YF4aZk",
  "https://www.youtube.com/shorts/B9ZN1ahlIVQ",
  "https://www.youtube.com/shorts/wIpWCJKfRXs?vl=en",
  "https://www.youtube.com/shorts/et2kwrp6dzc",
  "https://www.youtube.com/shorts/2Bz5vQ9_1jo",
  "https://www.youtube.com/shorts/f0WEo0GnwB4",
  "https://www.youtube.com/shorts/nwGAR5Eb3Fo",
  "https://www.youtube.com/shorts/NH9I-Qy1OwM",
  "https://www.youtube.com/shorts/40xEJGVv9YI",
  "https://www.youtube.com/shorts/W_2qrNHMbDM",
  "https://www.youtube.com/shorts/JSnk_MFlkfU",
  "https://m.youtube.com/shorts/rQ8nfRk8Zkk",
  "https://www.youtube.com/shorts/xskLbxrAS8o",
  "https://www.youtube.com/shorts/kJGxk3HStr8",
  "https://www.youtube.com/shorts/DaMZ82Ml_TI",
  "https://m.youtube.com/shorts/GWUPHMbWOZk",
  "https://www.youtube.com/shorts/JpFG0eY27sU",
  "https://www.youtube.com/shorts/zqcHY1BEZkA",
  "https://www.youtube.com/shorts/JdAFf4uxRwU",
  "https://www.youtube.com/shorts/bBESbusaLFs",
  "https://m.youtube.com/shorts/nB21mt8hIf4",
  "https://www.youtube.com/shorts/zsnpBGNI_60",
  "https://m.youtube.com/shorts/7TdGEzDPZKg",
  "https://www.youtube.com/shorts/hBs-3CFf0UQ",
  "https://www.youtube.com/shorts/9AEvVTReGPY",
  "https://m.youtube.com/shorts/ngjoWfgEiqo",
  "https://m.youtube.com/shorts/eNEm1Bht-hU",
  "https://www.youtube.com/shorts/cQXAJR4ZBCs",
  "https://www.youtube.com/shorts/0Up6xEUbDac",
  "https://www.youtube.com/shorts/Hnuk6h0NidM",
  "https://www.youtube.com/shorts/0oOWNd27wBU",
  "https://m.youtube.com/shorts/Sz32iLF5bPI"
];

const externalVideos = [
  {
    url: "https://www.instagram.com/reel/DbVf8aoz_Nm/",
    title: "Instagram Reel: Cordless Tools Demo 🛠️",
    type: "shorts",
    description: "Incredible speed test of various cordless drills and angle grinders from top brands.",
    poster: "https://picsum.photos/seed/instareel1/900/506",
    duration: "0:45",
    category: "Cordless Tools",
    tags: ["instagram", "reel", "demo", "power tools"]
  },
  {
    url: "https://www.instagram.com/reel/DWdRgrYAGL2/",
    title: "Instagram Reel: Grinder Safety Tips ⚠️",
    type: "shorts",
    description: "Quick summary of core grinder safety habits you must follow at the workshop floor.",
    poster: "https://picsum.photos/seed/instareel2/900/506",
    duration: "0:50",
    category: "Safety",
    tags: ["safety", "grinder", "instagram", "tips"]
  },
  {
    url: "https://www.facebook.com/ahglobalsolution/videos/powertools-tools-toolsofthetrade-handtools-cordlesstools-makita-ingco-bosch-dewa/1128685276003323/",
    title: "Global Power Tools Demo Exhibition",
    type: "longform",
    description: "Detailed exhibition review showing Makita, Ingco, Bosch, and DeWalt cordless tools, spare parts, and hand tools.",
    poster: "https://picsum.photos/seed/fbvideo/900/506",
    duration: "12:24",
    category: "Live Reviews",
    tags: ["facebook", "exhibition", "review", "comparison"]
  }
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB.");

    console.log("Deleting old video data...");
    await Video.deleteMany({});
    console.log("Cleared videos collection.");

    const seedList = [];

    // Seed YouTube Shorts
    youtubeShortsLinks.forEach((url, index) => {
      const channel = CHANNELS_INFO[index % CHANNELS_INFO.length];
      const category = categories[index % categories.length];
      const title = shortsTitles[index] || `Power Tool Short #${index + 1}`;
      const videoId = `yt-short-${index + 1}`;

      seedList.push({
        id: videoId,
        title: title,
        description: `Expert check on power tools and hardware accessories. Check out this short from ${channel.name}!`,
        poster: `https://picsum.photos/seed/postershort${index + 1}/360/640`,
        videoUrl: "",
        youtubeUrl: url,
        type: "shorts",
        duration: "0:30",
        views: Math.floor(Math.random() * 80000) + 5000,
        likes: Math.floor(Math.random() * 8000) + 300,
        dislikes: Math.floor(Math.random() * 100),
        category: category,
        tags: [category.toLowerCase(), "shorts", "powertools", "diy"],
        channelId: channel.id,
        uploaderEmail: "admin@dpt.com",
        isLive: index % 10 === 0, // Mark some as live for features
        sharesCount: Math.floor(Math.random() * 500),
        reportsCount: 0
      });
    });

    // Seed External Instagram/Facebook links
    externalVideos.forEach((video, index) => {
      const channel = CHANNELS_INFO[(index + 3) % CHANNELS_INFO.length];
      const videoId = `ext-video-${index + 1}`;

      seedList.push({
        id: videoId,
        title: video.title,
        description: video.description,
        poster: video.poster,
        videoUrl: "",
        youtubeUrl: video.url,
        type: video.type,
        duration: video.duration,
        views: Math.floor(Math.random() * 150000) + 12000,
        likes: Math.floor(Math.random() * 12000) + 1000,
        dislikes: Math.floor(Math.random() * 200),
        category: video.category,
        tags: video.tags,
        channelId: channel.id,
        uploaderEmail: "admin@dpt.com",
        isLive: false,
        sharesCount: Math.floor(Math.random() * 200),
        reportsCount: 0
      });
    });

    // Add 4 static mock longform workshop videos so user has plenty of standard content
    const longformVideos = [
      {
        id: "long-video-1",
        title: "20V Cordless Brushless Grinder In-Depth Setup & Review",
        description: "In this session, we test the premium DPT 20V Grinder with speed gear variations, metal grinding, and spark direction calibration.",
        poster: "https://picsum.photos/seed/longposter1/900/506",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // fallback standard youtube URL
        type: "longform",
        duration: "10:15",
        category: "Grinders",
        tags: ["grinder", "brushless", "review", "dpt"],
        channelId: "dpt-power-tools"
      },
      {
        id: "long-video-2",
        title: "Drill Chuck Repair and Lubrication Step-by-Step Guide",
        description: "Is your drill chuck jamming or slipping? Here is a complete DIY lubrication and disassembly walkthrough.",
        poster: "https://picsum.photos/seed/longposter2/900/506",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        type: "longform",
        duration: "8:45",
        category: "Maintenance",
        tags: ["repair", "drill", "maintenance", "diy"],
        channelId: "bosch-professional"
      },
      {
        id: "long-video-3",
        title: "Circular Saw Blade Selection Guide for Smooth Workshop Cuts",
        description: "Learn how to choose the tooth count and blade material for clean plywood cuts, metal sheeting, and fiberboards.",
        poster: "https://picsum.photos/seed/longposter3/900/506",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        type: "longform",
        duration: "12:10",
        category: "Saws",
        tags: ["circular saw", "blade", "cuts", "carpentry"],
        channelId: "makita-pro"
      },
      {
        id: "long-video-4",
        title: "Safety Briefing: Workshop Hazards & Protective Equipments",
        description: "A must-watch training module on avoiding common shop-floor hazards when handling heavy machinery.",
        poster: "https://picsum.photos/seed/longposter4/900/506",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        type: "longform",
        duration: "15:30",
        category: "Safety",
        tags: ["safety", "workshop", "osh", "equipment"],
        channelId: "dewalt-expert"
      }
    ];

    longformVideos.forEach((video) => {
      seedList.push({
        id: video.id,
        title: video.title,
        description: video.description,
        poster: video.poster,
        videoUrl: "",
        youtubeUrl: video.youtubeUrl,
        type: video.type,
        duration: video.duration,
        views: Math.floor(Math.random() * 50000) + 1000,
        likes: Math.floor(Math.random() * 4000) + 100,
        dislikes: Math.floor(Math.random() * 50),
        category: video.category,
        tags: video.tags,
        channelId: video.channelId,
        uploaderEmail: "admin@dpt.com",
        isLive: false,
        sharesCount: Math.random() * 100,
        reportsCount: 0
      });
    });

    console.log(`Inserting ${seedList.length} video documents...`);
    await Video.insertMany(seedList);
    console.log("Seeding finished successfully!");

  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

seed();
