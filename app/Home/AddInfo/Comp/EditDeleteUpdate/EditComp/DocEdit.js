"use client";
import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import edit from "../../../../../icons/edit.webp";
import del from "../../../../../icons/delete-outline.webp";
import Image from "next/image";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
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

export default function DocEdit({ item }) {
  const Server = process.env.NEXT_PUBLIC_SERVER_NAME;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const sizes = ["5xl"];
  const { AreasOption, allProdRate } = useGlobalContext();

  const Pro2 = allProdRate?.proRateData?.map((i) => i.ProductName);
  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  const [formData, setFormData] = React.useState({
    DoctorCode: "",
    DoctorName: "",
    Speciality: "",
    Degree: "",
    mobile: "",
    address: "",
    Dob: "",
    Doa: "",
    P1: "",
    P2: "",
    Area: "",
  });

  React.useEffect(() => {
    // Destructure the properties from the 'item'
    const {
      DoctorCode,
      DoctorName,
      Speciality,
      Degree,
      mobile,
      address,
      Dob,
      Doa,
      P1,
      P2,
      Area,
    } = item || {};

    // Update the 'formData' state with the values from 'item'
    setFormData({
      DoctorCode,
      DoctorName,
      Speciality,
      Degree,
      mobile,
      address,
      Dob,
      Doa,
      Area,
      P1,
      P2,
    });
  }, [item]); // Dependency array with 'item'
  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.DoctorCode) {
      newErrors.DoctorCode = "Doctor Code is required";
    }
    if (!formData.DoctorName) {
      newErrors.DoctorName = "Doctor Name is required";
    }
    if (!formData.mobile) {
      newErrors.mobile = "Mobile No. is required";
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
    }
    if (!formData.Degree) {
      newErrors.Degree = "Degree is required";
    }
    if (!formData.Speciality) {
      newErrors.Speciality = "Speciality is required";
    }

    if (!formData.Area) {
      newErrors.Area = "Area is required";
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

  const handleSubmit = (idparam) => {
    if (validateForm()) {
      const apiUrl = `${Server}/add/doc/${idparam}`;
      setIsLoading(true);
      setHasError(false);

      axios
        .put(apiUrl, formData)
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
        });
    } else {
      toast.error("Please fill All Details");
    }
  };

  const handleDelete = (idparam) => {
    const apiUrl = `${Server}/add/doc/${idparam}`;
    setIsLoading(true);
    setHasError(false);

    axios
      .delete(apiUrl, formData)
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
          <div key={size} className="flex flex-row justify-center items-center">
            <Image
              onClick={() => handleOpen(size)}
              className="cursor-pointer"
              src={edit}
              width={20}
              height={20}
              alt="icons"
            />
            <Image
              className="cursor-pointer"
              src={del}
              width={20}
              height={20}
              alt="icons"
              onClick={() => handleDelete(item._id)}
            />
          </div>
        ))}
      </div>
      <Modal
        size={size}
        isOpen={isOpen}
        scrollBehavior={`inside`}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Doctor 👨‍⚕️
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4 justify-center items-center">
                  <div className="grid lg:grid-cols-2 grid-cols-1  gap-4">
                    <div className="flex flex-col justify-center ">
                      <Input
                        type="text"
                        label="Doctor Code"
                        name="DoctorCode"
                        value={formData.DoctorCode}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.DoctorCode && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.DoctorCode}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <Input
                        type="text"
                        label="Doctor Name"
                        name="DoctorName"
                        value={formData.DoctorName}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.DoctorName && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.DoctorName}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <Input
                        type="tel"
                        label="Mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.mobile && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.mobile}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <Input
                        type="text"
                        label="Degree.."
                        name="Degree"
                        value={formData.Degree}
                        onChange={handleInputChange}
                      />
                      {errors.Degree && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.Degree}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ">
                      <Input
                        type="text"
                        label="Speciality ... "
                        name="Speciality"
                        value={formData.Speciality}
                        onChange={handleInputChange}
                      />{" "}
                      {errors.Speciality && (
                        <p className="text-red-500  text-xs p-1">
                          {errors.Speciality}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-center flex-col">
                      <label className="text-sm p-1"> Date Of Birth</label>
                      <Input
                        type="date"
                        label=""
                        name="Dob"
                        value={formData.Dob}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex justify-center flex-col">
                      <label className="text-sm p-1">Date Of Anivarsery</label>
                      <Input
                        type="date"
                        label=""
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col justify-center ">
                      <select
                        className="outline-none font-semibold text-gray-600 border-0 bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                        id="Area"
                        name="Area"
                        value={formData.Area}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Area</option>
                        {AreasOption?.map((i) => {
                          return (
                            <>
                              <option value={i}>{i}</option>
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

                    <div className="flex flex-col justify-center ">
                      <p className="text-sm p-1">Product 1</p>
                      <select
                        className="outline-none font-semibold text-gray-600 border-0 bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                        id="Area"
                        name="P1"
                        value={formData.P1}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Product</option>
                        {Pro2?.map((i) => {
                          return (
                            <>
                              <option key={i} value={i}>
                                {i}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>

                    <div className="flex flex-col justify-center ">
                      <p className="text-sm p-1">Product 2</p>
                      <select
                        className="outline-none font-semibold text-gray-600 border-0 bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                        id="P2"
                        name="P2"
                        value={formData.P2}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Product</option>
                        {Pro2?.map((i) => {
                          return (
                            <>
                              <option key={i} value={i}>
                                {i}
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
                  <>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          color="danger"
                          variant="solid"
                          className="capitalize"
                        >
                          Delete user
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
                          color="danger"
                          onClick={() => handleDelete(item._id)}
                        >
                          Confirm Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>

                    <Button
                      color="black"
                      className="bg-black text-white"
                      onClick={() => handleSubmit(item._id)}
                    >
                      Save
                    </Button>
                  </>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
