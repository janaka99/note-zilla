import { NextRequest } from "next/server";
import NoteModel from "@/models/note";
import { IsLoggedIn } from "@/helpers/middleware";
import { connectDB } from "@/utils/db";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
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

    const deletedNote = await NoteModel.findOneAndDelete({
      userId: loggedUser.userId,
      _id: params.id,
    });

    if (deletedNote) {
      const firstDocId = await NoteModel.find({
        userId: loggedUser.userId,
      });
      if (
        firstDocId.length == 0 ||
        firstDocId == null ||
        firstDocId == undefined
      ) {
        return new Response(
          JSON.stringify({
            message: "Note deleted successfully",
            noteId: null,
          }),
          {
            status: 200,
          }
        );
      } else {
        return new Response(
          JSON.stringify({
            message: "Note deleted successfully",
            noteId: firstDocId[0]._id,
          }),
          {
            status: 200,
          }
        );
      }
    } else {
      return new Response(
        JSON.stringify({ message: "Failed to delete note" }),
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to delete note" }), {
      status: 400,
    });
  }
};
