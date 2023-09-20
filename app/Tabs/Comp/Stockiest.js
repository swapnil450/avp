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
import { useGlobalContext } from "@/app/DataContext/AllData/AllDataContext";
import { Spinner } from "@nextui-org/react";
import EditStock from "@/app/Home/AddInfo/Comp/EditDeleteUpdate/EditComp/EditStock";
import { useQuery, gql } from "@apollo/client";
export default function ListOfStock({
  limitData,
  setLimitData,
  AreaValue,
  search,
  Active,
}) {
  const [page, setPage] = React.useState(1);
  const [last, setLast] = React.useState(20);
  const [first, setFirst] = React.useState(0);

  const DataPerPage = 10;

  const LastIndex = DataPerPage * page;
  const FirstIndex = LastIndex - DataPerPage;

  const GET_STOCK_DATA = gql`
    query StockiestData {
      Stockiest(first:${
        limitData.first && Active === "Stockiest" ? limitData.first : first
      }, last:${
    limitData.last && Active === "Stockiest" ? limitData.last : last
  }) {
        lengthData
    Stockiest {
    _id
    Code
    contactPer
    Name
    mobile
    DLNo
    GSTNo
    DateOfBirth
    DateOfAni
    address
    Area
    Active
    createdBy
    approved
        } 
      }
    }`;

  const { loading, error, data, refetch } = useQuery(GET_STOCK_DATA);
  const PaginatedData = data?.Stockiest?.Stockiest;

  const getFiteredData = (search, AreaValue, PaginatedData) => {
    if (search && Active === "Stockiest") {
      return PaginatedData?.filter((i) =>
        i?.Name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return PaginatedData;
  };

  const DataFiltered = getFiteredData(search, AreaValue, PaginatedData)?.slice(
    FirstIndex,
    LastIndex
  );

  const TotalData = data?.Stockiest?.lengthData;
  const TotalPage =
    search || AreaValue
      ? Math.ceil(DataFiltered?.length / DataPerPage)
      : Math.ceil(PaginatedData?.length / DataPerPage);

  const setLastData = (last) => {
    setLast(last);
    setFirst(0);
  };

  const GetAllData = (last) => {
    setLimitData({
      first: 0,
      last: last,
    });
  };

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const columnsToShow = ["Name", "Area", "Actions"];
  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        <div className="flex flex-row gap-4">
          <Button
            onClick={() => setLastData(Number(last + 10))}
            size="sm"
            className="bg-black text-white"
          >
            Load More
          </Button>

          <Button
            onClick={() => GetAllData(TotalData)}
            size="sm"
            className="bg-black text-white"
          >
            {`Get All -${TotalData}`}
          </Button>
        </div>
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
      </div>
      <table className="border w-full text-start border-black ">
        <thead>
          <tr>
            <th className="border border-black  text-[10px] font-bold text-gray-800 ">
              Name
            </th>
            <th className="border border-black  text-[10px] font-bold text-gray-800 ">
              Area
            </th>
            <th className="border border-black  text-[10px] font-bold text-gray-800 ">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {DataFiltered?.map((item) => {
            return (
              <>
                <tr>
                  <td className="border border-black  text-[10px] p-2">
                    {item.Name}
                  </td>
                  <td className="border border-black   text-[10px] p-2">
                    {item.Area.map((i) => {
                      return (
                        <>
                          <p className="p-1 inline-flex justify-between flex-wrap bg-blue-100 rounded-lg text-black">
                            {i}
                          </p>
                        </>
                      );
                    })}
                  </td>
                  <td className="border border-black  text-[10px] p-2">
                    <EditStock
                      key={item?._id}
                      item={item ? item : item}
                      RefetchData={refetch}
                      DataFetch={GET_STOCK_DATA}
                    />
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
