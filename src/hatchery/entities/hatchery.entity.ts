

export class EggRecord {
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
  attr: {
    [key: string]: any;
  };
}