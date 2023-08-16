"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import EmpEdit from "./AddInfo/Comp/EditDeleteUpdate/EditComp/EmpEdit";
export default function ListOfEmp({ allEmpData }) {
  const user = allEmpData.userData;

  if (!user || user.length === 0) {
    return <div>No data available.</div>;
  }

  const columnsToShow = [
    "Code",
    "empName",
    "post",
    "mobile1",
    "email",
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
                    <EmpEdit key={item._id} item={item ? item : item} />
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
