import { Document } from 'mongoose';

export interface AnimalAsset extends Document {
    adminId: string;
    addedBy: string;
    addedByType: 'Users' | 'Employee';
    animal: string;
    dateAssigned: Date;
    dateUpdated?: Date;
    assetType: string;
}