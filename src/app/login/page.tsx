"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    // check data
    if (data.email === "" || data.password === "") {
      setLoading(false);
      return toast("Please fill all the fields....");
    }

    try {
      const response = await axios.post("/api/users/login", data);

      console.log("login success", response);
      toast.success("Login Success")
      router.replace("/profile");
    } catch (error: any) {
      console.log(error);
      toast(error.message);
    } finally {
      setLoading(false);
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
                <h1 className="font-bold">Welcome back!</h1>
                <p className="mt-2">Let's build someting great</p>
                {loading && (
                  <p className="mt-3 text-3xl text-emerald-600">
                    we are checking your request...
                  </p>
                )}
              </div>
              <form>
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
                    value={data.email}
                    onChange={(e) => {
                      setData({ ...data, email: e.target.value });
                    }}
                    placeholder="Your email address"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-5">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    id="password"
                    value={data.password}
                    onChange={(e) => {
                      setData({ ...data, password: e.target.value });
                    }}
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={(e) => loginUser(e)}
                    className="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-blue-900 text-white hover:bg-blue-700"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <div className="my-6">
                <small className="text-sm text-gray-500">
                  Don't have an account?
                </small>
                <Link
                  href={"/signup"}
                  className="ms-2 text-sm font-semibold text-indigo-600 hover:text-indigo-900"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
