import { Document } from 'mongoose';

export interface Crop extends Document {
  cropName: string;
  cropType: string;
  plantingType: string;
  location: string;
  irrigationSchedule: {
    days: string[];
    times: string[];
  };
  fertilizersUsed: string[];
  anticipatedHarvestDate: Date;
  status: string;
  updatedHeightSizeLength: number;
  adminId: string;
  addedBy: string;
  dateAdded: Date;
  attributes: any;
  growthRecords: {
    growthStage: string;
    notes: string;
    weatherConditionsNotes: string;
  }[];
  soilType: string;
  irrigations: string[];
  fertPest: string[];
  financials: string[];
  activities: string[];
  pestDiseasesIssue: string[];
}