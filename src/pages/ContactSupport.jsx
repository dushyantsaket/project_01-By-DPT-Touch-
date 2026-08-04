import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Headset,
  Clock,
} from "lucide-react";

export default function ContactSupport() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="rounded-4xl overflow-hidden bg-white shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_0.8fr]">
            <div className="bg-slate-950 px-8 py-10 text-white sm:px-12">
              <div className="flex items-center gap-3 text-red-400">
                <Headset size={24} />
                <span className="text-sm uppercase tracking-[0.3em]">
                  Customer Support
                </span>
              </div>
              <h1 className="mt-6 text-4xl font-extrabold">
                Get in Touch with Dushyant Power Tools
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
                For policy questions, dealer onboarding or order support, fill
                the form and we will reach out quickly.
              </p>

              <div className="mt-10 space-y-5 text-sm text-slate-300">
                <div className="flex items-start gap-4">
                  <Mail size={20} className="text-red-400" />
                  <div>
                    <p className="font-semibold text-white">Email us</p>
                    <p>info@dushyantpowertools.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone size={20} className="text-red-400" />
                  <div>
                    <p className="font-semibold text-white">Call us</p>
                    <p>+91 97540 15503</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-red-400" />
                  <div>
                    <p className="font-semibold text-white">Visit our office</p>
                    <p>
                      Gopal Das Rd, Sidhi, Jamodi Khurd, Madhya Pradesh 486661
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock size={20} className="text-red-400" />
                  <div>
                    <p className="font-semibold text-white">Business hours</p>
                    <p>Mon–Sat: 10 AM – 9 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-8 py-10 sm:px-12">
              <div className="max-w-xl">
                <h2 className="text-3xl font-semibold text-slate-950">
                  Contact Support
                </h2>
                <p className="mt-3 text-slate-600">
                  Fill the form and we will get back to you via email or phone
                  as soon as possible.
                </p>

                {submitted ? (
                  <div className="mt-8 rounded-3xl border border-green-200 bg-green-50 p-6 text-green-900">
                    <h3 className="text-xl font-semibold">Request submitted</h3>
                    <p className="mt-2">
                      Thank you for contacting us. Our support team will reach
                      you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Name
                        <input
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
                        />
                      </label>
                      <label className="block text-sm font-medium text-slate-700">
                        Email
                        <input
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
                        />
                      </label>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Phone
                        <input
                          name="phone"
                          required
                          value={form.phone}
                          onChange={handleChange}
                          className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
                        />
                      </label>
                      <label className="block text-sm font-medium text-slate-700">
                        Subject
                        <input
                          name="subject"
                          placeholder="Optional"
                          value={form.subject || ""}
                          onChange={handleChange}
                          className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
                        />
                      </label>
                    </div>
                    <label className="block text-sm font-medium text-slate-700">
                      Message
                      <textarea
                        name="message"
                        required
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
                      />
                    </label>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-3xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
