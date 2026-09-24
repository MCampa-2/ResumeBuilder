import { NextResponse } from "next/server";
import databaseConnection from "../../../lib/db";
import jwt from "jsonwebtoken";
import User from "../../models/User";


export async function GET(request){
    try{
        await databaseConnection();
        const authHeader = request.headers.get("authorization");
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }
        const token = authHeader.split(" ")[1];
        let userId;
        try{
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            userId = decoded.userId

        }catch(error){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        const data = await User.findById(userId);

        if(!data){
            return NextResponse.json({message: "Could not find user"}, {status: 404});
        }

        return NextResponse.json({message: "Successfully found user", data}, {status: 200});



    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}