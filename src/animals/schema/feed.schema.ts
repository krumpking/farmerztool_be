import * as mongoose from 'mongoose';

export const FeedSchema = new mongoose.Schema({
  adminId: { type: String, required: true },
  animalId: { type: String, required: true },
  addedBy: { type: String, required: true },
  description: { type: String, required: true },
  feedType: { type: String, required: true },
  source: { type: String, required: true },
  nutritionalValue: { type: String, required: true },
  barcode: { type: [String], required: true },
});

