import { Document } from 'mongoose';

export interface Animal extends Document {
  readonly adminId: string;
  readonly addedBy: string;
  readonly date: string;
  readonly animalType: string;
  readonly attr: any;
}
