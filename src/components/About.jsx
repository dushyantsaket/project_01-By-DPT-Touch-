import React from "react";
import {
  Shield,
  Target,
  Users,
  Award,
  Star,
  MapPin,
  Phone,
  Clock,
  Instagram,
  Globe,
  ChevronRight,
  Package,
  Heart,
  Truck,
  CheckCircle,
  Factory,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

const About = () => {
  const features = [
    {
      title: "Brand Authenticity",
      icon: Shield,
      desc: "Authorized distribution for international industrial brands.",
      number: "01",
    },
    {
      title: "Strategic Logistics",
      icon: Target,
      desc: "Optimized deployment across major industrial hubs.",
      number: "02",
    },
    {
      title: "Technical Experts",
      icon: Users,
      desc: "Certified maintenance teams for comprehensive support.",
      number: "03",
    },
    {
      title: "Premium Quality",
      icon: Award,
      desc: "Rigorous 100% quality check on every procurement.",
      number: "04",
    },
  ];

  const groupCompanies = [
    {
      name: "Dushyant Power Tools",
      tagline: "Industrial Power Tools & Equipment",
      description:
        "Leading supplier of high-performance power tools, industrial equipment, genuine spare parts, and repair services. Trusted by professionals since 1998.",
      stats: [
        { value: "500+", label: "Products" },
        { value: "25+", label: "Brands" },
        { value: "10K+", label: "Customers" },
      ],
      rating: 5.0,
      reviews: 17,
      address: "Gopal Das Rd, Sidhi, Jamodi Khurd, MP 486661",
      phone: "+91 97540 15503",
      hours: "Mon–Sat: 10:00 AM – 8:59 PM",
      social: {
        instagram: "dushyant_power_tools_sidhi",
        email: "info@dushyantpowertools.com",
      },
      image:
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop",
      badge: "⭐ 5.0 Rated",
      madeInIndia: true,
    },
    {
      name: "Dushyant Furniture Mart",
      tagline: "Premium Wooden Furniture",
      description:
        "Since 2009, crafting high-quality wooden furniture for homes and offices. Sofa sets, wooden beds, and custom designs with modern craftsmanship.",
      stats: [
        { value: "1000+", label: "Products" },
        { value: "15+", label: "Years" },
        { value: "500+", label: "Customers" },
      ],
      rating: 4.7,
      reviews: 27,
      address: "45, Jamodi Khurd, Sidhi, MP 486661",
      phone: "+91 93993 57998",
      hours: "Tue–Sun: 7:00 AM – 7:00 PM",
      social: {
        instagram: "dushyant_furniture_mart",
        email: "dushyantfurnituremart@gmail.com",
      },
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
      badge: "⭐ 4.7 Rated",
      madeInIndia: true,
    },
    {
      name: "Dushyant Wooden Beat",
      tagline: "Wooden Beats & Handicrafts",
      description:
        "Specialized in wooden beat manufacturing, traditional handicrafts, and custom wooden components for musical instruments and decor.",
      stats: [
        { value: "200+", label: "Products" },
        { value: "10+", label: "Years" },
        { value: "200+", label: "Customers" },
      ],
      rating: 4.5,
      reviews: 12,
      address: "Sai Garden, New Bus Stand, Sidhi, MP",
      phone: "+91 97540 15503",
      hours: "Mon–Sat: 9:00 AM – 6:00 PM",
      social: {
        instagram: "dushyant_wooden",
        email: "wooden@dushyant.com",
      },
      image:
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&h=400&fit=crop",
      badge: "⭐ 4.5 Rated",
      madeInIndia: true,
    },
  ];

  // CSS styles as a style tag
  const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    ::selection {
      background-color: #dc2626;
      color: white;
    }

    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2) format('woff2');
    }

    body {
      background: #ffffff;
      font-size: 14px;
      line-height: 1.6;
      font-family: "Inter", Arial, Helvetica, sans-serif;
      color: #333333;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    html {
      scroll-behavior: smooth;
      -webkit-text-size-adjust: 100%;
    }

    :root {
      --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      --color-red-50: oklch(97.1% 0.013 17.38);
      --color-red-100: oklch(93.6% 0.032 17.717);
      --color-red-200: oklch(88.5% 0.062 18.334);
      --color-red-300: oklch(80.8% 0.114 19.571);
      --color-red-400: oklch(70.4% 0.191 22.216);
      --color-red-500: oklch(63.7% 0.237 25.331);
      --color-red-600: oklch(57.7% 0.245 27.325);
      --color-red-700: oklch(50.5% 0.213 27.518);
      --color-red-800: oklch(44.4% 0.177 26.899);
      --color-orange-50: oklch(98% 0.016 73.684);
      --color-orange-100: oklch(95.4% 0.038 75.164);
      --color-orange-600: oklch(64.6% 0.222 41.116);
      --color-amber-50: oklch(98.7% 0.022 95.277);
      --color-yellow-400: oklch(85.2% 0.199 91.936);
      --color-yellow-500: oklch(79.5% 0.184 86.047);
      --color-yellow-600: oklch(68.1% 0.162 75.834);
      --color-green-500: oklch(72.3% 0.219 149.579);
      --color-green-600: oklch(62.7% 0.194 149.214);
      --color-blue-50: oklch(97% 0.014 254.604);
      --color-blue-100: oklch(93.2% 0.032 255.585);
      --color-blue-200: oklch(88.2% 0.059 254.128);
      --color-blue-300: oklch(80.9% 0.105 251.813);
      --color-blue-500: oklch(62.3% 0.214 259.815);
      --color-blue-600: oklch(54.6% 0.245 262.881);
      --color-blue-700: oklch(48.8% 0.243 264.376);
      --color-indigo-50: oklch(96.2% 0.018 272.314);
      --color-indigo-700: oklch(45.7% 0.24 277.023);
      --color-indigo-800: oklch(39.8% 0.195 277.366);
      --color-purple-600: oklch(55.8% 0.288 302.321);
      --color-gray-50: oklch(98.5% 0.002 247.839);
      --color-gray-100: oklch(96.7% 0.003 264.542);
      --color-gray-200: oklch(92.8% 0.006 264.531);
      --color-gray-300: oklch(87.2% 0.01 258.338);
      --color-gray-400: oklch(70.7% 0.022 261.325);
      --color-gray-500: oklch(55.1% 0.027 264.364);
      --color-gray-600: oklch(44.6% 0.03 256.802);
      --color-gray-700: oklch(37.3% 0.034 259.733);
      --color-gray-800: oklch(27.8% 0.033 256.848);
      --color-gray-900: oklch(21% 0.034 264.665);
      --color-black: #000;
      --color-white: #fff;
      --spacing: 0.25rem;
      --container-lg: 32rem;
      --container-xl: 36rem;
      --container-2xl: 42rem;
      --container-3xl: 48rem;
      --container-4xl: 56rem;
      --container-5xl: 64rem;
    }
  `;

  return (
    <div className="bg-white" style={{ overflowX: "hidden" }}>
      <style>{styles}</style>

      {/* Hero Section - Industrial Excellence */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504704909762-6d3b8e789ed0?w=1800&h=900&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
            <Factory size={16} className="text-white" />
            <span className="text-sm font-semibold tracking-wider text-white">
              INDUSTRIAL EXCELLENCE
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
            DUSHYANT
            <br />
            <span className="text-red-500">POWER TOOLS</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Powering Progress with Precision – Central India's leading
            industrial procurement partner since 1998
          </p>
        </div>
      </section>

      {/* Core Advantages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
              <TrendingUp size={16} className="text-red-600" />
              <span className="text-sm font-bold text-red-600 tracking-wider">
                WHY CHOOSE US
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              CORE ADVANTAGES
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              What makes us the preferred partner for industrial procurement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-red-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg">
                  {feature.number}
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <feature.icon size={26} className="text-white" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-wide mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Made in India Spotlight */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-white rounded-2xl shadow-lg border border-orange-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <IndianRupee size={32} className="text-orange-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-600" />
                  <span className="text-sm font-bold text-green-600 uppercase tracking-wider">
                    Proudly
                  </span>
                </div>
                <h3 className="text-3xl font-black">100% Made in India</h3>
                <p className="text-gray-600">
                  Supporting local manufacturing and craftsmanship
                </p>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-3xl font-black text-red-600">500+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Products
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-red-600">50+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Brands
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-red-600">10K+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Customers
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Group Companies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full mb-4">
              <Users size={16} className="text-gray-700" />
              <span className="text-sm font-bold text-gray-700 tracking-wider">
                OUR PORTFOLIO
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              GROUP COMPANIES
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Trusted names in power tools, furniture & wooden crafts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groupCompanies.map((company, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={company.image}
                    alt={company.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {company.badge}
                    </span>
                  </div>
                  {company.madeInIndia && (
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <IndianRupee size={12} /> Made in India
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-black uppercase tracking-tight">
                    {company.name}
                  </h3>
                  <p className="text-red-600 text-sm font-semibold mt-1">
                    {company.tagline}
                  </p>
                  <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                    {company.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 mt-5 py-4 border-y border-gray-100">
                    {company.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="text-center">
                        <div className="text-xl font-black text-red-600">
                          {stat.value}
                        </div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wide">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Contact Info */}
                  <div className="mt-4 space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-red-500" />
                      <span>{company.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-red-500" />
                      <span>{company.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-red-500" />
                      <span>{company.hours}</span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                    <div className="flex gap-3">
                      <a
                        href={`https://instagram.com/${company.social.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 rounded-full hover:bg-red-100 transition"
                      >
                        <Instagram
                          size={16}
                          className="text-gray-600 hover:text-red-600"
                        />
                      </a>
                      <a
                        href={`mailto:${company.social.email}`}
                        className="p-2 bg-gray-100 rounded-full hover:bg-red-100 transition"
                      >
                        <Globe
                          size={16}
                          className="text-gray-600 hover:text-red-600"
                        />
                      </a>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        company.address,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Get Directions <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sister Company Spotlight */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 md:p-12 text-white">
                <Heart size={48} className="text-red-300 mb-4" />
                <span className="text-sm font-semibold tracking-wider text-red-200 uppercase">
                  Sister Concern
                </span>
                <h3 className="text-3xl md:text-4xl font-black mt-2">
                  DUSHYANT
                  <br />
                  FURNITURE MART
                </h3>
                <p className="text-red-100 mt-3 leading-relaxed">
                  Since 2009, crafting premium wooden furniture for homes and
                  offices in Sidhi. Quality craftsmanship meets modern design.
                </p>
                <div className="flex gap-6 mt-6">
                  <div>
                    <div className="text-2xl font-black">1000+</div>
                    <div className="text-xs text-red-200">Products</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black">15+</div>
                    <div className="text-xs text-red-200">Years</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black">⭐ 4.8</div>
                    <div className="text-xs text-red-200">Rating</div>
                  </div>
                </div>
                <button className="mt-6 bg-white text-red-600 px-6 py-2 rounded-full text-sm font-bold hover:bg-red-50 transition shadow-lg">
                  View on Instagram →
                </button>
              </div>
              <div className="relative h-64 md:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop"
                  alt="Dushyant Furniture Mart"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA - Office Location */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <MapPin size={40} className="text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-black">Main Office & Showroom</h3>
          <p className="text-gray-400 mt-2">
            Gopal Das Rd, Sidhi, Jamodi Khurd, Madhya Pradesh 486661
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <span className="bg-green-600 px-4 py-1.5 rounded-full text-sm font-medium">
              🟢 Open Today
            </span>
            <span className="bg-yellow-600 text-gray-900 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
              ⭐ 5.0 · 17 Google Reviews
            </span>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Gopal+Das+Rd+Sidhi+Jamodi+Khurd+Madhya+Pradesh+486661"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full text-sm font-semibold transition shadow-lg"
          >
            Get Directions
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
