"use client";
import { Page } from "@/components/HOC/isAuth/IsAuthenticated";
import Loading from "@/components/UI/Loading/Loading";
import NewNote from "@/components/form/Note/NewNote";
import { NoteContext } from "@/context/NoteContext/NoteContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const page = () => {
  const { push } = useRouter();
  const { getNotes, notes, isNotesLoading } = useContext(NoteContext);

  useEffect(() => {
    getNotes();
  }, []);

  if (isNotesLoading) {
    return <Loading />;
  }

  if (notes.length > 0) {
    push(`/${notes[0]._id}`);
  } else {
    return (
      <div className=" min-h-svh flex flex-col justify-center items-center">
        <h1 className="text-2xl mb-2 text-primary-500">
          You don't have any notes
        </h1>
        <NewNote />
      </div>
    );
  }
};

export default Page(page);
