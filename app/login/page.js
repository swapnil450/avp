// import React from "react";
// import axios from "axios";

// import { useState } from "react";
// import "react-toastify/dist/ReactToastify.css";

// export default function Login(props) {
//   const [email, setEmail] = useState({
//     email: "",
//   });

//   const [otpver, setOtpver] = useState({
//     otp: "",
//   });

//   const handleChangeOtp = (event) => {
//     const { name, value } = event.target;
//     setOtpver((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setEmail((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const [show, setShow] = useState(true);
//   const [flag, setFlag] = useState(false);

//   console.log(show);
//   const handleSubmit = (email) => {
//     // Email validation regex pattern
//     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//     console.log(email);

//     if (!emailRegex.test(email)) {
//       // Show error message if email is not valid
//       toast.error("Invalid email address");
//       return;
//     }

//     axios
//       .post("http://localhost:4000/user/Signin/verify", { email: email })
//       .then((res) => {
//         toast.success(res.data.message);

//         setShow(false);
//       })

//       .catch((error) => {
//         toast.error(error.response?.data?.message);
//         console.log(error, "0");
//       });
//   };

//   const handleSubmitOtp = (email, otp) => {
//     console.log(typeof otp, typeof email, "otp");
//     if (!email || !otp) {
//       toast.error("Fill the Otp!");
//     } else {
//       axios
//         .post("http://localhost:4000/User/Signin", {
//           email,
//           pass,
//         })
//         .then((res) => {
//           axios
//             .get("http://localhost:4000/User/auth", {
//               headers: {
//                 Authorization: `Bearer ${res.data}`, // Use the tobyn the token variable here instead of res.data
//               },
//             })
//             .then((response) => {
//               // Handle the response from the /User/auth endpoint
//               const userData = JSON.stringify(response.data);
//               localStorage.setItem("user", userData);
//               toast.success("Sign in successful!");
//               SigninSuccesful();
//               setFlag(true);
//               setShow(false);
//             })
//             .catch((error) => {
//               // Handle any error that occurred during the request
//               toast.error(error?.response?.data.message);
//               console.log(error, "1st");
//             });
//         })
//         .catch((error) => {
//           // Handle any error that occurred during the request
//           toast.error(error?.response?.data?.message);
//           console.log(error);
//         });
//     }
//   };
//   function SigninSuccesful() {
//     setTimeout(() => {
//       window.location.replace("/");
//     }, 2000);
//   }

//   return (
//     <>
//       <div className="flex justify-center flex-col gap-5 mb-5 items-center">
//         <h3 className="text-lg font-bold">Log In!</h3>

//         {show === true ? (
//           <div className="flex justify-center items-center gap-5 flex-col ">
//             <div className="flex flex-col gap-2">
//               <label className="text-green-500 text-sm">Enter Email Id</label>
//               <input
//                 name="email"
//                 type="email"
//                 className="h-[50px] w-[300px] border border-1 border-black rounded-lg p-3"
//                 maxLength={60}
//                 onChange={handleChange}
//                 value={email.email}
//               />
//             </div>
//             <div className="flex items-center flex-col gap-5 justify-between">
//               <button
//                 onClick={() => handleSubmit(email.email)}
//                 className="hover:bg-red-500  bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               >
//                 Get Otp
//               </button>
//             </div>
//           </div>
//         ) : flag === false ? (
//           <>
//             <div className="flex justify-center items-center gap-5 flex-col ">
//               <div className="flex flex-col gap-2">
//                 <label className="text-green-500 text-sm">Enter Otp</label>
//                 <input
//                   name="otp"
//                   type="number"
//                   className="h-[50px]  border border-1 border-black rounded-lg p-3"
//                   maxLength={6}
//                   onChange={handleChangeOtp}
//                   value={otpver.otp}
//                 />
//                 {/* <label className="text-red-500 text-xs font-bold ">
//           {formError.email}
//         </label> */}
//               </div>
//               <div className="flex items-center flex-col gap-5  justify-between">
//                 <button
//                   onClick={() =>
//                     handleSubmitOtp(email.email, Number(otpver.otp))
//                   }
//                   className="hover:bg-red-500 shake bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 >
//                   Verify Otp
//                 </button>
//               </div>
//             </div>
//             <p className="text-black text-xs">
//               Don't have an account?{" "}
//               <span
//                 onClick={() => props?.setHandleChange(true)}
//                 className="text-blue-500 text-sm cursor-pointer"
//               >
//                 Sign Up
//               </span>
//             </p>
//           </>
//         ) : (
//           <div className="loader">
//             <div className="dot dot-1"></div>
//             <div className="dot dot-2"></div>
//             <div className="dot dot-3"></div>
//             <div className="dot dot-4"></div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Input, Button } from "@nextui-org/react";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const [user, setUser] = useState({
    userId: "",
    pass: "",
  });
  const [flag, setFlag] = useState(false);

  console.log(user);
  function handleinput(e) {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const HandleSignin = (userId, pass) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (userId.length < 1) {
      toast.error("User-Id not Entered");
    }

    if (pass?.length < 8) {
      toast.error("Password  be a 8 characters");
      return;
    } else {
      setFlag(true);
    }

    axios
      .post("http://localhost:4000/user/Signin", { userId, pass })
      .then((res) => {
        console.log(res, "rs");
        axios
          .get("http://localhost:4000/user/auth", {
            headers: {
              Authorization: `Bearer ${res.data}`, // Use the tobyn the token variable here instead of res.data
            },
          })
          .then((response) => {
            const userData = JSON.stringify(response.data);
            localStorage.setItem("user", userData);
            console.log(userData);
            toast.success("Sign in successful!");
          })
          .catch((error) => {
            // Handle any error that occurred during the request
            toast.error(error?.response.data.message);
            console.log(error, "1st");
          });
      })

      .catch((err) => {
        console.log(err);
        toast.error(err?.response.data.message);
      })
      .finally(() => {
        setTimeout(() => {
          setFlag(false);
          window.location.reload();
        }, 2000);
      });
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col w-3/1 gap-4 justify-center items-center  bg-white p-3 rounded-lg shadow-lg h-[300px] ">
          <h1 className="text-black font-semibold text-[18px]">Login Now !</h1>
          <form className="flex flex-col gap-4 w-[300px] ">
            <Input
              isRequired
              label="User-Id"
              placeholder="Enter your UserId"
              type="text"
              onChange={handleinput}
              value={user.userId}
              name="userId"
            />
            <Input
              isRequired
              label="Password"
              placeholder="Enter your password"
              onChange={handleinput}
              type="password"
              name="pass"
            />

            <div className="flex gap-2 justify-end">
              {flag ? (
                <Button
                  isLoading
                  className="bg-black text-white"
                  spinner={
                    <svg
                      className="animate-spin h-5 w-5 text-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        fill="currentColor"
                      />
                    </svg>
                  }
                >
                  Wait..
                </Button>
              ) : (
                <Button
                  color="black"
                  className="bg-black text-white"
                  onClick={() => HandleSignin(user.userId, user.pass)}
                >
                  Login Now
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
