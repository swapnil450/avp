"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import Chem from "./Comp/Chem";

import ListOfDoc from "./Comp/Doc";

import ListOfStock from "./Comp/Stockiest";

export default function MainTab() {
  return (
    <div className="flex justify-center items-center first-letter:w-[100%]  mt-5 flex-col">
      <Tabs color="primary" className="text-xs" aria-label="Options">
        <Tab key="Chemist Details" className="text-xs" title="Chemist Details">
          <div className="flex flex-col gap-5 mt-5 justify-center items-center">
            <Chem />
          </div>
        </Tab>
        <Tab key="Doctor Details" className="text-xs" title="Doctor Details">
          <div className="flex flex-col gap-5 mt-5 justify-center items-center">
            <ListOfDoc />
          </div>
        </Tab>
        <Tab
          key="Stockiest Details"
          className="text-xs"
          title="Stockiest Details"
        >
          <div className="flex flex-col gap-5 mt-5 justify-center items-center">
            <ListOfStock />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}