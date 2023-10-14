"use client";
import React from "react";
import MainDataChart from "./Comp/MainDataChart";
import { gql, useQuery } from "@apollo/client";
import Filters from "./Comp/Filters";

export default function MainCahrt() {
    const Month = new Date().getMonth() + 1
    const Year = new Date().getFullYear()
    const [year, setYear] = React.useState(`${Year}`);
    const [month, setMonth] = React.useState(`${Month}`);

    const DataByMonthAndYear = gql`
    query GetOrderByMonthYear($year: String, $month: String) {
      GetOrderByMonthYear(year: $year, month: $month) {
        length
        Data {
          createdAt
          month
        }
      }
    }
  `;
    const { data, loading } = useQuery(DataByMonthAndYear, {
        variables: {
            year: String(year),
            month: String(month),
        },
    });

    const DataOfMAndY = data?.GetOrderByMonthYear?.Data;
    return (
        <>

            {/* <div className="flex justify-center items-start  flex-col">
                   
                </div> */}
            <div className="flex justify-center items-start  flex-col">
                {/* <Filters  year={year} month={month} setMonth={setMonth} /> */}
                <MainDataChart month={month} setMonth={setMonth} setYear={setYear} year={year} DataOfMAndY={DataOfMAndY} />
            </div>

        </>
    );
}
