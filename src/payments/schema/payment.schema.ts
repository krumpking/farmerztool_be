import * as mongoose from 'mongoose';

export const PaymentSchema = new mongoose.Schema({
  adminId: String,
  description: String,
  amount: Number,
}, {timestamps: true});
