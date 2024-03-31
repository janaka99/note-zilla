import { NextRequest } from "next/server";
import NoteModel from "@/models/note";
import { IsLoggedIn } from "@/helpers/middleware";
import { connectDB } from "@/utils/db";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const loggedUser = await IsLoggedIn(req, process.env.JWT_SECRET as string);
    if (loggedUser == false) {
      return new Response(
        JSON.stringify({ message: "You don't have permission" }),
        {
          status: 400,
        }
      );
    }

    const note = new NoteModel({
      userId: loggedUser.userId,
    });

    await note.save();

    return new Response(
      JSON.stringify({ message: "Note created Successfull", noteId: note._id }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Note save failed Failed" }),
      {
        status: 400,
      }
    );
  }
};
