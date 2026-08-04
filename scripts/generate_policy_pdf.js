import fs from "fs";
import path from "path";

const text = `Dushyant Power Tools Company Policies

Privacy Policy | Quality Policy | Infrastructure Policy | Shipping Policy | Return Policy | Warranty Policy | Terms & Conditions | All Policies

Visit Dushyant Power Tools for details.`;
const escapePDF = (s) =>
  s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
const body = `BT /F1 18 Tf 40 750 Td (${escapePDF(text)}) Tj ET`;
const lines = [
  "%PDF-1.1",
  "1 0 obj<< /Type /Catalog /Pages 2 0 R>>endobj",
  "2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1>>endobj",
  "3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources<< /Font<< /F1 4 0 R >> >> /Contents 5 0 R >>endobj",
  "4 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica>>endobj",
  `5 0 obj<< /Length ${body.length}>>stream\n${body}\nendstream\nendobj`,
];
let pdf = "";
const offsets = [];
for (let i = 0; i < lines.length; i += 1) {
  offsets[i] = pdf.length;
  pdf += `${lines[i]}\n`;
}
const xrefStart = pdf.length;
let xref = `xref\n0 ${lines.length + 1}\n0000000000 65535 f \n`;
for (let i = 0; i < lines.length; i += 1) {
  xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
const trailer = `trailer<< /Size ${lines.length + 1} /Root 1 0 R>>\nstartxref\n${xrefStart}\n%%EOF\n`;
pdf += xref + trailer;
const outPath = path.resolve(path.join("public", "company-policies.pdf"));
fs.writeFileSync(outPath, pdf, "binary");
console.log("wrote", outPath);
