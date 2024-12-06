import * as mongoose from 'mongoose';

export const VaccinationSchema = new mongoose.Schema({
  adminId: { type: String, required: true },
  animal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animal"
  },
  animalId: { type: String, required: true },
  animalType: { type: String, required: true },
  addedBy: { type: String, required: true },
  vaccineName: { type: String, required: true },
  manufacturer: { type: String, required: true },
  iotNumber: { type: String, required: true },
  expirationDate: { type: String, required: true },
  barcode: { type: String, required: true },
  datesAdminstered: { type: [String], default: [], required: true },
});
