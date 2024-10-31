import connectDb from "@/db/connectDb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { router } from "next/navigation";

export async function POST(req) {
  try {
    await connectDb();
    const { username, email, password } = await req.json();
    console.log(username, email, password);
    const exists = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (exists) {
      return NextResponse.json(
        { message: "username or email already exists" },
        { status: 500 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    return NextResponse.json({ message: "user created." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "error creating user" },
      { status: 500 }
    );
  }
}
