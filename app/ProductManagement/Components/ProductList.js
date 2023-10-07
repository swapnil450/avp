"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  Button,
  Pagination,
  TableCell,
} from "@nextui-org/react";
import UpdateProduct from "../UpdateProduct/UpdateProduct";
import DeleteProduct from "../DeleteProduct";
export default function ProductList({ data, refechData, loading }) {
  const [page, setPage] = React.useState(1);

  const DataPerPage = 10;

  const LastIndex = DataPerPage * page;
  const Firstindex = LastIndex - DataPerPage;

  const SlicedData = data?.slice(Firstindex, LastIndex)
  const TotalData = data?.length;
  const TotalPage = Math.ceil(TotalData / DataPerPage);

  // const setLastData = (last) => {
  //   setLast(last);
  //   setFirst(0);
  // };

  // const GetAllData = (last) => {
  //   setFirst(0);
  //   setLast(last);
  // };

  // if (loading) {
  //   return (
  //     <div>
  //       <Spinner />
  //     </div>
  //   );
  // }

  const columnsToShow = [
    "product_name",
    "type",
    "price",
    "form",
    "stock",
    "off",
    "shipping",
    "Actions",
  ];

  return (
    <>
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
            {SlicedData?.map((item) => (
              <TableRow
                className="p-2 hover:bg-gray-100 cursor-pointer"
                key={item?._id}
              >
                {columnsToShow.map((columnKey) => (
                  <TableCell
                    className=" hove:text-black hover:font-semibold cursor-pointer"
                    key={columnKey}
                  >
                    {columnKey === "Actions" ? (
                      <div className="flex flex-row justify-center items-center gap-3">
                        <UpdateProduct
                          productId={item?._id}
                          ProductData={item ? item : item}
                          refechData={refechData}
                        />
                        <DeleteProduct id={item?._id} refechData={refechData} />
                      </div>
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
    </>
  );
}
