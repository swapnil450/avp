import React from "react";
import dcr from "../img/dcr.webp";
import doc from "../img/doc.webp";
import med from "../img/med.webp";
import shop from "../img/shop.webp";
import reports from "../../public/report.webp";
import tour from "../../public/tour.webp";
import Link from "next/link";
import Image from "next/image";
import AddDoctorModal from "./AddInfo/Comp/AddDoctorModal";
import AddChemist from "./AddInfo/Comp/AddChemModal";
import AddStockiest from "./AddInfo/Comp/AddStockiest";
import AddTour from "./AddInfo/Comp/AddTour";
export default function DashInfo() {
  const Option = [
    { name: "Tour", icon: tour, link: "/tour" },
    { name: "DCR", icon: dcr, link: "/dcr" },
    { name: "+Doctor", icon: doc, link: "/" },
    { name: "+Chemist", icon: med, link: "/" },
    { name: "+Stockiest", icon: shop, link: "/" },
    { name: "Reports", icon: reports, link: "/Reports" },
  ];

  return (
    <>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-10">
        <div className="flex items-center justify-center p-4 bg-white shadow rounded-lg">
          <div className="flex flex-col gap-1 justify-center items-center">
            <AddTour />
          </div>
        </div>
        <div className="flex items-center justify-center p-4 bg-white shadow rounded-lg">
          <div className="flex flex-col gap-1 justify-center items-center">
            <AddDoctorModal />
          </div>
        </div>

        <div className="flex items-center justify-center p-4 bg-white shadow rounded-lg">
          <AddChemist />
        </div>

        <div className="flex items-center justify-center p-4 bg-white shadow rounded-lg">
          <div className="flex flex-col gap-1 justify-center items-center">
            <AddStockiest />
          </div>
        </div>

        <Link
          href="/dcr"
          className="flex items-center justify-center p-4 bg-white shadow rounded-lg"
        >
          <div className="flex flex-col gap-1 justify-center items-center">
            <Image
              width={20}
              height={20}
              src={dcr}
              alt="icon"
              className=" cursor-pointer "
            />
            <p color="foreground" className=" text-[12px]">
              dcr
            </p>
          </div>
        </Link>
        <Link
          href="/Reports"
          className="flex items-center justify-center p-4 bg-white shadow rounded-lg"
        >
          <div className="flex flex-col gap-1 justify-center items-center">
            <Image
              width={20}
              alt="icon"
              height={20}
              src={reports}
              className=" cursor-pointer "
            />
            <p color="foreground" className=" text-[12px]">
              Reports
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
