import { Document } from 'mongoose';

export interface Vaccination extends Document {
  readonly adminId: string;
  readonly animal: string;
  readonly animalId: string;
  readonly addedBy: string;
  readonly animalType: string;
  readonly vaccineName: string;
  readonly manufacturer: string;
  readonly iotNumber: string;
  readonly expirationDate: string;
  readonly barcode: string;
  readonly datesAdminstered: string[];
}


