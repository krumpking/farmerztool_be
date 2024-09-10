import * as mongoose from "mongoose";

export const CropSchema = new mongoose.Schema({
  //crop name should be unique
  cropName: {
    type: String,
    required: true,
    unique: true
  },
  cropType: {
    type: String,
    required: true
  },
  plantingType: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  irrigationSchedule: {
    type: {
      days: [{ type: String }],
      times: [{ type: String }]
    },
    required: true
  },
  fertilizersUsed: {
    type: [String],
    required: true
  },
  anticipatedHarvestDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    // enum: ["seedling", "sprout", "mature", "harvested"]
  },
  updatedHeightSizeLength: {
    type: Number,
    required: true
  },
  adminId: {
    type: String,
    required: true
  },
  addedBy: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  attributes: { type: {}, required: true },
});