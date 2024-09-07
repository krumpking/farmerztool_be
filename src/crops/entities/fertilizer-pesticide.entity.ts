export class FertilizerPestcide {
    crop: string;
    recordType: 'Fertilizer' | 'Pesticide';
    areaCovered: number;
    estimatedAmount: number;
    addedBy: string;
    adminId: string;
    notes: string;
    date?: Date;
}