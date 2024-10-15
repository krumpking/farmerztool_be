import * as mongoose from 'mongoose';

export const AnimalRequestSchema = new mongoose.Schema({
  adminId: { type: String, required: true },
  animal: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animals"
  },
  addedBy: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  animaltype: { type: String, required: true },
  age: { type: Number, required: true },
  healthStatus: {
    type: String,
    enum: ["excellent", "very good", "good", "fair", "poor"],
    required: true
  },
  status: {
    type: String, 
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  attr: { type: Object, required: true },
}, {timestamps: true});
