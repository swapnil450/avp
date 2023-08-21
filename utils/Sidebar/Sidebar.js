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
      <Navbar
       className="h-[60px] "
        isBordered
        isBlurred={false}
      >
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">Avirosa</p>
        </NavbarBrand>
        <NavbarContent
          className="sm:flex lg:block lg:flex lg:flex-row hidden  gap-8"
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
        </NavbarContent>
        <NavbarContent
          className="lg:hidden  flex justify-center items-center"
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
                      src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                    }}
                    className="transition-transform"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-bold">Signed in </p>
                  </DropdownItem>
                  <DropdownItem key="settings">My Settings</DropdownItem>
                  <DropdownItem key="team_settings">Permissions</DropdownItem>

                  <DropdownItem key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger">
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
