export class CreateAlligatorDto {
  nameOrId: string;
  species: string;
  age: number;
  dateOfBirth: Date;
  sex: string;
  rfidOrBarcode: string;
  gpsTracker: string;
  location: string;
  purpose: string; // Meat, Leather, Breeding
  specialMarkings: string;
  weight: number;
  currentWeight: number;
  weightHistory: number[]; // multiple entries
  vaccinationRecords: string[]; // multiple entries
  feedingSchedule: string;
  meatProductionDetails: {
    estimatedSlaughterWeight: number;
    timelineToSlaughter: string;
  };
  leatherProductionDetails: {
    skinQuality: string;
    quantityProduced: number;
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
