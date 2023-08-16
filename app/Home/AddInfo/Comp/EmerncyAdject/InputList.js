import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";

export default function InputList({ setInputList, inputList }) {
  const handleInputChange = (index, inputType, value) => {
    const newList = [...inputList];
    newList[index][inputType] = value;
    setInputList(newList);
  };

  const [errors, setErrors] = React.useState([]);
  const handleAddInput = () => {
    if (
      !inputList.some(
        (input) => input.MainPro === "" || input.FreeProduct === ""
      )
    ) {
      setInputList([
        ...inputList,
        { id: Date.now(), MainPro: "", FreeProduct: "" },
      ]);
      setErrors([]);
    } else {
      setErrors(["Both fields are required"]);
    }
  };

  const handleDeleteInput = (index) => {
    const newList = inputList.filter((_, i) => i !== index);
    setInputList(newList);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-3 gap-3">
      <h1 className="text-gray-600 font-bold text-sm">
        Add schemes for Product !
      </h1>
      {inputList.map((input, index) => (
        <div
          key={input.id}
          className="flex flex-row justify-start items-center gap-2"
        >
          <Input
            type="number"
            value={input.MainPro}
            onChange={(e) =>
              handleInputChange(index, "MainPro", e.target.value)
            }
            className="rounded p-2 flex-1"
            placeholder="Main Product"
          />
          <Input
            type="number"
            value={input.FreeProduct}
            onChange={(e) =>
              handleInputChange(index, "FreeProduct", e.target.value)
            }
            className="rounded p-2 flex-1"
            placeholder="Free Product"
          />
          <Button type="button" onClick={() => handleDeleteInput(index)}>
            Remove ❌
          </Button>
        </div>
      ))}
      {errors.length > 0 && (
        <div className="text-red-500 mb-2">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <Button
        type="button"
        onClick={handleAddInput}
        className="bg-black text-white flex justify-start"
      >
        Add scheme ➕
      </Button>
    </div>
  );
}
