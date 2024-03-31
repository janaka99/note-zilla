"use client";
import Container from "@/components/HOC/Container/Container";
import Logo from "@/components/UI/Logo/Logo";
import { AuthContext } from "@/context/AuthContext/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";

const Header = () => {
  const { isLoading, isAuthenticated, checkUser, logout } =
    useContext(AuthContext);

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <header className="w-full  h-24 absolute top-0 left-0 bg-gradient-radial  text-primary-500">
      <nav className="flex w-full h-full  justify-between items-center px-10">
        <Logo />
        <ul className="flex gap-10 ">
          {isLoading ? (
            <>
              <li className="w-14 h-5 bg-background-100"></li>
            </>
          ) : isAuthenticated ? (
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          ) : (
            <li>
              <a href="/auth/login">Login</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
