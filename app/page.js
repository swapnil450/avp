
import React from "react";
import MainCahrt from "./ManageDashboard/Charts/MainCahrt";
import CardsMain from "./ManageDashboard/DashCard/CardsMain";
export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col mt-10 gap-6 items-center">
        <CardsMain />
        <MainCahrt />
      </div>

    </>
  );
}
