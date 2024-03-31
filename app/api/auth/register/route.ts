import { NextRequest } from "next/server";
import UserModel from "@/models/user";
import bcrypt from "bcrypt";
import { connectDB } from "@/utils/db";
import jwt from "jsonwebtoken";
import { IsLoggedIn } from "@/helpers/middleware";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const res = await IsLoggedIn(req, process.env.JWT_SECRET as string);
    if (res != false) {
      return new Response(JSON.stringify({ message: "Something went wrong" }), {
        status: 400,
      });
    }

    const { username, email, password } = await req.json();

    if (password == "" || password.length < 8) {
      return new Response(
        JSON.stringify({ message: "Password not long enough" }),
        { status: 400 }
      );
    }
    if (
      username == "" ||
      username == undefined ||
      username == null ||
      username.length < 0
    ) {
      return new Response(JSON.stringify({ message: "Username is required" }), {
        status: 400,
      });
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

    const existUser = await UserModel.findOne({ email: email });

    if (existUser) {
      return new Response(JSON.stringify({ message: "Email already taken" }), {
        status: 400,
      });
    }

    let newHashedPass = await bcrypt.hash(password.toString(), 10);

    const newUser = new UserModel({
      username: username,
      email: email,
      password: newHashedPass,
    });

    await newUser.save();

    // json webstoken
    const token = jwt.sign(
      {
        username: newUser.username,
        email: newUser.email,
        userId: newUser._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return new Response(
      JSON.stringify({
        message: "Registration Successfull",
        user: {
          username: newUser.username,
          email: newUser.email,
        },
        token: token,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Registration Failed" }), {
      status: 400,
    });
  }
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
