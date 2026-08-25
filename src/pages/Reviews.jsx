import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CalendarDays,
  ChevronDown,
  Download,
  Eye,
  FileText,
  Flag,
  HelpCircle,
  ImagePlus,
  MessageCircle,
  Phone,
  Play,
  RefreshCw,
  Search,
  Send,
  Star,
  ThumbsUp,
  Upload,
  UserRound,
  Users,
} from "lucide-react";
import "./Reviews.css";

const API_BASE = "/api";
const productOptions = [
  "DPT Rotary Hammer Drill 26mm",
  "DPT Angle Grinder 1100W",
  "DPT Impact Drill 13mm",
  "DPT Cordless Drill Kit",
  "DPT Marble Cutter",
];

const emptyForm = {
  productName: "",
  fullName: "",
  email: "",
  phone: "",
  city: "",
  purchaseDate: "",
  dealerName: "",
  rating: 0,
  reviewTitle: "",
  reviewDescription: "",
  acceptTerms: false,
};

const fallbackContent = {
  faqs: [],
  articles: [],
  pdfs: [],
  support: {
    phone: "+91 97540 15503",
    email: "support@dushyantpowertools.com",
    chatUrl: "https://wa.me/919754015503",
    hours: "Mon - Sat 9:00 AM - 6:00 PM",
  },
};

const fetchReviews = async ({ queryKey }) => {
  const [, params] = queryKey;
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/reviews?${query}`);
  if (!res.ok) throw new Error("Unable to load reviews");
  return res.json();
};

const fetchContent = async () => {
  const [faqsRes, articlesRes, pdfsRes, supportRes] = await Promise.all([
    fetch(`${API_BASE}/content/faqs`),
    fetch(`${API_BASE}/content/articles`),
    fetch(`${API_BASE}/content/pdfs`),
    fetch(`${API_BASE}/content/support`),
  ]);

  const [faqs, articles, pdfs, support] = await Promise.all([
    faqsRes.json(),
    articlesRes.json(),
    pdfsRes.json(),
    supportRes.json(),
  ]);

  return {
    faqs: faqs.faqs || [],
    articles: articles.articles || [],
    pdfs: pdfs.pdfs || [],
    support: support.support || fallbackContent.support,
  };
};

const formatNumber = (value) => Number(value || 0).toLocaleString("en-IN");

const getReviewName = (review) =>
  review.fullName || review.userName || "Guest Customer";
const getReviewText = (review) =>
  review.reviewDescription || review.comment || "";
const getReviewTitle = (review) =>
  review.reviewTitle || review.title || "Customer Review";
const getReviewDate = (date) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date || Date.now()));

const Stars = ({ value = 0, interactive = false, onChange }) => (
  <div className="review-stars" aria-label={`${value} star rating`}>
    {[1, 2, 3, 4, 5].map((star) => {
      const active = star <= Number(value);
      if (interactive) {
        return (
          <button
            className={`review-star-btn ${active ? "is-active" : ""}`}
            key={star}
            type="button"
            onClick={() => onChange(star)}
            aria-label={`${star} stars`}
          >
            <Star size={24} fill={active ? "currentColor" : "none"} />
          </button>
        );
      }
      return (
        <Star
          key={star}
          size={18}
          fill={active ? "currentColor" : "none"}
          className={active ? "is-active" : ""}
        />
      );
    })}
  </div>
);

const UploadBox = ({
  id,
  label,
  hint,
  accept,
  multiple,
  files,
  onFiles,
  icon: Icon,
}) => {
  const handleFiles = (selectedFiles) => {
    onFiles(Array.from(selectedFiles || []));
  };

  return (
    <div
      className="upload-box"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        handleFiles(event.dataTransfer.files);
      }}
    >
      <input
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(event) => handleFiles(event.target.files)}
      />
      <label htmlFor={id}>
        <Icon size={22} />
        <span>{label}</span>
        <small>{hint}</small>
      </label>
      {files.length > 0 && (
        <div className="upload-preview-list">
          {files.map((file, index) => {
            const url = URL.createObjectURL(file);
            return (
              <div className="upload-preview" key={`${file.name}-${index}`}>
                {file.type.startsWith("video/") ? (
                  <video src={url} muted />
                ) : (
                  <img src={url} alt={file.name} />
                )}
                <span>{file.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ReviewCard = ({ review, onHelpful, onReport }) => {
  const initials = getReviewName(review)
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const images = review.images || [];
  const videos = review.videos || [];

  return (
    <article className="review-card">
      <div className="review-card__profile">
        <div className="review-avatar">
          {initials || <UserRound size={18} />}
        </div>
        <div>
          <div className="review-card__name-row">
            <strong>{getReviewName(review)}</strong>
            <span>
              {review.isVerifiedPurchase ? "Verified Buyer" : "Guest Review"}
            </span>
          </div>
          <p>{review.city || "India"}</p>
          <small>
            Purchased: {review.productName || "Dushyant Power Tool"}
          </small>
        </div>
        <time>{getReviewDate(review.createdAt)}</time>
      </div>

      <div className="review-card__body">
        <Stars value={review.rating} />
        <h3>{getReviewTitle(review)}</h3>
        <p>{getReviewText(review)}</p>
        {(images.length > 0 || videos.length > 0) && (
          <div className="review-media-grid">
            {images.slice(0, 4).map((image, index) => (
              <img
                key={`${image}-${index}`}
                src={image}
                alt={`${getReviewName(review)} upload ${index + 1}`}
              />
            ))}
            {videos.slice(0, 2).map((video, index) => (
              <div className="review-video-thumb" key={`${video}-${index}`}>
                <video src={video} />
                <Play size={18} fill="currentColor" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="review-card__actions">
        <button
          type="button"
          onClick={() => onHelpful(review.id || review._id)}
        >
          <ThumbsUp size={16} /> Helpful ({review.helpful || 0})
        </button>
        <button type="button">
          <MessageCircle size={16} /> Comment
        </button>
        <button
          type="button"
          className="is-report"
          onClick={() => onReport(review.id || review._id)}
        >
          <Flag size={15} /> Report
        </button>
      </div>
    </article>
  );
};

export default function Reviews() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    search: "",
    sort: "-createdAt",
    rating: "",
  });
  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedBreakdown, setSelectedBreakdown] = useState(null);
  const [status, setStatus] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["reviews", { ...filters, page: 1, limit: 20 }],
    queryFn: fetchReviews,
  });

  const { data: contentData } = useQuery({
    queryKey: ["review-content"],
    queryFn: fetchContent,
  });

  const submitReview = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value),
      );
      images.slice(0, 5).forEach((file) => formData.append("images", file));
      videos.slice(0, 2).forEach((file) => formData.append("videos", file));
      const res = await fetch(`${API_BASE}/reviews`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Review submit failed");
      return res.json();
    },
    onSuccess: () => {
      setForm(emptyForm);
      setImages([]);
      setVideos([]);
      setStatus("Review submitted successfully.");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: () => setStatus("Review submit failed. Please try again."),
  });

  const content = contentData || fallbackContent;
  const reviews = data?.reviews || [];
  const stats = data?.stats || {
    averageRating: 4.8,
    totalReviews: 8540,
    verifiedBuyers: 7200,
    recommendCount: 98,
  };
  const breakdown = data?.ratingBreakdown || [
    { rating: 5, count: 2, reviewers: [] },
    { rating: 4, count: 1, reviewers: [] },
    { rating: 3, count: 0, reviewers: [] },
    { rating: 2, count: 0, reviewers: [] },
    { rating: 1, count: 0, reviewers: [] },
  ];
  const totalBreakdown = Math.max(
    1,
    breakdown.reduce((sum, item) => sum + item.count, 0),
  );
  const activeBreakdown = selectedBreakdown || breakdown[0];
  const galleryImages = useMemo(
    () => reviews.flatMap((review) => review.images || []).slice(0, 8),
    [reviews],
  );

  const updateForm = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.rating || !form.acceptTerms) {
      setStatus("Please select rating and accept terms.");
      return;
    }
    submitReview.mutate();
  };
  const handleHelpful = async (reviewId) => {
    await fetch(`${API_BASE}/reviews/${reviewId}/helpful`, { method: "POST" });
    queryClient.invalidateQueries({ queryKey: ["reviews"] });
  };
  const handleReport = async (reviewId) => {
    await fetch(`${API_BASE}/reviews/${reviewId}/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason: "User report" }),
    });
    setStatus("Report submitted.");
  };

  return (
    <main className="reviews-page">
      <section className="reviews-hero">
        <div
          className="reviews-hero__copy"
          onClick={() => {
            document
              .getElementById("write-review")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="breadcrumb">Home / Reviews</div>
          <h1>
            Customer <span>Reviews & Ratings</span>
          </h1>
          <p>
            Real experiences from real customers. Share your experience and help
            others choose the best.
          </p>
          <div className="reviews-hero__actions">
            <a href="#write-review">
              <Send size={16} /> Write a Review
            </a>
            <a href="#browse-reviews" className="secondary">
              <Eye size={16} /> Browse Reviews
            </a>
          </div>
        </div>
        <div className="reviews-hero__media">
          <div className="hero-stars">
            <Stars value={5} />
            <span>Trusted by thousands of happy customers.</span>
          </div>
          <img
            src="/images/image copy.png"
            alt="Dushyant power tools products"
          />
        </div>
      </section>

      <section className="rating-overview">
        <button
          className="rating-score"
          type="button"
          onClick={() => {
            setFilters((prev) => ({ ...prev, rating: "5" }));
          }}
        >
          <strong>{Number(stats.averageRating || 0).toFixed(1)}</strong>
          <Stars value={5} />
          <span>Out of 5</span>
          <small>Based on {formatNumber(stats.totalReviews)} reviews</small>
        </button>
        <div className="rating-bars">
          {breakdown.map((item) => {
            const width = Math.max(
              4,
              Math.round((item.count / totalBreakdown) * 100),
            );
            return (
              <button
                key={item.rating}
                type="button"
                className={
                  activeBreakdown?.rating === item.rating ? "is-active" : ""
                }
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    rating: String(item.rating),
                  }));
                }}
              >
                <span>{item.rating} Stars</span>
                <i>
                  <b style={{ width: `${width}%` }} />
                </i>
                <strong>{item.count}</strong>
              </button>
            );
          })}
        </div>
        <div className="rating-kpis">
          <div>
            <MessageCircle size={22} />
            <strong>{formatNumber(stats.totalReviews)}+</strong>
            <span>Total Reviews</span>
          </div>
          <div>
            <Users size={22} />
            <strong>{formatNumber(stats.verifiedBuyers)}+</strong>
            <span>Verified Buyers</span>
          </div>
          <div>
            <ThumbsUp size={22} />
            <strong>{stats.recommendCount}%</strong>
            <span>Recommend</span>
          </div>
          <div>
            <CalendarDays size={22} />
            <strong>2.1 yrs</strong>
            <span>Avg. Customer</span>
          </div>
        </div>
      </section>

      <section className="rating-details">
        <div>
          <h2>
            {filters.rating ? `${filters.rating}-star` : `All`} reviewer data
          </h2>
          <p>
            Click any rating bar to see who gave that rating from this website.
          </p>
        </div>
        <div className="reviewer-chips">
          {(activeBreakdown?.reviewers || []).length ? (
            activeBreakdown.reviewers.map((reviewer) => (
              <span key={reviewer.id}>
                <UserRound size={14} /> {reviewer.name} - {reviewer.productName}
              </span>
            ))
          ) : (
            <span>No reviewer data yet for this rating.</span>
          )}
        </div>
      </section>

      <section className="reviews-workspace">
        <form
          className="review-form-panel"
          id="write-review"
          onSubmit={handleSubmit}
        >
          <h2>
            <FileText size={20} /> Write a Review
          </h2>
          <label>
            Product Name *
            <select
              value={form.productName}
              onChange={(e) => updateForm("productName", e.target.value)}
              required
            >
              <option value="">Select Product</option>
              {productOptions.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </label>
          <label>
            Your Name *
            <input
              value={form.fullName}
              onChange={(e) => updateForm("fullName", e.target.value)}
              required
              placeholder="Enter your name"
            />
          </label>
          <label>
            Email Address *
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateForm("email", e.target.value)}
              required
              placeholder="Enter your email"
            />
          </label>
          <label>
            Mobile Number *
            <input
              value={form.phone}
              onChange={(e) => updateForm("phone", e.target.value)}
              required
              placeholder="Enter mobile number"
            />
          </label>
          <div className="form-row">
            <label>
              Purchase Date
              <input
                type="date"
                value={form.purchaseDate}
                onChange={(e) => updateForm("purchaseDate", e.target.value)}
              />
            </label>
            <label>
              Dealer Name
              <input
                value={form.dealerName}
                onChange={(e) => updateForm("dealerName", e.target.value)}
                placeholder="Optional"
              />
            </label>
          </div>
          <label>
            City
            <input
              value={form.city}
              onChange={(e) => updateForm("city", e.target.value)}
              placeholder="Your city"
            />
          </label>
          <div className="form-rating">
            <span>Your Rating *</span>
            <Stars
              value={form.rating}
              interactive
              onChange={(rating) => updateForm("rating", rating)}
            />
          </div>
          <label>
            Review Title *
            <input
              value={form.reviewTitle}
              onChange={(e) => updateForm("reviewTitle", e.target.value)}
              required
              placeholder="Summarize your experience"
            />
          </label>
          <label>
            Your Review *
            <textarea
              value={form.reviewDescription}
              onChange={(e) => updateForm("reviewDescription", e.target.value)}
              required
              rows={5}
              placeholder="Write your review here..."
            />
          </label>
          <UploadBox
            id="review-images"
            label="Add Images"
            hint="Drag & drop or choose up to 5 images"
            accept="image/*"
            multiple
            files={images}
            onFiles={(files) => setImages(files.slice(0, 5))}
            icon={ImagePlus}
          />
          <UploadBox
            id="review-videos"
            label="Add Video"
            hint="Drag & drop or choose up to 2 videos"
            accept="video/*"
            multiple
            files={videos}
            onFiles={(files) => setVideos(files.slice(0, 2))}
            icon={Upload}
          />
          <label className="terms-row">
            <input
              type="checkbox"
              checked={form.acceptTerms}
              onChange={(e) => updateForm("acceptTerms", e.target.checked)}
            />
            I agree to the Terms & Conditions
          </label>
          <button
            className="submit-review-btn"
            type="submit"
            disabled={submitReview.isPending}
          >
            <Send size={16} />{" "}
            {submitReview.isPending ? "Submitting..." : "Submit Review"}
          </button>
          {status && <p className="form-status">{status}</p>}
        </form>

        <div className="review-browser-panel" id="browse-reviews">
          <div className="review-toolbar">
            <div className="search-field">
              <Search size={18} />
              <input
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                placeholder="Search reviews..."
              />
            </div>
            <select
              value={filters.sort}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, sort: e.target.value }))
              }
            >
              <option value="-createdAt">Sort by: Newest</option>
              <option value="-rating">Highest Rating</option>
              <option value="rating">Lowest Rating</option>
            </select>
            <button
              type="button"
              onClick={() =>
                setFilters({ search: "", sort: "-createdAt", rating: "" })
              }
            >
              Filter <ChevronDown size={15} />
            </button>
          </div>
          <div className="review-tabs">
            <button
              type="button"
              className={!filters.rating ? "is-active" : ""}
              onClick={() => setFilters((prev) => ({ ...prev, rating: "" }))}
            >
              All Reviews ({formatNumber(stats.totalReviews)})
            </button>
            {breakdown.map((item) => (
              <button
                key={item.rating}
                type="button"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    rating: String(item.rating),
                  }))
                }
              >
                {item.rating} <Star size={13} fill="currentColor" /> (
                {item.count})
              </button>
            ))}
          </div>
          <div className="review-list">
            {isLoading && (
              <div className="review-state">Loading reviews...</div>
            )}
            {isError && (
              <div className="review-state">Unable to load reviews.</div>
            )}
            {!isLoading && !isError && reviews.length === 0 && (
              <div className="review-state">No reviews found.</div>
            )}
            {reviews.map((review) => (
              <ReviewCard
                key={review.id || review._id}
                review={review}
                onHelpful={handleHelpful}
                onReport={handleReport}
              />
            ))}
          </div>
          <button className="load-more-btn" type="button">
            Load More Reviews <RefreshCw size={16} />
          </button>
        </div>
      </section>

      <section className="review-bottom-grid">
        <div>
          <h3>
            <HelpCircle size={18} /> Frequently Asked Questions
          </h3>
          {content.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
        <div>
          <h3>
            <FileText size={18} /> Related Articles
          </h3>
          {content.articles.map((article) => (
            <article className="mini-article" key={article.title}>
              <img src={article.image} alt={article.title} />
              <span>{article.title}</span>
            </article>
          ))}
        </div>
        <div>
          <h3>
            <Download size={18} /> Download PDF
          </h3>
          {content.pdfs.map((pdf) => (
            <a className="pdf-link" href={pdf.url} key={pdf.title}>
              <FileText size={16} />
              <span>
                {pdf.title}
                <small>Download Now</small>
              </span>
              <Download size={16} />
            </a>
          ))}
        </div>
        <div>
          <h3>
            <Phone size={18} /> Contact Support
          </h3>
          <p>We are here to help you.</p>
          <a href={`tel:${content.support.phone}`}>{content.support.phone}</a>
          <a href={`mailto:${content.support.email}`}>
            {content.support.email}
          </a>
          <a href={content.support.chatUrl}>Chat on WhatsApp</a>
          <span>{content.support.hours}</span>
        </div>
      </section>

      {galleryImages.length > 0 && (
        <section
          className="customer-gallery"
          aria-label="Customer uploaded photos"
        >
          {galleryImages.map((image, index) => (
            <img
              src={image}
              alt={`Customer upload ${index + 1}`}
              key={`${image}-${index}`}
            />
          ))}
        </section>
      )}
    </main>
  );
}
