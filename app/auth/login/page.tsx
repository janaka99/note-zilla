import Container from "@/components/HOC/Container/Container";
import Login from "@/components/form/User/Login";
import React from "react";

const page = () => {
  return (
    <div className="min-h-svh w-full flex flex-col justify-center items-center gap-10 pt-24">
      <Login />
    </div>
  );
};

export default page;
