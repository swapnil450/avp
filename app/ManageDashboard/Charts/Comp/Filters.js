import React from "react";

export default function Filters({ setYear, setMonth, year, month }) {
    const monthsArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const monthsObjectsArray = monthsArray.map((month, index) => ({
        no: index + 1,
        name: month,
    }));
    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from({ length: 10 }, (_, index) =>
        (currentYear + index).toString()
    );

    return (
        <>
            <div className="flex flex-row juatify-center items-center gap-5">
                <select
                    onChange={(e) => setYear(e.target.value)}
                    value={year}
                    className="p-2 rounded-lg cursor-pointer border border-gray-200 "
                >
                    <option>Select Year</option>
                    {yearsArray?.map((i) => {
                        return (
                            <>
                                <option value={i}>{i}</option>
                            </>
                        );
                    })}
                </select>
                <select
                    onChange={(e) => setMonth(e.target.value)}
                    value={month}
                    className="p-2 rounded-lg cursor-pointer border border-gray-200 "
                >
                    <option>Select Month</option>
                    {monthsObjectsArray?.map((i) => {
                        return (
                            <>
                                <option value={i.no}>{i.name}</option>
                            </>
                        );
                    })}
                </select>
            </div>
        </>
    );
}
