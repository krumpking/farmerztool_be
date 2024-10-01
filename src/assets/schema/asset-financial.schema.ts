import * as mongoose from "mongoose";

export const assetFinancialSchema = new mongoose.Schema({
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
  purchasePrice: {
    type: Number,
    required: true
  },
  depreciationValue: {
    type: Number,
    required: true
  },
  depreciationTimePeriod: {
    type: String,
    required: true
  },
  currentValue: {
    type: Number,
    required: true
  },
  costs: [{
    type: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }]
}, { timestamps: true });