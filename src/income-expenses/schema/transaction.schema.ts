import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: ['Income', 'Expense', 'Asset'],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD',
      required: true
    },
    details: {
      type: String,
      required: false
    },
    category: {
      type: String,
      lowercase: true,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);
