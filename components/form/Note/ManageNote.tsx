"use client";

import { NoteContext } from "@/context/NoteContext/NoteContext";
import useGetApi from "@/hooks/useGetApi";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  note: Note;
  setNote: React.Dispatch<React.SetStateAction<any>>;
};

type Note = {
  title: string;
  content: string;
  noteId: string;
};

const ManageNote = ({ note, setNote }: Props) => {
  const API = useGetApi();
  const { push } = useRouter();
  let noteId = usePathname();
  noteId = noteId.substring(1);

  const { getNotes, notes: allNotes } = useContext(NoteContext);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDeleteNote = async (id: string) => {
    try {
      setIsDeleting(true);
      const res = await API.delete(`note/delete/${id}`);
      if (res.status == 200) {
        getNotes();
        toast.success(res.data.message);
        if (res.data.noteId) {
          window.history.pushState(null, "", `${res.data.noteId}`);
        } else {
          push("/");
        }
        setIsDeleting(false);
      } else {
        toast.error(res.data.message);
        setIsDeleting(false);
      }
    } catch (error) {
      setIsDeleting(false);
      toast.error("Note deletion Failed");
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (note.title == "") {
      toast.error("Title can not be empty");
      return;
    }
    if (note.content == "") {
      toast.error("Content can not be empty");
      return;
    }
    setIsUpdating(true);
    try {
      const res = await API.post(`note/update`, JSON.stringify(note));
      if (res.status == 200) {
        getNotes();
        setNote({
          title: res.data.updatedNote.title,
          content: res.data.updatedNote.content,
          noteId: res.data.updatedNote._id,
        });
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      setIsUpdating(false);
    } catch (error) {
      console.log(error);
      setIsUpdating(false);
      toast.error("Note Update Failed");
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-10 w-full">
        <input
          type="text"
          className=" text-primary-100 text-xl  sm:text-3xl bg-background-100 p-4 outline-none  w-full"
          placeholder="Title"
          value={note.title}
          onChange={(e) => {
            setNote({
              ...note,
              title: e.target.value,
            });
          }}
        />
        <textarea
          rows={10}
          className="text-primary-100 font-light  bg-background-100 p-4 outline-none"
          placeholder="Note"
          value={note.content}
          onChange={(e) => {
            setNote({
              ...note,
              content: e.target.value,
            });
          }}
        />
        <div className="flex justify-end gap-5">
          <button
            className={`border border-primary-500 w-28 py-2 rounded-md text-primary-500  self-end hover:bg-primary-500 hover:text-background-500 transition-all duration-200 *:

            `}
            type="submit"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
          <button
            className={`border border-primary-500 w-28 py-2 rounded-md text-primary-500 self-end hover:bg-red-500 hover:border-red-500 transition-all duration-200
              ${isDeleting && "bg-red-500 border-red-500"}
            `}
            type="button"
            disabled={isDeleting}
            onClick={() => handleDeleteNote(note.noteId)}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ManageNote;
