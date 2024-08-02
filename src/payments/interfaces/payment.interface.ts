// create a document interface
import { Document } from 'mongoose';

export interface Payment extends Document {
  readonly adminId: string;
  readonly description: string;
  readonly amount: number;
  readonly createAt: Date;
}
