import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Bell,
  Bookmark,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  Film,
  Flame,
  History,
  Home,
  Menu,
  Mic,
  Moon,
  MoreVertical,
  Play,
  Plus,
  Search,
  Send,
  Share2,
  Sun,
  ThumbsDown,
  ThumbsUp,
  UserRound,
  Video,
  Volume2,
  X,
  Zap,
} from "lucide-react";

const workshopImage = "/images/industrial_hero.png";
const brandImage = "/images/image copy.png";
const shopImage = "/images/login-storefront.jpeg";

const videoEntries = [
  [
    "NEW 2026 🔥Cordless Drill Machine...",
    "PWngodaobZw",
    "https://www.youtube.com/watch?v=PWngodaobZw",
    ["power-tools", "cordless"],
  ],
  [
    "CNC carbide tools wholesale market delhi...",
    "JIrI6hZ5PIw",
    "https://www.youtube.com/watch?v=JIrI6hZ5PIw",
    ["power-tools"],
  ],
  [
    "🧰 These 10 Tools Replaced Almost Everything I Used Before",
    "qGrlbTGxh5M",
    "https://www.youtube.com/watch?v=qGrlbTGxh5M",
    ["power-tools"],
  ],
  [
    "Who Makes The Best Entry Level Cordless Impact Wrench? Bosch vs Ingco vs DeWalt",
    "ey8QUtehPJo",
    "https://www.youtube.com/watch?v=ey8QUtehPJo",
    ["power-tools", "cordless"],
  ],
  [
    "Best Multi Power Tool Kit in Low Price - ENON Cordless Impact Wrench...",
    "Nm7pKHFKNSQ",
    "https://www.youtube.com/watch?v=Nm7pKHFKNSQ",
    ["power-tools", "cordless"],
  ],
  [
    "DeWalt vs Ingco: Can Ingco Beat DeWalt??? - Cordless Impact Drill Showdown",
    "lbi7pICAwb4",
    "https://www.youtube.com/watch?v=lbi7pICAwb4",
    ["power-tools", "cordless"],
  ],
  [
    "The PERFECT Tool Bag Setup For 2026 (Tools I Wish I Bought Sooner)",
    "hePnRTRbIio",
    "https://www.youtube.com/watch?v=hePnRTRbIio",
    ["power-tools"],
  ],
  [
    "20 best and useful drill bits for all work...",
    "K-1M8ifKZ5Y",
    "https://www.youtube.com/watch?v=K-1M8ifKZ5Y",
    ["power-tools"],
  ],
  [
    "Power Tools Wholesale Market Delhi | Hardware Wholesale Market In Delhi...",
    "QxwvHWd_IcA",
    "https://www.youtube.com/watch?v=QxwvHWd_IcA",
    ["power-tools"],
  ],
  [
    "Ingco 328 Pieces Hand Tools Kit Trolley...",
    "kHJ7LvUV64g",
    "https://www.youtube.com/watch?v=kHJ7LvUV64g",
    ["power-tools"],
  ],
  [
    "5 Drill Features Everyone Should Know",
    "VN0ZE-wDcto",
    "https://www.youtube.com/watch?v=VN0ZE-wDcto",
    ["power-tools"],
  ],
  [
    "Power Tools Wholesale Market In Delhi | Cheapest Power Tools Market...",
    "fw04yuMM1IU",
    "https://www.youtube.com/watch?v=fw04yuMM1IU",
    ["power-tools"],
  ],
  [
    "8 in 1 Amazing Mivon Multi-tool Drill Attachments!!!!",
    "ZV_MWNHzMYA",
    "https://www.youtube.com/watch?v=ZV_MWNHzMYA",
    ["power-tools"],
  ],
  [
    "You haven't seen this test! Milwaukee VS Makita VS DeWALT VS Bosch VS Metabo",
    "GvxgvwPWTqI",
    "https://www.youtube.com/watch?v=GvxgvwPWTqI",
    ["power-tools"],
  ],
  [
    "Ultimate Cordless Impact Driver Showdown: DeWalt vs Ingco vs Total...",
    "JfHUMBigtuY",
    "https://www.youtube.com/watch?v=JfHUMBigtuY",
    ["power-tools", "cordless"],
  ],
  [
    "Handyman Bag Tour 2025 - My Primary Bag (SP-MC)",
    "rwri75TvxLo",
    "https://www.youtube.com/watch?v=rwri75TvxLo",
    ["power-tools"],
  ],
  [
    "Mini Cordless Drill 47 in 1 Electric Screwdriver Set...",
    "K0tKnaiwPuM",
    "https://www.youtube.com/watch?v=K0tKnaiwPuM",
    ["power-tools", "cordless"],
  ],
  [
    "Restoration of Rusty Cordless Drill",
    "0N68WgcPcws",
    "https://www.youtube.com/watch?v=0N68WgcPcws",
    ["power-tools", "cordless"],
  ],
  [
    "Total 165pcs Cordless Drill Set Price in BD / Raihan Traders...",
    "0sNIX8SjeQM",
    "https://www.youtube.com/watch?v=0sNIX8SjeQM",
    ["power-tools", "cordless"],
  ],
  [
    "BEST Impact Driver? DeWalt, Milwaukee, Flex, Makita and More!",
    "fsfgL4UlG68",
    "https://www.youtube.com/watch?v=fsfgL4UlG68",
    ["power-tools", "cordless"],
  ],
  [
    "Best Electrician Tools to Buy in 2026 Knipex vs Klein vs Wiha vs Wera...",
    "4KSIXRwrEk0",
    "https://www.youtube.com/watch?v=4KSIXRwrEk0",
    ["power-tools"],
  ],
  [
    "I Visited THE BIGGEST TOOL STORE I'VE EVER SEEN!",
    "AonYMprnsyE",
    "https://www.youtube.com/watch?v=AonYMprnsyE",
    ["power-tools"],
  ],
  [
    "सिर्फ ₹5 मे बनाया Dc Motor Drill Chuck...",
    "ulYi8G7511g",
    "https://www.youtube.com/watch?v=ulYi8G7511g",
    ["power-tools"],
  ],
  [
    "60 Amazing TOOLS on Amazon You Must See",
    "xNqWzSFcbtk",
    "https://www.youtube.com/watch?v=xNqWzSFcbtk",
    ["power-tools"],
  ],
  [
    "Backend Engineering in 2026: Skills That Pay 70 LPA",
    "lVJj83J-mbs",
    "https://www.youtube.com/watch?v=lVJj83J-mbs",
    ["nodejs", "streams"],
  ],
  [
    "React Native Full Stack Course (2026)",
    "HJOCD3yy9mw",
    "https://www.youtube.com/watch?v=HJOCD3yy9mw",
    ["nodejs", "streams"],
  ],
  [
    "Razorpay Payment Gateway Setup in MERN Stack",
    "ICxmav6ezJM",
    "https://www.youtube.com/watch?v=ICxmav6ezJM",
    ["nodejs"],
  ],
  [
    "The Truth About AI Coding in 2026",
    "sO-ssqm9jPk",
    "https://www.youtube.com/watch?v=sO-ssqm9jPk",
    ["new", "streams"],
  ],
];

const videos = videoEntries.map(([title, youtubeId, url, tags = []], index) => ({
  id: `v-${index + 1}`,
  youtubeId,
  url,
  title,
  channel: tags.includes("nodejs") ? "Dushyant Dev" : "Dushyant Power Tools",
  tags,
  views: `${Math.floor(40 + (index % 7) * 6)}.${(index % 10) + 1}K views`,
  age: `${1 + (index % 4)} days ago`,
  duration: `${3 + (index % 6)}:${String(15 + ((index * 5) % 40)).padStart(2, "0")}`,
  thumb: `https://i.ytimg.com/vi/${youtubeId}/hq720.jpg`,
  localFallback: [workshopImage, brandImage, shopImage][index % 3],
  description: tags.includes("nodejs")
    ? "Node.js backend and stream content."
    : "Power Tools, cordless tools and hardware market content.",
  watched: index < 7,
  newToYou: index >= 16,
  uploadedAt: Date.now() - index * 1000 * 60 * 60 * 4,
}));

const API_BASE = import.meta.env.VITE_API_URL || "";

function filterVideos(videos, filter) {
  switch (filter) {
    case "All":
      return videos;
    case "Power Tools":
      return videos.filter((video) => video.tags.includes("power-tools"));
    case "Cordless":
      return videos.filter((video) => video.tags.includes("cordless"));
    case "Streams":
      return videos.filter((video) => video.tags.includes("streams"));
    case "Node.js":
      return videos.filter((video) => video.tags.includes("nodejs"));
    case "Recently uploaded":
      return [...videos].sort((a, b) => b.uploadedAt - a.uploadedAt);
    case "Watched":
      return videos.filter((video) => video.watched);
    case "New to you":
      return videos.filter((video) => video.newToYou);
    default:
      return videos;
  }
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function getFallbackDuration(index) {
  const minutes = 8 + (index % 8);
  const seconds = 10 + ((index * 13) % 50);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

const shortEntries = [
  ["YL44AQMIn4s", "https://www.youtube.com/shorts/YL44AQMIn4s"],
  ["UaYdf_WqiJ8", "https://www.youtube.com/shorts/UaYdf_WqiJ8"],
  ["CDdBEvPrAyc", "https://www.youtube.com/shorts/CDdBEvPrAyc"],
  ["42wHrumJSyQ", "https://www.youtube.com/shorts/42wHrumJSyQ"],
  ["if72R8jAI78", "https://www.youtube.com/shorts/if72R8jAI78"],
  ["tauDV3q2eG8", "https://www.youtube.com/shorts/tauDV3q2eG8"],
  ["luoXXbdDEbI", "https://www.youtube.com/shorts/luoXXbdDEbI"],
  ["I1XlL_1lmW4", "https://www.youtube.com/shorts/I1XlL_1lmW4"],
  ["1ARB8xIdzhU", "https://www.youtube.com/shorts/1ARB8xIdzhU"],
  ["s5x3TIJmQdw", "https://www.youtube.com/shorts/s5x3TIJmQdw"],
  ["w_Exa3ZVceI", "https://www.youtube.com/shorts/w_Exa3ZVceI"],
  ["6n4lkTXCvP8", "https://www.youtube.com/shorts/6n4lkTXCvP8"],
  ["ZII_9RR6Ucw", "https://www.youtube.com/shorts/ZII_9RR6Ucw"],
  ["yneJcJ9idqQ", "https://www.youtube.com/shorts/yneJcJ9idqQ"],
  ["8PO9xJ57sSs", "https://www.youtube.com/shorts/8PO9xJ57sSs"],
  ["V0WAUh3SWgg", "https://www.youtube.com/shorts/V0WAUh3SWgg"],
  ["8OdgUgTvWNk", "https://www.youtube.com/shorts/8OdgUgTvWNk"],
  ["DFRyUZTujvU", "https://www.youtube.com/shorts/DFRyUZTujvU"],
  ["p1XcISI1Kfg", "https://www.youtube.com/shorts/p1XcISI1Kfg"],
  ["BwGf05mlNC8", "https://www.youtube.com/shorts/BwGf05mlNC8"],
  ["NN61E0p2B5M", "https://www.youtube.com/shorts/NN61E0p2B5M"],
  ["ovMuzSqzRLM", "https://www.youtube.com/shorts/ovMuzSqzRLM"],
  ["xijqQVUHxVU", "https://www.youtube.com/shorts/xijqQVUHxVU"],
  ["qrSG9lPdRn4", "https://www.youtube.com/shorts/qrSG9lPdRn4"],
  ["LCXB9reRocc", "https://www.youtube.com/shorts/LCXB9reRocc"],
  ["7_yYwiJRp0E", "https://www.youtube.com/shorts/7_yYwiJRp0E"],
  ["meh95BCXh3s", "https://www.youtube.com/shorts/meh95BCXh3s"],
  ["eojlZ79nj6Y", "https://www.youtube.com/shorts/eojlZ79nj6Y"],
  ["IhiS4rTLAIk", "https://www.youtube.com/shorts/IhiS4rTLAIk"],
  ["ZfHnoSkHq5w", "https://www.youtube.com/shorts/ZfHnoSkHq5w"],
  ["JzlJoVfaSBI", "https://www.youtube.com/shorts/JzlJoVfaSBI"],
  ["FE3IM7vCDQs", "https://www.youtube.com/shorts/FE3IM7vCDQs"],
  ["ol9T3U1p3mo", "https://www.youtube.com/shorts/ol9T3U1p3mo"],
  ["C-fnkMeSDSo", "https://www.youtube.com/shorts/C-fnkMeSDSo"],
  ["Do-ggXFfVuE", "https://www.youtube.com/shorts/Do-ggXFfVuE"],
  ["3-mHhwN301M", "https://www.youtube.com/shorts/3-mHhwN301M"],
  ["NuAzP3ehpgg", "https://www.youtube.com/shorts/NuAzP3ehpgg"],
];

const shorts = shortEntries.map(([youtubeId, url], index) => ({
  id: `s-${index + 1}`,
  youtubeId,
  url,
  title:
    index === 0
      ? "Ingco power tools | tools market Delhi,…"
      : index === 1
      ? "सिर में फोड़े फुंसी का इलाज"
      : `Short Clip ${index + 1}`,
  views: `${4 + (index % 6)}.${(index % 10) + 1}K views`,
  thumb: `https://i.ytimg.com/vi/${youtubeId}/frame0.jpg`,
  isAd: false,
}));

const chips = [
  "All",
  "Power Tools",
  "Cordless",
  "Streams",
  "Node.js",
  "Shorts",
  "Recently uploaded",
  "Watched",
  "New to you",
];

function getEmbedUrl(video, autoplay = false) {
  return `https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1&playsinline=1${autoplay ? "&autoplay=1" : ""}`;
}

function Logo() {
  return (
    <div className="ytx-logo">
      <span>
        <Zap size={18} fill="currentColor" />
      </span>
      <div>
        <strong>DUSHYANT</strong>
        <em>POWER TOOLS</em>
      </div>
    </div>
  );
}

function Header({ theme, setTheme, setPage, setDrawerOpen }) {
  return (
    <header className="ytx-header">
      <div className="ytx-left">
        <button
          className="ytx-icon"
          onClick={() => setDrawerOpen(true)}
          type="button"
        >
          <Menu size={23} />
        </button>
        <button
          className="ytx-logo-btn"
          onClick={() => setPage("home")}
          type="button"
        >
          <Logo />
        </button>
      </div>
      <form className="ytx-search">
        <input placeholder="Search videos, channels, tools..." />
        <button type="button">
          <Search size={22} />
        </button>
      </form>
      <div className="ytx-actions">
        <button className="ytx-icon ytx-hide-sm" type="button">
          <Mic size={21} />
        </button>
        <button className="ytx-create" type="button">
          <Plus size={18} />
          Create
        </button>
        <button className="ytx-icon ytx-hide-xs" type="button">
          <Bell size={21} />
          <i>5</i>
        </button>
        <button
          className="ytx-icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          type="button"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="ytx-avatar" type="button">
          <UserRound size={21} />
        </button>
      </div>
    </header>
  );
}

function Sidebar({ page, setPage }) {
  const items = [
    ["home", "Home", Home],
    ["shorts", "Shorts", Flame],
    ["subscriptions", "Subscriptions", Video],
    ["library", "Library", Film],
    ["history", "History", History],
    ["watchlater", "Watch Later", Clock],
    ["liked", "Liked Videos", ThumbsUp],
    ["downloads", "Downloads", Download],
    ["yourvideos", "Your Videos", Video],
    ["playlists", "Playlists", Bookmark],
  ];
  return (
    <aside className="ytx-sidebar">
      {items.map((item, index) => {
        const [key, label, Icon] = item;
        return (
          <React.Fragment key={key}>
            {(index === 3 || index === 8) && <div className="ytx-divider" />}
            <button
              className={page === key ? "is-active" : ""}
              onClick={() =>
                (key === "shorts" || key === "home") && setPage(key)
              }
              type="button"
            >
              <Icon size={19} />
              <span>{label}</span>
            </button>
          </React.Fragment>
        );
      })}
      <div className="ytx-divider" />
      <h3>Subscriptions</h3>
      {[
        "Dushyant Power Tools",
        "Tool Review Pro",
        "The Tool Zone",
        "Machinery Hub",
      ].map((name) => (
        <button key={name} type="button">
          <b>{name[0]}</b>
          <span>{name}</span>
        </button>
      ))}
    </aside>
  );
}

function Drawer({ open, setOpen, setPage }) {
  return (
    <>
      <div
        className={`ytx-scrim ${open ? "visible" : ""}`}
        onClick={() => setOpen(false)}
      />
      <div className={`ytx-drawer ${open ? "visible" : ""}`}>
        <div className="ytx-drawer-head">
          <Logo />
          <button
            className="ytx-icon"
            onClick={() => setOpen(false)}
            type="button"
          >
            <X size={21} />
          </button>
        </div>
        <Sidebar
          page=""
          setPage={(p) => {
            setPage(p);
            setOpen(false);
          }}
        />
      </div>
    </>
  );
}

function VideoThumb({ video, onClick, compact = false }) {
  return (
    <article
      className={compact ? "ytx-compact" : "ytx-card"}
      onClick={() => onClick(video)}
    >
      <div className="ytx-thumb">
        <img
          src={video.thumb}
          onError={(e) => {
            e.currentTarget.src = video.localFallback;
          }}
          alt={video.title}
          loading="lazy"
        />
        <span>{video.duration}</span>
      </div>
      <div className="ytx-meta">
        {!compact && (
          <b>
            <Zap size={15} fill="currentColor" />
          </b>
        )}
        <div>
          <h3>{video.title}</h3>
          <p>
            {video.channel} <CheckCircle2 size={13} />
          </p>
          <small>
            {video.views} • {video.age}
          </small>
        </div>
      </div>
      {compact && (
        <button type="button">
          <MoreVertical size={18} />
        </button>
      )}
    </article>
  );
}

function HomePage({
  videos,
  openVideo,
  setPage,
  selectedChip,
  setSelectedChip,
}) {
  return (
    <main className="ytx-feed">
      <div className="ytx-chips">
        {chips.map((chip) => (
          <button
            className={chip === selectedChip ? "is-active" : ""}
            key={chip}
            onClick={() => {
              setSelectedChip(chip);
              if (chip === "Shorts") {
                setPage("shorts");
              }
            }}
            type="button"
          >
            {chip}
          </button>
        ))}
      </div>
      <div className="ytx-grid">
        <AdCard />
        {videos.slice(0, 11).map((video) => (
          <VideoThumb key={video.id} video={video} onClick={openVideo} />
        ))}
      </div>
      <section className="ytx-shelf">
        <div>
          <h2>Shorts</h2>
          <button onClick={() => setPage("shorts")} type="button">
            View all
          </button>
        </div>
        <div className="ytx-shorts-strip">
          {shorts.slice(0, 8).map((short) => (
            <button
              key={short.id}
              className="ytx-short-lockup"
              onClick={() => setPage("shorts")}
              type="button"
            >
              <img src={short.thumb} alt={short.title} loading="lazy" />
              <h3>{short.title}</h3>
              <p>{short.views}</p>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

function AdCard() {
  return (
    <article className="ytx-card ytx-ad">
      <div className="ytx-ad-art">
        <h2>THE FUTURE OF AI-POWERED ITSM IS HERE</h2>
      </div>
      <div className="ytx-meta">
        <b>A</b>
        <div>
          <h3>Jira Service Management brings you ITSM powered by AI</h3>
          <p>
            <strong>Sponsored</strong> • Jira Service Management
          </p>
        </div>
      </div>
      <div className="ytx-ad-buttons">
        <button>Watch</button>
        <button>Visit site</button>
      </div>
    </article>
  );
}

function WatchPage({
  activeVideo,
  openVideo,
  comments,
  setComments,
  goBack,
  suggestions,
}) {
  const [draft, setDraft] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setComments([
      { name: "Guest User", text: draft.trim(), time: "Just now" },
      ...comments,
    ]);
    setDraft("");
  };

  return (
    <main className="ytx-watch">
      <section className="ytx-watch-primary">
        <button className="ytx-back" onClick={goBack} type="button">
          <ArrowLeft size={20} /> Back
        </button>
        <div className="ytx-player">
          <iframe
            src={getEmbedUrl(activeVideo, true)}
            title={activeVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <h1>{activeVideo.title}</h1>
        <div className="ytx-owner-row">
          <div className="ytx-owner">
            <b>
              <Zap size={18} fill="currentColor" />
            </b>
            <div>
              <strong>
                {activeVideo.channel} <CheckCircle2 size={14} />
              </strong>
              <small>12.5K subscribers</small>
            </div>
          </div>
          <button className="ytx-subscribe" type="button">
            Subscribe
          </button>
          <div className="ytx-watch-actions">
            <button type="button">
              <ThumbsUp size={18} />
              1.2K
            </button>
            <button type="button">
              <ThumbsDown size={18} />
            </button>
            <button type="button">
              <Share2 size={18} />
              Share
            </button>
            <button type="button">
              <Download size={18} />
              Download
            </button>
            <button type="button">
              <Bookmark size={18} />
              Save
            </button>
            <button type="button">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
        <div className="ytx-description">
          <strong>
            {activeVideo.views} • {activeVideo.age}
          </strong>
          <p>{activeVideo.description}</p>
          <p>#PowerTools #Streams #DushyantPowerTools</p>
        </div>
        <section className="ytx-comments">
          <h2>{comments.length.toLocaleString()} Comments</h2>
          <form onSubmit={submit}>
            <span>G</span>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit">
              <Send size={18} />
            </button>
          </form>
          {comments.map((comment, index) => (
            <article key={`${comment.name}-${index}`}>
              <span>{comment.name[0]}</span>
              <div>
                <strong>
                  {comment.name} <small>{comment.time}</small>
                </strong>
                <p>{comment.text}</p>
                <button>
                  <ThumbsUp size={16} /> Like
                </button>
                <button>Reply</button>
              </div>
              <MoreVertical size={18} />
            </article>
          ))}
        </section>
      </section>
      <aside className="ytx-watch-side">
        {suggestions
          .filter((v) => v.id !== activeVideo.id)
          .map((video) => (
            <VideoThumb
              key={video.id}
              video={video}
              compact
              onClick={openVideo}
            />
          ))}
      </aside>
    </main>
  );
}

function ShortsPage({ goBack, theme, setTheme }) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const move = (delta) => {
    const next = Math.max(0, Math.min(shorts.length - 1, index + delta));
    setIndex(next);
    containerRef.current?.children[next]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <main className="ytx-shorts-page">
      <button
        className="ytx-back ytx-shorts-back"
        onClick={goBack}
        type="button"
      >
        <ArrowLeft size={20} /> Back
      </button>
      <button
        className="ytx-icon ytx-shorts-theme"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        type="button"
      >
        {theme === "dark" ? <Sun /> : <Moon />}
      </button>
      <div className="ytx-shorts-list" ref={containerRef}>
        {shorts.map((short, i) => (
          <section className="ytx-reel" key={short.id}>
            <div className="ytx-reel-phone">
              {Math.abs(i - index) <= 1 ? (
                <iframe
                  src={getEmbedUrl(short, i === index)}
                  title={short.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <img src={short.thumb} alt={short.title} loading="lazy" />
              )}
              <div className="ytx-reel-overlay">
                <h2>{short.title}</h2>
                <p>
                  {short.views} • @
                  {short.isAd ? "sponsored" : "dushyantpowertools"}
                </p>
              </div>
            </div>
            <div className="ytx-reel-actions">
              <button>
                <ThumbsUp />
              </button>
              <span>12K</span>
              <button>
                <ThumbsDown />
              </button>
              <button>
                <Share2 />
              </button>
              <button>
                <MoreVertical />
              </button>
            </div>
          </section>
        ))}
      </div>
      <div className="ytx-reel-nav">
        <button disabled={index === 0} onClick={() => move(-1)}>
          <ChevronUp />
        </button>
        <button disabled={index === shorts.length - 1} onClick={() => move(1)}>
          <ChevronDown />
        </button>
      </div>
      <p className="ytx-reel-count">
        {index + 1} / {shorts.length}
      </p>
    </main>
  );
}

export default function VideoCommunity() {
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState("home");
  const [activeVideo, setActiveVideo] = useState(() => shuffleArray(videos)[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [videoList, setVideoList] = useState(() => shuffleArray(videos));
  const [selectedChip, setSelectedChip] = useState("All");
  const filteredVideos = useMemo(
    () => filterVideos(videoList, selectedChip),
    [videoList, selectedChip],
  );
  const [comments, setComments] = useState([
    {
      name: "Vishal Tools",
      text: "Great review, stream playback is smooth.",
      time: "2 days ago",
    },
    {
      name: "Arjun Mehra",
      text: "Readable streams wala part mast hai.",
      time: "1 day ago",
    },
    {
      name: "Dushyant Power Tools",
      text: "Next video mein piping pipeline explain karenge.",
      time: "6 hours ago",
    },
  ]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/videos`);
        if (!response.ok) throw new Error("Failed to load videos");
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const fallbackByYoutube = new Map(videos.map((item) => [item.youtubeId, item]));
          const mappedVideos = data.map((video, index) => {
            const youtubeId = video.youtubeUrl
              ? video.youtubeUrl.split("v=")[1] || video.youtubeUrl
              : video.youtubeId || "";
            const fallback = fallbackByYoutube.get(youtubeId);
            return {
              id: video.id || fallback?.id || `v-${index + 1}`,
              youtubeId,
              url:
                video.youtubeUrl ||
                fallback?.url ||
                `https://www.youtube.com/watch?v=${youtubeId}`,
              title: video.title || fallback?.title || "Video",
              channel: video.channelId || fallback?.channel || "Dushyant Power Tools",
              tags: fallback?.tags || [],
              views:
                video.views !== undefined
                  ? `${video.views.toLocaleString()} views`
                  : fallback?.views || "1.1K views",
              age: video.createdAt
                ? `${Math.max(1, Math.floor((Date.now() - new Date(video.createdAt).getTime()) / (1000 * 60 * 60 * 24)))} days ago`
                : fallback?.age || "1 day ago",
              duration: video.duration || fallback?.duration || getFallbackDuration(index),
              thumb: video.poster || video.thumb || fallback?.thumb,
              localFallback: fallback?.localFallback || workshopImage,
              description:
                video.description ||
                fallback?.description ||
                "Stream-friendly video playback using one active player at a time, so the browser stays smooth.",
              watched: fallback?.watched ?? false,
              newToYou: fallback?.newToYou ?? false,
              uploadedAt: fallback?.uploadedAt || Date.now() - index * 1000 * 60 * 60 * 4,
            };
          });
          const shuffledVideos = shuffleArray(mappedVideos.length ? mappedVideos : videos);
          setVideoList(shuffledVideos);
          setActiveVideo((prev) =>
            shuffledVideos.find((item) => item.id === prev.id)
              ? prev
              : shuffledVideos[0] || videos[0],
          );
        }
      } catch (error) {
        console.warn("VideoCommunity: using fallback videos", error);
      }
    };

    fetchVideos();
  }, []);

  const openVideo = (video) => {
    setActiveVideo(video);
    setPage("watch");
    window.scrollTo(0, 0);
  };
  const goBack = () => {
    setPage("home");
    window.scrollTo(0, 0);
  };

  return (
    <div className={`ytx-page ${theme === "dark" ? "ytx-dark" : "ytx-light"}`}>
      <style>{css}</style>
      {page !== "shorts" && (
        <Header
          theme={theme}
          setTheme={setTheme}
          setPage={setPage}
          setDrawerOpen={setDrawerOpen}
        />
      )}
      {page !== "shorts" && (
        <div className="ytx-shell">
          <Sidebar page={page} setPage={setPage} />
          {page === "home" && (
            <HomePage
              videos={filteredVideos}
              openVideo={openVideo}
              setPage={setPage}
              selectedChip={selectedChip}
              setSelectedChip={setSelectedChip}
            />
          )}
          {page === "watch" && (
            <WatchPage
              activeVideo={activeVideo}
              openVideo={openVideo}
              comments={comments}
              setComments={setComments}
              goBack={goBack}
              suggestions={videoList}
            />
          )}
        </div>
      )}
      {page === "shorts" && (
        <ShortsPage goBack={goBack} theme={theme} setTheme={setTheme} />
      )}
      <Drawer open={drawerOpen} setOpen={setDrawerOpen} setPage={setPage} />
    </div>
  );
}

const css = `
.ytx-page{--bg:#fff;--text:#0f0f0f;--muted:#606060;--line:rgba(0,0,0,.12);--chip:rgba(0,0,0,.05);--chip2:rgba(0,0,0,.1);--panel:#fff;--raised:#f2f2f2;--red:#ff0033;min-height:100vh;background:var(--bg);color:var(--text);font-family:Roboto,Arial,Inter,sans-serif}
.ytx-dark{--bg:#0f0f0f;--text:#f1f1f1;--muted:#aaa;--line:rgba(255,255,255,.16);--chip:rgba(255,255,255,.1);--chip2:rgba(255,255,255,.18);--panel:#0f0f0f;--raised:#272727}
.ytx-page *{box-sizing:border-box}.ytx-page button{font-family:inherit}.ytx-header{position:sticky;top:0;z-index:40;height:56px;display:grid;grid-template-columns:240px minmax(260px,640px) 1fr;align-items:center;gap:18px;padding:0 24px;background:var(--bg);border-bottom:1px solid var(--line)}
.ytx-left,.ytx-actions{display:flex;align-items:center;gap:12px}.ytx-actions{justify-content:flex-end}.ytx-logo-btn{border:0;background:transparent;color:inherit}.ytx-logo{display:flex;align-items:center;gap:8px}.ytx-logo>span{width:31px;height:31px;display:grid;place-items:center;color:#fff;background:#0f0f0f;border:2px solid var(--red);clip-path:polygon(50% 0,92% 18%,83% 76%,50% 100%,17% 76%,8% 18%)}.ytx-logo strong{display:block;font-size:15px;line-height:1;font-weight:900}.ytx-logo em{display:block;color:var(--red);font-size:11px;line-height:1;font-style:normal;font-weight:900}
.ytx-search{height:40px;display:grid;grid-template-columns:1fr 64px;border:1px solid var(--line);border-radius:999px;overflow:hidden}.ytx-search input{min-width:0;border:0;outline:0;padding:0 18px;background:transparent;color:var(--text);font-size:14px}.ytx-search button{border:0;border-left:1px solid var(--line);background:var(--raised);color:var(--text)}
.ytx-icon,.ytx-avatar{width:40px;height:40px;display:grid;place-items:center;border:0;border-radius:50%;background:transparent;color:var(--text);position:relative}.ytx-icon:hover,.ytx-avatar:hover{background:var(--chip2)}.ytx-icon i{position:absolute;top:2px;right:0;min-width:18px;height:18px;display:grid;place-items:center;border-radius:50%;color:#fff;background:var(--red);font-size:11px;font-style:normal}.ytx-avatar{color:#fff;background:linear-gradient(135deg,#2563eb,#ef4444)}.ytx-create{height:36px;display:inline-flex;align-items:center;gap:7px;border:0;border-radius:999px;padding:0 15px;background:var(--chip);color:var(--text);font-weight:600}
.ytx-shell{display:grid;grid-template-columns:240px minmax(0,1fr)}.ytx-sidebar{position:sticky;top:56px;height:calc(100vh - 56px);overflow-y:auto;padding:12px;border-right:1px solid var(--line);background:var(--bg)}.ytx-sidebar button{width:100%;height:40px;display:flex;align-items:center;gap:22px;border:0;border-radius:10px;padding:0 12px;background:transparent;color:var(--text);font-size:14px;text-align:left}.ytx-sidebar button.is-active,.ytx-sidebar button:hover{background:var(--chip2);font-weight:600}.ytx-sidebar b{width:24px;height:24px;display:grid;place-items:center;border-radius:50%;background:var(--red);color:#fff}.ytx-sidebar h3{margin:0 0 8px 12px;font-size:14px}.ytx-divider{height:1px;margin:12px 0;background:var(--line)}
.ytx-feed{min-width:0;padding:12px 24px 48px}.ytx-chips{position:sticky;top:56px;z-index:20;display:flex;gap:10px;overflow-x:auto;padding:8px 0 14px;background:var(--bg)}.ytx-chips button{height:32px;border:0;border-radius:8px;padding:0 13px;white-space:nowrap;background:var(--chip);color:var(--text);font-weight:700}.ytx-chips .is-active{color:var(--bg);background:var(--text)}.ytx-grid{display:grid;grid-template-columns:repeat(4,minmax(260px,1fr));gap:34px 16px}
.ytx-card{min-width:0;cursor:pointer}.ytx-thumb{position:relative;overflow:hidden;aspect-ratio:16/9;border-radius:12px;background:#111}.ytx-thumb img{width:100%;height:100%;object-fit:cover;display:block}.ytx-thumb span,.ytx-short-lockup span{position:absolute;right:6px;bottom:6px;padding:2px 5px;border-radius:4px;background:rgba(0,0,0,.82);color:#fff;font-size:12px;font-weight:700}.ytx-meta{display:grid;grid-template-columns:36px minmax(0,1fr);gap:10px;margin-top:10px}.ytx-meta b{width:36px;height:36px;display:grid;place-items:center;border-radius:50%;background:var(--red);color:#fff}.ytx-meta h3{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin:0 0 4px;font-size:15px;line-height:1.35}.ytx-meta p,.ytx-meta small{display:flex;align-items:center;gap:4px;margin:0;color:var(--muted);font-size:13px;line-height:1.35}
.ytx-ad-art{aspect-ratio:16/9;border-radius:12px;background:#f1f1f1;display:grid;place-items:center;padding:28px;color:#111}.ytx-ad-art h2{max-width:360px;text-align:center;font-size:32px;line-height:1.06;font-weight:900}.ytx-ad-buttons{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}.ytx-ad-buttons button{height:36px;border:0;border-radius:999px;background:var(--chip2);color:var(--text);font-weight:700}
.ytx-shelf{margin-top:36px}.ytx-shelf>div:first-child{display:flex;justify-content:space-between;align-items:center}.ytx-shelf h2{margin:0 0 14px}.ytx-shelf button{border:0;background:transparent;color:#065fd4;font-weight:700}.ytx-shorts-strip{display:grid;grid-template-columns:repeat(8,minmax(120px,1fr));gap:12px}.ytx-short-lockup{text-align:left;border:0;background:transparent;color:var(--text);padding:0}.ytx-short-lockup img{width:100%;aspect-ratio:9/16;object-fit:cover;border-radius:12px;background:#111}.ytx-short-lockup h3{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin:8px 0 3px;font-size:14px}.ytx-short-lockup p{margin:0;color:var(--muted)}
.ytx-watch{display:grid;grid-template-columns:minmax(0,1fr)402px;gap:24px;max-width:1760px;margin:0 auto;padding:24px}.ytx-back{height:36px;display:inline-flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:0 13px;margin-bottom:10px;background:var(--chip);color:var(--text);font-weight:700}.ytx-player{overflow:hidden;aspect-ratio:16/9;border-radius:12px;background:#000}.ytx-player iframe{width:100%;height:100%;border:0}.ytx-watch h1{margin:14px 0 12px;font-size:20px}.ytx-owner-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.ytx-owner{display:flex;align-items:center;gap:12px;margin-right:auto}.ytx-owner>b{width:42px;height:42px;display:grid;place-items:center;border-radius:50%;color:#fff;background:var(--red)}.ytx-owner strong{display:flex;align-items:center;gap:5px}.ytx-owner small{color:var(--muted)}.ytx-subscribe{height:36px;border:0;border-radius:999px;padding:0 18px;color:var(--bg);background:var(--text);font-weight:700}.ytx-watch-actions{display:flex;gap:8px;flex-wrap:wrap}.ytx-watch-actions button{height:36px;display:inline-flex;align-items:center;gap:7px;border:0;border-radius:999px;padding:0 13px;background:var(--chip);color:var(--text);font-weight:700}.ytx-description{margin-top:14px;padding:12px;border-radius:12px;background:var(--chip);font-size:14px}.ytx-description p:last-child{color:#065fd4;font-weight:700}.ytx-watch-side{display:grid;gap:8px;align-content:start}
.ytx-compact{display:grid;grid-template-columns:168px minmax(0,1fr)24px;gap:8px;cursor:pointer}.ytx-compact .ytx-thumb{border-radius:8px}.ytx-compact .ytx-meta{display:block;margin:0}.ytx-compact h3{font-size:14px}.ytx-compact button{border:0;background:transparent;color:var(--text)}
.ytx-comments{margin-top:30px;border-top:1px solid var(--line);padding-top:18px}.ytx-comments h2{margin:0 0 18px}.ytx-comments form{display:grid;grid-template-columns:36px 1fr 40px;gap:10px;align-items:center;margin-bottom:24px}.ytx-comments form span,.ytx-comments article>span{width:36px;height:36px;display:grid;place-items:center;border-radius:50%;color:#fff;background:#2563eb;font-weight:700}.ytx-comments input{height:38px;border:0;border-bottom:1px solid var(--line);background:transparent;color:var(--text);outline:0}.ytx-comments form button{border:0;border-radius:50%;background:var(--chip);color:var(--text)}.ytx-comments article{display:grid;grid-template-columns:36px 1fr 24px;gap:12px;margin-top:18px}.ytx-comments article p{margin:4px 0 8px}.ytx-comments article button{border:0;background:transparent;color:var(--muted);margin-right:12px}
.ytx-shorts-page{min-height:100vh;background:#0f0f0f;color:#fff;position:relative;overflow:hidden}.ytx-shorts-back{position:fixed;left:22px;top:18px;z-index:20;background:rgba(255,255,255,.12);color:#fff}.ytx-shorts-theme{position:fixed;right:22px;top:18px;z-index:20;color:#fff;background:rgba(255,255,255,.12)}.ytx-shorts-list{height:100vh;overflow-y:auto;scroll-snap-type:y mandatory;touch-action:pan-y;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}.ytx-reel{height:100vh;display:flex;align-items:center;justify-content:center;gap:18px;scroll-snap-align:start}.ytx-reel-phone{position:relative;width:min(430px,78vw);height:min(86vh,780px);overflow:hidden;border-radius:12px;background:#000;box-shadow:0 30px 90px rgba(0,0,0,.45)}.ytx-reel-phone iframe,.ytx-reel-phone img{width:100%;height:100%;border:0;object-fit:cover}.ytx-reel-overlay{position:absolute;left:18px;right:18px;bottom:18px;text-shadow:0 2px 12px #000}.ytx-reel-overlay h2{font-size:18px}.ytx-reel-actions{display:grid;gap:8px;text-align:center}.ytx-reel-actions button,.ytx-reel-nav button{width:52px;height:52px;border:0;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.14);color:#fff}.ytx-reel-nav{position:fixed;right:24px;top:50%;display:grid;gap:16px;transform:translateY(-50%)}.ytx-reel-count{position:fixed;right:24px;bottom:18px;color:#aaa}
.ytx-scrim{position:fixed;inset:0;background:rgba(0,0,0,.5);opacity:0;pointer-events:none;transition:opacity 200ms;z-index:80}.ytx-scrim.visible{opacity:1;pointer-events:auto}.ytx-drawer{position:fixed;left:0;top:0;bottom:0;width:280px;background:var(--bg);color:var(--text);transform:translateX(-105%);transition:transform 200ms;z-index:90;box-shadow:0 0 40px rgba(0,0,0,.25)}.ytx-drawer.visible{transform:translateX(0)}.ytx-drawer-head{height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 12px}.ytx-drawer .ytx-sidebar{display:block;position:static;height:calc(100vh - 56px);border:0}
@media(max-width:1280px){.ytx-header{grid-template-columns:220px 1fr auto}.ytx-shell{grid-template-columns:72px 1fr}.ytx-sidebar{padding:8px 4px}.ytx-sidebar button{justify-content:center;gap:0;padding:0}.ytx-sidebar button span,.ytx-sidebar h3{display:none}.ytx-grid{grid-template-columns:repeat(3,minmax(240px,1fr))}.ytx-watch{grid-template-columns:minmax(0,1fr)360px}.ytx-compact{grid-template-columns:150px 1fr 20px}}
@media(max-width:980px){.ytx-header{grid-template-columns:auto 1fr auto;padding:0 12px}.ytx-create,.ytx-hide-sm{display:none}.ytx-shell{grid-template-columns:1fr}.ytx-sidebar{display:none}.ytx-feed{padding:10px 12px 34px}.ytx-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.ytx-watch{grid-template-columns:1fr;max-width:860px}.ytx-watch-side{order:3}.ytx-shorts-strip{grid-template-columns:repeat(4,1fr)}}
@media(max-width:640px){.ytx-header{grid-template-columns:1fr auto;height:auto;min-height:56px;padding:8px 10px}.ytx-search{grid-column:1/-1;order:3}.ytx-hide-xs{display:none}.ytx-grid{grid-template-columns:1fr}.ytx-watch{padding:12px}.ytx-player{margin-inline:-12px;border-radius:0}.ytx-watch-actions{overflow-x:auto;flex-wrap:nowrap}.ytx-watch-actions button{flex:0 0 auto}.ytx-compact{grid-template-columns:132px 1fr 20px}.ytx-shorts-strip{grid-template-columns:repeat(2,1fr)}.ytx-reel{gap:8px}.ytx-reel-actions{position:absolute;right:10px;bottom:80px}.ytx-reel-nav{right:12px}.ytx-reel-phone{width:100vw;height:100vh;border-radius:0}}
`;
