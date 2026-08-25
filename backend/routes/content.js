import express from "express";
const router = express.Router();

const pdfs = [
  {
    id: "catalog",
    title: "Product Catalogue",
    description: "Download the latest Dushyant Power Tools product catalogue.",
    url: "https://example.com/catalogue.pdf",
    fileName: "DPT_Product_Catalogue.pdf",
  },
  {
    id: "warranty",
    title: "Warranty Guide",
    description: "Understand warranty coverage and support procedures.",
    url: "https://example.com/warranty-guide.pdf",
    fileName: "DPT_Warranty_Guide.pdf",
  },
  {
    id: "manual",
    title: "User Manual",
    description:
      "Download the user manual for product operation and maintenance.",
    url: "https://example.com/user-manual.pdf",
    fileName: "DPT_User_Manual.pdf",
  },
  {
    id: "safety",
    title: "Safety Guide",
    description: "Learn the safety best practices for power tool usage.",
    url: "https://example.com/safety-guide.pdf",
    fileName: "DPT_Safety_Guide.pdf",
  },
];

const faqs = [
  {
    id: "faq-1",
    question: "How can I submit a review?",
    answer:
      "Fill the form on this page, add product details, upload media, and submit. Guest reviews are queued for admin approval.",
  },
  {
    id: "faq-2",
    question: "Can I upload both images and videos?",
    answer:
      "Yes — the review form supports multiple image and video uploads with previews before submission.",
  },
  {
    id: "faq-3",
    question: "How long does approval take?",
    answer:
      "Guest reviews are typically reviewed within 24-48 hours, after which they appear publicly on the site.",
  },
  {
    id: "faq-4",
    question: "How do I report a review?",
    answer:
      "Click the report button on the review card and choose the reason. Reports are stored and reviewed by the admin team.",
  },
];

const articles = [
  {
    id: "article-1",
    title: "How to choose the right power tool",
    description:
      "A complete guide to matching tools to your project, material and budget.",
    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&q=80",
    url: "/latest-news/choose-power-tool",
  },
  {
    id: "article-2",
    title: "Tool safety tips for every workshop",
    description:
      "Read expert safety protocols for professional and home tool use.",
    thumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
    url: "/latest-news/tool-safety-tips",
  },
  {
    id: "article-3",
    title: "Maximizing tool life with proper maintenance",
    description:
      "Learn how regular maintenance saves money and keeps equipment running longer.",
    thumbnail:
      "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?w=600&q=80",
    url: "/latest-news/tool-maintenance-guide",
  },
];

const support = {
  phone: "+91 97540 15503",
  whatsapp: "+91 97540 15503",
  email: "support@dushyantpowertools.com",
  chatUrl: "https://wa.me/919754015503",
  hours: "Mon - Sat: 9:00 AM - 6:00 PM",
};

router.get("/pdfs", (_req, res) => {
  res.json({ success: true, pdfs });
});

router.get("/faqs", (_req, res) => {
  res.json({ success: true, faqs });
});

router.get("/articles", (_req, res) => {
  res.json({ success: true, articles });
});

router.get("/support", (_req, res) => {
  res.json({ success: true, support });
});

export default router;
