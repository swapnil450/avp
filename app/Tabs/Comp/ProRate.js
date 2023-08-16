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
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
import EditProdRate from "@/app/Home/AddInfo/Comp/EditDeleteUpdate/EditComp/EditProdAndRate";
export default function ListOfProdRate() {
  const { allProdRate } = useGlobalContext();

  const user = allProdRate?.proRateData || [];


  if (!user || user.length === 0) {
    return <div>No data available.</div>;
  }

  const columnsToShow = [
    "ProductName",
    "Packing",
    "MRP",
    "PTR",
    "PTS",
    "Actions",
  ];

  return (
    <>
      <Table fullWidth={true} aria-label="User data table">
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
                    <EditProdRate key={item?._id} item={item ? item : item} />
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
