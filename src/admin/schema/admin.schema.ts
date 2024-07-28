import * as mongoose from 'mongoose';

export const FarmSchema = new mongoose.Schema({
  id: { type: String, required: true },
  location: { type: String, required: true },
  numberOfEmployees: { type: Number, required: true },
  logo: { type: String, required: true },
  areaSize: { type: String, required: true },
  animals: { type: [String], required: true },
  crops: { type: [String], required: true },
  dateEstablished: { type: Date, required: true },
});
