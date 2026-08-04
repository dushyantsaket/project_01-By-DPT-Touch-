import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  ShieldCheck,
  Truck,
  Shield,
  Building,
  RefreshCcw,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./CompanyPolicies.css";

const policyCards = [
  {
    id: "privacy",
    title: "Privacy Policy",
    description: "We value your privacy and protect your personal information.",
    icon: ShieldCheck,
  },
  {
    id: "quality",
    title: "Quality Policy",
    description:
      "We ensure genuine products, strict quality checks and reliable service.",
    icon: Shield,
  },
  {
    id: "infrastructure",
    title: "Infrastructure Policy",
    description:
      "Details about our infrastructure, service centers and operations.",
    icon: Building,
  },
  {
    id: "shipping",
    title: "Shipping Policy",
    description: "Understand shipping timelines, tracking and delivery areas.",
    icon: Truck,
  },
  {
    id: "returns",
    title: "Return Policy",
    description: "Learn about our returns process, eligibility and refunds.",
    icon: RefreshCcw,
  },
  {
    id: "warranty",
    title: "Warranty Policy",
    description:
      "Information on product warranty, coverage and claims process.",
    icon: FileText,
  },
  {
    id: "terms",
    title: "Terms & Conditions",
    description: "Read our terms, conditions and service agreement details.",
    icon: ChevronDown,
  },
  {
    id: "all",
    title: "All Policies",
    description: "View every policy in one place for complete transparency.",
    icon: FileText,
  },
];

const basePolicyContent = {
  privacy: {
    title: "Privacy Policy",
    body: `At Dushyant Power Tools, we commit to protecting customer privacy. We only collect information necessary to process orders, support requests, and dealer applications. Your personal data is stored securely, shared only with authorized service providers, and never sold to third parties. We use cookies to improve your browsing experience and communicate policy updates to customers through the website and email.`,
  },
  quality: {
    title: "Quality Policy",
    body: `Our quality policy ensures that every product is inspected for genuine parts, performance and durability before it reaches customers. We partner only with trusted brands and vendors, maintain strict warranty controls, and support returns for defective or misbranded items. Continuous improvement is driven by customer feedback, quality audits and skilled service teams across our network.`,
  },
  infrastructure: {
    title: "Infrastructure Policy",
    body: `The Dushyant Power Tools infrastructure includes modern storage facilities, service centers, logistics support and local fulfillment teams. We maintain equipment spaces, inventory management systems, and trained staff to ensure rapid delivery and efficient product handling. Our distribution network is designed to cover Sidhi and surrounding regions with reliability and safety.`,
  },
  shipping: {
    title: "Shipping Policy",
    body: `Shipping timelines vary by location, but we strive to dispatch orders within 24 hours of confirmation. Standard delivery is available across major cities and nearby regions, with tracking updates provided at each stage. Handling charges, shipping priority upgrades, and estimated delivery dates are clearly shown during checkout.`,
  },
  returns: {
    title: "Return Policy",
    body: `Customers may request returns for eligible products within the specified window. Returns are accepted for damaged items, incorrect dispatches and manufacturing defects. The refund process is handled after inspection, and return shipping instructions are shared promptly. Products must be returned in their original packaging with purchase proof where applicable.`,
  },
  warranty: {
    title: "Warranty Policy",
    body: `Warranties are provided on select products as described in the product details. Coverage includes manufacturing defects, functional failures and authorized repairs. Warranty claims must be registered with valid invoice and serial information. Our warranty support team manages approvals, service visits, and replacement or repair decisions transparently.`,
  },
  terms: {
    title: "Terms & Conditions",
    body: `All users agree to our website terms and conditions by accessing products and services. Orders are subject to availability, pricing and applicable taxes. Payments must be completed before delivery, and cancellations are handled according to the policy defined here. By using our site, you accept the rules for returns, warranties, service delivery and dispute resolution under Sidhi jurisdiction.`,
  },
};

const policyContent = {
  ...basePolicyContent,
  all: {
    title: "All Policies",
    body:
      `Below are the complete policy sections for Dushyant Power Tools.\n\n` +
      [
        "privacy",
        "quality",
        "infrastructure",
        "shipping",
        "returns",
        "warranty",
        "terms",
      ]
        .map(
          (key) =>
            `### ${basePolicyContent[key].title}\n${basePolicyContent[key].body}`,
        )
        .join("\n\n"),
  },
};

const faqItems = [
  {
    id: "use-page",
    question: "How do I use this page?",
    answer:
      "Select a policy card and click Read Policy to open the full section below. Use the FAQ items to expand answers and press Download PDF for a copy of all policies.",
  },
  {
    id: "detailed-info",
    question: "Where can I find detailed information about a specific policy?",
    answer:
      "Click the Read Policy button for the specific policy card. The page will display that policy content immediately below the cards.",
  },
  {
    id: "policy-updates",
    question: "How are these policies updated?",
    answer:
      "Policies are reviewed periodically and updated by our team. The last updated date is shown at the top of the page so you always know the most recent revision.",
  },
  {
    id: "contact-queries",
    question: "Who can I contact for policy-related queries?",
    answer:
      "Use the Contact Support button below to reach our team, or visit the Contact Support page for phone, email and direct assistance.",
  },
  {
    id: "customer-applicability",
    question: "Do these policies apply to all customers?",
    answer:
      "Yes, these policies apply to all customers and dealer partners using the website and services, unless otherwise stated in a specific program agreement.",
  },
];

const relatedArticles = [
  {
    title: "Shipping & Delivery Information",
    description: "Understand delivery timeframes, tracking and service zones.",
  },
  {
    title: "Return & Refund Process",
    description: "Learn the return steps, eligibility and refund timing.",
  },
  {
    title: "Warranty Claim Guide",
    description: "Know how to file a warranty claim and support timelines.",
  },
  {
    title: "Terms & Conditions Explained",
    description:
      "Review the terms that govern your purchase and service usage.",
  },
];

const heroImages = [
  "https://www.ingco.com/website-center/upload/images/b6fb6d50bd5b43119093a8efb9304460.webp",
  "https://www.ingco.com/website-center/upload/images/b6fb6d50bd5b43119093a8efb9304460.webp",
  // "https://dongcheng.obs.ap-southeast-1.myhuaweicloud.com/cms/2024/7/27/1724728225802/DCA%E7%BD%91%E9%A1%B5%E8%A7%86%E9%A2%9113%208.19.mp4",
  // "https://dongcheng.obs.ap-southeast-1.myhuaweicloud.com/cms/2025/5/10/1749540301287/video.mp4",
  "https://www.ingco.com/website-center/upload/images/cb9caecbe5d7408caeecc0dbfc5241f0.webp",
  "https://www.ingco.com/website-center/upload/images/229f912480df4c1495fbbca0985ecb4d.webp",
  "https://www.ingco.com/website-center/upload/images/f45808c099d745838a69c2399817c84f.webp",
  "https://www.ingco.com/website-center/upload/images/dac5650e04d64df6844e260660737298.jpg",
  "https://www.ingco.com/website-center/upload/images/dac5650e04d64df6844e260660737298.jpg",
  "https://www.ingco.com/website-center/upload/images/7d143c1060534ee1b37f713828af3226.webp",
];
export default function CompanyPolicies() {
  const [activePolicy, setActivePolicy] = useState("privacy");
  const [activeFaq, setActiveFaq] = useState(null);
  const [showRelated, setShowRelated] = useState(false);
  const [isHeroCardVisible, setIsHeroCardVisible] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);
  const contentRef = useRef(null);

  const activePolicyData = useMemo(
    () => policyContent[activePolicy] || policyContent.privacy,
    [activePolicy],
  );

  const handleCardClick = (id) => {
    setActivePolicy(id);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((index) => (index + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900">
      <div
        className="relative overflow-hidden"
        onClick={() => setIsHeroCardVisible(false)}
        style={{ cursor: isHeroCardVisible ? "pointer" : "default" }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 opacity-60" />
        <img
          src={heroImages[heroIndex]}
          alt="Company policies hero"
          className="h-105 w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setHeroIndex(
                (prev) => (prev - 1 + heroImages.length) % heroImages.length,
              );
            }}
            className="rounded-full bg-white/90 p-3 text-slate-900 shadow-lg transition hover:bg-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setHeroIndex((prev) => (prev + 1) % heroImages.length);
            }}
            className="rounded-full bg-white/90 p-3 text-slate-900 shadow-lg transition hover:bg-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="absolute inset-0 flex items-end justify-center pb-10">
          <div className="flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 shadow-xl backdrop-blur">
            {heroImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setHeroIndex(index)}
                className={`h-3 w-3 rounded-full transition ${heroIndex === index ? "bg-red-600" : "bg-slate-300"}`}
              />
            ))}
          </div>
        </div>
        <div
          className={`policy-hero-card-container ${
            isHeroCardVisible ? "visible" : "hidden"
          }`}
        >
          <div className="policy-hero-card">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-red-600/10 px-4 py-2 text-sm font-semibold text-red-700">
                  <MapPin size={16} /> Sidhi, Madhya Pradesh
                </div>
                <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950">
                  Company Policies
                </h1>
                <p className="mt-3 text-lg text-slate-700">
                  At Dushyant Power Tools, transparency, trust and clarity guide
                  every policy. Click any policy card below to read full details
                  instantly.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  to="/contact-support"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  <Phone size={16} /> Contact Support
                </Link>
                <a
                  href="/company-policies.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-red-500 hover:text-red-600"
                >
                  <FileText size={16} /> Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {policyCards.map((card) => {
                const Icon = card.icon;
                const isActive = activePolicy === card.id;
                return (
                  <div
                    key={card.id}
                    className={`group rounded-3xl border p-6 shadow-sm transition ${isActive ? "border-red-500 bg-red-50 shadow-lg" : "border-slate-200 bg-white hover:shadow-md"}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                          <Icon size={24} />
                        </div>
                      </div>
                      <span
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${isActive ? "bg-red-600 text-white" : "bg-slate-100 text-slate-600"}`}
                      >
                        {card.id === "all"
                          ? "ALL"
                          : card.id.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-slate-950">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {card.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCardClick(card.id)}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition hover:text-red-700"
                    >
                      Read Policy <ArrowRight size={16} />
                    </button>
                  </div>
                );
              })}
            </div>

            <div
              ref={contentRef} // This ref is for scrolling to the policy content, not FAQ
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <h2 className="text-3xl font-semibold text-slate-950">
                {activePolicyData.title}
              </h2>
              <div className="mt-6 space-y-6 text-slate-700">
                {activePolicy === "all" ? (
                  Object.entries(policyContent)
                    .filter(([key]) => key !== "all")
                    .map(([key, section]) => (
                      <div key={key} className="space-y-3">
                        <h3 className="text-2xl font-semibold text-slate-900">
                          {section.title}
                        </h3>
                        <p className="whitespace-pre-line leading-7">
                          {section.body}
                        </p>
                      </div>
                    ))
                ) : (
                  <p className="whitespace-pre-line leading-7">
                    {activePolicyData.body}
                  </p>
                )}
              </div>
            </div>
            {/* FAQ Section */}
            <div className="faq-section">
              <div className="faq-header">
                <div>
                  <h3 className="faq-title">Frequently Asked Questions</h3>
                  <p className="faq-subtitle">
                    Tap any question below to reveal the answer.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveFaq(null)}
                  className="faq-reset-button"
                >
                  Reset FAQ
                </button>
              </div>
              <div className="faq-items-container">
                {faqItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setActiveFaq(
                        (current) => (current === item.id ? null : item.id), // Toggle or set active
                      )
                    }
                    className={`faq-item-button ${activeFaq === item.id ? "active" : ""}`}
                  >
                    <div className="faq-item-header">
                      <span className="faq-item-question">{item.question}</span>
                      <ChevronDown
                        className={`transition ${activeFaq === item.id ? "rotate-180 text-red-600" : "text-slate-500"}`}
                      />
                    </div>
                    {/* Only render the answer if it's the active FAQ item */}
                    {activeFaq === item.id && (
                      <p className="faq-item-answer">{item.answer}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-950">
                    Related Articles
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Explore policy-related articles with one click.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRelated((prev) => !prev)}
                  className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:border-red-500 hover:text-red-600"
                >
                  {showRelated ? "Hide details" : "See more"}
                </button>
              </div>
              {showRelated ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {relatedArticles.map((article) => (
                    <article
                      key={article.title}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <h4 className="font-semibold text-slate-950">
                        {article.title}
                      </h4>
                      <p className="mt-2 text-sm text-slate-600">
                        {article.description}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-6 text-sm text-slate-600">
                  Click See more to expand the full set of related policy
                  articles.
                </div>
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-red-100 text-red-600">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-red-600">
                    Need help?
                  </p>
                  <h3 className="text-2xl font-semibold text-slate-950">
                    Contact Support
                  </h3>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-red-600" />
                  <span>info@dushyantpowertools.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-red-600" />
                  <a
                    href="tel:+919754015503"
                    className="font-semibold text-slate-900"
                  >
                    +91 97540 15503
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-red-600 mt-1" />
                  <span>
                    Gopal Das Rd, Sidhi, Jamodi Khurd, Madhya Pradesh 486661
                  </span>
                </div>
              </div>
              <Link
                to="/contact-support"
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Open Contact Support Page
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-lg">
              <h4 className="text-xl font-semibold">Policy Access</h4>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Use the Read Policy buttons to display a single policy section.
                Choose All Policies to read everything in one long view.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
