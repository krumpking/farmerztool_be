import { Document } from 'mongoose';

export interface Feed extends Document {
  readonly adminId: string;
  readonly animal: string;
  readonly animalId: string;
  readonly animalType: string;
  readonly addedBy: string;
  readonly description: string;
  readonly feedType: string;
  readonly source: string;
  readonly nutritionalValue: string;
  readonly barcode: string[];
}
