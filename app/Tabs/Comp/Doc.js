"use client";
import React from "react";
import edit from "../../icons/edit.webp";
import del from "../../icons/delete-outline.webp";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import DocEdit from "@/app/Home/AddInfo/Comp/EditDeleteUpdate/EditComp/DocEdit";
export default function ListOfDoc() {
  const { allDoc } = useGlobalContext();

  const doc = allDoc.docData;
  console.log(doc);

  if (!doc || doc.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <>
      {doc?.map((itm) => {
        return (
          <>
            <div
              key={itm}
              className="flex justify-center items-center rounded-lg shadow-md p-3 max-w-full border-1 border-gray-400 gap-5"
            >
              <div className="flex flex-row justify-center items-center gap-3">
                <p className="text-xl">👨‍⚕️</p>
                <div className="flex flex-col">
                  <p className="text-xs font-semibold">{itm.DoctorName}</p>
                  <p className="text-xs ">{itm.Area}</p>
                  <p className="text-[10px]">{itm.mobile}</p>
                </div>
              </div>

              <DocEdit key={itm?._id} item={itm ? itm : itm} />
            </div>
          </>
        );
      })}
    </>
  );
}
