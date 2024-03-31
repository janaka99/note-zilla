// Import necessary modules
import mongoose, { Schema, Document, models } from "mongoose";

// Define the interface representing the note document
interface Note extends Document {
  title: string;
  content: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the note model
const NoteSchema: Schema = new Schema(
  {
    title: {
      type: String,
      default: "Untitled",
    },
    content: {
      type: String,
      default: "What you have to say",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Create and export the Note model
const NoteModel = models.Note || mongoose.model<Note>("Note", NoteSchema);

export default NoteModel;
