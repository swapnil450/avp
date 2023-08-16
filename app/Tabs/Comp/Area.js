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


import EditArea from "@/app/Home/AddInfo/Comp/EditDeleteUpdate/EditComp/EditArea";
export default function ListOfArea() {
  const { allArea } = useGlobalContext();

  const user = allArea?.areaData?.data || [];


  if (!user || user.length === 0) {
    return <div>No data available.</div>;
  }

  const columnsToShow = ["AreaName", "Type", "Actions"];

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
                    <EditArea key={item?._id} item={item ? item : item} />
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
