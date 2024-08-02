export class CreateFrogDto {
  tankOrPondId: string;
  species: string;
  age: number;
  dateIntroduced: Date;
  location: string;
  purpose: string; // Meat, Breeding, Pet
  specialMarkings: string;
  weight: number;
  currentWeight: number;
  weightHistory: number[]; // multiple entries
  vaccinationRecords: string[]; // multiple entries
  feedingSchedule: string;
  meatProductionDetails: {
    estimatedHarvestWeight: number;
    timelineToHarvest: string;
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
