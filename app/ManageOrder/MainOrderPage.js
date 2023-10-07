import React from "react";
import OrderTableList from "./Component/OrderTableList";
import { ToastContainer } from "react-toastify";
export default function MainOrderPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10">
        <ToastContainer />
        <OrderTableList />
      </div>
    </>
  );
}
