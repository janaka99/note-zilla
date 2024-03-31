"use client";

import { AuthContext } from "@/context/AuthContext/AuthContext";
import useGetApi from "@/hooks/useGetApi";
import { redirect, useRouter } from "next/navigation";
import React, { FormEvent, useContext, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

type Credentials = {
  email: string;
  username: string;
  password: string;
};

const Register = (props: Props) => {
  const { register } = useContext(AuthContext);

  const { push } = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    username: "",
    password: "",
  });

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (credentials.password == "" || credentials.password.length < 8) {
      toast.error("Password not long enough");
      return;
    }
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
    if (
      credentials.username.length <= 0 ||
      credentials.username == null ||
      credentials.username == undefined
    ) {
      toast.error("Username can not be empty");
      return;
    }
    const res = await register(credentials);
    if (res) {
      toast.success("Registration successful");
      push("/");
    } else {
      toast.error("Email or Password Incorrect");
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-10 bg-background-100 p-5 max-w-xl w-full"
    >
      <input
        type="email"
        placeholder="Email"
        className="p-2 text-sm text-primary-500 bg-background-500 outline-none"
        value={credentials.email}
        onChange={(e) => {
          setCredentials({
            ...credentials,
            email: e.target.value,
          });
        }}
      />
      <input
        type="text"
        placeholder="Username"
        className="p-2 text-sm text-primary-500 bg-background-500 outline-none"
        value={credentials.username}
        onChange={(e) => {
          setCredentials({
            ...credentials,
            username: e.target.value,
          });
        }}
      />
      <input
        type="password"
        placeholder="password"
        className="p-2 text-sm text-primary-500 bg-background-500 outline-none"
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
        Register
      </button>
    </form>
  );
};

export default Register;
