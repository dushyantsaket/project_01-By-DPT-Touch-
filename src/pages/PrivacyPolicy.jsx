import React from 'react'
import PageTemplate from '../components/PageTemplate'

const sections = [
  'Introduction','Information We Collect','Personal Information','Order Information','Payment Information','Location Information','Cookies','Analytics','Marketing','Third Party Services','How We Use Data','How We Protect Data','Customer Rights','Delete Account','Contact Information'
]

const contentMap = {
  'Introduction': (
    <>
      <p>
        Dushyant Power Tools (“we”, “us”, “our”) operates the website to sell and
        service power tools and related products. This Privacy Policy explains
        how we collect, use, disclose and protect your personal information.
      </p>
    </>
  ),
  'Information We Collect': (
    <>
      <p>We collect data necessary to process orders, provide support and
      improve our services. This includes:</p>
      <ul>
        <li>Account information (name, email, phone)</li>
        <li>Order & shipping details</li>
        <li>Payment metadata (not raw card data)</li>
        <li>Device and usage information</li>
      </ul>
    </>
  ),
  'Personal Information': (
    <>
      <p>
        Personal information includes name, contact, billing and shipping
        addresses, tax/GST details for business customers, and identity
        verification data when required for warranty or dealer onboarding.
      </p>
    </>
  ),
  'Order Information': (
    <>
      <p>Order data (products ordered, quantities, SKU, shipping address,
      tracking) is stored to fulfill purchases and handle post-sale support
      such as returns, warranty and claims.</p>
    </>
  ),
  'Payment Information': (
    <>
      <p>
        We use PCI-compliant payment gateways. We do not store raw card
        numbers on our systems. Gateways provide tokens and transaction IDs we
        associate with your order for refunds and disputes.
      </p>
    </>
  ),
  'Location Information': (
    <>
      <p>We may collect approximate location information for delivery
      estimation and fraud prevention. Precise GPS coordinates are only used
      when you explicitly provide them (e.g., dealer address, store location).
      </p>
    </>
  ),
  'Cookies': (
    <>
      <p>
        We use cookies for session management, analytics and personalization.
        You can control cookie preferences via your browser settings.
      </p>
    </>
  ),
  'Analytics': (
    <>
      <p>We use analytics providers to measure site performance and user
      behaviour. Aggregated data helps us improve product discovery and UX.</p>
    </>
  ),
  'Marketing': (
    <>
      <p>
        With your consent, we may send promotional emails, SMS or offers. You
        can opt-out at any time using the unsubscribe link or account settings.
      </p>
    </>
  ),
  'Third Party Services': (
    <>
      <p>
        We share data with trusted partners: delivery companies, payment
        processors, warranty centres and analytics providers. We never sell
        personal data to third parties.
      </p>
    </>
  ),
  'How We Use Data': (
    <>
      <p>Data is used to process orders, prevent fraud, manage warranties,
      improve service and send transactional communications.</p>
    </>
  ),
  'How We Protect Data': (
    <>
      <p>
        We implement reasonable security measures, including encryption at
        rest and in transit, access controls and audit logs. No system is
        perfectly secure — we maintain incident response procedures.
      </p>
    </>
  ),
  'Customer Rights': (
    <>
      <p>
        You may request access, correction or portability of your personal
        data. To exercise rights, contact our support team at the details
        below. We may verify identity before processing requests.
      </p>
    </>
  ),
  'Delete Account': (
    <>
      <p>
        You can request account deletion. Some order or warranty records may
        be retained for legal, tax or fraud-prevention reasons as permitted by
        law.
      </p>
    </>
  ),
  'Contact Information': (
    <>
      <p>
        For privacy requests contact: dushyantpowertools@gmail.com or call
        +91 97540 15503. Our data protection officer will respond within a
        reasonable timeframe.
      </p>
    </>
  )
}

export default function PrivacyPolicy(){
  return <PageTemplate title="Privacy Policy" sections={sections} lastUpdated="2026-08-02" contentMap={contentMap} />
}
