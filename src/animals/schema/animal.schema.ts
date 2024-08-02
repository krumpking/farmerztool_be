import * as mongoose from 'mongoose';

export const AnimalSchema = new mongoose.Schema({
  adminId: { type: String, required: true },
  animalId: { type: String, required: true },
  addedBy: { type: String, required: true },
  date: { type: String, required: true },
  animaltype: { type: String, required: true },
  attr: { type: {}, required: true },
});
