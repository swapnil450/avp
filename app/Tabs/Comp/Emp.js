import React from "react";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";

import ListOfEmp from "@/app/Home/ListOfEmp";
export default function Emp() {
  const { allEmpData } = useGlobalContext();

  return (
    <>
      <ListOfEmp allEmpData={allEmpData} />
    </>
  );
}
