"use client";
import Sidebar from "@/utils/Sidebar/Sidebar";
import React, { useEffect, useLayoutEffect } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";

import store from "@/ReduxToolkit/Store";
import { NextUIProvider } from "@nextui-org/react";
import AllDataContext from "./DataContext/AllData/AllDataContext";
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <NextUIProvider>
          <Provider store={store}>
            <AllDataContext>
              <Sidebar />
              <div className="flex  justify-center items-center">
                {children}
              </div>
            </AllDataContext>
          </Provider>
        </NextUIProvider>
      </body>
    </html>
  );
}
