import Experience from "../../../models/Experience";
import { NextResponse } from "next/server";
import databaseConnection from "../../../../lib/db";
import jwt from "jsonwebtoken";


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
        
        const {company, title, startDate, endDate, current, description} = body;

        if(!company || !title || !startDate || !description){
            return NextResponse.json({message: "Missing fields required"}, {status: 400});
        }else if(current === undefined){
            return NextResponse.json({message: "Missing current field required"}, {status: 400});
        }else if(current === false && !endDate){
            return NextResponse.json({message: "Missing end date field required"}, {status: 400});
        }

        
        const data = new Experience({
            userId: userId,
            company: company,
            title: title,
            startDate: startDate,
            endDate: endDate,
            current: current,
            description: description
        });

        await data.save();

        return NextResponse.json({message: "Successfully created experience info", data}, {status: 201});

    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}

// token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWYzZjE1MGY0NTg5N2I0MTIzYTY3OTkiLCJpYXQiOjE3Nzc2NzMyNDUsImV4cCI6MTc4MDI2NTI0NX0.YknKsC1Ld9zQFQdNuzQeytCT0Ffsi15VtNgeHF4-WPw


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
            return NextResponse.json({message: "Unauthorized"}, {status: 401})
        }

        const data = await Experience.find({userId});
        if(!data){
            return NextResponse.json({message: "Document not found"}, {status: 404})
        }
        
        return NextResponse.json({message: "Successfully found experience document", data}, {status: 200});

    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}

