import { Button } from "@nextui-org/react";
import React from "react";
import moment from "moment";
moment().format();

export default function Approve({ UnActiveProgram }) {
  return (
    <>
      {UnActiveProgram.length === 0 ? (
        <p>No Data Available..</p>
      ) : (
        UnActiveProgram.sort((a, b) => b.createdAt - a.createdAt)?.map(
          (item) => {
            return (
              <>
                <div
                  key={item}
                  className="flex justify-center  items-center rounded-lg shadow-md p-2 max-w-full border-1 border-gray-400 gap-5"
                >
                  <div className="flex flex-row justify-center items-center gap-3">
                    <p className="text-2xl">📝</p>
                    <div className="flex flex-col">
                      <p className="text-[11px] font-semibold">
                        {" "}
                        {moment(item.startDate).format("DD/MM/YYYY")}_to_
                        {moment(item.lastDate).format("DD/MM/YYYY")}
                      </p>
                      <p className="text-[10px] ">{item.area}</p>
                      <p className="text-[10px] ">{item.createdBy}</p>
                    </div>
                  </div>
                  {item.Apv === true ? (
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
                      {/* <ChemEdit key={item?._id} item={item ? item : item} /> */}

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
          }
        )
      )}
    </>
  );
}
