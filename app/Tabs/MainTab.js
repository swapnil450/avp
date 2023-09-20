// "use client";
// import React from "react";
//

// export default function MainTab() {
//   return (
//     <div className="flex justify-center items-center   mt-5 mb-16 flex-col">
//       <Tabs color="primary" className="text-xs" aria-label="Options">
//         <Tab key="Chemist Details" className="text-xs" title="Chemist Details">
//           <div className="flex flex-col gap-5 mt-5 justify-center items-center">
//             <Chem />
//           </div>
//         </Tab>
//         <Tab key="Doctor Details" className="text-xs" title="Doctor Details">
//           <div className="flex flex-col gap-5 mt-5 justify-center items-center">
//             <ListOfDoc />
//           </div>
//         </Tab>
//         <Tab
//           key="Stockiest Details"
//           className="text-xs"
//           title="Stockiest Details"
//         >
//           <div className="flex flex-col gap-5 mt-5 justify-center items-center">
//             <ListOfStock />
//           </div>
//         </Tab>
//       </Tabs>
//     </div>
//   );
// }

"use client";
import React from "react";
import Chem from "./Comp/Chem";
import { Button } from "@nextui-org/react";
import ListOfDoc from "./Comp/Doc";
import SerchBox from "../SerachComp/SerchBox";
import ListOfStock from "./Comp/Stockiest";
import DataQueryLimitor from "../SerachComp/DataQueryLimitor";
import { ToastContainer, toast } from "react-toastify";
import FilterByArea from "../FilterComp/FilterByArea";

export default function Tab() {
  const [selTab, setSelTab] = React.useState("Doctor");

  const Tabs = ["Doctor", "Chemist", "Stockiest"];
  const TabAct =
    typeof localStorage !== "undefined" ? localStorage?.getItem("tab") : null;
  const Active = JSON.parse(TabAct);

  const [dataLimit, setDataLimit] = React.useState({
    first: "",
    last: "",
  });
  const [limitData, setLimitData] = React.useState({
    first: "",
    last: "",
  });

  const [value, setValue] = React.useState("");
  const [valueAp, setValueAp] = React.useState(true);

  const HandleDataLimitor = (e) => {
    const { name, value } = e.target;
    setDataLimit((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const GetDataUsingLimitor = (dataLimit) => {
    setLimitData(dataLimit);
  };

  const [search, setSearch] = React.useState("");
  const setTabActive = (i) => {
    localStorage?.setItem("tab", JSON.stringify(i));
    setSelTab(i);
    ClearAllFilter();
  };
  const ClearAllFilter = () => {
    setDataLimit({
      first: "",
      last: "",
    });
    setLimitData({
      first: "",
      last: "",
    });
    setValue("");
    setSearch("");
  };

  const HandleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex flex-col judtify-center items-center gap-2 mt-5">
        <div className="flex flex-row gap-4 justify-center items-center bg-gray-100 p-2 rounded-lg">
          {Tabs.map((i) => {
            return (
              <>
                <p
                  key={i}
                  onClick={() => setTabActive(i)}
                  className={
                    Active === i
                      ? `font-bold rounded-lg text-xs cursor-pointer bg-black text-white p-2`
                      : `font-bold text-sm rounded-lg cursor-pointer  text-gray-700 p-2`
                  }
                >
                  {i}
                </p>
              </>
            );
          })}
        </div>

        {Active === "Doctor" ||
        Active === "Chemist" ||
        Active === "Stockiest" ? (
          <div className="flex bg-white rounded-lg flex-col gap-1 p-2 justify-center items-center">
            <SerchBox HandleSearchChange={HandleSearchChange} search={search} />

            {/* {Active === "Stockiest" ? null : (
              <FilterByArea
                value={value}
                setValue={setValue}
                valueAp={valueAp}
                setValueAp={setValueAp}
              />
            )} */}
          </div>
        ) : null}
        <div className="flex flex-col justify-center items-center">
          {Active === "Doctor" ? (
            <div className="flex flex-col gap-5 justify-center mb-24 p-2 items-center">
              <ListOfDoc
                limitData={limitData}
                setLimitData={setLimitData}
                AreaValue={value}
                search={search}
                Active={Active}
                valueAp={valueAp}
              />
            </div>
          ) : Active === "Chemist" ? (
            <div className="flex flex-col gap-5 justify-center mb-24 p-2 items-center">
              <Chem
                limitData={limitData}
                setLimitData={setLimitData}
                AreaValue={value}
                search={search}
                Active={Active}
                valueAp={valueAp}
              />
            </div>
          ) : Active === "Stockiest" ? (
            <div className="flex flex-col gap-5 justify-center mb-24 p-2 items-center">
              <ListOfStock
                limitData={limitData}
                setLimitData={setLimitData}
                AreaValue={value}
                search={search}
                Active={Active}
                valueAp={valueAp}
              />
            </div>
          ) : (
            <p>no data</p>
          )}
        </div>
      </div>
    </>
  );
}
