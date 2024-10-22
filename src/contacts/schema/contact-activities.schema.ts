import * as mongoose from "mongoose";

export const contactActivitySchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    addedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User ' },
    contactId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Contact' },
    activityTitle: {type: String, required: true},
    activityType: { type: String, lowercase: true ,required: true },
    activityDetails: { type: String, required: true },
    activityNotes: { type: String, default: '' },
    activityDate: { type: Date, default: Date.now }
}, {timestamps: true});
