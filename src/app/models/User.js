import mongoose from "mongoose";
import { Schema } from "mongoose";



const UserSchema = new Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})


export default mongoose.models.User || mongoose.model('User', UserSchema);