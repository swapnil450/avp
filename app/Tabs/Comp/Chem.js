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

<<<<<<< HEAD
  const chem = allChem.chemData;
=======
  const user = allChem?.chemData;
>>>>>>> eb540361390eeef1ff5284aeda21e7f222c04fcf

  if (!chem || chem.length === 0) {
    return <div>No data available.</div>;
  }

<<<<<<< HEAD
=======
  const columnsToShow = [
    "Area",
    "DLNo",
    "GSTNo",
    "address",
    "chemCode",
    "contactPer",
    "chemName",

    "Actions",
  ];

>>>>>>> eb540361390eeef1ff5284aeda21e7f222c04fcf
  return (
    <>
      {chem?.map((itm) => {
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
=======
              {columnsToShow.map((columnKey) => (
                <TableCell
                  className=" hove:text-black hover:font-semibold cursor-pointer"
                  key={columnKey}
                >
                  {columnKey === "Actions" ? (
                    <>
                      <div className="flex flex-row justify-center items-center gap-3">
                        <ChemEdit key={item?._id} item={item ? item : item} />
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
                    </>
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
