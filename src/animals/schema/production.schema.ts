import * as mongoose from 'mongoose';

const meatProductionSchema = new mongoose.Schema({
  currentWeight: { type: Number, required: true },
  estimatedSlaughterWeight: { type: Number, required: true },
  expectedSlaughterDate: { type: Date, required: true },
  totalYield: { type: Number, required: true }
});

const milkProductionSchema = new mongoose.Schema({
  dailyYield: { type: Number, required: true },
  totalYield: { type: Number, required: true },
  purpose: { type: String, required: true }
});

const woolFurProductionSchema = new mongoose.Schema({
  shearingDate: { type: Date, required: true },
  quantity: { type: Number, required: true },
  quality: { type: String, required: true },
  soldTo: { type: String, required: true }
});

const salesRecordSchema = new mongoose.Schema({
  product: { type: String, required: true },
  buyer: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true }
});

export const AnimalProductionSchema = new mongoose.Schema({
  adminId: { type: String, required: true },
  addedBy: { type: String, required: true },
  animal: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animals"
  },
  animalId: { type: String, required: true }, 
  animalType: {type: String, required: true},
  productionType: { type: String, required: true },
  meatProduction: { type: meatProductionSchema, required: false },
  milkProduction: { type: milkProductionSchema, required: false },
  woolFurProduction: { type: woolFurProductionSchema, required: false },
  salesRecords: [{ type: salesRecordSchema, required: false }]
});
