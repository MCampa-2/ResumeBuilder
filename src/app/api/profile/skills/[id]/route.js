import { NextResponse } from "next/server"
import databaseConnection from "../../../../../lib/db";
import jwt from "jsonwebtoken";
import SkillsSchema from "../../../../models/Skills";

export async function PATCH(request,{params}){
    try{
        const {id} = await params;
        await databaseConnection();
        const body = await request.json();
        const authHeader = request.headers.get("authorization");
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return NextResponse.json({message: "Unauthorized"}, {status: 401})
        }

        const token = authHeader.split(" ")[1];
        let userId;

        try{
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            userId = decoded.userId;

        }catch(error){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        const data = await SkillsSchema.findOneAndUpdate({userId: userId, _id: id}, body, {returnDocument: "after"});

        if(!data){
            return NextResponse.json({message: "Skills not found"}, {status: 404});
        }

        return NextResponse.json({message: "Successfully updated skills", data}, {status: 200});


    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}

export async function DELETE(request, {params}){
    try{
        const {id} = await params;
        await databaseConnection();
        
        const authHeader = request.headers.get("authorization");
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return NextResponse.json({message: "Unauthorized"}, {status: 401})
        }

        const token = authHeader.split(" ")[1];
        let userId;

        try{
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            userId = decoded.userId;

        }catch(error){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

       const data = await SkillsSchema.findOneAndDelete({
        _id: id,
        userId: userId
       });

       if(!data){
        return NextResponse.json({message: "Did not match document to delete"}, {status: 404});
       }

       return NextResponse.json({message: "Successfully deleted skill", data}, {status: 200});

    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}