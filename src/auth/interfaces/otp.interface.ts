import { Document } from 'mongoose';

export interface Otp extends Document {
  readonly email: string;
  readonly otp: string;
}
