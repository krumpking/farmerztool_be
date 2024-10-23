import * as mongoose from 'mongoose';

export const ContactDocumentSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  addedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  contactId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Contact' },
  contactName: { type: String, required: true },
  documentLink: { type: String, required: false },
  documentType: { type: String, lowercase: true, required: true },
  documentTitle: { type: String, required: true },
  documentDetails: { type: String, required: true },
  sourceOfDocument: { type: String, required: true, enum: ['in-house', 'client'] },
  financialRecordId: { type: mongoose.Schema.Types.ObjectId, ref: 'FinancialRecord' , required: false},
  documentDate: { type: Date, default: Date.now }
}, { timestamps: true });