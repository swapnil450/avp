"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  Button,
  Spinner,
  Chip,
  Pagination,
  TableCell,
} from "@nextui-org/react";
import { useQuery, gql } from "@apollo/client";
import SelectDate from "../utils/SelectDate";
import LoadDataLimitor from "../utils/LoadDataLimitor";
import ProcessOrder from "../Operations/ProcessOrder";
import DeliveredOrder from "../Operations/DeliveredOrder";
import DeleteOrder from "../Operations/DeleteOrder";
import ViewOrder from "../Operations/ViewOrder";
export default function OrderTableList() {
  // !!!! States
  const [last, setLast] = useState(10);
  const [date, setDate] = React.useState(
    `${new Date()?.toJSON()?.slice(0, 10)?.split("-")?.reverse()?.join("/")}`
  );
  const [page, setPage] = React.useState(1);

  // *********** Query data ************
  const GETALLORDERS = gql`
    query Query($first: Int, $last: Int, $createdAt: String) {
      getAllOrders(first: $first, last: $last, createdAt: $createdAt) {
        length
        Data {
          PaymentMode
          _id
          active
          address {
            city
            deliveryAddress
            pincode
            referenceMobileNumber
            state
          }
          canceled
          canceledByUser
          createdAt
          delivered
          email
          name
          orderid
          month
          process
          productsDetails {
            form
            image
            price
            product
            qnt
            selPrice
            selWght
          }
          time
          totalAmount
        }
      }
    }
  `;

  const { data, loading, refetch } = useQuery(GETALLORDERS, {
    variables: {
      first: 0,
      last: last,
      createdAt: date,
    },
  });

  // ??????????? Data Convergion ????????????????????

  const DataOfOrder = data?.getAllOrders?.Data;
  const TotalData = data?.getAllOrders?.length;

  const DataPerPage = 10;

  const LastIndex = DataPerPage * page;
  const Firstindex = LastIndex - DataPerPage;

  const TotalPage = Math.ceil(TotalData / DataPerPage);

  // ~~~~~~~~ Functions ~~~~~~~~~~~~~

  const GetAllData = (GetAllData) => {
    setLast(Number(GetAllData));
  };

  const DataFiltered = DataOfOrder?.slice(Firstindex, LastIndex);

  // !!!!!!!!!! Loading..............
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size={`lg`} />
      </div>
    );
  }

  const columnsToShow = [
    "name",
    "createdAt",
    // "time",
    "email",
    "orderid",
    "Actions",
  ];

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="flex flex-row justify-center items-center gap-10">
          <SelectDate date={date} setDate={setDate} />
          <LoadDataLimitor
            setLast={setLast}
            last={last}
            loading={loading}
            GetAllData={GetAllData}
            TotalData={TotalData}
            DataPerPage={DataPerPage}
          />
        </div>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <Table
            bottomContent={
              <Pagination
                isCompact
                showControls
                siblings={2}
                size="sm"
                showShadow
                color="primary"
                className="flex flex-wrap"
                page={page}
                total={TotalPage}
                onChange={(page) => setPage(page)}
              />
            }
            aria-label="User data table"
          >
            <TableHeader>
              {columnsToShow.map((columnKey) => (
                <TableColumn key={columnKey}>{columnKey}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {DataFiltered?.map((item) => (
                <TableRow
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  key={item?._id}
                >
                  {columnsToShow?.map((columnKey) => (
                    <TableCell
                      className=" hove:text-black hover:font-semibold cursor-pointer"
                      key={columnKey}
                    >
                      {columnKey === "Actions" ? (
                        item?.canceledByUser === true ? (
                          <>
                            <div className="flex flex-row  justify-center items-center gap-3">
                              <Chip
                                className="text-sm text-black bg-gray-50 font-semibold"
                                size="sm"
                                color="warning"
                                variant="dot"
                              >
                                This Order is Cancelled By User{" "}
                              </Chip>
                              <ViewOrder order={item} />
                              <DeleteOrder id={item?._id} refetch={refetch} />
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-row justify-center items-center gap-3">
                            <ProcessOrder
                              id={item?._id}
                              process={item?.process}
                              loading={loading}
                              refetch={refetch}
                            />
                            <DeliveredOrder
                              id={item?._id}
                              deliver={item?.delivered}
                              loading={loading}
                              refetch={refetch}
                            />
                            <ViewOrder order={item} />
                            <DeleteOrder id={item?._id} refetch={refetch} />
                          </div>
                        )
                      ) : (
                        item[columnKey]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
