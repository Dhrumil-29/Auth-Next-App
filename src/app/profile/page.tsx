"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState({ username: "", email: "" });
  useEffect(() => {
    const getData = async () => {
      try {
        const response: any = await axios.get("/api/users/me");

        const userData = response.data.userData;
        setUser({ username: userData.username, email: userData.email });

        // setUser({data.username,data.email})
      } catch (error) {
        console.log("error", error);
      }
    };
    getData();
  }, []);
  const logoutUser = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("logout successful");
      router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-5 py-5 lg:p-0">
      <div className="flex justify-center">
        <div className="w-full md:w-3/4 lg:w-7/12 flex flex-col justify-center py-16 lg:py-32 px-10 lg:px-20 relative">
          <div className="row border-2 border-red-200 rounded-2xl bg-slate-200 ">
            <div className="lg:w-10/12 md:w-9/12 xl:w-7/12 mx-auto">
              <div className="text-center mb-9">
                <span className="inline-block lg:block h1 mb-0 lg:mb-9 mr-3 lg:mr-10 text-5xl">
                  👋
                </span>
                <h1 className="font-bold">Hello, {user?.username}</h1>
                <p className="mt-2">How are you??</p>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  readOnly={true}
                  value={user.email}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-5">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={user.username}
                  readOnly={true}
                />
              </div>
              <div>
                <button
                  type="submit"
                  onClick={() => logoutUser()}
                  className="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-red-900 text-white hover:bg-red-700 mb-12"
                >
                  logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
