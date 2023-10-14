import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SignIn from "./login/SignIn";
import LoaderSuspense from "@/utils/Loader/LoaderSuspense";

function PrivateRoute({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage?.getItem("user")) || {};
    setUser(user);
  }, []);

  if (!user?.email) {
    return <LoaderSuspense />;
  } else {
    return user?.email && user?.acctype === "admin" ? children : <SignIn />;
  }
}

export default PrivateRoute;
