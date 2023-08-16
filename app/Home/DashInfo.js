import React from "react";

export default function DashInfo() {
  const Option = ["BD-Executive", "Area", "Headquarter", "Doctor"];

  return (
    <>
      <div className="grid grid-cols-4 gap-5">
        {Option.map((index,key) => {
          return (
            <>
              <div key={index} class="flex items-center p-8 bg-white shadow rounded-lg">
                <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-yellow-100 rounded-full mr-6">
                  🧾
                </div>
                <div>
                  <span class="block text-2xl font-bold">62</span>
                  <span class="block text-gray-500">{key}</span>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
