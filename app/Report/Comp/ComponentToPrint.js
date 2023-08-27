import React from "react";
import BootomDtails from "./BootomDtails";
import ExecutiveInfo from "./ExecutiveInfo";
import DoctorDetails from "./DoctorDetails";
import ChemStockDetails from "./ChemStockDetails";
import StockiestDetails from "./StockiestDetails";

export default function ComponentToPrint({
  AllDocByDate,
  AllChemByDate,
  AllStockByDate,
  cTotal,
  dtotal,
  sTotal,
}) {
  return (
    <>
      <div className="w-3/4 m-2 ">
        <div className=" flex flex-col justify-center  ">
          <ExecutiveInfo AllDocByDate={AllDocByDate} />
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
          <BootomDtails cTotal={cTotal} dtotal={dtotal} sTotal={sTotal} />
        </div>
      </div>
    </>
  );
}
