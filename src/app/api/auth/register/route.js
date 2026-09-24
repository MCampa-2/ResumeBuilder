import User from "../../../models/User";
import { NextResponse } from "next/server";
import databaseConnection from "../../../../lib/db";
import bcrypt from "bcryptjs";


export async function POST(request) {
   
try{
    
    await databaseConnection();

    const body = await request.json();

    const {fname, lname, email, password} = body;

    if(!fname || !lname || !email || !password){
        return NextResponse.json({message: "Client Error"}, {status: 400})
    }

    const user = await User.findOne({email: email});

    if(user){
        return NextResponse.json({message: "User already exist"}, {status: 409})
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        fname: fname,
        lname: lname,
        email: email,
        password: hashedPassword
    });



   return NextResponse.json({message: "User has been successfully registered", newUser}, {status: 201})

   
}catch(error){
    return NextResponse.json({message: error.message}, {status: 500});
}
    
}