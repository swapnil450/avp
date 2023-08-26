import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import moment from "moment";
moment().format();

export const CheckIcon = ({ size, height, width, ...props }) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default function ActiveTp({ tp }) {
  const ActiveProgram = tp.filter(
    (itm) => itm.Apv === true && itm.Act === true
  );
  
  return (
    <>
      <div>
        {ActiveProgram?.map((i) => {
          return (
            <>
              <Card key={i} className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                  <h4 className="font-semibold bg-gray-100 bg-blend-saturation p-1 rounded-lg text-sm">
                    {moment(i.startDate).format("DD/MM/YYYY")}_to_
                    {moment(i.lastDate).format("DD/MM/YYYY")}
                  </h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <div className="flex flex-row justify-center items-center gap-10 p-2">
                    <div>
                      <p className="text-sm font-semibold">
                        Area :{" "}
                        <span className="text-xs font-medium text-gray-600">
                          {i.area}
                        </span>{" "}
                      </p>
                      <p className="text-sm font-semibold">
                        HeadQuater :{" "}
                        <span className="text-xs font-medium text-gray-600">
                          {i.headQ}
                        </span>{" "}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {i.Act === true ? (
                        <Chip
                          startContent={<CheckIcon size={18} />}
                          variant="faded"
                          color="success"
                        >
                          Active
                        </Chip>
                      ) : (
                        <Chip color="danger" variant="dot">
                          UnApproved
                        </Chip>
                      )}

                      {i.Act === true ? (
                        <Chip
                          startContent={<CheckIcon size={18} />}
                          variant="faded"
                          color="success"
                        >
                          Approved
                        </Chip>
                      ) : (
                        <Chip color="danger" variant="dot">
                          UnApproved
                        </Chip>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </>
          );
        })}
      </div>
    </>
  );
}
