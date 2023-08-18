"use client";
import React, { useState } from "react"; // Import useState from "react"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
} from "@nextui-org/react"; // Remove Button import since it's not used
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
      <Navbar className="h-[60px]" isBordered isBlurred={false}>
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">Avirosa</p>
        </NavbarBrand>
        <NavbarContent className="sm:flex flex flex-row gap-8" justify="center">
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
        <NavbarContent justify="end">
          {/* <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem> */}
        </NavbarContent>
      </Navbar>
    </>
  );
}
