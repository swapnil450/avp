"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import doc from "../../../../../img/doc.webp";
import { User } from "@nextui-org/react";
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
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";

import InputListDoc from "@/app/Home/AddInfo/Comp/EmerncyAdject/InputListDoc";

export default function AddDcrDoc({ ActiveProgram }) {
  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const sizes = ["5xl"];

  const [lit, setLit] = useState("Yes");
  const [det, setDet] = useState("Yes");
  const [docsel, setDocsel] = useState("");

  const [inputList, setInputList] = React.useState([
    { id: 1, Product: "", Qnt: "", value: "" }, // Initial input item
  ]);

  const [isSelected, setIsSelected] = React.useState(false);
  const { allDoc } = useGlobalContext();

  const AreaTP = ActiveProgram?.area;

  const AllAreaDoc = allDoc.docData?.filter(
    (i) => i.Area === AreaTP && i.approved === true
  );

  const DocDet = AllAreaDoc?.filter((i) => i.DoctorName === docsel) || [
    { chemName: "chemist" },
  ];

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  const user = JSON.parse(localStorage?.getItem("user")) || "admin";
  const workWithD =
    JSON.parse(localStorage?.getItem("workwith")) || "independent";
  const [formData, setFormData] = React.useState({
    workWith: "",
    DoctorCode: "",
    DoctorName: "",
    HosName: "",
    mobile: "",
    address: "",
    Area: "",
    Degree: "",
    Speciality: "",

    P1: "",
    P2: "",

    DcrId: "",
    Detail: "",
    lit: "",
    Pob: [],
    Remark: "",
    createdBy: "",
    createdAt: "",
  });

  formData.workWith = workWithD;
  formData.createdAt = new Date().toISOString().slice(0, 10);
  formData.Pob = inputList;
  formData.HosName = DocDet[0]?.HosName;
  formData.mobile = DocDet[0]?.mobile;
  formData.address = DocDet[0]?.address;
  formData.Area = DocDet[0]?.Area;
  formData.P1 = DocDet[0]?.P1;
  formData.P2 = DocDet[0]?.P2;
  formData.Degree = DocDet[0]?.Degree;
  formData.Speciality = DocDet[0]?.Speciality;
  formData.DcrId = ActiveProgram?.DcrId;
  formData.DoctorCode = DocDet[0]?.DoctorCode;
  formData.DoctorName = DocDet[0]?.DoctorName;
  formData.mobile = DocDet[0]?.mobile;
  formData.lit = lit;
  formData.Detail = det;
  formData.createdBy = user.userId;

  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    if (formData.DoctorName === undefined) {
      newErrors.chemName = "Chemist name is required";
    }
    if (formData.Remark.length < 20) {
      newErrors.Remark = "Remark Field not be Empty !";
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
      const apiUrl = `${Server}/add/docDcr`;
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
          setDocsel("");
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
              src={doc}
              className=" cursor-pointer "
            />
            <p
              key={size}
              size="xs"
              className=" text-[12px] cursor-pointer  "
              onClick={() => handleOpen(size)}
            >
              +Doctor
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
                Add Doctor !
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4 justify-center items-center">
                  <div className="grid lg:grid-cols-2 grid-cols-1  gap-2">
                    <div className="flex flex-col justify-center ">
                      <p className="text-sm p-1 text-gray-600">Select Doctor</p>
                      <select
                        className="outline-none font-semibold text-gray-600 border-1 border-gray-300  bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                        id="Chem"
                        name="Chem"
                        value={docsel}
                        onChange={(e) => setDocsel(e.target.value)}
                        required
                      >
                        <option value="">Select Doctor</option>
                        {AllAreaDoc?.map((i) => {
                          return (
                            <>
                              <option key={i} value={i.DoctorName}>
                                {i.DoctorName}
                              </option>
                            </>
                          );
                        })}
                      </select>
                      {errors.Area && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.DoctorName}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      {DocDet?.map((i) => {
                        return (
                          <>
                            <div
                              key={i}
                              className="flex flex-col bg-white rounded-lg p-2 shadow-md gap-2 justify-center m-2 items-center"
                            >
                              <User
                                name={i.chemName}
                                className="text-xs"
                                description={`+91${i.mobile}`}
                              />
                              <p className="text-[10px]">
                                {i.Area},{" "}
                                <span className="text-[10px]">
                                  {" "}
                                  {i.address}
                                </span>
                              </p>
                            </div>
                          </>
                        );
                      })}
                    </div>

                    <div className="flex flex-col gap-3 justify-center items-center ">
                      <div className=" flex flex-row gap-3 p-2 justify-center items-center">
                        <p>Detailing Given ? </p>
                        <div className=" flex flex-row gap-3">
                          <p
                            onClick={() => setDet("Yes")}
                            className={
                              det === `Yes`
                                ? `  p-2 text-white bg-black cursor-pointer rounded-lg`
                                : `p-2 text-black bg-gray-100 cursor-pointer rounded-lg`
                            }
                          >
                            Yes
                          </p>
                          <p
                            onClick={() => setDet("No")}
                            className={
                              det === `No`
                                ? ` p-2 text-white bg-black cursor-pointer rounded-lg`
                                : `p-2 text-black bg-gray-100 cursor-pointer rounded-lg`
                            }
                          >
                            No
                          </p>
                        </div>
                      </div>

                      <div className=" flex flex-row gap-3 p-2 justify-center items-center">
                        <p className=" text-black">literature Given ? </p>
                        <div className=" flex flex-row gap-3">
                          <p
                            onClick={() => setLit("Yes")}
                            className={
                              lit === `Yes`
                                ? ` p-2 text-white bg-black cursor-pointer rounded-lg`
                                : `p-2 text-black bg-gray-100 cursor-pointer rounded-lg`
                            }
                          >
                            Yes
                          </p>
                          <p
                            onClick={() => setLit("No")}
                            className={
                              lit === `No`
                                ? ` p-2 text-white bg-black cursor-pointer rounded-lg`
                                : `p-2 text-black bg-gray-100 cursor-pointer rounded-lg`
                            }
                          >
                            No
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center ">
                        <Input
                          type="textarea"
                          label="Remark...."
                          name="Remark"
                          value={formData.Remark}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.Remark && (
                          <p className="text-red-500  text-xs p-1">
                            {errors.Remark}
                          </p>
                        )}
                      </div>

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
                      <InputListDoc
                        inputList={inputList}
                        setInputList={setInputList}
                        AllAreaDoc={AllAreaDoc}
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
