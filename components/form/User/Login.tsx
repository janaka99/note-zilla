"use client";

import { AuthContext } from "@/context/AuthContext/AuthContext";
import useGetApi from "@/hooks/useGetApi";
import { redirect, useRouter } from "next/navigation";
import React, { FormEvent, useContext, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

type Credentials = {
  email: string;
  password: string;
};

const Login = (props: Props) => {
  const { login } = useContext(AuthContext);

  const { push } = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      credentials.email.length <= 0 ||
      credentials.email == null ||
      credentials.email == undefined
    ) {
      toast.error("Email can not be empty");
      return;
    } else if (emailRegex.test(credentials.email) == false) {
      toast.error("Email is not valid");
      return;
    }
    if (credentials.password == "" || credentials.password.length < 8) {
      toast.error("Password not long enough");
      return;
    }
    const res = await login(credentials);
    if (res) {
      toast.success("Login successful");
      push("/");
    } else {
      toast.error("Email or Password Incorrect");
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-10 bg-background-100 p-5 max-w-xl w-full text-white"
    >
      <h1>Login</h1>
      <input
        type="email"
        className="p-2 text-sm text-primary-500 bg-background-500 outline-none"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => {
          setCredentials({
            ...credentials,
            email: e.target.value,
          });
        }}
      />
      <input
        type="password"
        className="p-2 text-sm text-primary-500 bg-background-500 outline-none"
        placeholder="password"
        value={credentials.password}
        onChange={(e) => {
          setCredentials({
            ...credentials,
            password: e.target.value,
          });
        }}
      />
      <button
        className="px-4 py-2 border border-primary-500 rounded-md w-fit self-end"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
