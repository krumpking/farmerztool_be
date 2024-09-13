import { Document } from 'mongoose';

export interface Farm extends Document {
  readonly farmName: string;
  readonly adminId: string;
  readonly locationCity: string;
  readonly locationStateProvince: string;
  readonly locationCountry: string;
  readonly numberOfEmployees: number;
  readonly uploadLogo: string;
  readonly areaSize: string;
  readonly areaUnit: string,
  readonly animals?: string[];
  readonly crops?: string[];
  readonly employees?: string[];
  readonly dateEstablished: Date;
}
