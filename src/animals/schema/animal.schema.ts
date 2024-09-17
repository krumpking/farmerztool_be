import * as mongoose from 'mongoose';

export const AnimalSchema = new mongoose.Schema({
  adminId: { type: String, required: true },
  animalId: { type: String, required: true },
  addedBy: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  animaltype: { type: String, required: true },
  attr: { type: Object, required: true },
}, {timestamps: true});
