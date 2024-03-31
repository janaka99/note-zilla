"use client";
import NoteLink from "@/components/form/Note/NoteLink";
import { NoteContext } from "@/context/NoteContext/NoteContext";
import useGetApi from "@/hooks/useGetApi";
import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

type Note = {
  title: string;
  content: string;
  noteId: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
};

const SideBar = () => {
  const { getNotes, notes, isNotesLoading } = useContext(NoteContext);

  const [isNavOpen, setIsNavOpen] = useState(false);

  const { useApi } = useGetApi();

  const addNewNote = async () => {
    try {
      const res = await useApi().post(`note/new`);
      if (res.status == 200) {
        console.log(res.data);

        window.history.pushState(null, "", `${res.data.noteId}`);
        getNotes();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log("error reaised ", error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div
      className={`w-72 h-svh overflow-x-hidden overflow-hidden bg-background-100 pt-24 pl-5 flex flex-col gap-2 md:relative absolute transition-all duration-300 top-0 left-0 ${
        isNavOpen
          ? "-translate-x-0 md:translate-x-0"
          : "-translate-x-[calc(100%-40px)] md:translate-x-0"
      }`}
    >
      <div className="flex  items-center gap-2">
        <button
          onClick={addNewNote}
          className="flex-grow flex items-center gap-2 hover:bg-background-500 transition-all duration-200 p-1 cursor-pointer text-primary-100 mr-10"
        >
          <FaPlus />
          <span>Add New Note</span>
        </button>
        <button
          onClick={() => {
            setIsNavOpen(!isNavOpen);
          }}
          className="w-8 text-2xl text-primary-500 flex md:hidden"
        >
          <GiHamburgerMenu />
        </button>
      </div>
      <div
        className={`flex-grow overflow-hidden  scroll-bar mb-5 
      
      ${isNavOpen ? " overflow-y-auto " : "md:overflow-y-auto"}`}
      >
        {notes.length == 0 ? (
          <></>
        ) : (
          notes.map((note: Note) => <NoteLink key={note._id} note={note} />)
        )}{" "}
      </div>
    </div>
  );
};

export default SideBar;
