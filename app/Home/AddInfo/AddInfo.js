import React from "react";
import AddChemModal from "./Comp/AddChemModal";
import AddDoctorModal from "./Comp/AddDoctorModal";
import AddEmpModal from "./Comp/AddEmpModal";
import AddArea from "./Comp/AddArea";
import AddHeadQ from "./Comp/AddHeadQ";
import AddRateChart from "./Comp/AddRateChart";
import AddStdFarChart from "./Comp/AddStdFarChart";
import AddProduct from "./Comp/AddProduct";
import AddStockiest from "./Comp/AddStockiest";

export default function AddInfo() {
  return (
    <div className="flex flex-wrap gap-5 justify-center items-center w-3/4">
      <AddEmpModal />
      <AddChemModal />
      <AddDoctorModal />
      <AddStockiest/>
      <AddArea />
      <AddHeadQ />
      {/* <AddRateChart /> */}
      <AddStdFarChart />
      <AddProduct />
    </div>
  );
}
