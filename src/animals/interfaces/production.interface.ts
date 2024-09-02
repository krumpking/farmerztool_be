import { Document } from "mongoose";


  
interface MeatProduction {
  readonly currentWeight: number; // in kg
  readonly estimatedSlaughterWeight: number; // in kg
  readonly expectedSlaughterDate: Date;
  readonly yield: number; // in kg
}

interface MilkProduction {
  readonly dailyYield: number; // in liters
  readonly totalYield: number; // in liters
  readonly purpose: string; // e.g. Sale
}

interface WoolFurProduction {
  readonly shearingDate: Date;
  readonly quantity: number; // in kg
  readonly quality: string; // e.g. High
  readonly soldTo: string; // e.g. ABC Wool Co.
}

interface SalesRecord {
  readonly product: string; // e.g. Beef
  readonly buyer: string; // e.g. Local Market
  readonly price: number; // e.g. $500
  readonly date: Date;
}

export interface Production extends Document{
    readonly adminId: string;
    readonly addedBy: string;
    readonly animalId: string;
    readonly productionType: string;
    readonly meatProduction: Readonly<MeatProduction>;
    readonly milkProduction: Readonly<MilkProduction>;
    readonly woolFurProduction: Readonly<WoolFurProduction>;
    readonly salesRecords: ReadonlyArray<Readonly<SalesRecord>>;
  }
