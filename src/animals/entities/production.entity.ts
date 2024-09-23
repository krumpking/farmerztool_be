class MeatProduction {
  currentWeight: number; // in kg
  estimatedSlaughterWeight: number; // in kg
  expectedSlaughterDate: Date;
  totalYield: number; // in kg
}

class MilkProduction {
  dailyYield: number; // in liters
  totalYield: number; // in liters
  purpose: string; // e.g. Sale
}

class WoolFurProduction {
  shearingDate: Date;
  quantity: number; // in kg
  quality: string; // e.g. High
  soldTo: string; // e.g. ABC Wool Co.
}

class SalesRecord {
  product: string; // e.g. Beef
  buyer: string; // e.g. Local Market
  price: number; // e.g. $500
  date: Date;
}


export class Production {
    id: string;
    adminId: string;
    addedBy: string;
    animalId: string;
    productionType: string;
    date: Date;
  
    meatProduction: MeatProduction;
    milkProduction: MilkProduction;
    woolFurProduction: WoolFurProduction;
    salesRecords: SalesRecord[];
  }
  
 