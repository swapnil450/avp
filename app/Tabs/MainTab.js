"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import Chem from "./Comp/Chem";

import ListOfDoc from "./Comp/Doc";

import ListOfStock from "./Comp/Stockiest";
import AddChemist from "../Home/AddInfo/Comp/AddChemModal";
import AddEmpModal from "../Home/AddInfo/Comp/AddEmpModal";
import AddDoctorModal from "../Home/AddInfo/Comp/AddDoctorModal";
import AddStockiest from "../Home/AddInfo/Comp/AddStockiest";
import AddArea from "../Home/AddInfo/Comp/AddArea";
import AddHeadQ from "../Home/AddInfo/Comp/AddHeadQ";
import AddStdFarChart from "../Home/AddInfo/Comp/AddStdFarChart";
import AddProduct from "../Home/AddInfo/Comp/AddProduct";

export default function MainTab() {
  return (
<<<<<<< HEAD
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
=======
    <div className="flex justify-center items-center w-full mt-5 flex-col">
      <Tabs color="primary" aria-label="Options">
        <Tab key="Employee Details" title="Employee Details">
          <Card>
            <CardBody className="flex flex-col gap-5 justify-center items-center">
              <AddEmpModal />
              <Emp />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Chemist Details" title="Chemist Details">
          <Card>
            <CardBody className="flex flex-col gap-5 justify-center items-center">
              <AddChemist />
              <Chem />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Doctor Details" title="Doctor Details">
          <Card>
            <CardBody className="flex flex-col gap-5 justify-center items-center">
              <AddDoctorModal />
              <ListOfDoc />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Stockiest Details" title="Stockiest Details">
          <Card>
            <CardBody className="flex flex-col gap-5 justify-center items-center">
              <AddStockiest />
              <ListOfStock />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Area Details" title="Area Details">
          <Card>
            <CardBody className="flex flex-col gap-5 justify-center items-center">
              <AddArea />
              <ListOfArea />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="HeadQuater Details" title="HeadQuater Details">
          <Card>
            <CardBody className="flex flex-col gap-5 justify-center items-center">
              <AddHeadQ />
              <ListOfHeadQ />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="FareChart Details" title="FareChart Details">
          <Card>
            <CardBody className="flex flex-col gap-5 justify-center items-center">
              <AddStdFarChart />
              <ListOfFare />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Product & Rate Details" title="Product & Rate Details">
          <Card>
            <CardBody className="flex flex-col gap-5 justify-center items-center">
              <AddProduct />
              <ListOfProdRate />
            </CardBody>
          </Card>
>>>>>>> eb540361390eeef1ff5284aeda21e7f222c04fcf
        </Tab>
      </Tabs>
    </div>
  );
}
