"use client";
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import ActiveTp from "./Comp/Activeprogram/Active";
import Approve from "./Comp/Approval/Approve";
import AllProgram from "./Comp/AllProgram/AllProgram";
import axios from "axios";
import { Spinner } from "@nextui-org/react";
import moment from "moment";
import DcrFIlDates from "./Comp/Activeprogram/FillTheDcr/DcrFIlDates";
moment().format();

export default function Tour() {
  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;
  const [tp, setTp] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setLoading(true);
    axios
      .get(`${Server}/add/tourUser/${user.userId}`)
      .then((res) => {
        setTp(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const ActiveProgram = tp?.filter(
    (itm) => itm.Act === true && itm.Apv === true
  );
  const UnActiveProgram = tp?.filter(
    (itm) => itm.Act === true && itm.Apv === false
  );
  const Active = { ...ActiveProgram };

  const start_date = new Date(Active[0]?.startDate);
  const end_date = new Date(Active[0]?.lastDate);

  const dates = [];

  while (start_date <= end_date) {
    dates.push(moment(start_date).format("DD/MM/YYYY"));
    start_date.setDate(start_date.getDate() + 1);
  }
  const TodayDate = dates.filter(
    (i) => i === moment(new Date()).format("DD/MM/YYYY")
  );

  return (
    <>
      {loading ? (
        <div className="w-96 h-96 00 flex justify-center items-center">
          <Spinner
            className="flex justify-center items-center mt-1/2"
            size="md"
          />
        </div>
      ) : (
        <div className="flex justify-center items-center first-letter:w-[100%] mb-24 p-2  mt-5 flex-col">
          <Tabs color="primary" className="text-xs" aria-label="Options">
            <Tab
              key="Active-Program"
              className="text-xs flex flex-col justify-center items-center gap-3"
              title="Active-Program"
            >
              <div className="flex flex-col gap-5 mt-5 justify-center items-center">
                <ActiveTp tp={ActiveProgram} />
              </div>
              {TodayDate.length === 0 ? (
                <p>No Program Found..</p>
              ) : (
                <div className="flex flex-col gap-5  justify-center items-center">
                  <DcrFIlDates
                    ActiveProgram={ActiveProgram}
                    dates={TodayDate}
                  />
                </div>
              )}
            </Tab>
            <Tab
              key="Approve Status"
              className="text-xs"
              title="Approve Status"
            >
              <div className="flex flex-col gap-5 mt-5 justify-center items-center">
                <Approve UnActiveProgram={UnActiveProgram} />
              </div>
            </Tab>{" "}
          </Tabs>
        </div>
      )}
    </>
  );
}
