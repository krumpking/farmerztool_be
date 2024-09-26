import { Document } from 'mongoose';

interface AssetLocationHistory {
    date: Date;
    locationDouble: {
      latitude: number;
      longitude: number;
    };
    notes?: string;
  }
  
  interface AssetUserAssignment {
    userId: string;
    startTime: Date;
    finishTime?: Date;
  }
  
  interface AssetUsageLog {
    date: Date;
    usageNotes?: string;
  }
export interface AssetLocation extends Document {
  assetId: string;
  locationHistory: AssetLocationHistory[];
  userAssignment: AssetUserAssignment | null;
  usageLogs: AssetUsageLog[];
}

