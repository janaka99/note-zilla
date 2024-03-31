"use client";
import ManageNote from "@/components/form/Note/ManageNote";
import useGetApi from "@/hooks/useGetApi";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { IsAuthenticated } from "@/components/HOC/isAuth/IsAuthenticated";
import NewNote from "@/components/form/Note/NewNote";
import { NoteContext } from "@/context/NoteContext/NoteContext";
import SideBar from "@/containers/Sidebar/SideBar";

type Note = {
  title: string;
  content: string;
  noteId: string;
};

const page = () => {
  const handleNote = (id: string) => {};
  const [notes, setNotes] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const { getNotes, notes: allNotes, isNotesLoading } = useContext(NoteContext);

  const [note, setNote] = useState<Note>({
    title: "",
    content: "",
    noteId: "",
  });

  const { useApi } = useGetApi();

  const { push } = useRouter();

  const getData = async () => {
    try {
      const res = await useApi().get("note/all");

      if (res.status == 200) {
        setNotes(res.data);
      } else {
        alert("not notes");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  let noteId = usePathname();
  noteId = noteId.substring(1);
  console.log(noteId);
  const getNote = async () => {
    try {
      const res = await useApi().get(`note/get/${noteId}`);
      if (res.status == 200) {
        console.log("response existing note ", res.data);
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

  if (allNotes.length == 0 && !isNotesLoading) {
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
          {note.noteId != "" && (
            <ManageNote note={note} setNote={setNote} getData={getData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default IsAuthenticated(page);
