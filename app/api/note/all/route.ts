import { IsLoggedIn } from "@/helpers/middleware";
import NoteModel from "@/models/note";
import { connectDB } from "@/utils/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
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

    const rs = await NoteModel.find({ userId: loggedUser.userId }).sort({
      createdAt: 1,
    });
    if (rs) {
      return new Response(JSON.stringify(rs), {
        status: 200,
      });
    } else {
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 400,
        }
      );
    }

    //return all the products
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
