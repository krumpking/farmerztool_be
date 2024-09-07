import mongoose, { Document } from 'mongoose';

export interface FertiliserPesticide extends Document {
    crop: mongoose.Types.ObjectId;
    recordType: 'Fertilizer' | 'Pesticide';
    areaCovered: number;
    estimatedAmount: number;
    addedBy: string;
    adminId: string;
    notes: string;
    date?: Date;
}