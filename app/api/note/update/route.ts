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
    const { title, content, noteId } = await req.json();

    if (title == "" || title == null || title == undefined) {
      return new Response(
        JSON.stringify({ message: "Title can not be empty" }),
        { status: 400 }
      );
    }
    if (content == null || content == undefined || content == "") {
      return new Response(
        JSON.stringify({ message: "Content can not be empty" }),
        { status: 400 }
      );
    }

    const updatedDoc = await NoteModel.findOneAndUpdate(
      {
        _id: noteId,
        userId: loggedUser.userId,
      },
      {
        title: title,
        content: content,
      }
    );
    if (updatedDoc) {
      return new Response(
        JSON.stringify({
          message: "Note saved successfully",
          updatedNote: updatedDoc,
        }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(JSON.stringify({ message: "Note failed to save" }), {
        status: 400,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Note failed to save" }), {
      status: 400,
    });
  }
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
