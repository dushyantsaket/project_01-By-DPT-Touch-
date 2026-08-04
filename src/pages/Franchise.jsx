import React from "react";
import PageTemplate from "../components/PageTemplate";

const sections = [
  "Franchise Application",
  "Personal Info",
  "Business Info",
  "Investment",
  "Location Photos",
  "Financials",
  "Documents",
  "Admin Approval",
];

export default function Franchise() {
  return (
    <PageTemplate
      title="Franchise"
      sections={sections}
      lastUpdated="2026-08-02"
    />
  );
}
