import { Schema } from "mongoose";


export const contactSchema = new Schema({
    name: { type: String, required: true },
    contactType: {type: String, required: true, lowercase: true},
    email: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    whatsappNumber: { type: String, required: false },
    adminId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    addedBy: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
     },
    city: { type: String, required: false },
    stateProvince: { type: String, required: false },
    country: { type: String, required: false },
    rating: { type: Number, required: false },
}, {timestamps: true});