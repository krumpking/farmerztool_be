import * as mongoose from "mongoose";

export const FertiliserPesticideSchema = new mongoose.Schema({
    crop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Crop",
        required: true
    },
    recordType: {
        type: String,
        enum: ["Fertilizer", "Pesticide"],
        required: true
    },
    areaCovered: {
        type: Number,
        required: true
    },
    estimatedAmount: {
        type: Number,
        required: true
    },
    addedBy: {
        type: String,
        required: true
    },
    adminId: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
}, {timestamps: true});