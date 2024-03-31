"use client";
import useGetApi from "@/hooks/useGetApi";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const NewNote = () => {
  const { useApi } = useGetApi();
  const { push } = useRouter();
  const addNewNote = async () => {
    try {
      const res = await useApi().post(`note/new`);
      if (res.status == 200) {
        console.log(res.data);
        push(`/${res.data.noteId}`);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log("error reaised ", error);
    }
  };
  return (
    <button
      onClick={addNewNote}
      className="flex items-center gap-2 hover:bg-background-500 transition-all duration-200 p-1 cursor-pointer text-primary-100"
    >
      <FaPlus />
      <span>Add New Note</span>
    </button>
  );
};

export default NewNote;
