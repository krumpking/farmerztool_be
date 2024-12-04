import { Document } from 'mongoose';

export interface Animal extends Document {
  adminId: string;
  addedBy: string;
  date: Date;
  animalId: string;
  animalType: string;
  addedByType: string;
  attr: any;
  healthStatus: "Healthy" | "Sick" | "Under Treatment";
  locations: {
    _id: string;
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
  feedings: string[];
  productions: string[];
  vaccinations: string[];
  breedings: string[];
  animalName: string;
  species: string;
  gender: "Male" | "Female";
  dateOfBirth: Date;
  currentAge: number;
  color: string;
  photoUrl: string;
  purchasePrice: number;
  currentMarketValue: number;
  insurance: string;
  genetics: {
    trait: string;
    value: string;
  }[];
}