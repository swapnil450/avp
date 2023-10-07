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
import DeleteUser from "../operation/DeleteUser";
// import SelectDate from "../utils/SelectDate";
// import LoadDataLimitor from "../utils/LoadDataLimitor";
// import ProcessOrder from "../Operations/ProcessOrder";
// import DeliveredOrder from "../Operations/DeliveredOrder";
// import DeleteOrder from "../Operations/DeleteOrder";
// import ViewOrder from "../Operations/ViewOrder";
export default function UserList() {
    // !!!! States
    const [last, setLast] = useState(20);

    const [page, setPage] = React.useState(1);

    // *********** Query data ************
    const GETALLPRODUCT = gql`
    query Query($first: Int, $last: Int) {
        user(first: $first, last: $last) {
          Data {
            acctype
            email
            mobile
            name
            _id
          }
          length
        }
      }
  `;

    const { data, loading, refetch } = useQuery(GETALLPRODUCT,
        {
            variables: {
                first: 0,
                last: last
            }
        });


    // ??????????? Data Convergion ????????????????????

    const DataOfOrder = data?.user?.Data;
    const TotalData = data?.user?.length;


    const DataPerPage = 20;

    const LastIndex = DataPerPage * page;
    const Firstindex = LastIndex - DataPerPage;

    const TotalPage = Math.ceil(TotalData / DataPerPage);

    // ~~~~~~~~ Functions ~~~~~~~~~~~~~

    const LoadMoreData = (page, setPage, setLast, last, DataPerPage) => {
        setPage(page)
        setLast(last + DataPerPage)
    }

    const DataFiltered = DataOfOrder?.slice(Firstindex, LastIndex);

    // !!!!!!!!!! Loading.......
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size={`lg`} />
            </div>
        );
    }

    const columnsToShow = [
        "email",
        "mobile",
        "name",
        "acctype",
        "Actions"
    ];

    return (
        <>
            <div className="flex flex-col justify-center items-center gap-10">
                <h1 className="text-black font-semibold">All Users List</h1>
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
                                onChange={(page) => LoadMoreData(page, setPage, setLast, last, DataPerPage)}
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
                                                <>
                                                    <DeleteUser id={item?._id} refetch={refetch} />
                                                </>

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
