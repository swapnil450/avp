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

export default function TourAp() {
  const { allChem, user } = useGlobalContext();

  const chem = allChem.chemData;

  if (!chem || chem.length === 0) {
    return <div>No data available.</div>;
  }
  const CreatedbyUser = chem.filter(
    (i) => i.createdBy === user.userId && i.approved === false
  );

  return (
    <>
      {CreatedbyUser.length === 0 ? (
        <p>No Data Available..</p>
      ) : (
        CreatedbyUser.sort((a, b) => b.createdAt - a.createdAt)?.map((item) => {
          return (
            <>
              <div
                key={item}
                className="flex justify-center  items-center rounded-lg shadow-md p-2 max-w-full border-1 border-gray-400 gap-5"
              >
                <div className="flex flex-row justify-center items-center gap-3">
                  <p className="text-xl">👨‍⚕️</p>
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold">{item.chemName}</p>
                    <p className="text-xs ">{item.Area}</p>
                  </div>
                </div>
                {item.approved === true ? (
                  <>
                    <Button
                      color="success"
                      size="sm"
                      className="text-white font-semibold "
                    >
                      Approved
                    </Button>
                  </>
                ) : (
                  <>
                    <ChemEdit key={item?._id} item={item ? item : item} />

                    <Button
                      color="danger"
                      size="sm"
                      className="text-white font-semibold "
                    >
                      UnApproved
                    </Button>
                  </>
                )}
              </div>
            </>
          );
        })
      )}
    </>
  );
}
