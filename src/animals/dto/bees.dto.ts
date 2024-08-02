export class CreateBeesDto {
  hiveId: string;
  breed: string;
  age: number;
  dateEstablished: Date;
  location: string;
  purpose: string; // Honey, Breeding
  specialMarkings: string;
  weightOfHive: number[]; // multiple entries
  vaccinationRecords: string[]; // multiple entries
  feedingSchedule: string;
  honeyProductionDetails: {
    dailyYield: number;
    totalHoneyProduced: number; // cumulative
    honeyQuality: string;
  };
  breedingHistory: {
    breedingPartners: string[];
    breedingDates: Date[];
  };
  healthRecords: string[]; // multiple entries
  financialRecords: {
    purchasePrice: number;
  };
  growthRecords: string[]; // multiple entries
}
