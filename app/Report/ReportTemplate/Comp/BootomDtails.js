import React from "react";

export default function BootomDtails() {
  return (
    <>
      <div className="flex flex-row gap-4 justify-start border border-black  ">
        <div className="flex flex-col justify-center p-1 gap-1">
          <h1 className="bg-black p-1 text-white mb-1">DCR COUNTER</h1>
          <p className="text-sm font-semibold ">TODAY DOCTORS CALLS : 1 </p>
          <p className="text-sm font-semibold ">CUMMULATIVE DR CALLS : 1  </p>
          <p className="text-sm font-semibold ">TODAT CHEMIST CALLS : 1 </p>
          <p className="text-sm font-semibold ">CUMMULATIVE CHEMIST CALLS : 1 </p>
          <p className="text-sm font-semibold ">TODAY STOCKIEST CALLS :1 </p>
          <p className="text-sm font-semibold ">
            CUMMULATIVE STOCKIEST CALLS :{" "}
          </p>
        </div>
        <div className="flex flex-col gap-1 p-1">
          <h1 className="bg-black p-1 text-white mb-1">POB COUNTER</h1>
          <p className="text-sm font-semibold ">TODAY CHEMIST POB :1 </p>
          <p className="text-sm font-semibold ">CUMMULATIVE CHEMIST POB :1 </p>
          <p className="text-sm font-semibold ">TODAY COLLECTION :1 </p>
          <p className="text-sm font-semibold ">CUMMULATIVE COLLECTION :1 </p>
          <p className="text-sm mt-2 font-semibold ">SIGNATURE : c.s.chaudhari </p>
        </div>

        <div className="flex flex-col gap-1 p-1 ">
          <h1 className="bg-black p-1 text-white">MANAGER REMARK AREA</h1>
        </div>
      </div>
    </>
  );
}
