

export class Cost {
    type: string;
    date: Date;
    cost: number;
    description: string;
  }
export class AssetFinancial {
  assetId: string;
  purchasePrice: number;
  depreciationValue: number;
  depreciationTimePeriod: string;
  currentValue: number;
  costs: Cost[];
}