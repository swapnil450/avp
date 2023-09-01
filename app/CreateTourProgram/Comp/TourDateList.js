import React from "react";
import { Button } from "@nextui-org/react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import EditTourDate from "./EditTourDate";
import { useEffect } from "react";
import CreateTour from "./CreateTour";
import axios from "axios";
export default function TourDateList({ dates, dcr, ActiveDcr }) {
  const [dataTour, setDataTour] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [response, setResponse] = React.useState({});

  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;

  useEffect(() => {
    getDataTour();
  }, []);

  const getDataTour = () => {
    axios
      .get(`${Server}/add/tourDateUser/${dcr}`)
      .then((res) => {
        setDataTour(res.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getDataByDate = (Date) => {
    const dataDate = dataTour.filter((i) => i.Date === Date);
    return dataDate;
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-full mb-10  items-center ">
        {dates?.length === 0 ? (
          <p className="text-sm text-black">No Program Created...</p>
        ) : (
          <table className="border w-full text-center border-black ">
            <thead>
              <tr>
                <th className="border border-black  text-[10px] font-bold text-gray-800 ">
                  Date
                </th>

                <th className="border border-black  text-[10px] font-bold text-gray-800 ">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {dates?.map((item) => {
                return (
                  <>
                    <tr>
                      <td className="border border-black  text-[10px]">
                        {item}
                      </td>
                      <td className="border border-black  text-[10px]">
                        <CreateTour
                          dateOfTp={item}
                          dcr={dcr}
                          ActiveDcr={ActiveDcr}
                          DataByDate={getDataByDate(item)}
                          getDataTour={getDataTour}
                        />
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
