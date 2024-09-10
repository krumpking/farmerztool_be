export class Crop {
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
  }
  
//   export enum CropStatus {
//     SEEDLING = 'seedling',
//     SPROUT = 'sprout',
//     MATURE = 'mature',
//     HARVESTED = 'harvested',
//   }