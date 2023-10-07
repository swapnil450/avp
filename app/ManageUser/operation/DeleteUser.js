import React, { useState } from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Chip,
    Spinner,
    Tooltip,
} from "@nextui-org/react";
import axios from "axios";
import { DeleteIcon } from "@/app/ProductManagement/icons/icons";
import { toast } from "react-toastify";

const DeleteData = `
mutation Mutation($id: String!) {
    DeleteUser(_id: $id) {
      message
      status
    }
  }
`;
const DeleteOrderById = async (id, refetch, setLoad) => {
    setLoad(true);
    await axios
        .post(process.env.GRAPHQL_SERVER, {
            query: `${DeleteData}`,
            variables: {
                id: String(id),
            },
        })
        .then((res) => {
            if (res?.data?.data?.DeleteUser?.status === true) {
                toast.info(`${res?.data?.data?.DeleteUser?.message}`, {
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
            el;
        })
        .catch((err) => { })
        .finally(() => {
            refetch();
            setLoad(false);
        });
};

export default function DeleteUser({ id, refetch }) {
    const [load, setLoad] = useState(false);
    return (
        <>
            <div className="flex flex-wrap gap-4">
                <Dropdown>
                    {load === true ? (
                        <Spinner size="sm" />
                    ) : (
                        <DropdownTrigger>
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </DropdownTrigger>
                    )}
                    <DropdownMenu aria-label="Example with disabled actions">
                        <DropdownItem
                            onClick={() => DeleteOrderById(id, refetch, setLoad)}
                            key="new"
                        >
                            Confirm Delete
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </>
    );
}
