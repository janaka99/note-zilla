"use client";

import React, { ReactNode, useReducer } from "react";

import useGetApi from "@/hooks/useGetApi";
import NoteReducer from "./NoteReducer";
import { AuthContext } from "../AuthContext/AuthContext";
import {
  GET_NOTES_CALL,
  GET_NOTES_FAIL,
  GET_NOTES_SUCCESS,
  LOAD_NOTES,
} from "./NoteActions";
import { NoteContext } from "./NoteContext";

type props = {
  children: ReactNode;
};

export const initialState: NotesState = {
  notes: [],
  isNotesLoading: true,
};

const NoteState = ({ children }: props) => {
  const { useApi } = useGetApi();

  const [state, dispatch] = useReducer(NoteReducer, initialState);

  const getNotes = async () => {
    try {
      dispatch({
        type: GET_NOTES_CALL,
      });
      const res = await useApi().get("note/all");

      if (res.status == 200) {
        dispatch({
          type: GET_NOTES_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_NOTES_FAIL,
        });
      }
    } catch (error: any) {
      dispatch({
        type: GET_NOTES_FAIL,
      });
    }
  };

  return (
    <NoteContext.Provider
      value={{
        ...state,
        getNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
