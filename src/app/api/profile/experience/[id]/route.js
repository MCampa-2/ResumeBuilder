import { NextResponse } from "next/server";
import Experience from "../../../../models/Experience";
import jwt from "jsonwebtoken";
import databaseConnection from "../../../../../lib/db";


export async function DELETE(request, {params}) {
    try{
        await databaseConnection();
        const {id} = await params;
        const authHeader = request.headers.get("authorization");
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }
        const token = authHeader.split(" ")[1];
        let userId;
        try{

            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            userId = decoded.userId;

        }catch(error){
            return NextResponse.json({message: "Unauthorized"} ,{status: 401});
        }

        const deleteExperience = await Experience.findOneAndDelete({
            _id: id,
            userId: userId
        });

        if(!deleteExperience){
            return NextResponse.json({message: "Not found"},{status: 404});
        }

        return NextResponse.json({message: "Successfully deleted experience"}, {status: 200});

        

    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}

export async function PATCH(request, {params}) {
    try{
        await databaseConnection();
        const {id} = await params;
        const body = await request.json();
        const authHeader = request.headers.get("authorization");
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        const token = authHeader.split(" ")[1];
        let userId;
        try{
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            userId = decoded.userId;

        }catch(error){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        const updatedExperience = await Experience.findOneAndUpdate(
            {
                _id:id,
                userId: userId
            },
            body,
            {returnDocument: "after"}
        );

        return NextResponse.json({message: "Successfully updated experience info", updatedExperience}, {status: 200});


    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}