import * as mongoose from 'mongoose';

export interface Irrigation extends mongoose.Document {
  crop: mongoose.Types.ObjectId;
  irrigationType: string;
  areaCovered: string;
  estimatedWaterUsage: number;
  addedBy: string;
  adminId: string;
  notes?: string;
}