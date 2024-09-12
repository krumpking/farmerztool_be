export interface Cost {
    date: Date;
    costTitle: string;
    costDescription: string;
    costAmount: number;
  }

export class Financial {
  cropId: string;
  cropType: string;
  adminId: string;
  areaSize: number;
  yieldInTonnes: number;
  revenueInUSD: number;
  costs: Cost[];
}
