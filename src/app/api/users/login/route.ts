import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";
import User from "@/model/userModel";

connect();
export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email, password } = reqBody;
  console.log(reqBody);
  // check user exists
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json(
      {
        error: "User Doesn't exists...",
      },
      { status: 500 }
    );
  }

  // compare password
  const isValid = await bcryptjs.compare(password, user.password);
  console.log(isValid);
  if (!isValid) {
    return NextResponse.json({ error: "Password Invalid" }, { status: 500 });
  }

  //create a token
  const tokenData = {
    username: user.username,
    email: user.email,
  };
  const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
    expiresIn: "1d",
  });
  console.log(token);

  const response = NextResponse.json({
    message: "Login Successful",
    success: true,
  });

  response.cookies.set("token", token, { httpOnly: true });

  return response;
}
