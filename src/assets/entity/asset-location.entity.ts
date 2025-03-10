class AssetLocationHistory {
    date: Date;
    locationDouble: {
      latitude: number;
      longitude: number;
    };
    notes?: string;
  }
  
  class AssetUserAssignment {
    userId: string;
    startTime: Date;
    finishTime?: Date;
  }
  
  class AssetUsageLog {
    date: Date;
    usageNotes?: string;
  }
export class AssetDocument {
  assetId: string;
  adminId: string;
  locationHistory: AssetLocationHistory[];
  userAssignment: AssetUserAssignment | null;
  usageLogs: AssetUsageLog[];
}