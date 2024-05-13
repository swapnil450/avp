"use client";
import React from "react";
import { useState } from "react";
import logo from "../../public/sbt.png"
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
export default function Sidebar() {
  const Router = useRouter();
  const path = usePathname();
  const TabNames = [
    // {
    //   name: "DashBoard",
    //   icon: "https://img.icons8.com/windows/32/home.png",
    //   url: "/",
    // },
    {
      name: "Manage_Services",
      icon: "https://img.icons8.com/ios/50/purchase-order.png",
      url: "/Product",
    },
    // {
    //   name: "Manage_Order",
    //   icon: "https://img.icons8.com/ios/50/purchase-order.png",
    //   url: "/Order",
    // },
    // {
    //   name: "Mangement_User",
    //   icon: "https://img.icons8.com/ios/50/user--v1.png",
    //   url: "/Users",
    // },
    // {
    //   name: "Setting",
    //   icon: "https://img.icons8.com/ios/50/settings--v1.png",
    //   url: "/",
    // },
  ];
  const [tab, setTab] = useState("Home");


  function deleteFromLocalStorage(key) {
    localStorage.removeItem("user");
    window.location.reload();
  }
  return (
    <>
      <div className="  left-0 h-screen flex flex-col justify-start gap-10 bg-white shadow-lg p-5 rounded-lg w-1/6 items-center">
        <div className="flex flex-row gap-2 justify-center p-3 rounded-lg  text-black  font-body items-center m-1  ">

          <p className="font-semi-bold text-xl ">ADMIN LISTING</p>
        </div>

        <div className="flex flex-col  gap-5  bottom-8 justify-center text-center ">
          {TabNames?.map((key) => {
            return (
              <>
                <div
                  key={key?.name}
                  onClick={() => Router.push(`${key?.url}`)}
                  className={
                    path === key.url
                      ? `flex flex-row  text-center  rounded-[15px] bg-black text-white gap-2 hover:bg-black p-2 hover:text-white cursor-cell hover:animate-pulse`
                      : `flex flex-row  text-center  rounded-[15px] bg-gray-50 text-black gap-2 hover:bg-black p-2 hover:text-white cursor-cell hover:animate-pulse `
                  }
                >
                  {/* <Image src={`${key.icon}`} width={25} height={0} /> */}
                  <p className="text-sm font-bold p-1">{key.name}</p>
                </div>
              </>
            );
          })}
        </div>
        {/* 
        <div className="flex justify-center items-start w-full relative bottom-7 bg-black h-[110px] rounded-[20px] ">
          <div className="flex flex-col gap-1 ">
            <div className="flex flex-row mt-2 gap-2">
              <p className="text-[22px] font-bold font-mono mt-2  text-white">
                30%
              </p>

              <p className="text-[16px] font-bold font-mono mt-3  text-black">
                Discount!
              </p>
            </div>
            <div className="flex flex-col ">
              <p className="text-[16px] font-bold  mt-1  text-black">
                Book Your Ticket Fast
              </p>
            </div>
          </div>
        </div> */}

        <div
          onClick={deleteFromLocalStorage}
          className="flex flex-row  rounded-[15px] gap-2 mr-12 cursor-pointer hover:animate-pulse "
        >
          <img
            src="https://img.icons8.com/ios-glyphs/30/null/logout-rounded-left.png"
            className="w-6   h-6 m-0.5"
          />
          <p className="text-sm font-bold text-gray-500 hover:text-black mt-1">
            Logout
          </p>
        </div>
      </div>
    </>
  );
}
