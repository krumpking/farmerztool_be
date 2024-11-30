import * as mongoose from 'mongoose';

export const BreedingInfoSchema = new mongoose.Schema({
  adminId: { type: String, required: true },
  animal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animals"
  },
  animalId: { type: String, required: true },
  animalType: { type: String, required: true },
  addedBy: { type: String, required: true },
  courtship: { type: String, required: true },
  mating: { type: String, required: true },
  lineageMother: { type: String, required: true },
  lineageFather: { type: String, required: true },
  offspring: { type: String, required: true },
  matingDate: { type: String, required: true },
  matingWeather: { type: String, required: true },
  personnelInvolved: { type: String, required: true },
  notes: { type: String, required: true },
  anticipatedBirthDate: { type: String, required: true },
  checklistForBirth: { type: [String], required: true },
  anticipatedHeatDate: { type: String, required: true },

  //new fields
  sex: { type: String, required: true },
  fertilityStatus: { type: String, required: true },
  breedingCycleInfo: { type: String, required: true },
  lastMatingDate: { type: String, required: true },
  nextExpectedHeatMatingDate: { type: String, required: true },
}, { timestamps: true });
