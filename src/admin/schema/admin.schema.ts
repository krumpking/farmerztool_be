import * as mongoose from 'mongoose';

export const FarmSchema = new mongoose.Schema({
  adminId: { type: String, unique: true, required: true },
  farmName: { type: String, required: true },
  farmerName:{ type: String, required: true },
  farmerAge:{ type: String, required: true },
  farmerPhoneNumber: { type: String, required: true },
  locationCity: { type: String, required: true },
  locationStateProvince: { type: String, required: true },
  locationCountry: { type: String, required: true },
  numberOfEmployees: { type: Number, required: true },
  areaUnit: { type: String, required: true },
  uploadLogo: { type: String, default: "" },
  areaSize: { type: String, required: true },
  animals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animal"
  }],
  crops: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Crop"
  }],
  dateEstablished: { type: Date, default: Date.now() },
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
}, {timestamps: true});
