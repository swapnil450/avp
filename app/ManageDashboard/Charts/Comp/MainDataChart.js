"use client";
import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import faker from "faker"

import moment from "moment";
import Filters from "./Filters";
moment().format();
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        // title: {
        //     display: true,
        //     text: 'Daily order Charts',
        // },
    },
};

export default function MainDataChart({
    DataOfMAndY,
    month,
    year,
    setYear,
    setMonth,
}) {
    function getDatesArrayForMonth(year, month) {
        const startDate = new Date(year, month - 1, 1); // Month is 0-based, so subtract 1
        const endDate = new Date(year, month, 0); // The 0th day of the next month is the last day of the current month

        const datesArray = [];

        for (
            let date = startDate;
            date <= endDate;
            date.setDate(date.getDate() + 1)
        ) {
            datesArray.push(new Date(date));
        }

        return datesArray;
    }

    const datesArray = getDatesArrayForMonth(year, month);
    const dates = datesArray?.map((i) => moment(i).format("DD/MM/YYYY"));
    const labels = datesArray?.map((i) =>
        moment(i).format("DD/MM/YYYY").slice(0, 2)
    );

    const getValueOfEachDayBookedData = (DataOfMAndY, dates) => {
        const dataCounts = dates.map((label) => {
            const count = DataOfMAndY?.filter(
                (item) => item.createdAt === label
            ).length;
            return count;
        });
        return dataCounts;
    };

    const dataCounts = getValueOfEachDayBookedData(DataOfMAndY, dates);

    const data = {
        labels,
        datasets: [
            {
                label: "Orders/Day",
                data: dataCounts,
                backgroundColor: "rgb(38, 166, 154)",
            },
        ],
    };

    return (
        <>
            <div className="flex flex-col gap- justify-start items-start">
                <Filters
                    setYear={setYear}
                    year={year}
                    month={month}
                    setMonth={setMonth}
                />
                <Bar width={1000} height={300} options={options} data={data} />
            </div>
        </>
    );
}
