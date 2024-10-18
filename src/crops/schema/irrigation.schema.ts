import * as mongoose from "mongoose";

export const IrrigationSchema = new mongoose.Schema({
  crop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Crop",
    required: true
  },
  cropType: {
    type: String,
    required: true
  },
  irrigationType: {
    type: String,
    required: true
  },
  areaCovered: {
    type: String,
    required: true
  },
  estimatedWaterUsage: {
    type: Number,
    required: true
  },
  addedBy: {
    type: String,
    required: true
  },
  adminId: {
    type: String,
    required: true
  },
  //additional field
  notes: {
    type: String
  }
});