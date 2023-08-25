import React from "react";
import AccordionTp from "./comp/AccordionTp";

export default function AllProgram({ tp }) {
  return (
    <>
      {tp.length === 0 ? (
        <p className="flex justify-center items-center  text-sm font-bold">
          No Data Available ..
        </p>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center">
          <AccordionTp tp={tp} />
        </div>
      )}
    </>
  );
}
