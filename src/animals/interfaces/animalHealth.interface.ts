import { Document } from 'mongoose';

export interface Dose {
    dosageType: 'daily' | 'weekly' | 'monthly' | 'yearly';
    frequency: number;
    exactDates: string;
}

export interface TreatmentDetails {
    conditionTreated: string;
    intendedCure: string;
    additionalCareInstructions: string;
}

export interface Duration {
    startTime: string;
    endTime: string;
    duration: number; // measured in months
}

export interface SurgicalDetails {
    surgeryType: string;
    dateOfSurgery: string;
    reasonForSurgery: string;
    outcomeOfSurgery: string;
    postOperativeCare: string;
}

export interface CostOfCare {
    costOfTreatment: number; // in dollars
    numberOfAnimals: number;
    costPerAnimal: number; // inferred from total cost and number of animals
}

export interface AnimalHealth extends Document {
    adminId: string;
    addedBy: string;
    addedByType: string;
    animal: string;
    treatmentName: string;
    medicationName: string;
    provider: string;
    barcodeTag: string;
    dateAdministered: Date;
    personVet: string;
    typeOfAdministration: string;
    animalStatus: string;
    quantityMeasurement: string;
    quantity: number;
    doses: Dose[];
    treatmentDetails: TreatmentDetails;
    duration: Duration;
    surgicalDetails?: SurgicalDetails; // Optional
    costOfCare: CostOfCare;
}