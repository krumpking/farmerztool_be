export interface BreedingInfo extends Document {
  readonly adminId: string;
  readonly animalId: string;
  readonly addedBy: string;
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
}
