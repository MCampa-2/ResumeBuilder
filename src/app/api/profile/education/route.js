import { NextResponse } from "next/server";
import databaseConnection from "../../../../lib/db";
import jwt from "jsonwebtoken";
import EducationSchema from "../../../models/Education";



export async function POST(request) {
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
            userId = decoded.userId;

        }catch(error){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        const {schoolName, degree, startDate, endDate, current} = body;
        
        if(!schoolName || !degree || !startDate){
            return NextResponse.json({message: "All fields required"}, {status: 400});
        }
        if(!current === undefined){
            return NextResponse.json({message: "Missing field required"}, {status: 400})
        }
        if(!current && !endDate){
            return NextResponse.json({message: "Missing field required"}, {status: 400})
        }
      
        const data = await new EducationSchema({
            userId: userId,
            schoolName: schoolName,
            degree: degree,
            startDate: startDate,
            endDate: endDate,
            current: current
        });

        await data.save();
        return NextResponse.json({message: "Successfully created education info", data}, {status: 201});

    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}


export async function GET(request) {
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
            userId = decoded.userId;

        }catch(error){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        const data = await EducationSchema.find({userId});
        if(!data){
            return NextResponse.json({message: "Not found"}, {status: 404})
        }

        return NextResponse.json({message: "Successfully found education data", data},{status: 200})
        
    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}