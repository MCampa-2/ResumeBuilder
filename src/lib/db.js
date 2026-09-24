import mongoose from "mongoose";


const databaseConnection = async () =>{
    if(mongoose.connect.readyState === 1){
        return;
    }
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("You are connected to the database!")

    }catch(error){
        console.log({error: "Could not connect to database!"});
    }
}

export default databaseConnection;