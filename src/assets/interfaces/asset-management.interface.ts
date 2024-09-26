import { Document } from 'mongoose';



interface MaintenanceSchedule {
    date: Date;
    lastUpdated: Date;
    notes: string;
  }
  
export interface Asset extends Document {
  adminId: string;
  assetName: string;
  type: string;
  location: string;
  use: string;
  purchasePrice: number;
  condition: string;
  purchaseSource: string;
  invoiceDetails: string;
  currentValue: number;
  depreciationValue: number;
  depreciationTimePeriod: string;
  userAssignment: string;
  maintenanceSchedule: MaintenanceSchedule[];
  inspectionReportSubmission: Date;
  attributes: { [key: string]: any };
}
