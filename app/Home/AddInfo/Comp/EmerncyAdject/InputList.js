import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
export default function InputList({ setInputList, inputList }) {
  const { allProdRate } = useGlobalContext();
  const handleInputChange = (index, inputType, value) => {
    const newList = [...inputList];
    newList[index][inputType] = value;
    setInputList(newList);
  };
  console.log(allProdRate.proRateData);



  const [errors, setErrors] = React.useState([]);
  const handleAddInput = () => {
    if (
      !inputList.some(
        (input) =>
          input.Product === "" || input.Qnt === "" || input.value === ""
      )
    ) {
      setInputList([
        ...inputList,
        { id: Date.now(), Product: "", Qnt: "", value: "" },
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
            value={input.Product}
            onChange={(e) =>
              handleInputChange(index, "Product", e.target.value)
            }
            className="rounded p-2 flex-1"
            placeholder="Product"
          />
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

          <Input
            type="number"
            value={input.Qnt}
            onChange={(e) => handleInputChange(index, "Qnt", e.target.value)}
            className="rounded p-2 flex-1"
            placeholder="Quantity..."
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
