"use client";
import React, { useState } from "react";
import ProductList from "./Components/ProductList";

import AddProduct from "./AddProduct/AddProduct";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "@nextui-org/react";
import { useQuery, gql } from "@apollo/client";

export default function ProductManagement() {

  // const [loading, setLoading] = useState(false);
  const [refechData, setRefechData] = useState(null);

  const PRODUCT = gql`
    query Query {
      products {
        _id
        product_name
        price
        form
        stock
        type
        off
        shipping
        description
        praman
        main_ingredient
        Quantity
        pricelist
        Advantages
        review
        image
      }
    }
  `;
  const { data, loading, refetch } = useQuery(PRODUCT);

  if (loading === true) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      </>
    )
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        progress={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex flex-col mt-2 gap-10 justify-center items-center">
        <AddProduct refetch={refetch} />
        <ProductList
          data={data?.products}
          loading={loading}
          refechData={refetch}
        />

      </div>
    </>
  );
}
