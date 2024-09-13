import { Document } from "mongoose";
export interface PestDiseaseIssue extends Document {
    cropId: string;
    adminId: string;
    issueType: 'pest' | 'disease';
    severity: string;
    areaAffected: string;
    notes: string;
}