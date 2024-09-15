import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  fullName: {type: String, required: false},
  phoneNumber: {type: String, required: false},
  position: {type: String, required: false},
  adminId: {type: String, required: false},
  role: {type: String, enum: ["Admin", "Manager", "Finance", "Animal Manger", "Crop Management"], required: false},
  permissions: {type: [String], default: []},
  email: {type: String  , unique: true, required: true},
  password: {type: String, required: true},
  farmArea: {type: String, required: false},
  verified: {type: Boolean, default: false},
  otp: {type: String, required: false},
  otpCreatedAt: {type: Date, required: false}
}, {timestamps: true});
