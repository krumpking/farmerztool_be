import * as mongoose from 'mongoose';

export const AnimalSchema = new mongoose.Schema({
  adminId: { type: String, required: true },
  animalId: { type: String, required: true },
  addedBy: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  animalType: { type: String, required: true },
  attr: { type: Object, required: true },
  locations: [{
    date: { type: Date, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }],

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

}, { timestamps: true });


AnimalSchema.pre("findOneAndDelete", async function (next) {
  try {
    const animalId = this.getQuery()._id;
    const modelNames = ["Feed", "Production", "Vaccination", "Breeding"];
    const models = modelNames.map((modelName) => mongoose.model(modelName));
    await Promise.all(models.map((model) => model.deleteMany({animal: animalId})));
  } catch (error) {
    next(error);
  }
})