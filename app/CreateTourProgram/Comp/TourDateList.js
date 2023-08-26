import React from "react";
import { Button } from "@nextui-org/react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import EditTourDate from "./EditTourDate";
export default function TourDateList({ dataTour, getDataTour }) {
  return (
    <>
      {dataTour ? (
        <div className="grid grid-cols-1 gap-3">
          {dataTour.map((item) => {
            return (
              <>
                <Card className="m-1" isPressable>
                  <CardFooter className="text-small flex flex-row justify-center items-center gap-5">
                    <p>📅</p>
                    <div className="text-small flex flex-row gap-4">
                      <b>{item.Date}</b>
                      <p className="text-default-500 text-[12px]">
                        {item.area}
                      </p>

                      <EditTourDate item={item} getDataTour={getDataTour} />
                    </div>
                  </CardFooter>
                </Card>
              </>
            );
          })}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
