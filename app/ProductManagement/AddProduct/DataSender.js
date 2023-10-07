import React from "react";
import axios from "axios";

import { toast } from "react-toastify";
export default async function DataSender(
  event,
  productData,
  validateInputs,
  refechData
) {
  event.preventDefault();
  const ADDPRODUCT = `
  mutation Mutation($input: ProductInput!) {
    CreateProduct(input: $input) {
      product_name 
    }
  }
`;

  if (validateInputs()) {
    await axios
      .post(process.env.GRAPHQL_SERVER, {
        query: `${ADDPRODUCT}`,
        variables: {
          input: productData,
        },
      })
      .then((res) => {
        toast.success(
          `${res.data?.data?.CreateProduct?.product_name} Added Sucessfully`,
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
        console.log(err, "gql");
      })
      .finally(() => {
        refechData();
        console.log("done done done");
      });
  }
  return;
}
