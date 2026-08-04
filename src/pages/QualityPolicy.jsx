import React from "react";
import PageTemplate from "../components/PageTemplate";

const sections = [
  "Raw Material",
  "Manufacturing",
  "Testing",
  "Inspection",
  "Packaging",
  "Customer Satisfaction",
  "Continuous Improvement",
  "ISO Standards",
];

export default function QualityPolicy() {
  return (
    <PageTemplate
      title="Quality Policy"
      sections={sections}
      lastUpdated="2026-08-02"
    />
  );
}
