import { Document } from 'mongoose';

export interface EggRecord extends Document {
  adminId: string;
  animalType: string;
  maleBreed: string;
  femaleBreed: string;
  eggCollectionDate: Date;
  eggQuantity: number;
  eggColor: string;
  avgWeightPerEgg: number;
  totalWeight: number;
  eggSize: string;
  storageMethod: string;
  storageLocation: string;
  eggQuality: 'A' | 'B' | 'C' | 'D';
  fertilityStatus: boolean;
  purpose: string;
  pricePerEgg: number;
  shelfLifeExpirationDate: Date;
  batchNumber: string;
  source: 'Livestock' | 'Customer';
  eggsUse: 'Internal Incubation' | 'Customer Incubation';
  hatchingDate: Date;
  rejectionStatus: boolean;
  attr: {
    [key: string]: any;
  };
}