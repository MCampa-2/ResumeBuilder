import { NextResponse } from "next/server";
import databaseConnection from "../../../lib/db";
import  jwt from "jsonwebtoken";
import Certification from "../../models/Certification";
import Education from "../../models/Education";
import Experience from "../../models/Experience";
import PersonalInfo from "../../models/PersonalInfo";
import Projects from "../../models/Projects";
import Skills from "../../models/Skills";



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
            userId = decoded.userId

        }catch(error){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        const skill = await Skills.findOne({userId});
        const cert = await Certification.find({userId});
        const education = await Education.find({userId});
        const experience = await Experience.find({userId});
        const personalInfo = await PersonalInfo.findOne({userId});
        const projects = await Projects.find({userId});

        const resumePreview = {
            personalInfo,
            experience,
            education,
            skill,
            cert,
            projects
        }

        return NextResponse.json({message: "Successfully found resume data", resumePreview}, {status: 200});


    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}