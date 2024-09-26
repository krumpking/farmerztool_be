import { Document } from 'mongoose';

export interface Inspection extends Document {
  assetId: string;
  adminId: string,
  dateOfInspection: Date;
  condition: string;
  issuesFound: string;
  recommendedActions: string;
  status: string;
}