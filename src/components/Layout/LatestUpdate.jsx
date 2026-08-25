import React, { useState } from "react";
import "./App.css";

// --- Mock Data for the Grid ---
const postsData = [
  {
    id: 1,
    tag: "Product News",
    tagColor: "red",
    date: "26 May, 2025",
    title: "New TCT Saw Blades Launched",
    desc: "High-performance TCT saw blades for wood, MDF, plywood and more.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    tag: "Events",
    tagColor: "blue",
    date: "25 May, 2025",
    title: "BSC Power at IndiaWood 2024",
    desc: "Thank you to everyone who visited our stall at IndiaWood 2024, Bengaluru.",
    image:
      "https://images.unsplash.com/photo-1565624941174-919985ac80e2?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    tag: "Industry Insight",
    tagColor: "green",
    date: "23 May, 2025",
    title: "Power Tools Market Trends in 2025",
    desc: "Key insights into the power tools industry and what professionals should know.",
    image: "graph", // Special case handling
  },
  {
    id: 4,
    tag: "How To Guide",
    tagColor: "orange",
    date: "21 May, 2025",
    title: "How to Choose the Right Drill Machine",
    desc: "A complete guide to help you pick the perfect drill machine for your needs.",
    image:
      "https://images.unsplash.com/photo-1504145322165-f2855ba05276?q=80&w=2070&auto=format&fit=crop",
    hasPlayIcon: true,
  },
  {
    id: 5,
    tag: "Company News",
    tagColor: "purple",
    date: "20 May, 2025",
    title: "BSC Power Achieves New Milestone",
    desc: "Proud to cross 500+ product dealers across India. Thank you for your trust!",
    image: "milestone", // Special case handling
  },
  {
    id: 6,
    tag: "Offers",
    tagColor: "yellow",
    date: "18 May, 2025",
    title: "Exclusive May Offer - Flat 20% OFF!",
    desc: "Get 20% off on selected power tools and accessories. Limited time offer!",
    image: "offer", // Special case handling
  },
];

// --- Sub Components ---

const TopBar = () => (
  <header className="top-bar">
    <div className="container">
      <div className="top-contact">
        <span>
          <i className="fas fa-phone-alt"></i> +91 87540 55503
        </span>
        <span className="hide-mobile">
          <i className="fas fa-envelope"></i> dushyantpowertools@gmail.com
        </span>
        <span>
          <i className="fas fa-map-marker-alt"></i> Sihli, Madhya Pradesh
        </span>
      </div>
      <div className="top-links">
        <a href="#">About Us</a>
        <a href="#">Warranty Claim</a>
        <a href="#">Cordless Tools</a>
        <a href="#">Contact Us</a>
        <a href="#">Brand Collaboration</a>
      </div>
    </div>
  </header>
);

const Navbar = () => (
  <nav className="navbar">
    <div className="container">
      <div className="logo-wrapper">
        <div className="logo-icon">
          <i className="fas fa-tools"></i>
        </div>
        <div className="logo-text">
          <h1>DUSHYANT</h1>
          <p>Power Tools</p>
        </div>
      </div>
      <ul className="nav-links hide-mobile">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">
            About Us <i className="fas fa-chevron-down"></i>
          </a>
        </li>
        <li>
          <a href="#">
            Policies <i className="fas fa-chevron-down"></i>
          </a>
        </li>
        <li>
          <a href="#">
            Products <i className="fas fa-chevron-down"></i>
          </a>
        </li>
        <li>
          <a href="#">Cordless Tools</a>
        </li>
        <li>
          <a href="#">
            Brand <i className="fas fa-chevron-down"></i>
          </a>
        </li>
      </ul>
      <div className="nav-actions">
        <div className="search-box hide-mobile">
          <input type="text" placeholder="Search products..." />
          <i className="fas fa-search search-icon"></i>
        </div>
        <button className="btn-search">Search</button>
        <div className="cart-icon">
          <i className="fas fa-shopping-cart"></i>
          <span className="badge">0</span>
        </div>
        <a href="#" className="btn-login">
          <i className="far fa-user"></i> LOGIN
        </a>
        <a href="#" className="btn-register">
          Register
        </a>
      </div>
    </div>
  </nav>
);

const PageHeader = () => (
  <section className="page-header">
    <p className="sub-head">News & Insights</p>
    <h2 className="main-title">Latest Updates</h2>
    <p className="description">
      Stay informed with the latest news, product launches, expert guides,
      company updates and exclusive offers from Dushyant Power Tools.
    </p>
    <div className="title-line"></div>
  </section>
);

const FilterPills = () => {
  const [activeFilter, setActiveFilter] = useState("All Updates");
  const filters = [
    { name: "All Updates", icon: "fa-th-large" },
    { name: "Product News", icon: "fa-newspaper" },
    { name: "Industry Insights", icon: "fa-chart-line" },
    { name: "Company News", icon: "fa-users" },
    { name: "Events", icon: "fa-calendar-alt" },
    { name: "Offers", icon: "fa-tag" },
    { name: "How To Guides", icon: "fa-question-circle" },
  ];

  return (
    <section className="filters container">
      {filters.map((filter) => (
        <button
          key={filter.name}
          className={`pill ${activeFilter === filter.name ? "active" : ""}`}
          onClick={() => setActiveFilter(filter.name)}
        >
          <i className={`fas ${filter.icon}`}></i> {filter.name}
        </button>
      ))}
    </section>
  );
};

const HeroBanner = () => (
  <section className="container hero-section">
    <div className="hero-banner">
      <div className="hero-content">
        <div className="featured-badge">
          <i className="fas fa-star"></i> Featured
        </div>
        <p className="hero-date">26 May, 2025</p>
        <h2 className="hero-title">
          BSC Power Expands Premium Tool Range for Professionals
        </h2>
        <p className="hero-desc">
          We are excited to announce the launch of our new premium tools and
          accessories designed for maximum performance, durability and
          efficiency.
        </p>
        <a href="#" className="btn-hero-read">
          Read More <i className="fas fa-arrow-right"></i>
        </a>
        <div className="hero-dots">
          <div className="dot active"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
      <div className="hero-image">
        <div className="new-arrival-badge">
          NEW
          <br />
          ARRIVAL
        </div>
        <img
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop"
          alt="Power Tools"
        />
      </div>
    </div>
  </section>
);

const PostCard = ({ post }) => {
  const renderCustomImage = () => {
    if (post.image === "graph") {
      return (
        <div className="card-img bg-graph">
          <i className="fas fa-chart-simple"></i>
        </div>
      );
    }
    if (post.image === "milestone") {
      return (
        <div className="card-img dark-box">
          <span className="big-num">500+</span>
          <span className="big-label">DEALERS</span>
          <span className="big-sub">ACROSS INDIA</span>
        </div>
      );
    }
    if (post.image === "offer") {
      return (
        <div className="card-img dark-box-red">
          <span className="big-offer">
            FLAT
            <br />
            <span className="big-20">20%</span>
          </span>
          <span className="big-offer-sub">OFF</span>
        </div>
      );
    }
    return (
      <div className="card-img">
        <img src={post.image} alt={post.title} />
        {post.hasPlayIcon && (
          <div className="play-icon">
            <i className="fas fa-circle-play"></i>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="card">
      <div className="card-text">
        <div>
          <div className={`card-tag ${post.tagColor}`}>
            <i className="fas fa-tag"></i> {post.tag}
          </div>
          <p className="card-date">{post.date}</p>
          <h3 className="card-title">{post.title}</h3>
          <p className="card-desc">{post.desc}</p>
        </div>
        <div className="card-footer">
          <a href="#" className="read-more">
            Read More <i className="fas fa-arrow-right"></i>
          </a>
          <button className="share-btn">
            <i className="fas fa-share-nodes"></i> Share
          </button>
        </div>
      </div>
      {renderCustomImage()}
    </div>
  );
};

const PostGrid = () => (
  <section className="container grid-section">
    <div className="grid-3-cols">
      {postsData.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  </section>
);

const LoadMore = () => (
  <div className="container load-more-wrap">
    <button className="btn-load-more">
      Load More Updates <i className="fas fa-chevron-down"></i>
    </button>
  </div>
);

const Newsletter = () => (
  <section className="container newsletter-wrap">
    <div className="newsletter-box">
      <div className="news-text">
        <div className="bell-icon">
          <i className="fas fa-bell"></i>
        </div>
        <div>
          <h3>Never Miss an Update!</h3>
          <p>
            Subscribe to our newsletter and get the latest updates, offers and
            expert tips straight to your inbox.
          </p>
        </div>
      </div>
      <form className="news-form" onSubmit={(e) => e.preventDefault()}>
        <input type="email" placeholder="Enter your email address" />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  </section>
);

const Features = () => (
  <section className="container features-wrap">
    <div className="feature-box">
      <i className="fas fa-handshake"></i>
      <div>
        <h4>Trusted by Professionals</h4>
        <p>Quality tools for every need</p>
      </div>
    </div>
    <div className="feature-box">
      <i className="fas fa-box-open"></i>
      <div>
        <h4>500+ Products</h4>
        <p>Wide range of power tools</p>
      </div>
    </div>
    <div className="feature-box">
      <i className="fas fa-truck-fast"></i>
      <div>
        <h4>Pan India Delivery</h4>
        <p>Fast & reliable shipping</p>
      </div>
    </div>
    <div className="feature-box">
      <i className="fas fa-headset"></i>
      <div>
        <h4>Expert Support</h4>
        <p>We're here to help you</p>
      </div>
    </div>
  </section>
);

const FloatingButtons = () => (
  <div className="fab-container">
    <a href="#" className="fab fab-whatsapp">
      <i className="fab fa-whatsapp"></i>
    </a>
    <a href="#" className="fab fab-instagram">
      <i className="fab fa-instagram"></i>
    </a>
    <a href="#" className="fab fab-phone">
      <i className="fas fa-phone"></i>
    </a>
  </div>
);

// --- Main App ---
function App() {
  return (
    <div className="App">
      <TopBar />
      <Navbar />
      <PageHeader />
      <FilterPills />
      <HeroBanner />
      <PostGrid />
      <LoadMore />
      <Newsletter />
      <Features />
      <FloatingButtons />
    </div>
  );
}

export default App;
