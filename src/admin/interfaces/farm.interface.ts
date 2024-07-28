import { Document } from 'mongoose';

export interface Farm extends Document {
  readonly id: string;
  readonly location: string;
  readonly numberOfEmployees: number;
  readonly logo: string;
  readonly areaSize: string;
  readonly animals: string[];
  readonly crops: string[];
  readonly dateEstablished: Date;
}
