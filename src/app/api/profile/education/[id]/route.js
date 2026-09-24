import databaseConnection from "../../../../../lib/db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import Education from "../../../../models/Education";

export async function DELETE(request, {params}) {
    try{
        await databaseConnection();
        const {id} = await params;
        const authHeader = request.headers.get("authorization");
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }
        const token = authHeader.split(' ')[1];
        let userId;
        try{
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            userId = decoded.userId;

        }catch(error){
            return NextResponse.json({message: "Unauthorized"},{ status: 401});
        }

        const data = await Education.findOneAndDelete({
            _id: id,
            userId: userId
        });

        if(!data){
            return NextResponse.json({message: "Nothing to delete"}, {status: 404});
        }
        return NextResponse.json({message: "Successfully deleted education info"}, {status: 200});
        
    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
    
}

export async function PATCH(request, {params}) {
     try{
        await databaseConnection();
        const body = await request.json();
        const {id} = await params;
        const authHeader = request.headers.get("authorization");
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }
        const token = authHeader.split(' ')[1];
        let userId;
        try{
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            userId = decoded.userId;

        }catch(error){
            return NextResponse.json({message: "Unauthorized"},{ status: 401});
        }

        const data = await Education.findOneAndUpdate({
            _id: id,
            userId: userId
        },
        body,
        {
            new: true
        }
    );

    return NextResponse.json({message: "Successfully updated document", data}, {status: 200});
        
    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}