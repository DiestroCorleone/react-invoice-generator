import React from "react";
import { Button } from "react-bootstrap";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function PdfCreator(props) {
  const doc = new jsPDF();

  function exportTable() {
    autoTable(doc, { html: props.id });
    doc.save("export.pdf");
  }

  return <Button onClick={exportTable}>Export PDF</Button>;
}
