"use client";
import React, { useState, useEffect } from "react"; // Import useState from "react"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react"; // Remove Button import since it's not used
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
  User,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSideBarTab } from "@/ReduxToolkit/Slices/UiCompSlice/SideBarTab";
const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

const tabs = [
  { name: "Dashboard", link: "/" },
  { name: "Details", link: "/Tabs" },
  { name: "Tour Program", link: "/TourProgram" },
];

const logout = () => {
  localStorage?.removeItem("user");
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

const user =
  typeof localStorage !== "undefined"
    ? JSON.parse(localStorage?.getItem("user"))
    : null;

export default function App() {
  const [active, setActive] = useState("DashBoard");

  // handle scroll behaviour when scroll to stick navbar top position and fixed

  const dispatch = useDispatch();
  const controll = (i) => {
    dispatch(setSideBarTab);
    setActive(i);
  };
  const taba = useSelector((state) => {
    return state.SideBarTab;
  });

  return (
    <>
      <Navbar className="h-[60px] " isBordered isBlurred={false}>
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">Avirosa</p>
        </NavbarBrand>
        {/* <NavbarContent
          className="sm:flex  lg:flex lg:flex-row hidden  gap-8"
          justify="center"
        >
          {tabs.map((tab) => (
            <NavbarItem key={tab.name}>
              <Link
                onClick={() => controll(tab.name)}
                color="foreground"
                href={tab.link}
                className={
                  active === tab.name ? "border-b-4 border-primary" : ""
                }
              >
                {tab.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent> */}
        <NavbarContent
          className="  flex justify-center items-center"
          justify="end"
        >
          <NavbarItem>
            <div className="flex items-center gap-4">
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      src: "",
                      alt: "A",
                    }}
                    className="transition-transform"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem key="logout" color="danger">
                    <p className="text-xs font-bold">{user?.empName}</p>
                    <p className="text-xs ">{user?.post}</p>
                    <p className="text-[11px] ">{user?.email}</p>
                  </DropdownItem>
                  <DropdownItem onClick={logout} key="logout" color="danger">
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}
