// import * as mongoose from 'mongoose';

// export const AnimalOwnershipSchema = new mongoose.Schema({
//     animalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Animals', required: true },
//     addedById: {
//         type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true
//     },
//     currentOwner: { type: String, required: true }, // Current owner's name or ID
//     transferSaleHistory: [{
//         date: { type: Date, required: true }, // Date of transfer or sale
//         previousOwner: { type: String, required: true }, // Previous owner's name or ID
//         newOwner: { type: String, required: true }, // New owner's name or ID
//         transferType: { type: String, enum: ['Transfer', 'Sale'], required: true }, // Type of transfer
//         documentation: { type: String }, // Reference to uploaded document (could be a URL or file path)
//     }],
//     dateOfAcquisition: { type: Date, required: true }, // Date when the animal was acquired
//     sourceOfAcquisition: { type: String, required: true }, // Source from where the animal was acquired
//     purchasePrice: { type: Number, required: true }, // Purchase price in dollars
//     currentMarketValue: { type: Number, required: true }, // Current market value in dollars
//     insurance: { type: String }, // Insurance details, if applicable
// }, { timestamps: true });
