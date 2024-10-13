import * as mongoose from "mongoose";

export const reminderSchema = new mongoose.Schema({
  reminderTitle: { type: String, required: true },
  reminderCategory: { type: String, required: true },
  reminderNotes: { type: String },
  reminderDate: { type: Date, required: true },
  reminderFrequency: { type: String, enum: ['DAILY', 'WEEKLY', 'MONTHLY'], required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reminderTime: { type: String, required: true },
  isReminderValid: { type: Boolean, default: true },
  reminder: { type: String, required: true }
}, { timestamps: true });

