export class CreateGeeseDto {
  nameOrId: string;
  breed: string;
  age: number;
  dateHatched: Date;
  sex: string;
  rfidOrBarcode: string;
  gpsTracker: string;
  location: string;
  purpose: string; // Eggs, Meat, Breeding
  specialMarkings: string;
  weight: number;
  currentWeight: number;
  weightHistory: number[]; // multiple entries
  vaccinationRecords: string[]; // multiple entries
  feedingSchedule: string;
  eggProductionDetails: {
    dailyEggsCollected: number;
    totalEggsCollected: number; // cumulative
    eggQuality: string;
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
