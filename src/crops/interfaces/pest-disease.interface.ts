import { Document } from "mongoose";
export interface PestDiseaseIssue extends Document {
    cropType: string;
    crop: string;
    cropId: string;
    adminId: string;
    issueType: 'pest' | 'disease';
    severity: string;
    areaAffected: string;
    notes: string;
}