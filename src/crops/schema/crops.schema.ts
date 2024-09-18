import * as mongoose from "mongoose";

const growthRecords = new mongoose.Schema({
  growthStage: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  weatherConditionsNotes: {
    type: String,
    required: true
  }
}, {timestamps: true});

export const CropSchema = new mongoose.Schema({
  cropName: {
    type: String,
    required: true,
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
  growthRecords: [growthRecords],
  dateAdded: {
    type: Date,
    default: Date.now
  },
  attributes: { type: {}, required: true },
  soilType: {
    type: String,
    required: true
  }
});