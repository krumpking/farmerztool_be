export class CreateElkDto {
  nameOrId: string;
  breed: string;
  age: number;
  dateOfBirth: Date;
  sex: string;
  rfidOrBarcode: string;
  gpsTracker: string;
  location: string;
  purpose: string; // Milk, Meat, Breeding
  specialMarkings: string;
  weight: number;
  currentWeight: number;
  weightHistory: number[]; // multiple entries
  vaccinationRecords: string[]; // multiple entries
  feedingSchedule: string;
  milkProductionDetails: {
    dailyYield: number;
    totalMilkProduced: number; // cumulative
    milkQuality: string;
  };
  meatProductionDetails: {
    estimatedSlaughterWeight: number;
    timelineToSlaughter: string;
  };
  breedingHistory: {
    breedingPartners: string[];
    breedingDates: Date[];
    offspring: string[]; // multiple entries
  };
  healthRecords: string[]; // multiple entries
  financialRecords: {
    purchasePrice: number;
  };
  growthRecords: string[]; // multiple entries
}
