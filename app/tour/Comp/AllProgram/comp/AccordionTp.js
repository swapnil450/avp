"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import moment from "moment";
import ReportTemp from "@/app/Report/ReportTemp";
moment().format();

export default function AccordionTp({ tp }) {
  const userId = JSON.parse(localStorage?.getItem("user")) || "admin";

  const [allDoc, setAllDoc] = useState([]);
  const [allChem, setAllChem] = useState([]);

  const [allStockiest, setAllStockiest] = useState([]);

  const [flag, setFlag] = useState(false);

  const singleActiveProgram = { ...tp };

  const tpAct = singleActiveProgram[0] || {};

  useEffect(() => {
    const Server = process.env.NEXT_PUBLIC_SERVER_NAME;
    const fetchData = async () => {
      try {
        const [docResponse, chemResponse, stockResponse] = await axios.all([
          axios.get(`${Server}/add/docTourId/${tpAct.DcrId}`),
          axios.get(`${Server}/add/chemTourId/${tpAct.DcrId}`),
          axios.get(`${Server}/add/stockTourId/${tpAct.DcrId}`),
        ]);

        setAllDoc({
          docData: docResponse.data,
        });
        setAllChem({
          chemData: chemResponse.data,
        });

        setAllStockiest({
          stockData: stockResponse.data,
        });

        setFlag(true);
      } catch (error) {}
    };

    // const interval = setInterval(() => {
    fetchData();
    // }, 10000);
    // return () => clearInterval(interval);
  }, []);

  const Active = { ...tp };

  const start_date = new Date(Active[0]?.startDate);
  const end_date = new Date(Active[0]?.lastDate);

  const dates = [];

  while (start_date <= end_date) {
    dates.push(moment(start_date).format("DD/MM/YYYY"));
    start_date.setDate(start_date.getDate() + 1);
  }

  const [seldate, setSeldate] = useState();

  const AllDocByDate = allDoc?.docData?.filter(
    (i) => moment(i.createdAt).format("DD/MM/YYYY") === seldate
  );
  const AllChemByDate = allChem?.chemData?.filter(
    (i) => moment(i.createdAt).format("DD/MM/YYYY") === seldate
  );
  const AllStockByDate = allStockiest?.stockData?.filter(
    (i) => moment(i.createdAt).format("DD/MM/YYYY") === seldate
  );

  return (
    <>
      {tp?.map((key) => {
        return (
          <>
            <Accordion key={key} variant="splitted">
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title={`${moment(key.startDate).format(
                  "DD/MM/YYYY"
                )}_to_${moment(key.lastDate).format("DD/MM/YYYY")}`}
              >
                <div className="flex flex-col gap-3 justify-center items-center mb-5 ">
                  <div className="flex flex-col justify-center ">
                    <select
                      className="outline-none font-semibold text-gray-600 border-1 bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                      id="Area"
                      name="Area"
                      value={seldate}
                      onChange={(e) => setSeldate(e.target.value)}
                      required
                    >
                      <option value="">Select Date</option>
                      {dates?.map((i) => {
                        return (
                          <>
                            <option key={i} value={i}>
                              {i}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>

                  <ReportTemp
                    AllChemByDate={AllChemByDate}
                    AllDocByDate={AllDocByDate}
                    AllStockByDate={AllStockByDate}
                  />
                </div>
              </AccordionItem>
            </Accordion>
          </>
        );
      })}
    </>
  );
}
