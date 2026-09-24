import mongoose from "mongoose";
import { Schema } from "mongoose";



const projectsSchema = new Schema({
    userId:{
        type: mongoose.SchemaTypes.ObjectId, ref: "User"
    },
    projectName: {
        type: String,
        required: true
    },
    technologies:{
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },

});


export default mongoose.models.Project || mongoose.model("Project", projectsSchema);