import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  UserPlus,
  CheckCircle2,
  Store,
  ShoppingBag,
  TrendingUp,
  MapPin,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Register",
    subtitle: "Create your seller account",
    description:
      "Provide your basic contact details and business identity to get started.",
    icon: UserPlus,
    fields: [
      { name: "fullName", label: "Full Name", type: "text", required: true },
      { name: "phone", label: "Phone Number", type: "tel", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      { name: "shopName", label: "Shop / Business Name", type: "text" },
    ],
  },
  {
    id: 2,
    title: "Verify",
    subtitle: "Confirm your identity",
    description:
      "Send OTP and verify your mobile number to secure your seller application.",
    icon: CheckCircle2,
    fields: [
      { name: "gstNumber", label: "GST Number", type: "text" },
      { name: "panNumber", label: "PAN Number", type: "text" },
      { name: "address", label: "Shop Address", type: "text" },
      { name: "city", label: "City", type: "text" },
      { name: "state", label: "State", type: "text" },
      { name: "pincode", label: "Pincode", type: "text" },
    ],
  },
  {
    id: 3,
    title: "Store Setup",
    subtitle: "Prepare your store details",
    description:
      "Add product categories, business goals and shop operations details.",
    icon: Store,
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
      { name: "deliveryVehicles", label: "Delivery Vehicles", type: "number" },
    ],
  },
  {
    id: 4,
    title: "Start Selling",
    subtitle: "Launch your store",
    description:
      "Finalize your bank details and marketing preferences to go live quickly.",
    icon: ShoppingBag,
    fields: [
      { name: "bankDetails", label: "Bank Account Details", type: "text" },
      { name: "salesGoal", label: "First Month Sales Goal", type: "text" },
      {
        name: "marketingSupport",
        label: "Marketing Support Needed",
        type: "text",
        placeholder: "Digital ads, social media, promotions",
      },
    ],
  },
  {
    id: 5,
    title: "Grow Your Business",
    subtitle: "Scale with DPT",
    description:
      "Share your growth plan and connect with our team for support and expansion.",
    icon: TrendingUp,
    fields: [
      { name: "growthNotes", label: "Growth Plan / Notes", type: "textarea" },
    ],
  },
];

const initialForm = {
  fullName: "",
  phone: "",
  email: "",
  shopName: "",
  gstNumber: "",
  panNumber: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  productCategories: "",
  currentBrands: "",
  monthlySales: "",
  deliveryVehicles: "",
  bankDetails: "",
  salesGoal: "",
  marketingSupport: "",
  growthNotes: "",
};

const stepLabels = [
  "Register",
  "Verify",
  "Store Setup",
  "Start Selling",
  "Grow Your Business",
];

export default function BecomeDealer() {
  const [activeStep, setActiveStep] = useState(1);
  const [applicationId, setApplicationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  const activeStepConfig = useMemo(
    () => steps.find((step) => step.id === activeStep) || steps[0],
    [activeStep],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      if (!response.ok)
        throw new Error(data.error || data.message || "Unable to save draft");
      setApplicationId(data.data._id);
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
      if (!response.ok)
        throw new Error(data.error || data.message || "Submission failed");
      setApplicationId(data.data._id);
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
      placeholder: field.placeholder || field.label,
      className:
        "w-full border border-slate-300 rounded-lg px-4 py-3 focus:border-red-600 focus:ring-2 focus:ring-red-100",
      required: field.required || false,
    };
    if (field.type === "textarea") {
      return <textarea {...commonProps} rows={4} />;
    }
    return <input {...commonProps} type={field.type} />;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <section className="rounded-3xl bg-slate-950 text-white overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-6 p-8 lg:p-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-600/15 px-4 py-2 text-sm font-semibold text-red-100 ring-1 ring-red-500/20">
                <MapPin size={18} /> Sidhi, Madhya Pradesh
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-red-300">
                  Partner with DPT
                </p>
                <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
                  Become a Seller & Scale in 5 clear steps
                </h1>
                <p className="mt-4 max-w-xl text-slate-300 text-lg">
                  Submit your application, verify your business, set up your
                  store and start selling power tools across India with a
                  trusted local partner.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900/90 p-5 ring-1 ring-white/10">
                  <p className="text-sm text-slate-400">Fast approval</p>
                  <p className="mt-2 text-xl font-semibold">
                    Complete setup in days
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-900/90 p-5 ring-1 ring-white/10">
                  <p className="text-sm text-slate-400">Support</p>
                  <p className="mt-2 text-xl font-semibold">
                    Dedicated dealer onboarding
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-white">
              <video
                src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/red-maximalist-logistics-service-poster-design-template-8957c3403ca76cb5c250719d81ef19ea_screen.mp4?ts=1718132681"
                controls
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-white">
              <img
                src="/images/login-storefront.jpeg"
                alt="DPT storefront example"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {steps.map((item) => {
                const Icon = item.icon;
                const isActive = activeStep === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveStep(item.id)}
                    className={`group text-left rounded-3xl border p-6 transition shadow-sm hover:border-red-500 hover:shadow-lg ${isActive ? "border-red-500 bg-red-50" : "border-slate-200 bg-white"}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-red-100 text-red-600">
                          <Icon size={24} />
                        </span>
                        <div>
                          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                            Step {item.id}
                          </p>
                          <h3 className="mt-2 text-lg font-semibold text-slate-950">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <span
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${isActive ? "bg-red-600 text-white" : "bg-slate-100 text-slate-700"}`}
                      >
                        {item.id}
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-slate-600">
                      {item.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-600">
                    {activeStepConfig.title}
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-950">
                    {activeStepConfig.subtitle}
                  </h2>
                  <p className="mt-3 text-slate-600">
                    {activeStepConfig.description}
                  </p>
                </div>
                <div className="rounded-3xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {stepLabels[activeStep - 1]}
                </div>
              </div>

              <form onSubmit={handleSubmitApplication} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {activeStepConfig.fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-slate-700"
                      >
                        {field.label}
                      </label>
                      {renderField(field)}
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleStepSave}
                    disabled={loading}
                    className="rounded-3xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-red-500 hover:text-red-600"
                  >
                    {loading ? "Saving..." : "Save & Continue"}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-3xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    {loading ? "Submitting..." : "Submit Full Application"}
                  </button>
                </div>
              </form>

              {message && (
                <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
                  {message}
                </div>
              )}

              {applicationId && (
                <div className="mt-4 rounded-3xl bg-slate-950 px-5 py-4 text-sm text-white">
                  Application ID:{" "}
                  <span className="font-semibold">{applicationId}</span>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg">
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-3xl bg-white/10 p-3">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-red-300">
                    Trust & Security
                  </p>
                  <h3 className="mt-3 text-2xl font-bold">
                    Verified Dealer Onboarding
                  </h3>
                  <p className="mt-3 text-slate-300">
                    Your business is reviewed by DPT admin and verified for
                    quality, compliance, and fulfillment readiness.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 text-slate-950">
                <MapPin size={24} className="text-red-600" />
                <div>
                  <p className="text-sm font-semibold">
                    Dushyant Power Tools Office
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Gopal Das Rd, Sidhi, Jamodi Khurd, Madhya Pradesh 486661
                  </p>
                </div>
              </div>
              <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200">
                <iframe
                  title="Sidhi Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3636.123456789!2d81.8836!3d24.4123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398b2f229a5f4f4f%3A0x1234567890abcdef!2sSidhi%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  width="100%"
                  height="240"
                  className="border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-slate-950">
                Why Dealers Choose DPT
              </h4>
              <ul className="mt-4 space-y-3 text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="rounded-full bg-red-50 p-2 text-red-600">
                    •
                  </span>{" "}
                  Access to ready buyers
                </li>
                <li className="flex items-center gap-3">
                  <span className="rounded-full bg-red-50 p-2 text-red-600">
                    •
                  </span>{" "}
                  Local fulfilment support
                </li>
                <li className="flex items-center gap-3">
                  <span className="rounded-full bg-red-50 p-2 text-red-600">
                    •
                  </span>{" "}
                  Seamless order growth
                </li>
              </ul>
              <Link
                to="/contact-support"
                className="mt-6 inline-flex rounded-3xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Talk to our onboarding team
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
