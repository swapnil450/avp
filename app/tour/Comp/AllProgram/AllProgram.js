import React from "react";
import AccordionTp from "./comp/AccordionTp";
import { Spinner } from "@nextui-org/react";
export default function AllProgram({ tp }) {
  return (
    <>
      {tp.length === 0 ? (
        <>
          <p className="flex justify-center items-center  text-sm font-bold">
            No Data Available ..
          </p>
        </>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center">
          <AccordionTp tp={tp} />
        </div>
      )}
    </>
  );
}
