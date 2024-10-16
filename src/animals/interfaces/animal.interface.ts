import { Document } from 'mongoose';

export interface Animal extends Document {
  readonly adminId: string;
  readonly addedBy: string;
  readonly date: Date;
  readonly animalId: string;
  readonly animalType: string;
  readonly attr: any;
  readonly locations: {
    readonly _id: string;
    readonly date: Date;
    readonly lat: number;
    readonly lng: number;
  }[];
  readonly feedings: string[];
  readonly productions: string[];
  readonly vaccinations: string[];
  readonly breedings: string[];
}