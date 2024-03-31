import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/utils/db";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import { IsLoggedIn } from "@/helpers/middleware";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (password == "" || password.length < 8) {
      return new Response(
        JSON.stringify({ message: "Password not long enough" }),
        { status: 400 }
      );
    }
    if (email.length <= 0 || email == null || email == undefined) {
      return new Response(
        JSON.stringify({ message: "Email can not be empty" }),
        { status: 400 }
      );
    } else if (emailRegex.test(email) == false) {
      return new Response(JSON.stringify({ message: "Email is not valid" }), {
        status: 400,
      });
    }

    const existUser = await User.findOne({ email: email });

    if (!existUser) {
      return new Response(
        JSON.stringify({ message: "Email or Password Incorrect" }),
        {
          status: 400,
        }
      );
    }

    const hashedPass = existUser.password;

    const result = await bcrypt.compare(password, hashedPass);
    if (result == false) {
      return new Response(
        JSON.stringify({ message: "Email or Password Incorrect" }),
        {
          status: 400,
        }
      );
    }

    const token = jwt.sign(
      {
        username: existUser.username,
        email: existUser.email,
        userId: existUser._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return new Response(
      JSON.stringify({
        message: "Login Successfull",
        token: token,
        user: {
          username: existUser.username,
          email: existUser.email,
        },
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Login Failed" }), {
      status: 400,
    });
  }
};
