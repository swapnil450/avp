import React from "react";
import BootomDtails from "./Comp/BootomDtails";
import ExecutiveInfo from "./Comp/ExecutiveInfo";
import DoctorDetails from "./Comp/DoctorDetails";
import ChemStockDetails from "./Comp/ChemStockDetails";

export default function ReportTemp() {
  return (
    <>
      <div className="m-5 flex flex-col gap- mb-2">
        <ExecutiveInfo />
        <div className="bg-black text-white w-full text-center font-bold p-1 ">
          Doctor Details
        </div>
        <DoctorDetails />
        <div className="bg-black text-white  flex flex-row  gap-[300px] w-full text-center font-bold p-1 ">
          <p>Chemist Details</p>
          <p>Stockiest Details </p>
          <p>Order Details</p>
        </div>
        <ChemStockDetails />
        <BootomDtails />
      </div>
    </>
  );
}
