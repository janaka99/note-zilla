import React from "react";
import {
  GET_NOTES_CALL,
  GET_NOTES_FAIL,
  GET_NOTES_SUCCESS,
  LOAD_NOTES,
} from "./NoteActions";

const NoteReducer = (state: NotesState, action: any) => {
  switch (action.type) {
    case GET_NOTES_CALL:
      return {
        ...state,
        isNotesLoading: true,
      };
    case GET_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.payload,
        isNotesLoading: false,
      };

    case GET_NOTES_FAIL:
      return {
        ...state,
        notes: [],
        isNotesLoading: false,
      };

    default:
      return {
        ...state,
        isNotesLoading: true,
      };
  }
};

export default NoteReducer;
