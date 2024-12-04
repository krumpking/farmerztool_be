import { Schema } from "mongoose";

export const animalHealthSchema = new Schema({
    adminId: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
    addedBy: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'addedByType'
    },
    addedByType: {
        type: String,
        enum: ['Users', 'Employee'],
        required: true
    },
    animal: { type: Schema.Types.ObjectId, required: true, ref: 'Animals' },

    // New fields added below
    treatmentName: { type: String },
    medicationName: { type: String },
    provider: { type: String },
    barcodeTag: { type: String },
    dateAdministered: { type: Date },
    personVet: { type: String },
    typeOfAdministration: { type: String },
    animalStatus: { type: String },
    quantityMeasurement: { type: String },
    quantity: { type: Number },
    doses: [{
        dosageType: { type: String, enum: ['daily', 'weekly', 'monthly', 'yearly'] },
        frequency: { type: Number },
        exactDates: { type: String }
    }],
    treatmentDetails: {
        conditionTreated: { type: String },
        intendedCure: { type: String },
        additionalCareInstructions: { type: String }
    },
    duration: {
        startTime: { type: String },
        endTime: { type: String },
        duration: { type: Number } // measured in months
    },
    surgicalDetails: {
        surgeryType: { type: String },
        dateOfSurgery: { type: String },
        reasonForSurgery: { type: String },
        outcomeOfSurgery: { type: String },
        postOperativeCare: { type: String }
    },
    costOfCare: {
        costOfTreatment: { type: Number }, // in dollars
        numberOfAnimals: { type: Number },
        costPerAnimal: { type: Number } // inferred from total cost and number of animals
    }
});