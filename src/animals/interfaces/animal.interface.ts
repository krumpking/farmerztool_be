import { Document } from 'mongoose';

export interface Animal extends Document {
  readonly adminId: string;
  readonly addedBy: string;
  readonly date: string;
  readonly animalId: string;
  readonly animalType: string;
  readonly attr: any;
}
