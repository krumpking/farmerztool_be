import * as mongoose from 'mongoose';

export const AnimalSchema = new mongoose.Schema({
  adminId: { type: String, required: true },
  animalId: { type: String, required: true },
  addedBy: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  animalType: { type: String, required: true },
  attr: { type: Object, required: true },
  healthStatus: {
    type: String,
    enum: ['Healthy', 'Sick', 'Under Treatment'],
    required: true
  },
  locations: [{
    date: { type: Date, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },

    // new fields
    currentLocationName: { type: String, required: true },
    numberOfAnimalsHoused: { type: Number, required: true },
    lastMoveDate: { type: Date, required: true },
    timeInCurrentLocation: { type: String, required: true },
  }],

  // new fields


  animalName: {
    type: String
  },
  species: {
    type: String
  },
  gender: {
    type: String,
    enum: ["Male", "Female"]
  },
  dateOfBirth: {
    type: Date
  },
  currentAge: {
    type: Number
  },
  uniqueId: {
    type: String
  },
  color: {
    type: String
  },
  photoUrl: {
    type: String
  },
  purchasePrice: {
    type: Number
  },
  currentMarketValue: {
    type: Number
  },
  insurance: {
    type: String
  },
  genetics: [{
    trait: { type: String, required: true },
    value: { type: String, required: true }
  }],

  // new fields end


  feeds: [{
    type: mongoose.Schema.ObjectId,
    ref: "Feed"
  }],

  breedings: [{
    type: mongoose.Schema.ObjectId,
    ref: "Breeding"
  }],

  productions: [{
    type: mongoose.Schema.ObjectId,
    ref: "Production"
  }],

  vaccinations: [{
    type: mongoose.Schema.ObjectId,
    ref: "Vaccination"
  }],

  // New field to hold animal growth records
  animalGrowth: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "AnimalGrowth"
  }],

}, { timestamps: true });


AnimalSchema.pre("findOneAndDelete", async function (next) {
  try {
    const animalId = this.getQuery()._id;
    const modelNames = ["Feed", "Production", "Vaccination", "Breeding"];
    const models = modelNames.map((modelName) => mongoose.model(modelName));
    await Promise.all(models.map((model) => model.deleteMany({ animal: animalId })));
  } catch (error) {
    next(error);
  }
})