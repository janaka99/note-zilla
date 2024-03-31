import { NextRequest } from "next/server";
import { connectDB } from "@/utils/db";
import { IsLoggedIn } from "@/helpers/middleware";

export const GET = async (req: NextRequest) => {
  try {
    console.log("reasd");
    await connectDB();
    const loggedUser = await IsLoggedIn(req, process.env.JWT_SECRET as string);
    if (loggedUser == false) {
      return new Response(
        JSON.stringify({ message: "You don't have permission" }),
        {
          status: 400,
        }
      );
    } else {
      const user = {
        username: loggedUser.username,
        email: loggedUser.email,
      };

      return new Response(
        JSON.stringify({ message: "Login Success", user: user }),
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Login Failed" }), {
      status: 400,
    });
  }
};
