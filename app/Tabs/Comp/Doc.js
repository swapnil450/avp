"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  Button,
  TableCell,
} from "@nextui-org/react";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";

import DocEdit from "@/app/Home/AddInfo/Comp/EditDeleteUpdate/EditComp/DocEdit";
export default function ListOfDoc() {
  const { allDoc } = useGlobalContext();

  const user = allDoc.docData;

  console.log(allDoc, "doc");

  if (!user || user.length === 0) {
    return <div>No data available.</div>;
  }

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

  return (
    <>
      <Table aria-label="User data table">
        <TableHeader>
          {columnsToShow.map((columnKey) => (
            <TableColumn key={columnKey}>{columnKey}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {user?.map((item) => (
            <TableRow
              className="p-2 hover:bg-gray-100 cursor-pointer"
              key={item._id}
            >
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
    </>
  );
}
