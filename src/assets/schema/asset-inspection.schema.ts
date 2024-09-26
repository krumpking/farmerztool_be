import * as mongoose from "mongoose";

export const assetInspectionSchema = new mongoose.Schema({
  assetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Asset",
    required: true
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  dateOfInspection: {
    type: Date,
    default: Date.now()
  },
  condition: {
    type: String,
    required: true
  },
  issuesFound: {
    type: String
  },
  recommendedActions: {
    type: String
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed"],
    default: "pending"
  }
}, {timestamps: true});