type Note = {
  title: string;
  content: string;
  noteId: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
};

type NotesState = {
  notes: Note[];
  isNotesLoading: boolean;
};
