import { Document } from 'mongoose';

export interface Animal extends Document {
  readonly adminId: string;
  readonly addedBy: string;
  readonly date: Date;
  readonly animalId: string;
  readonly animalType: string;
  readonly attr: any;
  readonly healthStatus: "Healthy" | "Sick" | "Under Treatment";
  readonly locations: {
    readonly _id: string;
    readonly date: Date;
    readonly lat: number;
    readonly lng: number;
    readonly currentLocationName: string;
    readonly numberOfAnimalsHoused: number;
    readonly lastMoveDate: Date;
    readonly timeInCurrentLocation: string;
  }[];
  readonly feedings: string[];
  readonly productions: string[];
  readonly vaccinations: string[];
  readonly breedings: string[];

  // New fields
  readonly animalName: string;
  readonly species: string;
  readonly gender: "Male" | "Female";
  readonly dateOfBirth: Date;
  readonly currentAge: number;
  readonly uniqueId: string;
  readonly color: string;
  readonly photoUrl: string;
  readonly purchasePrice: number;
  readonly currentMarketValue: number;
  readonly insurance: string;
  readonly genetics: {
    readonly trait: string;
    readonly value: string;
  }[];
}