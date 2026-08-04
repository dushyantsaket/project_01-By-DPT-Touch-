// TradeAccount.jsx
import React from "react";

const TradeAccount = () => {
  return (
    <>
      {/* ─── Styles ─── */}
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #ffffff;
            color: #1a1a2e;
            line-height: 1.6;
          }
          .trade-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
          }
          .btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: #1a1a2e;
            color: #fff;
            font-weight: 600;
            font-size: 1rem;
            padding: 14px 34px;
            border-radius: 8px;
            text-decoration: none;
            border: none;
            cursor: pointer;
            transition: background 0.2s, transform 0.15s;
          }
          .btn-primary:hover {
            background: #2d2d4e;
            transform: translateY(-2px);
          }
          .btn-primary i {
            font-size: 0.85rem;
            transition: transform 0.2s;
          }
          .btn-primary:hover i {
            transform: translateX(4px);
          }
          .btn-outline {
            background: transparent;
            color: #1a1a2e;
            border: 2px solid #1a1a2e;
            padding: 12px 32px;
          }
          .btn-outline:hover {
            background: #1a1a2e;
            color: #fff;
          }
          .section-title {
            font-size: 2.2rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            margin-bottom: 0.5rem;
          }
          .section-sub {
            font-size: 1.15rem;
            color: #4a4a6a;
            max-width: 700px;
          }
          .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 28px;
            margin-top: 32px;
          }
          .card {
            background: #f8f9fc;
            border-radius: 16px;
            padding: 28px 24px;
            transition: box-shadow 0.2s, transform 0.15s;
          }
          .card:hover {
            box-shadow: 0 8px 24px rgba(0,0,0,0.04);
            transform: translateY(-4px);
          }
          .card i {
            font-size: 2rem;
            color: #1a1a2e;
            margin-bottom: 16px;
            display: block;
          }
          .card h3 {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 8px;
          }
          .card p {
            color: #4a4a6a;
            font-size: 0.95rem;
          }
          .tag-list {
            display: flex;
            flex-wrap: wrap;
            gap: 12px 20px;
            margin-top: 16px;
          }
          .tag-list li {
            list-style: none;
            font-size: 1rem;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .tag-list li::before {
            content: "•";
            color: #1a1a2e;
            font-weight: 700;
            font-size: 1.4rem;
          }
          .step-group {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 24px;
            margin: 28px 0 16px;
          }
          .step {
            background: #f8f9fc;
            border-radius: 12px;
            padding: 24px 20px;
            text-align: center;
          }
          .step .step-num {
            display: inline-block;
            background: #1a1a2e;
            color: #fff;
            font-weight: 700;
            width: 40px;
            height: 40px;
            line-height: 40px;
            border-radius: 40px;
            margin-bottom: 12px;
          }
          .step h4 {
            font-weight: 600;
            margin-bottom: 6px;
          }
          .step p {
            font-size: 0.9rem;
            color: #4a4a6a;
          }
          .table-wrap {
            overflow-x: auto;
            margin: 28px 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.95rem;
          }
          th, td {
            padding: 14px 16px;
            text-align: left;
            border-bottom: 1px solid #eaeaef;
          }
          th {
            background: #f0f1f5;
            font-weight: 600;
          }
          .check {
            color: #1a1a2e;
            font-weight: 700;
          }
          .cross {
            color: #aaa;
          }
          .faq-item {
            border-bottom: 1px solid #eaeaef;
            padding: 18px 0;
          }
          .faq-item h4 {
            font-weight: 600;
            margin-bottom: 4px;
          }
          .faq-item p {
            color: #4a4a6a;
            margin: 0;
          }
          .hero-cta {
            background: #f8f9fc;
            border-radius: 24px;
            padding: 48px 40px;
            text-align: center;
            margin: 48px 0 32px;
          }
          .hero-cta h2 {
            font-size: 2rem;
            font-weight: 700;
          }
          .hero-cta p {
            font-size: 1.1rem;
            color: #4a4a6a;
            max-width: 600px;
            margin: 12px auto 28px;
          }
          @media (max-width: 640px) {
            .section-title { font-size: 1.8rem; }
            .hero-cta { padding: 32px 20px; }
            .card-grid { grid-template-columns: 1fr; }
          }
        `}
      </style>

      {/* ─── Font Awesome ─── */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />

      <div className="trade-container">
        {/* ─── HERO ─── */}
        <section style={{ padding: "48px 0 24px" }}>
          <h1 className="section-title">Trade Account</h1>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#4a4a6a",
              maxWidth: "700px",
              marginBottom: "24px",
            }}
          >
            Powering Professionals. Supporting Businesses.
          </p>
          <p
            style={{
              maxWidth: "760px",
              marginBottom: "28px",
              fontSize: "1.05rem",
            }}
          >
            Whether you're managing large-scale construction projects, operating
            an industrial workshop, or supplying tools to your customers, our
            Trade Account gives your business access to exclusive pricing,
            dedicated support, and priority service.
          </p>
          <a href="#" className="btn-primary">
            Register as a Trade Partner <i className="fas fa-arrow-right"></i>
          </a>
        </section>

        {/* ─── WHY JOIN ─── */}
        <section style={{ margin: "56px 0" }}>
          <h2 className="section-title">Why Open a Trade Account?</h2>
          <p className="section-sub" style={{ marginBottom: "8px" }}>
            Designed for professionals who purchase power tools regularly.
          </p>
          <div className="card-grid">
            <div className="card">
              <i className="fas fa-tag"></i>
              <h3>Exclusive Trade Pricing</h3>
              <p>
                Business-only prices across power tools, cordless equipment,
                accessories, and machinery.
              </p>
            </div>
            <div className="card">
              <i className="fas fa-cubes"></i>
              <h3>Volume Discounts</h3>
              <p>
                Competitive discounts on bulk purchases, project requirements,
                and repeat orders.
              </p>
            </div>
            <div className="card">
              <i className="fas fa-user-tie"></i>
              <h3>Dedicated Account Management</h3>
              <p>
                Work with a trade specialist who understands your business and
                provides expert guidance.
              </p>
            </div>
            <div className="card">
              <i className="fas fa-clock"></i>
              <h3>Priority Order Processing</h3>
              <p>
                Faster quotation approvals, order confirmation, and dispatch to
                keep projects on track.
              </p>
            </div>
            <div className="card">
              <i className="fas fa-file-invoice"></i>
              <h3>Project-Based Quotations</h3>
              <p>
                Customized pricing for commercial projects, government tenders,
                and industrial contracts.
              </p>
            </div>
            <div className="card">
              <i className="fas fa-hand-holding-usd"></i>
              <h3>Flexible Business Payments</h3>
              <p>
                Eligible businesses may access credit facilities and flexible
                payment solutions.
              </p>
            </div>
            <div className="card">
              <i className="fas fa-check-circle"></i>
              <h3>Genuine Products</h3>
              <p>
                Every product is backed by manufacturer warranty and after‑sales
                support.
              </p>
            </div>
          </div>
        </section>

        {/* ─── WHO CAN APPLY ─── */}
        <section style={{ margin: "56px 0" }}>
          <h2 className="section-title">Who Can Become a Trade Partner?</h2>
          <p className="section-sub">
            Tailored for professionals and businesses, including:
          </p>
          <ul className="tag-list">
            <li>Construction Companies</li>
            <li>Builders & Developers</li>
            <li>Civil Contractors</li>
            <li>Electrical Contractors</li>
            <li>Plumbing Contractors</li>
            <li>Interior Designers</li>
            <li>Architects</li>
            <li>Industrial Workshops</li>
            <li>Manufacturing Units</li>
            <li>Fabricators</li>
            <li>Carpenters</li>
            <li>Automobile Workshops</li>
            <li>Tool Dealers & Retailers</li>
            <li>Government Departments</li>
            <li>Educational Institutions</li>
            <li>Facility Management Companies</li>
          </ul>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section style={{ margin: "56px 0" }}>
          <h2 className="section-title">How It Works</h2>
          <p className="section-sub">Get started in five simple steps.</p>
          <div className="step-group">
            <div className="step">
              <span className="step-num">1</span>
              <h4>Submit Your Application</h4>
              <p>Complete the online Trade Account registration form.</p>
            </div>
            <div className="step">
              <span className="step-num">2</span>
              <h4>Business Verification</h4>
              <p>Our team reviews your credentials and documents.</p>
            </div>
            <div className="step">
              <span className="step-num">3</span>
              <h4>Account Approval</h4>
              <p>Most applications are processed within 1–2 business days.</p>
            </div>
            <div className="step">
              <span className="step-num">4</span>
              <h4>Start Purchasing</h4>
              <p>
                Access exclusive pricing, bulk discounts, and dedicated support.
              </p>
            </div>
          </div>
          <p style={{ marginTop: "12px", color: "#4a4a6a" }}>
            <i className="fas fa-file-alt" style={{ marginRight: "8px" }}></i>
            <strong>Documents required:</strong> GST Certificate, PAN Card,
            Business Registration, Address Proof, Contact Details.
          </p>
        </section>

        {/* ─── BENEFITS TABLE ─── */}
        <section style={{ margin: "56px 0" }}>
          <h2 className="section-title">Trade Account Benefits</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Standard Customer</th>
                  <th>Trade Partner</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Exclusive Business Pricing</td>
                  <td className="cross">—</td>
                  <td className="check">✔</td>
                </tr>
                <tr>
                  <td>Bulk Purchase Discounts</td>
                  <td>Limited</td>
                  <td className="check">✔</td>
                </tr>
                <tr>
                  <td>Dedicated Account Manager</td>
                  <td className="cross">—</td>
                  <td className="check">✔</td>
                </tr>
                <tr>
                  <td>Project Quotations</td>
                  <td className="cross">—</td>
                  <td className="check">✔</td>
                </tr>
                <tr>
                  <td>Priority Processing</td>
                  <td className="cross">—</td>
                  <td className="check">✔</td>
                </tr>
                <tr>
                  <td>Flexible Payment Terms*</td>
                  <td className="cross">—</td>
                  <td className="check">✔</td>
                </tr>
                <tr>
                  <td>Warranty Support</td>
                  <td className="check">✔</td>
                  <td className="check">✔</td>
                </tr>
                <tr>
                  <td>Fast Nationwide Delivery</td>
                  <td className="check">✔</td>
                  <td className="check">✔</td>
                </tr>
              </tbody>
            </table>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#6a6a8a",
                marginTop: "8px",
              }}
            >
              * Subject to approval.
            </p>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section style={{ margin: "56px 0" }}>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div style={{ maxWidth: "800px" }}>
            <div className="faq-item">
              <h4>Is there any fee to join?</h4>
              <p>No. Registration for a Trade Account is completely free.</p>
            </div>
            <div className="faq-item">
              <h4>How long does approval take?</h4>
              <p>Most applications are reviewed within 1–2 business days.</p>
            </div>
            <div className="faq-item">
              <h4>Can I place bulk orders?</h4>
              <p>
                Yes. Trade partners receive special pricing and dedicated
                support for bulk purchases.
              </p>
            </div>
            <div className="faq-item">
              <h4>Can individuals apply?</h4>
              <p>
                The Trade Account is intended for businesses and professionals
                involved in commercial or project-based purchasing.
              </p>
            </div>
            <div className="faq-item">
              <h4>Do I need a GST number?</h4>
              <p>
                A GST number is recommended for business verification. Other
                documents may also be accepted.
              </p>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <div className="hero-cta">
          <h2>Ready to Become a Trade Partner?</h2>
          <p>
            Join hundreds of professionals who trust us for quality power tools,
            competitive prices, and reliable service.
          </p>
          <a href="#" className="btn-primary">
            Register as a Trade Partner <i className="fas fa-arrow-right"></i>
          </a>
          <div
            style={{
              marginTop: "24px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px 24px",
              fontSize: "0.95rem",
            }}
          >
            <span>✔ Exclusive Trade Pricing</span>
            <span>✔ Bulk Purchase Discounts</span>
            <span>✔ Dedicated Account Manager</span>
            <span>✔ Priority Support</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TradeAccount;
