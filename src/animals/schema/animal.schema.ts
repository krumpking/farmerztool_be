import * as mongoose from 'mongoose';

export const AnimalSchema = new mongoose.Schema(
  {
    adminId: { type: String, required: true },
    numberOfAnimals: { type: Number, required: true },
    animalId: { type: String, required: true },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'addedByType',
    },
    addedByType: {
      type: String,
      enum: ['Users', 'Employees'],
      required: true,
    },
    date: { type: Date, default: Date.now() },
    animalType: { type: String, required: true },
    attr: { type: Object },
    healthStatus: {
      type: String,
      enum: ['Healthy', 'Sick', 'Under Treatment'],
    },
    species: { type: String, required: true },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true,
    },
    dateOfBirth: { type: Date, required: true },
    color: { type: String },
    photoUrl: { type: String },
    purchasePrice: { type: String },
    currentWeight: { type: String },
    genetics: [{ type: String }],
    assignLocation: { type: String },
    ownershipTags: [{ type: String }],
    dateOfAcquisition: { type: Date },
    assignAssetTags: [{ type: String }],
    source: [{ type: String }],
    purpose: { type: String },
    dobRange: [{ type: String }],
    genderCounts: [{ type: Number }],

    feeds: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'AnimalFeed',
      },
    ],
    breedings: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'AnimalBreeding',
      },
    ],
    productions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'AnimalProduction',
      },
    ],
    vaccinations: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'AnimalVaccination',
      },
    ],
    animalGrowth: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AnimalGrowth',
      },
    ],
    animalHealth: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AnimalHealth',
      },
    ],
    animalOwnership: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AnimalOwnership',
      },
    ],
    animalAssets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AnimalAsset',
      },
    ],
  },
  { timestamps: true },
);

AnimalSchema.pre('findOneAndDelete', async function (next) {
  try {
    const animalId = this.getQuery()._id;
    const modelNames = [
      'AnimalFeed',
      'AnimalProduction',
      'AnimalVaccination',
      'AnimalBreeding',
      'AnimalGrowth',
      'AnimalOwnership',
      'AnimalHealth',
      'AnimalAsset',
    ];
    const models = modelNames.map((modelName) => mongoose.model(modelName));
    await Promise.all(
      models.map((model) => model.deleteMany({ animal: animalId })),
    );
  } catch (error) {
    next(error);
  }
});
