"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import moment from "moment";
moment().format();
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "@nextui-org/react";
export default function ReportTemp({
  AllDocByDate,
  AllChemByDate,
  AllStockByDate,
  dcrID,
  seldate,
}) {
  const sizes = ["full"];

  const start_date = new Date(dcrID?.startDate);
  const end_date = new Date(dcrID?.lastDate);

  const dates = [];

  while (start_date <= end_date) {
    dates.push(moment(start_date).format("DD/MM/YYYY"));
    start_date.setDate(start_date.getDate() + 1);
  }
  const name = dcrID?.createdByName ? dcrID?.createdByName : "-";

  const designation = dcrID?.post;
  const month = dcrID?.month;

  const workWith =
    AllDocByDate === undefined
      ? "-"
      : AllDocByDate[0]?.workWith || "independent";
  const dcrId = dcrID?.DcrId;

  const Dlen = AllDocByDate?.length || "0";
  const clen = AllChemByDate?.length || "0";
  const slen = AllStockByDate?.length || "0";

  const generatePdf = () => {
    const doc = new jsPDF("l", "pt", "a4", false);

    // Add the title
    doc.setFontSize(10);
    // doc.text("", 0, 0);

    // Define table data and headers for each table
    const tables = [
      {
        title: "",
        data: [
          [
            "Name",
            "Date",
            "Designation",
            "Month",
            "Work_With",
            "DCR_ID",
            "Departmental Remark Only",
          ],
          [name, seldate, designation, month, workWith, dcrId, ""],
        ],
        columnStyles: {
          0: { cellWidth: "auto" },
          1: { cellWidth: "auto" },
          2: { cellWidth: "auto" },
          3: { cellWidth: "auto" },
          4: { cellWidth: "auto" },
          5: { cellWidth: "auto" },
          6: { cellWidth: "auto" },
        },
      },
      {
        title: "Doctor Details",
        data: [
          [
            "SR.NO",
            "Code NO",
            "Doctor Name",
            "Qualification",
            "Speciality",
            "Targeted Product",
            "Lit-Y/N",
            "Detail - Y/N",
            "Doctor Specify Commitment in Word",
            "POB",
          ],
          ...AllDocByDate.map((i, index) => [
            index + 1,
            i?.DoctorCode,
            i?.DoctorName,
            i?.Degree,
            i?.Speciality,
            `${i?.P1}, ${i?.P2}`,
            i?.lit,
            i?.Detail,
            i?.Remark || "No Remark",
            i?.Pob?.map(
              (k) =>
                `Product: ${k.Product}, Qnt: ${k.Qnt}, value: ${
                  Number(k.Qnt) * Number(k.value)
                }`
            ).join("\n"),
            // `lat: ${i.lat}, log: ${i.log}`,
          ]),
        ],
        columnStyles: {
          0: { cellWidth: "auto" },
          1: { cellWidth: "auto" },
          2: { cellWidth: "auto" },
          3: { cellWidth: "auto" },
          4: { cellWidth: "auto" },
          5: { cellWidth: "auto" },
          6: { cellWidth: "auto" },
          7: { cellWidth: "auto" },
          8: { cellWidth: "auto" },
          9: { cellWidth: "auto" },
          10: { cellWidth: "auto" },
        },
      },

      {
        title: "Chemist Details",
        data: [
          ["SR.NO", "Code no", "Chemist Name", "POB"],
          ...AllChemByDate.map((i, index) => [
            index + 1,
            i?.chemCode,
            i?.chemName,
            i?.Pob?.map(
              (key) =>
                `Product: ${key.Product}, Qnt: ${key.Qnt}, value: ${
                  Number(key.Qnt) * Number(key.value)
                }`
            ).join("\n"),
            // `lat: ${i.lat}, log: ${i.log}`,
          ]),
        ],
        columnStyles: {
          0: { cellWidth: "auto" },
          1: { cellWidth: "auto" },
          2: { cellWidth: "auto" },
          3: { cellWidth: "auto" },
        },
      },
      {
        title: "Sctockiest Details",
        data: [
          ["SR.NO", "Code no", "Stockiest Name", "Collections", "POB"],
          ...AllStockByDate.map((i, index) => [
            index + 1,
            i?.Code,
            i?.Name,
            i?.Collection,
            i?.Pob?.map(
              (key) =>
                `Product: ${key.Product}, Qnt: ${key.Qnt}, value: ${
                  Number(key.Qnt) * Number(key.value)
                }`
            ).join("\n"),
            // `lat: ${i.lat}, log: ${i.log}`,
          ]),
        ],
        columnStyles: {
          0: { cellWidth: "auto" },
          1: { cellWidth: "auto" },
          2: { cellWidth: "auto" },
          3: { cellWidth: "auto" },
          4: { cellWidth: "auto" },
        },
      },
      {
        title: "",
        data: [
          [
            "DOCTORS CALLS",
            "CHEMIST CALLS",
            "STOCKIEST CALLS",
            "CHEMIST POB",
            "COLLECTION",
            "MANAGER REMARK AREA",
          ],
          [Dlen, clen, slen, "-", "-", "-"],
        ],
        columnStyles: {
          0: { cellWidth: "auto" },
          1: { cellWidth: "auto" },
          2: { cellWidth: "auto" },
          3: { cellWidth: "auto" },
          4: { cellWidth: "auto" },
          5: { cellWidth: "auto" },
        },
      },
    ];

    // Loop through each table and render it in the PDF
    let startY = 100;
    tables.forEach((table) => {
      doc.setFontSize(7);
      // doc.text(table.title, 40, startY);
      // startY += 5;

      doc.autoTable({
        startY,
        head: table.data.slice(0, 1),
        body: table.data.slice(1),
        theme: "grid",
        styles: {
          fontSize: 7,
          textColor: [0, 0, 0],
          lineColor: [0, 0, 0],
          lineWidth: 0.1,
        },
        columnStyles: table.columnStyles,
      });

      startY = doc.autoTable.previous.finalY + 10;
    });

    // Save the PDF
    doc.save(`DCR- ${name}-${seldate}`);

    // Show success notification
    toast.success("🦄 Pdf Downloaded!");
  };

  return (
    <>
      <div className="flex flex-row gap-5">
        {sizes.map((size) => (
          <>
            <div className="flex flex-row  gap-5" key={size}>
              <Button onClick={generatePdf} color="primary">
                Download
              </Button>
            </div>
          </>
        ))}
      </div>

      {/* <div
        id="report"
        className="flex flex-col gap-5 justify-center items-center"
      >
        <div className=" flex flex-col justify-center   max-w-[800px]    h-full">
          <ExecutiveInfo AllDocByDate={AllDocByDate} dcrID={dcrID} />
          <div className="bg-black text-xs text-white w-full  font-semibold  ">
            Doctor Details
          </div>
          <DoctorDetails AllDocByDate={AllDocByDate} />
          <div className="bg-black text-xs text-white w-full font-semibold  ">
            Chemist Details
          </div>
          <ChemStockDetails AllChemByDate={AllChemByDate} />
          <div className="bg-black text-xs text-white w-full  font-semibold  ">
            Stockiest Details
          </div>
          <StockiestDetails AllStockByDate={AllStockByDate} />
          <BootomDtails cTotal={clen} dtotal={Dlen} sTotal={slen} />
        </div>
      </div> */}
    </>
  );
}
