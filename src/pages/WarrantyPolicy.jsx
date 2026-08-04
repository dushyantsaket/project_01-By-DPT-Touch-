import React from "react";
import PageTemplate from "../components/PageTemplate";

const sections = [
  "Warranty Overview",
  "Claim Eligibility",
  "Claim Process",
  "Exclusions",
  "Service Centers",
  "Repair Timeline",
  "Replacement Policy",
  "Contact",
];

export default function WarrantyPolicy() {
  return (
    <PageTemplate
      title="Warranty Policy"
      sections={sections}
      lastUpdated="2026-08-02"
    />
  );
}
