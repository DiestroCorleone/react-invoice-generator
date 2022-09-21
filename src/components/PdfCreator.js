import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function PdfCreator(props) {
  const doc = new jsPDF();

  function exportTable() {
    autoTable(doc, { html: props.id });
    doc.save("export.pdf");
  }

  return <button onClick={exportTable}>Export PDF</button>;
}
