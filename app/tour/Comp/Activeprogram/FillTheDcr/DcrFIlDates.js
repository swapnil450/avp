import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import DocImg from "../../../../img/doc.webp";
import medImg from "../../../../img/med.webp";
import shopImg from "../../../../img/shop.webp";
import axios from "axios";
import moment from "moment";
import AddDcrChem from "./Comp/AddDcrChem";
import AddDcrDoc from "./Comp/AddDcrDoc";
import AddDcrStock from "./Comp/AddDcrStock";
moment().format();

export default function DcrFIlDates({ ActiveProgram, dates }) {
  const ActiveP = ActiveProgram;
  const [dataofDate, setDataofDate] = useState([]);

  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;
  const [tp, setTp] = useState([]);
  const [loading, setLoading] = useState(false);

  const Id = ActiveP[0]?.DcrId;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${Server}/add/tourDateUser/${Id}`)
      .then((res) => {
        setTp(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const Alldate = tp.map((i) => i.Date);

  const TpActiveDate = Alldate?.filter(
    (i) => i === moment(new Date()).format("DD/MM/YYYY")
  );

  const ActiveDate = TpActiveDate?.toString();
 
  return (
    <>
      <Card className="flex flex-col gap-3  p-2 justify-center items-center ">
        {tp?.map((key) => {
          return (
            <>
              <h4 className="font-semibold mt-3 text-center p-1 rounded-lg text-sm">
                Today program :
                <span className="text-sm underline text-black">
                  {" "}
                  {ActiveDate}
                </span>
              </h4>
              <h4 className="font-semibold  text-center p-1 rounded-lg text-xs">
                Working With :{" "}
                <span className="text-xs underline text-">😊!</span>
              </h4>

              <div className="flex flex-row   p-3 rounded-lg gap-10">
                {/* <WorkWith /> */}
                <AddDcrChem ActiveProgram={key} />
                <AddDcrDoc ActiveProgram={key} />
                <AddDcrStock ActiveProgram={key} />
              </div>

              {/* </Card> */}
            </>
          );
        })}
      </Card>
    </>
  );
}
