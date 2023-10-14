import Image from "next/image";

import logo from "../../../public/sbt.png";
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from "@nextui-org/react";
export default function OrderInvoice({ order }) {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>

      <div ref={componentRef} class="max-w-3xl mx-auto p-6 bg-white rounded shadow-sm my-6">
        <div class="grid grid-cols-2 items-center">
          <div>
            {/* <!--  Company logo  --> */}
            <Image src={logo} width={0} height={0} className="w-24" />
          </div>

          <div class="text-right">
            <p>Smart Soil Booster Technology.Pvt.Ltd.</p>
            <p class="text-gray-500 text-sm">soilbooster717@gmail.com</p>
            <p class="text-gray-500 text-sm mt-1">
              +91-9822688926/+91-9730866263
            </p>
          </div>
        </div>

        {/* <!-- Client info --> */}
        <div class="grid grid-cols-2 items-center mt-8">
          <div>
            <p class="font-bold text-gray-800">Bill to :</p>
            <p class="text-gray-500">
              {order?.name}
              <p class="text-gray-500">{order?.email}</p>

              {order?.address?.map((i) => {
                return (
                  <>
                    <p className="inline-flex flex-wrap text-sm gap-1 ">
                      <span>{i.state}</span>
                      <span>{i.city}</span>
                      <span>{i.pincode}</span>
                      <span>{i.deliveryAddress}</span>
                      <span className="text-sm font-bold text-black">+91{i.referenceMobileNumber}</span>
                    </p>
                  </>
                );
              })}
            </p>
          </div>

          <div class="text-right">
            <p class="">
              Invoice number:
              <span class="text-gray-500">{order?.orderid}</span>
            </p>
            <p>
              Invoice date:{" "}
              <span class="text-gray-500">{order?.createdAt}</span>
              <br />
              Time:<span class="text-gray-500">{order?.time}</span>
            </p>
          </div>
        </div>

        {/* <!-- Invoice Items --> */}
        <div class="-mx-4 mt-8 flow-root sm:mx-0">
          <table class="min-w-full">
            {/* <colgroup>
        <col class="w-full sm:w-1/2">
        <col class="sm:w-1/6">
        <col class="sm:w-1/6">
        <col class="sm:w-1/6">
      </colgroup> */}
            <thead class="border-b border-gray-300 text-gray-900">
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Items
                </th>
                <th
                  scope="col"
                  class="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  class="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Price
                </th>
                <th
                  scope="col"
                  class="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {order?.productsDetails?.map((i) => {
                return (
                  <>
                    <tr class="border-b border-gray-200">
                      <td class="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div class="font-medium text-gray-900">{i.product}</div>
                        <div class="mt-1 truncate text-gray-500">
                          {i?.selWght}
                          {i?.form === "solid" ? "kg" : "Ltr"}
                        </div>
                      </td>
                      <td class="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                        {i?.selWght}
                        {i?.form === "solid" ? "kg" : "Ltr"} / {i?.qnt}
                      </td>
                      <td class="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                        ₹{i?.selPrice}
                      </td>
                      <td class="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                        ₹{Number(i?.qnt) * Number(i?.selPrice)}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th
                  scope="row"
                  colspan="3"
                  class="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                >
                  Shipping Charges
                </th>
                <th
                  scope="row"
                  class="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                >
                  Shipping Charges
                </th>
                <td class="pl-3 pr-6 pt-4 text-right text-xs text-gray-500 sm:pr-0">
                  {process.env.SHIPPING}
                </td>
              </tr>
              {/*   <tr>
                <th
                  scope="row"
                  colspan="3"
                  class="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                >
                  Discount
                </th> */}
              {/* <th
                  scope="row"
                  class="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                >
                  Discount
                </th> */}
              {/* <td class="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                  - 10%
                </td> 
              </tr>*/}
              <tr>
                <th
                  scope="row"
                  colspan="3"
                  class="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
                >
                  Total
                </th>
                <th
                  scope="row"
                  class="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                >
                  Total
                </th>
                <td class="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">
                  ₹{Number(order?.totalAmount)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* <!--  Footer  --> */}
        <div class="border-t-2 pt-4 text-xs text-gray-500 text-center mt-16">
          Thank you for Purchase !
        </div>
      </div >
      <div className="flex justify-center items-center ">
        <Button onClick={handlePrint}>Print Invoice</Button>
      </div>
    </>
  );
}
