export interface Animal extends Document {
  adminId: string;
  numberOfAnimals: number;
  animalId: string;
  addedBy: string;
  addedByType: 'Users' | 'Employees';
  date: Date;
  animalType: string;
  attr: any;
  healthStatus: 'Healthy' | 'Sick' | 'Under Treatment';
  species: string;
  gender: 'Male' | 'Female';
  dateOfBirth: Date;
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
  locations: {
    date: Date;
    lat: number;
    lng: number;
    numberOfAnimalsHoused: number;
    dateAdded: Date;
    timeInCurrentLocation: {
      locationName: string;
      dateUpdated: Date;
    }[];
  }[];
  feeds: string[];
  breedings: string[];
  productions: string[];
  vaccinations: string[];
  animalGrowth: string[];
  animalHealth: string[];
  animalOwnership: string[];
  animalAssets: string[];
}
