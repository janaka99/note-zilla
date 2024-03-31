"use client";

import Loading from "@/components/UI/Loading/Loading";
import NewNote from "@/components/form/Note/NewNote";
import { AuthContext } from "@/context/AuthContext/AuthContext";
import { NoteContext } from "@/context/NoteContext/NoteContext";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

const Page = () => {
  const { push } = useRouter();
  const { getNotes, notes, isNotesLoading } = useContext(NoteContext);
  const { isAuthenticated, checkUser, isLoading } = useContext(AuthContext);
  const path = usePathname();
  useEffect(() => {
    getNotes();
  }, []);

  if (isNotesLoading || isLoading) {
    return <Loading />;
  }
  if (!isAuthenticated) {
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

  if (notes.length > 0) {
    push(`/${notes[0]._id}`);
  } else {
    return (
      <div className=" min-h-svh flex flex-col justify-center items-center">
        <h1 className="text-2xl mb-2 text-primary-500">
          You don&apos;t have any notes
        </h1>
        <NewNote />
      </div>
    );
  }
};

export default Page;
