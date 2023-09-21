"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import med from "../../../../../img/med.webp";
import Image from "next/image";
import { Switch } from "@nextui-org/react";
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
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";

import InputList from "@/app/Home/AddInfo/Comp/EmerncyAdject/InputList";

export default function AddDcrChem({ ActiveProgram, loc }) {
  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const sizes = ["5xl"];

  const [lit, setLit] = useState("Yes");
  const [det, setDet] = useState("Yes");
  const [chemsel, setChemsel] = useState("");

  const [inputList, setInputList] = React.useState([
    { id: 1, Product: "", Qnt: "", value: "" }, // Initial input item
  ]);

  const [isSelected, setIsSelected] = React.useState(false);
  const { AreasOption, allChem, user } = useGlobalContext();

  const AreaTP = ActiveProgram?.area.split(",");
  AreaTP.pop();
  console.log(AreaTP, "tp");

  const userSelectedArea = user?.selectedAreas || [];

  const AllAreaChem = allChem.chemData?.filter(
    (i) => AreaTP.includes(i.Area) && i.approved === true
  );

  const chemistDet = AllAreaChem?.filter((i) => i.chemName === chemsel) || [
    { chemName: "chemist" },
  ];

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  const [formData, setFormData] = React.useState({
    chemCode: "",
    chemName: "",
    mobile: "",
    address: "",
    Area: "",
    DLNo: "",
    GSTNo: "",
    DcrId: "",
    lat: "",
    log: "",

    Pob: [],
    createdBy: " ",
    createdAt: "",
  });

  formData.createdAt = new Date().toISOString().slice(0, 10);
  formData.Pob = inputList;
  formData.DcrId = ActiveProgram?.DcrId;
  formData.chemCode = chemistDet[0]?.chemCode;
  formData.chemName = chemistDet[0]?.chemName;
  formData.mobile = chemistDet[0]?.mobile;
  formData.address = chemistDet[0]?.address;
  formData.Area = chemistDet[0]?.Area;
  formData.DLNo = chemistDet[0]?.DLNo;
  formData.GSTNo = chemistDet[0]?.GSTNo;
  formData.log = loc?.log;
  formData.lat = loc?.lat;
  formData.Detail = det;
  formData.createdBy = user?.userId;

  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    if (formData.chemName === undefined) {
      newErrors.chemName = "Chemist name is required";
    }

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

  const handleSubmit = () => {
    if (validateForm()) {
      const apiUrl = `${Server}/add/chemDcr`;
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
          setChemsel("");
          onClose();
        });
    } else {
      toast.error("Please fill All Details");
    }
  };

  return (
    <>
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
              src={med}
              className=" cursor-pointer "
            />
            <p
              key={size}
              size="xs"
              className=" text-[12px] cursor-pointer  "
              onClick={() => handleOpen(size)}
            >
              +Chemist
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
                Add Chemist 💊
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4 justify-center items-center">
                  <div className="grid lg:grid-cols-2 grid-cols-1  gap-2">
                    <div className="flex flex-col justify-center ">
                      <p className="text-sm p-1 text-gray-600">
                        Select Chemist
                      </p>
                      <select
                        className="outline-none font-semibold text-gray-600 border-1 border-gray-300  bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                        id="Chem"
                        name="Chem"
                        value={chemsel}
                        onChange={(e) => setChemsel(e.target.value)}
                        required
                      >
                        <option value="">Select Chemist</option>
                        {AllAreaChem?.map((i) => {
                          return (
                            <>
                              <option key={i} value={i.chemName}>
                                {i.chemName}
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
                      {chemistDet?.map((i) => {
                        return (
                          <>
                            <div
                              key={i}
                              class="relative flex w flex-col rounded-xl  bg-clip-border text-gray-700 shadow-md"
                            >
                              <div class="p-6">
                                <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                  {i.chemName}
                                </h5>
                                <p class="font-sans inline-flex text-xs flex-col gap- text-black font-semibold  leading-relaxed ">
                                  Address :{i.address}
                                  <span className="text-black font-semibold">
                                    Area : {i.Area}
                                  </span>
                                  <span className="text-black font-semibold">
                                    Code : {i.chemCode}
                                  </span>
                                  <span className="text-black font-semibold">
                                    {" "}
                                    Mobile : {i.mobile}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>

                    <div className="flex flex-col gap-3 justify-center items-center ">
                      <div className="flex flex-row gap-3 justify-center items-center">
                        <p className="text-sm font-bold ">Have POB? </p>
                        <Switch
                          size="sm"
                          isSelected={isSelected}
                          onValueChange={setIsSelected}
                        ></Switch>
                      </div>
                    </div>
                    <div>
                      <InputList
                        inputList={inputList}
                        setInputList={setInputList}
                        AllAreaChem={AllAreaChem}
                        isSelected={isSelected}
                      />
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
                    onClick={handleSubmit}
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
