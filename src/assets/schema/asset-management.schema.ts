import * as mongoose from "mongoose";

export const assetSchema = new mongoose.Schema({
    adminId: { type: String, required: true },
    assetName: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    use: { type: String, required: true },
    purchasePrice: { type: Number, required: true },
    condition: { type: String, required: true },
    purchaseSource: { type: String, required: true },
    invoiceDetails: { type: String, required: true },
    currentValue: { type: Number, required: true },
    depreciationValue: { type: Number, required: true },
    depreciationTimePeriod: { type: String, required: true },
    userAssignment: { type: String, required: true },
    maintenanceSchedule: [
        {
            date: { type: Date, required: true },
            lastUpdated: { type: Date, default: Date.now },
            notes: { type: String }
        }
    ],
    inspectionReportSubmission: { type: Date },
    attributes: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true }); 