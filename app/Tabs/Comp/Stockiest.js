"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";

import EditStockiest from "@/app/Home/AddInfo/Comp/EditDeleteUpdate/EditComp/EditStock";

export default function ListOfStock() {
  const { allStockiest } = useGlobalContext();

  const stock = allStockiest.stockData;

  if (!stock || stock.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <>
      {stock?.map((itm) => {
        return (
          <>
            <div
              key={itm}
              className="flex justify-center items-center rounded-lg shadow-md p-3 max-w-full border-1 border-gray-400 gap-24"
            >
              <div className="flex flex-row justify-center items-center gap-3">
                <p className="text-xl">👨‍⚕️</p>
                <div className="flex flex-col">
                  <p className="text-xs font-semibold">name</p>
                  <p className="text-xs ">sangmaner</p>
                  <p className="text-[10px]">7387427755</p>
                </div>
              </div>
              <Button
                color="success"
                size="sm"
                className="text-white font-semibold "
              >
                Approved
              </Button>
            </div>
          </>
        );
      })}
    </>
  );
}
