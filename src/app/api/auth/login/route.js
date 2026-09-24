import User from "../../../models/User";
import { NextResponse } from "next/server";
import databaseConnection from "../../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function POST(request){
    try{
        await databaseConnection();
        const body = await request.json();
    
        const {email, password} =  body;

        if(!email || !password){
            return NextResponse.json({message: "Missing fields required"}, {status: 400})
        }

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({message: "User not found"}, {status: 404});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return NextResponse.json({message: "Unauthorized"}, {status: 401})
        }

        // JWT code

        const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {expiresIn: "30d"});
        console.log(token)

        return NextResponse.json({message: "Logged in successfully", token}, {status: 200});

    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}