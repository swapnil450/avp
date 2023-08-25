"use client";
import AllProgram from "../tour/Comp/AllProgram/AllProgram";
import React, { useEffect, useState } from "react";

import axios from "axios";

import moment from "moment";

export default function MainDcr() {
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
        console.log("done");
        setLoading(false);
      });
  }, []);

  const ActiveProgram = tp?.filter(
    (itm) => itm.Act === true && itm.Apv === true
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
      <div>
        <div className="flex flex-col gap-5 mt-5 justify-center items-center">
          <AllProgram tp={ActiveProgram} />
        </div>
      </div>
    </>
  );
}
