import { Document } from 'mongoose';

export interface Cost {
    date: Date;
    costTitle: string;
    costDescription: string;
    costAmount: number;
  }
export interface Financial extends Document {
  crop: string;
  cropType: string;
  adminId: string;
  areaSize: number;
  yieldInTonnes: number;
  revenueInUSD: number;
  costs: Cost[];
}

