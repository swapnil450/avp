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

  if (!doc || doc.length === 0) {
    return <div>No data available.</div>;
  }
  const user = JSON.parse(localStorage?.getItem("user")) || "admin";
  const CreatedbyUser = doc.filter(
    (i) => i.createdBy === user.userId && i.approved === false
  );

  return (
    <>
      {CreatedbyUser.length === 0 ? (
        <p>No Data Available ..</p>
      ) : (
        CreatedbyUser?.map((item) => {
          return (
            <>
              <div
                key={item}
                className="flex justify-center  items-center rounded-lg shadow-md p-2 max-w-full border-1 border-gray-400 gap-5"
              >
                <div className="flex flex-row justify-center items-center gap-3">
                  <p className="text-xl">👨‍⚕️</p>
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold">{item.DoctorName}</p>
                    <p className="text-xs ">{item.Area}</p>
                    <p className="text-[10px]">{item.mobile}</p>
                  </div>
                </div>

                {item.approved === true ? (
                  <Button
                    color="success"
                    size="sm"
                    className="text-white font-semibold "
                  >
                    Approved
                  </Button>
                ) : (
                  <>
                    <DocEdit key={item?._id} item={item ? item : item} />
                    <Button
                      color="danger"
                      size="sm"
                      className="text-white font-semibold "
                    >
                      UnApproved
                    </Button>
                  </>
                )}
                {/* <DocEdit key={item?._id} item={item ? item : item} /> */}
              </div>
            </>
          );
        })
      )}
    </>
  );
}
