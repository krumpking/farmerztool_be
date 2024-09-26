import { Document } from 'mongoose';

export interface Cost {
    type: string;
    date: Date;
    cost: number;
    description: string;
  }
export interface AssetFinancial extends Document {
  assetId: string;
  purchasePrice: number;
  depreciationValue: number;
  depreciationTimePeriod: string;
  currentValue: number;
  costs: Cost[];
}
