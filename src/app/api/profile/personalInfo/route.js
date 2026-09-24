import { NextResponse } from "next/server";
import databaseConnection from "../../../../lib/db";
import jwt from "jsonwebtoken";
import PersonalInfo from "../../../models/PersonalInfo";



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
            userId = decoded.userId;
            
        }catch(error){
            return NextResponse.json({message: error.message}, {status: 401});
        }

            const {fname, lname, email, phone, city, state, country, linkedin, title, summary} = await body;

            if(!fname || !lname || !email || !phone || !city || !state || !country || !linkedin || !title || !summary){

                return NextResponse.json({message: "All Fields Required"}, {status: 400});
            }
            
            const existingData = await PersonalInfo.findOne({userId: userId});

            if(existingData){
                return NextResponse.json({message: "Personal Information already exists"}, {status: 409});
            }

            const data = new PersonalInfo({
                userId: userId,
                fname: fname,
                lname: lname,
                email: email,
                phone: phone,
                city: city,
                state: state,
                country: country,
                linkedin: linkedin,
                title: title,
                summary: summary
            });
            
            await data.save();
            
            return NextResponse.json({message: "Personal Info Successfully Created", data}, {status: 201});
            


    }catch(error){
       return NextResponse.json({message: error.message}, {status: 500});
    }
}


export async function GET(request){
    try{
        await databaseConnection();
        const authHeader =  request.headers.get("authorization");
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

        const data = await PersonalInfo.findOne({userId});

        if(!data){
            return NextResponse.json({message: "Document Not Found"}, {status: 404});
        }
        return NextResponse.json({message: "Successfully found personal info" , data}, {status: 200});

    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}

export async function PATCH(request){
    try{
        await databaseConnection();

        const authHeader =  request.headers.get("authorization");
        const body = await request.json();

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

        const newData = await PersonalInfo.findOneAndUpdate({userId}, body, {new: true});

        if(!newData){
            return NextResponse.json({message: "Not found"}, {status: 404});
        }
        
        return NextResponse.json({message: "Successfully Updated Info", newData}, {status: 200});

    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500});
    }
}