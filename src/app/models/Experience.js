import mongoose from "mongoose";
import { Schema } from "mongoose";

const experienceSchema = new Schema(
    {
        userId: {type: mongoose.SchemaTypes.ObjectId, ref: "User"},
        company: {type: String, required: true},
        title: {type: String, required: true},
        startDate: {type: Date, required: true},
        endDate: {type: Date},
        current: {type: Boolean, required: true},
        description: {type: String, required: true}
    }
);

export default mongoose.models.Experience || mongoose.model("Experience", experienceSchema);