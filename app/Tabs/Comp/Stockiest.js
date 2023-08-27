"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";

import EditStock from "@/app/Home/AddInfo/Comp/EditDeleteUpdate/EditComp/EditStock";

export default function ListOfStock() {
  const { allStockiest } = useGlobalContext();

  const stock = allStockiest.stockData;

  if (!stock || stock.length === 0) {
    return <div>No data available.</div>;
  }

  const user = JSON.parse(localStorage?.getItem("user")) || "admin";
  const CreatedbyUser = stock.filter(
    (i) => i.createdBy === user.userId
  );
  return (
    <>
      {CreatedbyUser.length === 0 ? (
        <p>No Data Available..</p>
      ) : (
        CreatedbyUser?.map((item) => {
          return (
            <>
              <div
                key={item}
                className="flex justify-center  items-center rounded-lg shadow-md p-2 max-w-full border-1 border-gray-400 gap-5"
              >
                <div className="flex flex-row justify-center items-center gap-3">
                  <p className="text-xl">👨‍⚕️</p>
                  <div className="flex flex-col">
                    <p className="text-[11px] font-semibold">{item.Name}</p>
                    <p className="text-[10px] ">{item.Area}</p>
                  </div>
                </div>
                {item.approved === true ? (
                  <Button
                    color="success"
                    size="sm"
                    className="text-white font-semibold "
                  >
                    Approved
                  </Button>
                ) : (
                  <>
                    <EditStock key={item?._id} item={item ? item : item} />
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
