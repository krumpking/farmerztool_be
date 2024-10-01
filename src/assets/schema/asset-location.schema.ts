import * as mongoose from "mongoose";

export const assetLocationSchema = new mongoose.Schema({
  assetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
    required: true
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  locationHistory: [{
    date: { type: Date, default: Date.now },
    locationDouble: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    },
    notes: { type: String }
  }],
  userAssignment: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: ['User', 'Employee'] // reference either User or Employee model
    },
    startTime: { type: Date },
    finishTime: { type: Date }
  },
  usageLogs: [{
    date: { type: Date, default: Date.now },
    usageNotes: { type: String }
  }]
}, { timestamps: true });