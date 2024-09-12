import * as mongoose from "mongoose";

export const FinancialSchema = new mongoose.Schema({
  crop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop'
  },
  cropType: {
    type: String,
    required: true
  },
  adminId: {
    type: String,
    required: true
  },
  areaSize: {
    type: Number,
    required: true
  },
  yieldInTonnes: {
    type: Number,
    required: true
  },
  revenueInUSD: {
    type: Number,
    required: true
  },
  costs: [{
    date: {
      type: Date,
      required: true
    },
    costTitle: {
      type: String,
      required: true
    },
    costDescription: {
      type: String,
      required: true
    },
    costAmount: {
      type: Number,
      required: true
    }
  }]
});