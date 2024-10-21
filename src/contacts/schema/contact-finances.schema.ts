import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  numberOfItems: { type: Number, required: true }
}, { _id: false });

export const financialActivitySchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  addedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User ' },
  contactId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Contact' },
  itemsBought: [itemSchema],
  itemsSupplied: [itemSchema],
  transactionDetails: {
  type: String, required: true 
  },
  amount: { type: Number, required: true },
  receipt: { type: String, required: true },
  reason: { type: String, required: true },
  extraNotes: { type: String, default: '' },
}, {timestamps: true});
