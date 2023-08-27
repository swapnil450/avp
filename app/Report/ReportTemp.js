"use client";
import ComponentToPrint from "./Comp/ComponentToPrint";
import React from "react";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function ReportTemp({
  AllDocByDate,
  AllChemByDate,
  AllStockByDate,
  cTotal,
  dtotal,
  sTotal,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [size, setSize] = React.useState("full");

  const sizes = ["full"];

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  const genratePdf = () => {
    const doc = new jsPDF("l", "pt", "a4");

    doc.html(document.querySelector("#report"), {
      callback: function (pdf) {
        // Atomaticaly saved By Resume User
        pdf.save("DCR-Report");
        // notification When Fun Call or Download Pdf
        toast.success("🦄 Pdf Downloaded!");
      },
    });
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex flex-row gap-5">
        {sizes.map((size) => (
          <>
            <Button key={size} color="default" onPress={() => handleOpen(size)}>
              View
            </Button>
            <Button
              key={size}
              onClick={genratePdf}
              color="primary"
              onPress={() => handleOpen(size)}
            >
              Download
            </Button>
          </>
        ))}
      </div>
      <Modal
        scrollBehavior={`inside`}
        size={size}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col ga1">
                DCR Report !
              </ModalHeader>
              <ModalBody
                className="flex justify-center items-center"
                id="report"
              >
                <ComponentToPrint
                  AllDocByDate={AllDocByDate}
                  AllChemByDate={AllChemByDate}
                  AllStockByDate={AllStockByDate}
                  cTotal={cTotal}
                  dtotal={dtotal}
                  sTotal={sTotal}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  className="bg-black text-white"
                  variant="dark"
                  onPress={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
