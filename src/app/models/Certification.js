import mongoose from "mongoose";
import { Schema } from "mongoose";


const certificationSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId, 
        ref: "User"
    },
    certificationName: {
        type: String,
        required: true
    },
    issuingOrganization: {
        type: String,
        required: true
    },
    issueDate: {
        type: Date,
        required: true
    },
    expirationDate: {
        type: Date,
    },
    doesNotExpire:{
        type: Boolean,
    },
    credentialId: {
        type: String,
    },
    credentialUrl: {
        type: String,
    }
});

export default mongoose.models.CertificationSchema || mongoose.model("CertificationSchema", certificationSchema);