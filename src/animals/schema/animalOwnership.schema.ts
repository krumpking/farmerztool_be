import mongoose from "mongoose";

export const AnimalOwnershipSchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Animal",
        required: true
    },
    animalId: { type: String, required: true },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'addedByType'
    },
    addedByType: {
        type: String,
        enum: ['Users', 'Employees'],
        required: true
    },
    currentOwner: { type: String, required: true },
    transferSaleHistory: [
        {
            previousOwner: { type: String, required: true },
            date: { type: String, required: true }
        }
    ],
    dateOfAcquisition: { type: String, required: true },
    transferOwnershipDocumentation: { type: String, required: true }, // URL of the document
    sourceOfAcquisition: { type: String, required: true },
    purchasePrice: { type: Number, required: true },
    currentMarketValue: { type: Number, required: true },
    insurance: { type: String }
}, { timestamps: true });