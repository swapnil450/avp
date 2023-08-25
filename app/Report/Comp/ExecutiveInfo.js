import React from "react";
import moment from "moment";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
moment().format();

export default function ExecutiveInfo({ AllDocByDate }) {
  const { user } = useGlobalContext();

  const { area, DcrId, createdAt, workWith } = AllDocByDate[0] || {};

  const { empName, headquarters, mobile1, post, selectedAreas } = user;

  return (
    <>
      <table className="border  border-black text-center ">
        <thead>
          <tr>
            <th className="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              Name
            </th>
            <th className="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              Date
            </th>
            <th className="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              Designation
            </th>
            <th className="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              Headquarters
            </th>
            <th className="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              Actual_TP
            </th>
            <th className="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              Work_With
            </th>
            <th className="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              DCR_ID
            </th>
            <th className="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              Work_at
            </th>
            <th className="border border-black text-center text-[10px] font-bold text-gray-800 p-0.5">
              Departmental Remark Only
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {empName ? empName : "-"}
            </td>
            <td className="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {moment(createdAt).format("DD/MM/YYYY")}
            </td>
            <td className="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {post}
            </td>
            <td className="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {headquarters}
            </td>
            <td className="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {area}
            </td>
            <td className="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {workWith}
            </td>
            <td className="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {DcrId}
            </td>
            <td className="border border-black font-title text-gray-800 text-[10px] p-0.5">
              {"-"}
            </td>
            <td className="border border-black font-title text-gray-800 text-[10px] p-0.5"></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
