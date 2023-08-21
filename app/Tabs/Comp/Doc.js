"use client";
import React from "react";
<<<<<<< HEAD
import edit from "../../icons/edit.webp";
import del from "../../icons/delete-outline.webp";
=======
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  Button,
  TableCell,
} from "@nextui-org/react";
>>>>>>> eb540361390eeef1ff5284aeda21e7f222c04fcf
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import DocEdit from "@/app/Home/AddInfo/Comp/EditDeleteUpdate/EditComp/DocEdit";
export default function ListOfDoc() {
  const { allDoc } = useGlobalContext();

<<<<<<< HEAD
  const doc = allDoc.docData;
  console.log(doc);
=======
  const user = allDoc.docData;

  console.log(allDoc, "doc");
>>>>>>> eb540361390eeef1ff5284aeda21e7f222c04fcf

  if (!doc || doc.length === 0) {
    return <div>No data available.</div>;
  }

<<<<<<< HEAD
=======
  const columnsToShow = [
    "DoctorCode",
    "DoctorName",
    "HosName",
    "Speciality",
    "Degree",
    "mobile",
    "address",
    "Dob",

    "Area",
    "Actions",
  ];

>>>>>>> eb540361390eeef1ff5284aeda21e7f222c04fcf
  return (
    <>
      {doc?.map((itm) => {
        return (
          <>
            <div
              key={itm}
              className="flex justify-center items-center rounded-lg shadow-md p-3 max-w-full border-1 border-gray-400 gap-5"
            >
<<<<<<< HEAD
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
=======
              {columnsToShow.map((columnKey) => (
                <TableCell
                  className=" hove:text-black hover:font-semibold cursor-pointer"
                  key={columnKey}
                >
                  {columnKey === "Actions" ? (
                    <div className="flex flex-row justify-center items-center gap-3">
                      <DocEdit key={item?._id} item={item ? item : item} />
                      {item?.approved === true ? (
                        <Button color="success" className="text-white">
                          Approved ✅
                        </Button>
                      ) : (
                        <Button color="danger" className="text-white">
                          NotApproved ❌
                        </Button>
                      )}
                    </div>
                  ) : (
                    item[columnKey]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
>>>>>>> eb540361390eeef1ff5284aeda21e7f222c04fcf
    </>
  );
}
