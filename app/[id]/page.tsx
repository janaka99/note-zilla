"use client";
import ManageNote from "@/components/form/Note/ManageNote";
import useGetApi from "@/hooks/useGetApi";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import NewNote from "@/components/form/Note/NewNote";
import { NoteContext } from "@/context/NoteContext/NoteContext";
import SideBar from "@/containers/Sidebar/SideBar";
import { AuthContext } from "@/context/AuthContext/AuthContext";
import Loading from "@/components/UI/Loading/Loading";
import { FaArrowRight } from "react-icons/fa6";

type Note = {
  title: string;
  content: string;
  noteId: string;
};

const Page = () => {
  const { getNotes, notes, isNotesLoading } = useContext(NoteContext);
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const path = usePathname();

  const [note, setNote] = useState<Note>({
    title: "",
    content: "",
    noteId: "",
  });

  const API = useGetApi();

  let noteId = usePathname();
  noteId = noteId.substring(1);

  const getNote = async () => {
    try {
      const res = await API.get(`note/get/${noteId}`);
      if (res.status == 200) {
        setNote({
          title: res.data.title,
          content: res.data.content,
          noteId: res.data._id,
        });
      } else {
        alert(res.data.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getNote();
    getNotes();
  }, [noteId]);
  if (isLoading) {
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

  if (notes.length == 0 && !isNotesLoading) {
    return (
      <div className=" min-h-svh flex flex-col justify-center items-center">
        <h1 className="text-2xl mb-2 text-primary-500">
          You don't have any notes
        </h1>
        <NewNote />
      </div>
    );
  }

  return (
    <div className="flex-1  w-full  flex gap-10">
      <SideBar />
      <div className="flex-grow   pt-24  pl-20 md:pl-0 pr-10">
        <div className="max-w-3xl w-full mx-auto">
          {note.noteId != "" && <ManageNote note={note} setNote={setNote} />}
        </div>
      </div>
    </div>
  );
};

export default Page;
