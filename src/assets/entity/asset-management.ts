
export class MaintenanceSchedule {
    date: Date;
    lastUpdated: Date;
    notes: string;
}

export class Asset {
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
