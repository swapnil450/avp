import ListOfEmp from "@/app/Home/ListOfEmp";
import React from "react";
import Head from "next/head";
import ReportTemp from "../ReportTemplate/ReportTemp";
export default function page() {
  return (
    <>
      <div className="flex flex-col gap-10 justify-center items-center w-auto m-2 rounded-lg border border-1 border-gray-300 mb-24">
        {/* <ListOfEmp /> */}

        <ReportTemp />
      </div>
    </>
  );
}
