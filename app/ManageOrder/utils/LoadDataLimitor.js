import { Button } from "@nextui-org/react";
import React from "react";
import { toast } from "react-toastify";

export default function LoadDataLimitor({
  last,
  setLast,
  loading,
  GetAllData,
  TotalData,
  DataPerPage,
}) {
  const CallMoreData = (TotalData, setLast, last) => {
    if (last <= TotalData) {
      setLast(Number(last) + Number(DataPerPage));
    } else {
      toast.error("No More Data Available");
    }
  };

  console.log(last, "last");
  return (
    <>
      <div className="flex flex-row gap-10">
        <Button
          onClick={() => CallMoreData(TotalData, setLast, last)}
          size="md"
          className="bg-black text-white"
        >
          Load More
        </Button>
        <Button
          onClick={() => GetAllData(TotalData)}
          size="md"
          className="bg-black text-white"
        >
          {`Get All(${TotalData})`}
        </Button>
      </div>
    </>
  );
}
