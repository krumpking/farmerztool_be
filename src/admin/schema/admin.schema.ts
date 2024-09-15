import * as mongoose from 'mongoose';

export const FarmSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, unique: true, required: true },
  farmName: { type: String, required: true },
  farmerName:{ type: String, required: true },
  farmerAge:{ type: String, required: false },
  farmerPhoneNumber: { type: String, required: false },
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
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee"
  }],
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
}, {timestamps: true});
