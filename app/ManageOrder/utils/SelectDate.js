import { Input } from "@nextui-org/react";
import React from "react";

export default function SelectDate({ date, setDate }) {
  return (
    <div>
      <input
        value={date}
        onChange={(e) =>
          setDate(
            new Date(e.target.value)
              ?.toJSON()
              ?.slice(0, 10)
              ?.split("-")
              ?.reverse()
              ?.join("/")
          )
        }
        type={`date`}
        className="w-[220px] p-3 bg-gray-50 rounded-lg"
      />
    </div>
  );
}
