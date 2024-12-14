import mongoose, { Document } from "mongoose";

export interface AnimalOwnership extends Document {
    adminId: mongoose.Types.ObjectId;
    animal: mongoose.Types.ObjectId;
    animalId: string;
    addedBy: mongoose.Types.ObjectId;
    addedByType: 'Users' | 'Employees';
    currentOwner: string;
    transferSaleHistory: {
        previousOwner: string;
        date: string;
    }[];
    dateOfAcquisition: string;
    transferOwnershipDocumentation: string;
    sourceOfAcquisition: string;
    purchasePrice: number;
    currentMarketValue: number;
    insurance?: string;
    createdAt?: Date;
    updatedAt?: Date;
}