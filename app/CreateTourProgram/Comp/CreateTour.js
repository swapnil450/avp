"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import doc from "../../img/doc.webp";
import { Chip } from "@nextui-org/react";
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
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
import TourDateList from "./TourDateList";
import Link from "next/link";

export default function CreateTour({ dates, dcr, ActiveDcr }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const sizes = ["5xl"];

  const { AreasOption, allProdRate, user, allArea } = useGlobalContext();

  const Pro2 = allProdRate?.proRateData?.map((i) => i.ProductName);

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  const [formData, setFormData] = React.useState({
    Date: "",
    workWith: "",
    area: "",
    Activity: "",
    ExpectedBuisness: "",
    createdAt: new Date().toISOString().slice(0, 10),
    DcrId: "",
    Act: true,
    Apv: true,
    submited: true,
  });

  formData.DcrId = dcr;

  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Date) {
      newErrors.Date = "Date is required";
    }
    if (!formData.workWith) {
      newErrors.workWith = "workWith is required";
    }
    if (formData.area.length === 0) {
      newErrors.area = "area Name is required";
    }
    if (!formData.Activity) {
      newErrors.Activity = "Activity is required";
    }
    if (!formData.ExpectedBuisness) {
      newErrors.ExpectedBuisness = "ExpectedBuisness is required";
    }
    if (!formData.DcrId) {
      newErrors.DcrId = "DcrId is required";
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

  const [dataTour, setDataTour] = React.useState([]);

  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;

  useEffect(() => {
    getDataTour();
  }, []);

  const getDataTour = () => {
    axios
      .get(`${Server}/add/tourDateUser/${dcr}`)
      .then((res) => {
        setDataTour(res.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const apiUrl = `${Server}/add/tourDate`;
      setIsLoading(true);
      setHasError(false);

      axios
        .post(apiUrl, formData)
        .then((response) => {
          const responseData = response.data;
          setResponse(responseData);
          toast.success(`${response?.data?.message}`);
          setLoading(true);
        })
        .catch((error) => {
          setHasError(true);
          toast.error(error?.response?.data?.message);
        })
        .finally(() => {
          setIsLoading(false);
          setFormData({
            Date: "",
            workWith: "",
            area: "",
            Activity: "",
            ExpectedBuisness: "",
            createdAt: "",
            DcrId: "",
          });
          getDataTour();
        });
    } else {
      toast.error("Please fill All Details");
    }
  };

  const DatesCompleted = dataTour?.map((i) => i.Date);

  const newArrayDates = [
    ...dates.filter((element) => !DatesCompleted.includes(element)),
    ...DatesCompleted.filter((element) => !dates.includes(element)),
  ];

  const handleSendApproval = (id, status) => {
    const Server = process.env.NEXT_PUBLIC_SERVER_NAME;

    const apiUrl = `${Server}/add/tour/${id}`;
    setIsLoading(true);
    setHasError(false);

    axios
      .put(apiUrl, { SendToApproved: status })
      .then((response) => {
        const responseData = response.data;
        setResponse(responseData);

        toast.success(
          status === true
            ? "Request To Appove Sended "
            : "Request To UnAppove Sended ! "
        );
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
          area: "",
          DcrId: "",
        });

        onClose();
      });
  };

  return (
    <>
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

      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <>
            <div className="flex flex-row gap-4" key={size}>
              {dcr ? (
                <>
                  <Button
                    onClick={() => handleOpen(size)}
                    className="text-xs font-semibold bg-gray-100 p-2 rounded-lg"
                  >
                    + Add Program
                  </Button>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button className="text-white bg-black font-semibold ">
                        Sent To Approve
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Dropdown Variants"
                      color="default"
                      variant="solid"
                    >
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="default"
                      >
                        <div className="flex flex-row gap-3 ">
                          <p
                            onClick={() =>
                              handleSendApproval(ActiveDcr._id, true)
                            }
                            className="bg-black text-[10px] rounded-lg text-white p-1.5"
                          >
                            Send Approval
                          </p>
                          <p
                            onClick={() =>
                              handleSendApproval(ActiveDcr._id, false)
                            }
                            className="bg-black text-[10px] rounded-lg text-white p-1.5 "
                          >
                            UnSend Approval
                          </p>
                        </div>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </>
              ) : (
                <p className="text-sm font-bold ">No Program Created..</p>
              )}
            </div>
          </>
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
                Add Doctor 👨‍⚕️
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4 justify-center items-center">
                  <div className="grid lg:grid-cols-2 grid-cols-1  gap-4">
                    <div className="flex flex-col justify-center ">
                      <p className="text-sm p-1">Select Date</p>
                      <select
                        className="outline-none font-semibold text-gray-600 border-1 bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                        id="Date"
                        name="Date"
                        value={formData.Date}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Date</option>
                        {newArrayDates?.map((i) => {
                          return (
                            <>
                              <option key={i} value={i}>
                                {i}
                              </option>
                            </>
                          );
                        })}
                      </select>
                      {errors.Date && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.Date}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <p className="text-sm p-1 text-gray-600">Select Area</p>
                      <select
                        className="outline-none font-semibold text-gray-600 border-1 bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Area</option>
                        {allArea?.areaData?.data?.map((i) => {
                          return (
                            <>
                              <option key={i} value={[i.AreaName, i.Type]}>
                                {i.AreaName}
                              </option>
                            </>
                          );
                        })}
                      </select>
                      {errors.area && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.area}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <p className="text-sm p-1">Select Activity !</p>
                      <select
                        className="outline-none font-semibold text-gray-600 border-1 bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                        id="Activity"
                        name="Activity"
                        value={formData.Activity}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Activity</option>

                        <option value="working">Working</option>
                        <option value="Holiday">Holiday</option>

                        <option value="Administration">Administration</option>
                        <option value="Metting">Meeting</option>
                      </select>
                      {errors.Activity && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.Activity}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <p className="text-sm p-1">Select Workwith !</p>
                      <select
                        className="outline-none font-semibold text-gray-600 border-1 bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                        id="workWith"
                        name="workWith"
                        value={formData.workWith}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Workwith</option>
                        <option value="Independent">Independent</option>
                        <option value="Sale manager">Sale manager</option>
                        <option value="Buisness Devlopment Executive">
                          Buisness Devlopment Executive
                        </option>
                        <option value="Zonal Sales Manager">
                          Zonal Sales Manager
                        </option>
                        <option value="Area Buisness Manager">
                          Area Buisness Manager
                        </option>
                        <option value="Reginol Sales Manager">
                          Reginol Sales Manager
                        </option>
                      </select>
                      {errors.Activity && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.Activity}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <Input
                        type="text"
                        label="ExpectedBuisness"
                        name="ExpectedBuisness"
                        value={formData.ExpectedBuisness}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.ExpectedBuisness && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.ExpectedBuisness}
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
      <div className="flex justify-center items-center mb-16">
        <TourDateList dataTour={dataTour} getDataTour={getDataTour} />
      </div>
    </>
  );
}
