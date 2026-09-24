import Project from "../../../models/Projects";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import databaseConnection from "../../../../lib/db";


export async function POST(request){
    try{
        await databaseConnection();
        const body = await request.json();
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

        const {projectName, description, technologies} = body;

        if(!projectName || !description || !technologies || technologies.length < 1 || !Array.isArray(technologies)){
            return NextResponse.json({message: "All fields required"}, {status: 400})
        }

        const data = await new Project({
            userId: userId,
            projectName: projectName,
            technologies: technologies,
            description: description
        });

        await data.save();

        return NextResponse.json({message: "Successfully added project", data}, {status: 201});


    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500})
    }
}


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

        const data = await Project.find({userId});

        if(!data){
            return NextResponse.json({message: "Not Found"}, {status: 404});
        }

        return NextResponse.json({message: "Successfully found projects", data}, {status: 200});



    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}