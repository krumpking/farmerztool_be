import { Document } from 'mongoose';

export interface Animal extends Document {
  adminId: string;
  numberOfAnimals: number;
  animalId: string;
  addedBy: string;
  addedByType: 'Users' | 'Employees';
  date: Date;
  animalType: string;
  attr: Record<string, any>;
  healthStatus: 'Healthy' | 'Sick' | 'Under Treatment';
  species: string;
  gender: 'Male' | 'Female';
  dateOfBirth: Date;
  fertilityStatus: string;
  breedingStatus: string;
  breedingCycle: string;
  previousMatingDate: Date;
  color: string;
  photoUrl: string;
  purchasePrice: string;
  currentWeight: string;
  genetics: string[];
  assignLocation: string;
  ownershipTags: string[];
  dateOfAcquisition: Date;
  assignAssetTags: string[];
  source: string[];
  purpose: string;
  dobRange: string[];
  genderCounts: number[];

  // Referenced collections
  feeds: string[];
  breedings: string[];
  productions: string[];
  vaccinations: string[];
  animalGrowth: string[];
  animalHealth: string[];
  animalOwnership: string[];
  animalAssets: string[];
}
