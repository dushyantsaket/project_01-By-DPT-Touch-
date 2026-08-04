import React from "react";
import PageTemplate from "../components/PageTemplate";

const sections = [
  "Orders",
  "Warranty",
  "Shipping",
  "Returns",
  "Payments",
  "Products",
  "Repair",
  "Dealership",
  "Franchise",
  "Technical Issues",
];

export default function FAQ() {
  return (
    <PageTemplate
      title="FAQ / Questions & Answers"
      sections={sections}
      lastUpdated="2026-08-02"
    />
  );
}
