import React from "react";

export default function StockiestDetails({ AllStockByDate }) {
  return (
    <>
      <table className="border  border-black text-center">
        <thead>
          {AllStockByDate.length === 0 ? (
            <th className="border border-black text-center text-xs font-bold text-gray-800 p-0">
              #####_No Data Available_#####
            </th>
          ) : (
            <tr>
              <th className="border border-black text-center text-[10px] font-semibold text-gray-800 p-0.">
                SR.NO
              </th>
              <th className="border border-black text-center text-[10px] font-semibold text-gray-800 p-0.">
                Code no
              </th>
              <th className="border border-black text-center text-[10px] font-semibold text-gray-800 p-0.">
                Stockiest Name
              </th>
              <th className="border border-black text-center text-[10px] font-semibold text-gray-800 p-0.">
                Collections
              </th>
              <th
                colSpan=""
                className="border border-black text-center text-[10px] font-semibold text-gray-800 p-0."
              >
                POB
              </th>
            </tr>
          )}
        </thead>

        <tbody>
          {AllStockByDate?.map((i, index) => {
            return (
              <>
                <tr key={i}>
                  <td className="border border-black p-0. text-xs">
                    {index + 1}
                  </td>
                  <td className="border border-black p-0. text-xs">{i.Code}</td>
                  <td className="border border-black p-0. text-xs">{i.Name}</td>
                  <td className="border border-black p-0. text-xs">
                    {i.Collection}
                  </td>
                  {i?.Pob?.map((key) => {
                    return (
                      <>
                        <td
                          key={key}
                          className="border border-black p-0. text-[10px]"
                        >
                          Product :{" "}
                          <span className="text-[10px] font-semibold text-black">
                            {key.Product}
                          </span>{" "}
                          | Qnt :{" "}
                          <span className="text-[10px] font-semibold text-black">
                            {key.Qnt}
                          </span>{" "}
                          | value :
                          <span className="text-[10px] font-semibold text-black">
                            {Number(key.Qnt) * Number(key.value)}
                          </span>
                        </td>
                      </>
                    );
                  })}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
