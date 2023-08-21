import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import DocImg from "../../../../img/doc.webp";
import medImg from "../../../../img/med.webp";
import shopImg from "../../../../img/shop.webp";
import moment from "moment";
import AddDcrChem from "./Comp/AddDcrChem";
import AddDcrDoc from "./Comp/AddDcrDoc";
import AddDcrStock from "./Comp/AddDcrStock";
moment().format();

export default function DcrFIlDates({ ActiveProgram, dates }) {
  console.log(ActiveProgram, "tp");
  const ActiveP = { ...ActiveProgram };
  return (
    <>
      <Card className="flex flex-col gap-5  p-2 justify-center items-center ">
        {dates?.map((key) => {
          return (
            <>
              <h4 className="font-semibold mt-3 text-center p-1 rounded-lg text-sm">
                Today program :
                <span className="text-sm underline text-black"> {key}</span>
              </h4>

              <div className="flex flex-row   p-3 rounded-lg gap-16">
                <AddDcrChem ActiveProgram={ActiveP[0]} />
                <AddDcrDoc ActiveProgram={ActiveP[0]} />
                <AddDcrStock ActiveProgram={ActiveP[0]} />
              </div>

              {/* </Card> */}
            </>
          );
        })}
      </Card>
    </>
  );
}
