import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/react";
export default function DeleteProduct({ id, refechData }) {
  const DELETEPRODUCT = `
  mutation Mutation($id: String!) {
    deleteProduct(_id: $id) {
      product_name
    }
  }
`;

  const DeleteDataToTheDatabase = async (
    event,
    id,
    DELETEPRODUCT,
    refechData
  ) => {
    event.preventDefault();

    await axios
      .post(process.env.GRAPHQL_SERVER, {
        query: `${DELETEPRODUCT}`,
        variables: {
          id: id,
        },
      })
      .then((res) => {
        toast.success(
          `${res?.data?.data?.deleteProduct?.product_name} product deleteed`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: false,
            theme: "light",
            style: {
              borderRadius: 10,
              font: "bold",
              fontSize: 15,
            },
          }
        );
      })
      .catch((err) => {
        if (err) {
          toast.error("something Went Wrong", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: false,
            theme: "light",
            style: {
              borderRadius: 10,
              font: "bold",
              fontSize: 15,
            },
          });
        }
      })
      .finally(() => {
        refechData();
      });
  };

  return (
    <>
      <Button
        size="sm"
        onClick={(event) =>
          DeleteDataToTheDatabase(event, id, DELETEPRODUCT, refechData)
        }
        className=" gap-2 bg-black  hover:bg-black  capitalize text-sm text-white"
      >
        Remove
      </Button>
    </>
  );
}
