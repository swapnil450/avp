"use client";
import Sidebar from "@/utils/Sidebar/Sidebar";
import React, { useEffect, useState, Suspense } from "react";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import store from "@/ReduxToolkit/Store";
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import LoaderSuspense from "@/utils/Loader/LoaderSuspense";

const client = new ApolloClient({
  uri: `${process.env.GRAPHQL_SERVER}`,
  cache: new InMemoryCache(),
});

export default function RootLayout({ children }) {
  const [userData, setUserData] = useState({});
  // const [load, setLoad] = useState(false);

  useEffect(() => {
    const user =
      typeof localStorage !== "undefined"
        ? JSON.parse(localStorage?.getItem("user"))
        : null;
    setUserData(user);
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <Suspense fallback={<LoaderSuspense />}>
          <NextUIProvider>
            <Provider store={store}>
              <ApolloProvider client={client}>
                {/* <PrivateRoute> */}
                  <div className="flex  flex-row gap-1 justify-center items-start">
                    <Sidebar />

                    <div className="bg-gray-0 rounded-lg flex justify-center mt-2 items-center flex-1 m-2 ">
                      {children}
                    </div>
                  </div>
                {/* </PrivateRoute> */}
              </ApolloProvider>
            </Provider>
          </NextUIProvider>
        </Suspense>
      </body>
    </html>
  );
}
