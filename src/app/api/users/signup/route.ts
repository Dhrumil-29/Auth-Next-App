import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// db needs to be connected...
connect();

//write the export function based on the HTTP route
export async function POST(request: NextRequest) {
  try {
    //extract body from request
    
    const reqBody = await request.json();
    
    // destructure
    const { username, email, password } = reqBody;
    const user = await User.findOne({ email });
    
    if (user) {
      return NextResponse.json(
        { error: "user already existed" },
        { status: 400 }
      );
    }

    // new user create
    //encrypt the password
    const salt = await bcryptjs.genSalt(10);
  
    const hashPass = await bcryptjs.hash(password, salt);
    
    const newUser = new User({
      username,
      email,
      password: hashPass,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "user created successfully",
      success: true,
      savedUser,
    });
    // check that if user is already exists or not??
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
