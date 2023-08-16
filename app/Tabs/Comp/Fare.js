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

import EditFarChart from "@/app/Home/AddInfo/Comp/EditDeleteUpdate/EditComp/EditFareChart";

export default function ListOfFare() {
  const { allStdFare } = useGlobalContext();

  const user = allStdFare?.stdfareData || [];


  if (!user || user.length === 0) {
    return <div>No data available.</div>;
  }

  const columnsToShow = [
    "FareName",
    "HeadQuaterName",
    "AreaName",
    "OneWayKM",
    "FarePrice",
    "TravelMode",
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
                    <EditFarChart key={item?._id} item={item ? item : item} />
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
