import { Document } from 'mongoose';

export interface Feed extends Document {
  readonly adminId: string;
  readonly animalId: string;
  readonly addedBy: string;
  readonly description: string;
  readonly feedType: string;
  readonly source: string;
  readonly nutritionalValue: string;
  readonly barcode: string[];
}
