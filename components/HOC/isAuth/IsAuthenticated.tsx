"use client";
import Loading from "@/components/UI/Loading/Loading";
import { AuthContext } from "@/context/AuthContext/AuthContext";
import { usePathname } from "next/navigation";
import React, {
  ComponentProps,
  ComponentType,
  useContext,
  useEffect,
} from "react";
import { FaArrowRight } from "react-icons/fa6";

export function IsAuthenticated(Component: ComponentType<any>) {
  return function WithAuth(props: ComponentProps<any>) {
    const { isAuthenticated, checkUser, isLoading } = useContext(AuthContext);
    const path = usePathname();
    console.log(path);
    if (isLoading) {
      return <Loading />;
    }
    if (isAuthenticated) {
      return <Component {...props} />;
    } else {
      if (path != "/") {
        return (
          <div className=" min-h-svh flex flex-col justify-center items-center text-primary-500">
            <h1 className="text-2xl uppercase">
              Page you are looking for is not found
            </h1>
            <p className="font-light">Maybe you are not logged in</p>
            <a
              className="mt-4 texy-2xl flex gap-3 items-center  border-b border-b-background-500 hover:border-primary-500 transition-all duration-200"
              href="/auth/login"
            >
              Login Now
              <FaArrowRight />
            </a>
          </div>
        );
      } else {
        return (
          <div className=" min-h-svh flex flex-col justify-center items-center text-primary-500 gap-3">
            <h1 className="text-4xl uppercase">Welcome to Note Zilla</h1>
            <h1 className="text-2xl uppercase font-light">
              Your Ultimate Note-Taking Companion
            </h1>
            <a
              className="mt-4 texy-2xl flex gap-3 items-center  border-b border-b-background-500 hover:border-primary-500 transition-all duration-200"
              href="/auth/login"
            >
              Login Now
              <FaArrowRight />
            </a>
          </div>
        );
      }
    }
  };
}
