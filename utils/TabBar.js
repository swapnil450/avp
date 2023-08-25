"use client";
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import img from "../public/home.webp";
import img1 from "../public/add.webp";
import img2 from "../public/tour.webp";
import img3 from "../public/report.webp";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSideBarTab } from "@/ReduxToolkit/Slices/UiCompSlice/SideBarTab";

export default function TabBar() {
  const [isSticky, setSticky] = React.useState(false);
  const [active, setActive] = useState("DashBoard");
  const dispatch = useDispatch();
  // handle scroll behaviour when scroll to stick navbar top position and fixed
  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const controll = (i) => {
    dispatch(setSideBarTab);
    setActive(i);
  };

  const tabs = [
    { name: "Dashboard", link: "/", icon: img },
    { name: "Approval", link: "/Tabs", icon: img1 },
    {
      name: "Tour Program",
      link: "/tour",
      icon: img2,
    },
    { name: "Reports", link: "/Reports", icon: img3 },
  ];

  const taba = useSelector((state) => {
    return state.SideBarTab;
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // get user data from localstorage
  // const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <main
        className={`flex   h-[60px]  justify-center items-center ${
          isSticky
            ? "fixed bottom-0 w-full rounded-t-xl bg-gray-100  shadow-lg"
            : " fixed bottom-0 w-full rounded-t-xl bg-gray-100  shadow-lg"
        }`}
      >
        <div className="flex flex-row gap-10 justify-center items-center">
          {tabs.map((tab) => (
            <>
              <div key={tab.link}>
                <Link
                  href={tab.link}
                  className="flex flex-col gap-1 justify-center items-center"
                >
                  <Image
                    onClick={() => controll(tab.name)}
                    href={tab.link}
                    alt="icon"
                    width={20}
                    height={20}
                    src={tab.icon}
                    className={
                      active === tab.name
                        ? " cursor-pointer "
                        : " cursor-pointer"
                    }
                  />
                  <p
                    onClick={() => controll(tab.name)}
                    color="foreground"
                    href={tab.link}
                    className={
                      active === tab.name
                        ? "border-b-2 text-[12px] border-black"
                        : "text-[10px]"
                    }
                  >
                    {tab.name}
                  </p>
                </Link>
              </div>
            </>
          ))}
        </div>
      </main>
    </>
  );
}
