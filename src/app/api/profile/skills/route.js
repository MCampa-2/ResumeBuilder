import SkillsSchema from "../../../models/Skills";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import databaseConnection from "../../../../lib/db";


export async function POST(request){
    try{
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

        const {technicalSkills, softSkills, tools, strengths} = body;

        if(technicalSkills.length === 0 && softSkills.length === 0 && tools.length === 0 && strengths.length === 0){
            return NextResponse.json({message: "Must fill out at least one skills"}, {status: 400})
        }

        const data = await new SkillsSchema({
            userId: userId,
            technicalSkills: technicalSkills,
            softSkills: softSkills,
            tools: tools,
            strengths: strengths
        });

        await data.save();

        return NextResponse.json({message: "Successfully created skills", data}, {status: 201});


    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}

export async function GET(request){
    try{
        await databaseConnection();
        const authHeader = request.headers.get('authorization');
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return NextResponse.json({message: "Unauthorized"}, {status: 400});
        }

        const token = authHeader.split(" ")[1];
        let userId; 
        try{
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            userId = decoded.userId;

        }catch(error){
            return NextResponse.json({message: "Unauthorized"}, {status: 400});
        }

        const data = await SkillsSchema.find({userId});

        if(!data || data.length < 1){
            return NextResponse.json({message: "Not Found"}, {status: 404});
        }

        return NextResponse.json({message: "Successfully found skills", data}, {status: 200});

    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}