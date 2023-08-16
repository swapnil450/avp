"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Emp from "./Comp/Emp";
import Chem from "./Comp/Chem";
import Doc from "./Comp/Doc";
import ListOfDoc from "./Comp/Doc";
import ListOfArea from "./Comp/Area";
import ListOfHeadQ from "./Comp/HeadQ";
import ListOfFare from "./Comp/Fare";
import ListOfProdRate from "./Comp/ProRate";
import ListOfStock from "./Comp/Stockiest";

export default function MainTab() {
  return (
    <div className="flex justify-center items-center w-full mt-5 flex-col">
      <Tabs color="primary" aria-label="Options">
        <Tab key="Employee Details" title="Employee Details">
          <Card>
            <CardBody>
              <Emp />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Chemist Details" title="Chemist Details">
          <Card>
            <CardBody>
              <Chem />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Doctor Details" title="Doctor Details">
          <Card>
            <CardBody>
              <ListOfDoc />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Stockiest Details" title="Stockiest Details">
          <Card>
            <CardBody>
             <ListOfStock/>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Area Details" title="Area Details">
          <Card>
            <CardBody>
              <ListOfArea />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="HeadQuater Details" title="HeadQuater Details">
          <Card>
            <CardBody>
              <ListOfHeadQ />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="FareChart Details" title="FareChart Details">
          <Card>
            <CardBody>
              <ListOfFare />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Product & Rate Details" title="Product & Rate Details">
          <Card>
            <CardBody>
              <ListOfProdRate />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
