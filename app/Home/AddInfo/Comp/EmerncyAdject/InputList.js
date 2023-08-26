import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
export default function InputList({ setInputList, inputList, isSelected }) {
  const { allProdRate } = useGlobalContext();

  const handleInputChange = (index, inputType, value) => {
    const newList = [...inputList];
    newList[index][inputType] = value;
    setInputList(newList);
  };

  const proData = allProdRate?.proRateData;

  const [errors, setErrors] = React.useState([]);

  const handleAddInput = () => {
    if (
      !inputList.some(
        (input) =>
          input.Product === "" || input.Qnt === "" || input.value === " "
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
    <>
      {isSelected === true ? (
        <div className="flex flex-col justify-center items-center mt-5 gap-3">
          <h1 className="text-gray-600 font-bold text-sm">Add POB!</h1>
          {inputList.map((input, index) => (
            <div
              key={input.id}
              className="flex flex-col justify-start items-center gap-2"
            >
              <select
                className="outline-none font-semibold text-gray-600 border-1 border-gray-300  bg-transparent text-small w-[300px] h-[50px] rounded-lg bg-gray-200 p-2"
                id="Chem"
                name="Chem"
                value={input.Product}
                onChange={(e) =>
                  handleInputChange(index, "Product", e.target.value)
                }
                required
              >
                <option value="">Select product</option>
                {proData?.map((i) => {
                  return (
                    <>
                      <option key={i} value={i.ProductName}>
                        {i.ProductName} | PTS : {i.PTS}
                      </option>
                    </>
                  );
                })}
              </select>

              <Input
                type="number"
                name="Qnt"
                value={input.Qnt}
                onChange={(e) =>
                  handleInputChange(index, "Qnt", e.target.value)
                }
                className="rounded p-2 flex-1"
                placeholder="Quantity..."
              />
              <div className="flex flex-col justify-start items-center gap-2">
                <Input
                  type="number"
                  name="value"
                  value={input.value}
                  onChange={(e) =>
                    handleInputChange(index, "value", e.target.value)
                  }
                  className="rounded p-2 flex-1"
                  placeholder="PTS.."
                />
              </div>
              {/* <Input
                type="number"
                value={input.value}
                onChange={(e) =>
                  handleInputChange(index, "value", e.target.value * 2)
                }
                className="rounded p-2 flex-1"
                placeholder="value.."
              /> */}

              <Button
                type="button"
                className="text-sm text bg-black text-white"
                onClick={() => handleDeleteInput(index)}
              >
                🗑️Remove
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
            className="bg-black text-white text-sm flex justify-start"
          >
            Another Product ➕
          </Button>
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
}
