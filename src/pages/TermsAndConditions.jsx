import React from "react";
import PageTemplate from "../components/PageTemplate";

const sections = [
  "General Terms",
  "Eligibility",
  "Orders",
  "Pricing",
  "Payments",
  "Warranty",
  "Product Usage",
  "Liability",
  "Account Suspension",
  "Termination",
  "Legal Jurisdiction",
  "Disputes",
  "Contact",
];

export default function TermsAndConditions() {
  return <PageTemplate title="Terms & Conditions" sections={sections} />;
}
