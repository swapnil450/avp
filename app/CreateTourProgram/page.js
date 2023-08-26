import React from "react";
import CraeteTour from "./Comp/CreateTour";
import ListByDate from "./Comp/ListByDate";
import AddTour from "../Home/AddInfo/Comp/AddTour";

export default function page() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5">
        <AddTour />
        <div className="flex flex-col justify-center gap-6 items-center">
          <ListByDate />
        </div>
      </div>
    </>
  );
}
