import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { GoogleGenAI } from "@google/genai";
import databaseConnection from "../../../lib/db";
import Certification from "../../models/Certification";
import Education from "../../models/Education";
import Experience from "../../models/Experience";
import PersonalInfo from "../../models/PersonalInfo";
import Skills from "../../models/Skills";
import Projects from "../../models/Projects";



export async function POST(request){
    try{
        await databaseConnection();
        const body = await request.json();
        const authHeader = request.headers.get("authorization")
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return NextResponse.json({message: "Unauthorized"}, {status: 401})
        }

        const token = authHeader.split(" ")[1];
        let userId;
        try{
            const decoded = jwt.verify(token, process.env.SECRET_KEY);  
            userId = decoded.userId
            
        }catch(error){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        const skills = await Skills.findOne({userId});
        const certifications = await Certification.find({userId});
        const projects = await Projects.find({userId});
        const personalInfo = await PersonalInfo.findOne({userId});
        const education = await Education.find({userId});
        const experience = await Experience.find({userId});

        const resumeInfo = {
            skills,
            certifications,
            projects,
            personalInfo,
            education,
            experience
        };


        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_KEY
        });


        const resumeSchema = {
            type: "object",
            properties: {
                question: {
                    type: "string",
                    description: "The users question to ai assistance"
                },
                category: {
                    type: "string",
                    description: "The name of the area of the resume that needs improvements example Education or Experience"
                },
                improvements: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                }
            },
            required: ["question", "category","improvements"]
        }

        const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash",
        input: `Here is my resume ${JSON.stringify(resumeInfo)}. This is my question ${body.prompt}`,
        system_instruction: `You are an AI resume assistant for a full-stack resume builder application. 
        Use the user's resume information and their question to provide accurate, personalized, and actionable advice. Do not invent experience, skills, education, accomplishments, or other information that is not present in the resume. 
        Only critique or improve information relevant to the user's question.`,
        response_format:{
            type: "text",
            mime_type: "application/json",
            schema: resumeSchema
        }
        });
        
        if(!interaction){
            return NextResponse.json({message: "Unsuccessful api call"}, {status: 400})
        }

        const result = JSON.parse(interaction.output_text);

        return NextResponse.json({message: result}, {status: 200});


    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}

