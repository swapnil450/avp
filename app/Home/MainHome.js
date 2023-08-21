"use client";
import React from "react";

import DashInfo from "./DashInfo";

export default function MainHome() {
  const Option = ["BD-Executive", "Area", "Headquarter", "Doctor"];
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="flex flex-col justify-center items-center  gap-[60px]   m-2 rounded-lg bordr bordr-1 border-gray-00 mb-24">
        <div>
          <h1 className="font-bold text-sm mt-10 text-gray-600">
            Welcome {user.empName || "User"} !
          </h1>
        </div>
        <DashInfo />
      </div>
    </>
  );
}
