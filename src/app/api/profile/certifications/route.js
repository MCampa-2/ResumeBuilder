import Certification from "../../../models/Certification";
import { NextResponse } from "next/server";
import databaseConnection from "../../../../lib/db";
import jwt from "jsonwebtoken";


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

        const {certificationName, issuingOrganization, issueDate, expirationDate, doesNotExpire, credentialId, credentialUrl} = body;

        if(!certificationName || !issuingOrganization || !issueDate){
            return NextResponse.json({message: "Missing fields required"}, {status: 422});
        }

        const data = await new Certification({
            userId: userId,
            certificationName: certificationName,
            issuingOrganization: issuingOrganization,
            issueDate: issueDate,
            expirationDate: expirationDate,
            doesNotExpire: doesNotExpire,
            credentialId: credentialId,
            credentialUrl: credentialUrl
        });

        await data.save();

        return NextResponse.json({message: "Successfully added certification", data}, {status: 201});

    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}


export  async function GET(request){
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

        const data = await Certification.find({userId});

        if(data.length === 0){
            return NextResponse.json({message: 'Not found'}, {status: 404});
        }

        return NextResponse.json({message: "Successfully found all certifications", data},{status: 200});

    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}