"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import work from "../../../../../img/work.webp";
import { User } from "@nextui-org/react";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { Input } from "@nextui-org/react";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";

import InputListDoc from "@/app/Home/AddInfo/Comp/EmerncyAdject/InputListDoc";

export default function WorkWith({ ActiveProgram }) {
  const { allEmpData } = useGlobalContext();

  const allempDatas = allEmpData.userData;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const sizes = ["2xl"];

  const [emp, setEmp] = React.useState("");
  const [load, setLoad] = React.useState(false);
  const handleSubmit = (emp) => {
    const EMp = JSON.stringify(emp);
    localStorage.setItem("workwith", EMp);
    onClose();
    toast.success("WorkWith Added in your WorkSpace");
  };
  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  return (
    <>
      {/* <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      /> */}
      <div className="flex flex-col justify-center items-center gap-3">
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {sizes.map((size) => (
          <div
            key={size}
            onClick={() => handleOpen(size)}
            className="flex flex-col gap-1 justify-center items-center"
          >
            <Image
              width={20}
              alt="icon"
              height={20}
              src={work}
              className=" cursor-pointer "
            />
            <p
              key={size}
              size="xs"
              className=" text-[12px] cursor-pointer  "
              onClick={() => handleOpen(size)}
            >
              +Work-With
            </p>
          </div>
        ))}
      </div>
      <Modal
        size={size}
        isOpen={isOpen}
        placement={`center`}
        scrollBehavior={`inside`}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Work-With !
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4 justify-center items-center">
                  <div className="grid lg:grid-cols-2 grid-cols-1  gap-2">
                    <div className="flex flex-col justify-center ">
                      <p className="text-sm p-1 text-gray-600">
                        Select WorkWith
                      </p>
                      <select
                        className="outline-none font-semibold text-gray-600 border-1 border-gray-300  bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                        id="Chem"
                        name="Chem"
                        value={emp}
                        onChange={(e) => setEmp(e.target.value)}
                        required
                      >
                        <option value="">Select WorkWith</option>
                        <option value="Independent">Independent</option>
                        {allempDatas?.map((i) => {
                          return (
                            <>
                              <option key={i} value={`${i.empName}-${i.post}`}>
                                {`${i.empName}-${i.post}`}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                {load ? (
                  <Button
                    isLoading
                    className="bg-black text-white"
                    spinner={
                      <svg
                        className="animate-spin h-5 w-5 text-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          fill="currentColor"
                        />
                      </svg>
                    }
                  >
                    Wait..
                  </Button>
                ) : (
                  <Button
                    color="black"
                    className="bg-black text-white"
                    onClick={() => handleSubmit(emp)}
                  >
                    Save
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
