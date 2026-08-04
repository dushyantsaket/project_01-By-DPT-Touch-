import React from "react";
import PageTemplate from "../components/PageTemplate";

const sections = [
  "Return Window",
  "Cancellation Rules",
  "Refund Timeline",
  "Damaged Products",
  "Replacement",
  "Exchange",
  "Non Returnable Products",
  "Refund Status Tracking",
  "FAQs",
];

export default function CancellationReturnPolicy() {
  return (
    <PageTemplate
      title="Cancellation & Return Policy"
      sections={sections}
      lastUpdated="2026-08-02"
    />
  );
}
