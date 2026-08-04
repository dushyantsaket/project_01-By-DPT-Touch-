import React from "react";
import PageTemplate from "../components/PageTemplate";

const sections = [
  "Factory",
  "Warehouse",
  "Manufacturing Units",
  "Machines",
  "Testing Lab",
  "Storage",
  "Dispatch Area",
  "Office",
  "Photos Gallery",
  "Timeline",
  "Certificates",
];

export default function Infrastructure() {
  return (
    <PageTemplate
      title="Infrastructure"
      sections={sections}
      lastUpdated="2026-08-02"
    />
  );
}
