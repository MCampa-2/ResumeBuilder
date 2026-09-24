import { NextResponse } from "next/server"
import databaseConnection from "../../../../../lib/db";
import jwt from "jsonwebtoken";
import Project from "../../../../models/Projects";

export async function PATCH(request,{params}){
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

                const data = await Project.findOneAndUpdate({userId: userId,_id: id}, body, {new: true});

                if(!data){
                    return NextResponse.json({message: "Project does not exist"}, {status: 404});
                }

                return NextResponse.json({message: "Successfully updated project", data}, {status: 200});

    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}


export async function DELETE(request, {params}){
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
                    userId = decoded.userId
        
                }catch(error){
                    return NextResponse.json({message: "Unauthorized"}, {status: 401});
                }

                const data = await Project.findOneAndDelete({userId: userId, _id: id});

                if(!data){
                    return NextResponse.json({message: "Project does nto exist"}, {status: 404});
                }

                return NextResponse.json({message: "Successfully deleted project", data}, {status: 200});


    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}