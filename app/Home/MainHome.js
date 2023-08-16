import React from "react";
import ListOfEmp from "./ListOfEmp";
// import AddUserForm from "../FormsInApp/AddUserForm";
import DashInfo from "./DashInfo";
import AddInfo from "./AddInfo/AddInfo";
// import MainTab from "./Tabs/MainTab";

export default function MainHome() {
  const Option = ["BD-Executive", "Area", "Headquarter", "Doctor"];

  return (
    <>
      <div className="flex flex-col justify-center items-center  gap-10   m-2 rounded-lg bordr bordr-1 border-gray-00 mb-24">
        <div>
          <h1 className="font-bold text-xl mt-10 text-gray-600">
            Welcome to Avirosa pharmasuticles !
          </h1>
        </div>
        <DashInfo />
        <AddInfo />
        {/* <MainTab/> */}
        {/* <ListOfEmp /> */}
        {/* <AddUserForm /> */}
      </div>
    </>
  );
}
