

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
import DocEdit from "@/app/Home/AddInfo/Comp/EditDeleteUpdate/EditComp/DocEdit";
import { useQuery, gql } from "@apollo/client";
export default function ListOfDoc({
  limitData,
  setLimitData,
  AreaValue,
  search,
  Active,
}) {
  const { user } = useGlobalContext();

  const [page, setPage] = React.useState(1);
  const [last, setLast] = React.useState(30);
  const [first, setFirst] = React.useState(0);

  const DataPerPage = 10;

  const LastIndex = DataPerPage * page;
  const FirstIndex = LastIndex - DataPerPage;
  const GET_DOCTOR_DATA = gql`
    query DoctorData($first: Int, $last: Int, $area: [String]) {
      Doctor(first: $first, last: $last, Area: $area) {
        lengthData

        Doctor {
          _id
          DoctorCode
          DoctorName
          HosName
          mobile
          address
          Area
          Degree
          Speciality
          Dob
          Doa
          P1
          P2
          approved
          createdBy
          createdAt
        }
      }
    }
  `;
  const { loading, error, refetch, data } = useQuery(GET_DOCTOR_DATA, {
    variables: {
      first: first,
      last: last,
      area: user?.selectedAreas,
    },
  });
  const PaginatedData = data?.Doctor?.Doctor;

  const getFiteredData = (search, AreaValue, PaginatedData) => {
    if (search && Active === "Doctor") {
      return PaginatedData?.filter((i) =>
        i?.DoctorName?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (AreaValue && Active === "Doctor") {
      const AreaWiseData = PaginatedData?.filter(
        (i) => i.Area === `${AreaValue}`
      );
      return AreaWiseData;
    }

    // if (valueAp === false && Active === "Doctor") {
    //   const ApvData = PaginatedData?.filter((i) => i.approved === false);
    //   return ApvData;
    // }

    return PaginatedData;
  };
  const DataFilteredAll = getFiteredData(search, AreaValue, PaginatedData);
  const DataFiltered = DataFilteredAll?.slice(FirstIndex, LastIndex);

  const TotalData = data?.Doctor?.lengthData;

  const TotalPage =
    search || AreaValue
      ? Math.ceil(DataFiltered?.length / DataPerPage)
      : Math.ceil(PaginatedData?.length / DataPerPage);

  const setLastData = (last) => {
    setLast(last);
    setFirst(0);
  };

  const GetAllData = (last) => {
    console.log(last, "last");
    setFirst(0);
    setLast(last);
  };

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const columnsToShow = ["DoctorName", "Area", "Actions"];

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
      <Table aria-label="User data table">
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
              {columnsToShow.map((columnKey) => (
                <TableCell
                  className=" hove:text-black hover:font-semibold cursor-pointer"
                  key={columnKey}
                >
                  {columnKey === "Actions" ? (
                    <div className="flex flex-row justify-center items-center gap-3">
                      <DocEdit
                        key={item?._id}
                        item={item ? item : item}
                        RefetchData={refetch}
                        DataFetch={GET_DOCTOR_DATA}
                      />
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
    </>
  );
}
