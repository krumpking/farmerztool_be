import { Document } from 'mongoose';

export interface BreedingInfo extends Document {
  readonly adminId: string;
  readonly animal: string;
  readonly animalId: string;
  readonly animalType: string;
  readonly addedBy: string;
  addedByType: string;
  readonly courtship: string;
  readonly mating: string;
  readonly lineageMother: string;
  readonly lineageFather: string;
  readonly offspring: string;
  readonly matingDate: string;
  readonly matingWeather: string;
  readonly personnelInvolved: string;
  readonly notes: string;
  readonly anticipatedBirthDate: string;
  readonly checklistForBirth: string[];
  readonly anticipatedHeatDate: string;

  // New fields
  readonly sex: string;
  readonly fertilityStatus: string;
  readonly breedingCycleInfo: string;
  readonly lastMatingDate: string;
  readonly nextExpectedHeatMatingDate: string;
}
