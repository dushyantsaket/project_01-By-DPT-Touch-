import React from "react";
import PageTemplate from "../components/PageTemplate";

const sections = [
  "Write Review",
  "Upload Images",
  "Upload Videos",
  "Star Rating",
  "Sort & Filter",
  "Admin Approval",
  "Backend APIs",
];

export default function Reviews() {
  return (
    <PageTemplate
      title="Reviews"
      sections={sections}
      lastUpdated="2026-08-02"
    />
  );
}
