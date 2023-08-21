"use client";
import Sidebar from "@/utils/Sidebar/Sidebar";
import React, { useEffect, useLayoutEffect } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";

import store from "@/ReduxToolkit/Store";
import { NextUIProvider } from "@nextui-org/react";
import AllDataContext from "./DataContext/AllData/AllDataContext";
import TabBar from "@/utils/TabBar";
import Login from "./login/page";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <NextUIProvider>
          <Provider store={store}>
            <AllDataContext>
              {user ? (
                <>
                  <Sidebar />
                  <div className="flex justify-center items-center">
                    {children}
                  </div>

                  <TabBar />
                </>
              ) : (
                <Login />
              )}
            </AllDataContext>
          </Provider>
        </NextUIProvider>
      </body>
    </html>
  );
}
