import mongoose, { Document } from 'mongoose';

export interface AnimalGrowth extends Document {
    adminId: mongoose.Types.ObjectId; // Optional, as it may not be required
    animal: mongoose.Types.ObjectId; // Required
    animalId: string; // Required
    addedBy: mongoose.Types.ObjectId; // Required
    addedByType: 'Users' | 'Employees'; // Required
    weight: number; // Required
    lastWeightDate: string; // Required
    height: number; // Required
    lastHeightDate: string; // Required
    length: number; // Required
    lastLengthDate: string; // Required
    createdAt?: Date; // Optional, added by timestamps
    updatedAt?: Date; // Optional, added by timestamps
}
