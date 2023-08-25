import React from "react";

export default function BootomDtails() {
  return (
    <>
      <table className="border  border-black text-center">
        <thead>
          <tr>
            <th className="border border-black text-center text-[10px] font-bold text-gray-800 ">
              DOCTORS CALLS
            </th>
            <th className="border border-black text-center text-[10px] font-bold text-gray-800 ">
              CHEMIST CALLS
            </th>
            <th className="border border-black text-center text-[10px] font-bold text-gray-800 ">
              STOCKIEST CALLS
            </th>
            <th className="border border-black text-center text-[10px] font-bold text-gray-800 ">
              CHEMIST POB
            </th>
            <th className="border border-black text-center text-[10px] font-bold text-gray-800 ">
              COLLECTION
            </th>
            <th className="border border-black text-center text-[10px] font-bold text-gray-800 ">
              MANAGER REMARK AREA
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="border border-black  text-[10px]">1</td>
            <td className="border border-black  text-[10px]">34</td>
            <td className="border border-black  text-[10px]">45</td>
            <td className="border border-black  text-[10px]">56</td>
            <td className="border border-black  text-[10px]">90</td>
            <td className="border border-black  text-[10px]">100</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
