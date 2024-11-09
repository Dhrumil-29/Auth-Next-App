import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decode: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    return NextResponse.json(
      {
        userData: { username: decode.username,email:decode.email },
        message: "Success",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
