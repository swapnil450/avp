"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import ChemEdit from "@/app/Home/AddInfo/Comp/EditDeleteUpdate/EditComp/ChemEdit";
import doc from "../../img/doc.webp";
export default function ListOfChem() {
  const { allChem } = useGlobalContext();

  const chem = allChem.chemData;

  if (!chem || chem.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <>
      {chem?.map((itm) => {
        return (
          <>
            <div
              key={itm}
              className="flex justify-center items-center rounded-lg shadow-md p-3 max-w-full border-1 border-gray-400 gap-5"
            >
              <div className="flex flex-row justify-center items-center gap-3">
                <p className="text-xl">👨‍⚕️</p>
                <div className="flex flex-col">
                  <p className="text-xs inline-flex flex-wrap font-semibold">
                    {itm.chemName}
                  </p>
                  <p className="text-xs ">{itm.Area}</p>
                  <p className="text-[10px]">{itm.mobile}</p>
                </div>
              </div>

              <ChemEdit key={itm?._id} item={itm ? itm : itm} />
            </div>
          </>
        );
      })}
    </>
  );
}
