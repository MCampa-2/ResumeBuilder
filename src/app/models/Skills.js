import mongoose from "mongoose";
import { Schema } from "mongoose";

const skillsSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId, 
        ref: "User"
    },
    technicalSkills: {
        type: [String],
        
    },
    softSkills:{
        type: [String],
        
    },
    tools: {
        type: [String],
       
    },
    strengths: {
        type: [String],
        
    },
    
});

export default mongoose.models.SkillsSchema || mongoose.model("SkillsSchema", skillsSchema);