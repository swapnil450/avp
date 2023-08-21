"use client";
import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import shop from "../../../../public/tour.webp";
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
export default function AddTour() {
  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const sizes = ["5xl"];
  const { AreasOption, headquaters } = useGlobalContext();
  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };
  const user = JSON.parse(localStorage?.getItem("user") || "user");

  const [formData, setFormData] = React.useState({
    startDate: "",
    lastDate: "",
    workWith: "",
    headQ: "",
    area: "",
    createdBy: "",
    createdAt: new Date().toISOString().slice(0, 10),
    Act: true,
    Apv: false,
  });

  formData.createdBy = user.userId;
  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    // Add similar validation for other fields

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [response, setResponse] = React.useState({});

  const handleSubmit = (formData) => {
    if (validateForm()) {
      const apiUrl = `${Server}/add/tour`;
      setIsLoading(true);
      setHasError(false);

      axios
        .post(apiUrl, formData)
        .then((response) => {
          const responseData = response.data;
          setResponse(responseData);

          toast.success(`${response?.data?.message}`);
        })
        .catch((error) => {
          setHasError(true);
          toast.error(error?.response?.data?.message);
        })
        .finally(() => {
          setIsLoading(false);
          setFormData({
            startDate: "",
            lastDate: "",
            workWith: "",
            headQ: "",
            area: "",
          });
          onClose();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    } else {
      toast.error("Please fill All Details");
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <div
            key={size}
            onClick={() => handleOpen(size)}
            className="flex flex-col gap-1 justify-center items-center"
          >
            <Image
              width={20}
              height={20}
              src={shop}
              className=" cursor-pointer "
            />
            <p
              key={size}
              size="xs"
              className=" text-[12px] cursor-pointer  "
              onClick={() => handleOpen(size)}
            >
              +TourProgram
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
                Add Stockiest
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4 justify-center items-center">
                  <div className="grid lg:grid-cols-2 grid-cols-1  gap-4">
                    <div className="flex justify-center flex-col">
                      <label className="text-sm p-1"> Start Date</label>
                      <Input
                        type="date"
                        label=""
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex justify-center flex-col">
                      <label className="text-sm p-1"> Last Date</label>
                      <Input
                        type="date"
                        label=""
                        name="lastDate"
                        value={formData.lastDate}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex flex-col justify-center ">
                      <p className="text-sm p-1 font-bold">
                        Select Headquaters
                      </p>
                      <select
                        className="outline-none font-semibold text-gray-600 bg-transparent text-small w-[300px] h-[50px] rounded-lg border-1 bg-gray-200 p-2"
                        id="headQ"
                        name="headQ"
                        value={formData.headQ}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Headquaters</option>
                        {headquaters?.map((a) => {
                          return (
                            <>
                              <option key={a} value={a}>
                                {a}
                              </option>
                            </>
                          );
                        })}
                      </select>

                      {errors.Area && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.Area}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <p className="text-sm p-2 font-bold">Select Area</p>
                      <select
                        className="outline-none font-semibold text-gray-600  bg-transparent text-xs w-[300px] h-[50px] rounded-lg border-1 bg-gray-200 p-2"
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Area</option>
                        {AreasOption?.map((a) => {
                          return (
                            <>
                              <option key={a} value={a}>
                                {a}
                              </option>
                            </>
                          );
                        })}
                      </select>

                      {errors.Area && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.Area}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <Input
                        type="textarea"
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.address && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.address}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                {isLoading ? (
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
                    onClick={() => handleSubmit(formData)}
                  >
                    Create
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
