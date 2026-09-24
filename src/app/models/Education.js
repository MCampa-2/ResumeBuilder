import mongoose from "mongoose";
import { Schema } from "mongoose";


const educationSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    schoolName: {
        type: String,
        required: true
    },
    degree:{
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
    },
    current: {
        type: Boolean,
    },
});

export default mongoose.models.EducationSchema || mongoose.model("EducationSchema", educationSchema);