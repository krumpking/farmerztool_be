export class CreatePigeonDto {
  nameOrId: string;
  breed: string;
  age: number;
  dateHatched: Date;
  sex: string;
  rfidOrBarcode: string;
  gpsTracker: string;
  location: string;
  purpose: string; // Meat, Racing, Breeding
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
  racingPerformanceDetails: {
    trainingDates: Date[];
    raceTimes: string[];
    raceResults: string[];
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
