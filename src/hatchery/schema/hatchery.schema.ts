import * as mongoose from "mongoose";

export const HatcherySchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  animalType: {
    type: String,
    required: true
  },
  maleBreed: {
    type: String,
    required: true
  },
  femaleBreed: {
    type: String,
    required: true
  },
  eggCollectionDate: {
    type: Date,
    required: true
  },
  eggQuantity: {
    type: Number,
    required: true
  },
  eggColor: {
    type: String,
    required: true
  },
  avgWeightPerEgg: {
    type: Number,
    required: true
  },
  totalWeight: {
    type: Number,
    required: true
  },
  eggSize: {
    type: String,
    required: true
  },
  storageMethod: {
    type: String,
    required: true
  },
  storageLocation: {
    type: String,
    required: true
  },
  eggQuality: {
    type: String,
    enum: ['A', 'B', 'C', 'D'],
    required: true
  },
  fertilityStatus: {
    type: Boolean,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  pricePerEgg: {
    type: Number,
    required: true
  },
  shelfLifeExpirationDate: {
    type: Date,
    required: true
  },
  batchNumber: {
    type: String,
    required: true
  },
  source: {
    type: String,
    enum: ['Livestock', 'Customer'],
    required: true
  },
  eggsUse: {
    type: String,
    enum: ['Internal Incubation', 'Customer Incubation'],
    required: true
  },
  attr: {
    type: Object,
    required: true
    }
  
}, { timestamps: true });

