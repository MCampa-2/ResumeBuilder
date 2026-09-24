import databaseConnection from "../../../../../lib/db";
import { NextResponse } from "next/server";
import Certification from "../../../../models/Certification";
import jwt from "jsonwebtoken";


export  async function PATCH(request, {params}){
    try{
        await databaseConnection();
        const body = await request.json();
        const {id} = await params;

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

        const data = await Certification.findOneAndUpdate({_id: id, userId: userId}, body, {returnDocument: "after"});

        if(!data){
            return NextResponse.json({message: "Certification doesn't exist"}, {status: 404});
        }

        return NextResponse.json({message: "Successfully updated certification", data}, {status: 200});


    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}


export async function DELETE(request, {params}){
    try{
        await databaseConnection();
     
        const {id} = params;

        
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

        const data = await Certification.findOneAndDelete({_id: id, userId, userId});

        if(!data){
            return NextResponse.json({message: 'Not found'}, {status: 404});
        }

        return NextResponse.json({message: "Successfully deleted certification"}, {status: 200});
        
    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}