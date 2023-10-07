import React from "react";
import UserList from "./Comp/UserList";
import { toast, ToastContainer } from "react-toastify";
export default function MainUser() {
    return (
        <>
            <ToastContainer />
            <UserList />
        </>
    );
}
