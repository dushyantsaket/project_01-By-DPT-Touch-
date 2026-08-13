import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckSquare,
  Headphones,
  MapPin,
  Play,
  Quote,
  ShieldCheck,
  Star,
  Target,
  Truck,
  UploadCloud,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import "../styles/BecomeDealer.css";

const steps = [
  {
    id: 1,
    title: "Seller Identity",
    subtitle: "Start with your contact details",
    description:
      "Share your basic business identity and contact information to begin your dealer application.",
    icon: UserPlus,
    fields: [
      { name: "fullName", label: "Full Name", type: "text", required: true },
      { name: "phone", label: "Phone Number", type: "tel", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      {
        name: "shopName",
        label: "Shop / Business Name",
        type: "text",
        required: true,
      },
      {
        name: "dealerType",
        label: "Business Type",
        type: "select",
        placeholder: "Select Business Type",
      },
    ],
  },
  {
    id: 2,
    title: "Verification",
    subtitle: "Share company information",
    description:
      "Submit GST, PAN, and location details so we can verify your business and shipping readiness.",
    icon: CheckSquare,
    fields: [
      { name: "gstNumber", label: "GST Number", type: "text" },
      { name: "panNumber", label: "PAN Number", type: "text" },
      { name: "address", label: "Shop Address", type: "text", required: true },
      { name: "city", label: "City", type: "text" },
      { name: "state", label: "State", type: "text" },
      { name: "pincode", label: "Pincode", type: "text" },
    ],
  },
  {
    id: 3,
    title: "Business Profile",
    subtitle: "Showcase your inventory",
    description:
      "Describe your product mix, brands, and stock capacity so we can match you with ideal buyers.",
    icon: Truck,
    fields: [
      {
        name: "productCategories",
        label: "Product Categories",
        type: "text",
        placeholder: "Power tools, Accessories, Spares",
      },
      {
        name: "currentBrands",
        label: "Current Brands",
        type: "text",
        placeholder: "Bosch, Makita, Dewalt",
      },
      { name: "monthlySales", label: "Monthly Sales Estimate", type: "text" },
      { name: "availableStock", label: "Average Stock Value", type: "text" },
      { name: "deliveryVehicles", label: "Delivery Vehicles", type: "number" },
    ],
  },
  {
    id: 4,
    title: "Launch Plan",
    subtitle: "Complete your financial setup",
    description:
      "Provide bank, marketing and territory information so your store can go live with full support.",
    icon: BarChart3,
    fields: [
      { name: "bankDetails", label: "Bank Account Details", type: "text" },
      { name: "website", label: "Website / Listing URL", type: "text" },
      {
        name: "marketingSupport",
        label: "Marketing Support Needed",
        type: "text",
      },
      { name: "targetTerritory", label: "Target Territory", type: "text" },
    ],
  },
  {
    id: 5,
    title: "Growth Strategy",
    subtitle: "Tell us your plan",
    description:
      "Share your goals and growth ambitions so DPT can assign the right launch and expansion resources.",
    icon: Target,
    fields: [
      {
        name: "growthNotes",
        label: "Growth Plan / Notes",
        type: "textarea",
      },
      {
        name: "expectedMonthlyOrders",
        label: "Expected Monthly Orders",
        type: "text",
      },
    ],
  },
];

const initialForm = {
  fullName: "",
  phone: "",
  email: "",
  shopName: "",
  dealerType: "",
  gstNumber: "",
  panNumber: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  productCategories: "",
  currentBrands: "",
  monthlySales: "",
  availableStock: "",
  deliveryVehicles: "",
  bankDetails: "",
  website: "",
  marketingSupport: "",
  targetTerritory: "",
  growthNotes: "",
  expectedMonthlyOrders: "",
  profileFileName: "",
};

const metrics = [
  { label: "Dealer approvals", value: "1,250+", icon: Users },
  { label: "Partner cities", value: "85", icon: MapPin },
  { label: "Onboarding NPS", value: "4.8/5", icon: Star },
];

const benefits = [
  {
    title: "Verified dealer leads",
    description:
      "Receive qualified buyer requests and business enquiries every week.",
    icon: Users,
  },
  {
    title: "Fulfillment support",
    description: "Access shipping, packaging, and pickup coordination.",
    icon: CheckSquare,
  },
  {
    title: "Growth advisory",
    description: "Dedicated onboarding help, training and promotion.",
    icon: ShieldCheck,
  },
];

const testimonials = [
  {
    quote:
      "DPT helped our store launch on time and gave us visibility into buyers across three nearby cities.",
    author: "Rajesh Kumar",
    role: "Power Tool Dealer, Bhopal",
  },
  {
    quote:
      "The onboarding experience felt premium and the team stayed in touch until our first order shipped.",
    author: "Neha Singh",
    role: "Retail Distributor, Indore",
  },
];

const stepLabels = [
  "Identity",
  "Verification",
  "Business Profile",
  "Launch Plan",
  "Growth Strategy",
];

export default function BecomeDealer() {
  const [activeStep, setActiveStep] = useState(1);
  const [applicationId, setApplicationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [profileFile, setProfileFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const activeStepConfig = useMemo(
    () => steps.find((step) => step.id === activeStep) || steps[0],
    [activeStep],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    setProfileFile(file);
    setForm((prev) => ({ ...prev, profileFileName: file.name }));
  };

  const handleFileInput = (e) => {
    handleFileSelect(e.target.files?.[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files?.[0]);
  };

  const saveDraft = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/dealer-applications/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message || "Unable to save draft");
      }
      setApplicationId(data.data?._id || data.data?.id || null);
      setMessage(data.message || "Draft saved successfully.");
      return data.data;
    } catch (err) {
      setMessage(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleStepSave = async () => {
    if (!form.fullName || !form.phone || !form.email) {
      setMessage("Please complete your primary contact details first.");
      setActiveStep(1);
      return;
    }
    const draft = await saveDraft();
    if (draft) {
      setActiveStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/dealer-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message || "Submission failed");
      }
      setApplicationId(data.data?._id || data.data?.id || null);
      setMessage(
        "Application submitted successfully. Our team will contact you soon.",
      );
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      value: form[field.name] || "",
      onChange: handleChange,
      required: field.required || false,
    };

    if (field.type === "textarea") {
      return (
        <textarea
          {...commonProps}
          rows={4}
          placeholder={field.placeholder || field.label}
        />
      );
    }

    if (field.type === "select") {
      return (
        <select {...commonProps}>
          <option value="">{field.placeholder || field.label}</option>
          <option value="Retail Dealer">Retail Dealer</option>
          <option value="Wholesale Dealer">Wholesale Dealer</option>
          <option value="Distributor">Distributor</option>
          <option value="Service Partner">Service Partner</option>
        </select>
      );
    }

    return (
      <input
        {...commonProps}
        type={field.type}
        placeholder={field.placeholder || field.label}
      />
    );
  };

  return (
    <div className="dealer-page">
      <div className="dealer-bg dealer-bg-left" />
      <div className="dealer-bg dealer-bg-right" />
      <div className="dealer-dots dealer-dots-top" />
      <div className="dealer-dots dealer-dots-bottom" />

      <section className="dealer-shell dealer-hero">
        <div className="dealer-hero-copy">
          <p className="dealer-eyebrow">Premium Dealer Registration</p>
          <h1>
            Become a Trusted <span>DPT</span> Partner and Scale Your Power Tool
            Business.
          </h1>
          <p className="dealer-lead">
            Complete your application with a premium onboarding journey,
            business profile upload, field status updates and dedicated support
            team.
          </p>
          <div className="dealer-proof-grid">
            <article>
              <Zap size={28} />
              <div>
                <small>Fast Approval</small>
                <strong>24-48 hour response</strong>
              </div>
            </article>
            <article>
              <Headphones size={28} />
              <div>
                <small>Dedicated Support</small>
                <strong>Onboarding every step</strong>
              </div>
            </article>
          </div>
        </div>

        <div className="dealer-video-card">
          <h2>Launch faster with DPT</h2>
          <div className="dealer-video-frame">
            <img src="/images/industrial_hero.png" alt="DPT launch preview" />
            <button type="button" aria-label="Play DPT onboarding video">
              <Play size={28} fill="currentColor" />
            </button>
            <div className="dealer-video-controls">
              <span>0:00 / 0:22</span>
              <span>HD</span>
            </div>
          </div>
        </div>
      </section>

      <section className="dealer-shell dealer-content-grid">
        <main className="dealer-main-stack">
          <section className="dealer-panel dealer-journey">
            <div className="dealer-section-head">
              <div>
                <p className="dealer-eyebrow">Application Journey</p>
                <h2>5-step dealer onboarding built for brands like yours.</h2>
              </div>
              <span className="dealer-step-count">
                {activeStep} of {steps.length}
              </span>
            </div>

            <div className="dealer-step-tabs">
              {steps.map((item) => {
                const Icon = item.icon;
                const isActive = activeStep === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={isActive ? "active" : ""}
                    onClick={() => setActiveStep(item.id)}
                  >
                    <Icon size={24} />
                    <small>Step {item.id}</small>
                    <strong>{item.title}</strong>
                    <span>{item.subtitle}</span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmitApplication} className="dealer-form">
              <div className="dealer-form-head">
                <div>
                  <p className="dealer-eyebrow">{activeStepConfig.title}</p>
                  <h3>{activeStepConfig.subtitle}</h3>
                  <p>{activeStepConfig.description}</p>
                </div>
                <span>{stepLabels[activeStep - 1]}</span>
              </div>

              <div className="dealer-field-grid">
                {activeStepConfig.fields.map((field) => (
                  <label
                    key={field.name}
                    className={field.type === "textarea" ? "wide" : ""}
                  >
                    <span>{field.label}</span>
                    {renderField(field)}
                  </label>
                ))}
              </div>

              <label
                htmlFor="profile-upload"
                className={`dealer-upload ${isDragging ? "dragging" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <UploadCloud size={28} />
                <strong>Upload business profile</strong>
                <span>
                  Drag and drop your profile or select a file to attach. Only
                  image and PDF files are supported.
                </span>
                <input
                  id="profile-upload"
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={handleFileInput}
                />
              </label>

              {profileFile && (
                <p className="dealer-file-name">
                  Selected file: <strong>{profileFile.name}</strong>
                </p>
              )}

              <div className="dealer-form-actions">
                <button
                  type="button"
                  className="dealer-btn secondary"
                  onClick={handleStepSave}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save & Continue"}
                </button>
                <button
                  type="submit"
                  className="dealer-btn primary"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Full Application"}
                </button>
              </div>

              {message && <div className="dealer-alert">{message}</div>}
              {applicationId && (
                <div className="dealer-alert subtle">
                  Application ID: <strong>{applicationId}</strong>
                </div>
              )}
            </form>
          </section>
        </main>

        <aside className="dealer-side-stack">
          <section className="dealer-panel dealer-stats-card">
            <p className="dealer-eyebrow">Trusted Onboarding</p>
            <h2>Verified dealer lifecycle</h2>
            <p>
              We keep your application experience clear, timely and supported
              from start to finish.
            </p>
            <div className="dealer-metrics">
              {metrics.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.label}>
                    <Icon size={28} />
                    <div>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="dealer-panel dealer-benefits-card">
            <p className="dealer-eyebrow">Why Choose DPT</p>
            <h2>Premium benefits for every dealer</h2>
            <div>
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title}>
                    <Icon size={22} />
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="dealer-panel dealer-help-card">
            <p className="dealer-eyebrow">Need Help?</p>
            <h2>Onboarding support</h2>
            <p>
              Our team is ready to answer questions about documentation,
              approval and order onboarding.
            </p>
            <Link to="/contact-support">
              <Headphones size={18} />
              Talk to Support
              <ArrowRight size={18} />
            </Link>
          </section>
        </aside>
      </section>

      <section className="dealer-shell dealer-panel dealer-stories">
        <div className="dealer-section-head">
          <div>
            <p className="dealer-eyebrow">Partner Stories</p>
            <h2>Trusted by dealers across the region</h2>
          </div>
          <div className="dealer-story-arrows">
            <button type="button" aria-label="Previous story">
              <ArrowRight size={16} />
            </button>
            <button type="button" aria-label="Next story">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
        <div className="dealer-story-grid">
          {testimonials.map((item) => (
            <article key={item.author}>
              <Quote size={22} />
              <p>{item.quote}</p>
              <div>
                <span />
                <div>
                  <strong>{item.author}</strong>
                  <small>{item.role}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
