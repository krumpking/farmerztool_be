import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: false, default: '' },
  phoneNumber: { type: String, required: false, default: '' },
  position: { type: String, required: false, default: '' },
  adminId: { type: String, required: false, default: '' },
  role: {
    type: String, 
    enum: [
      'Admin',
      'Finance',
      'Animal Manager',
      'Crop Management',
      'Farm Manager',
      'Asset Manager',
      'Eggs Hatchery Manager',
      'Communication Manager',
      'Farm Worker',
      'Veterinarian'
    ], 
    required: true
  },
  permissions: { type: [String], default: [] },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  farmArea: { type: String, required: false, default: '' },
  verified: { type: Boolean, default: false },
  otp: { type: String, required: false, default: '' },
  otpCreatedAt: { type: Date, required: false, default: null }
}, { timestamps: true });
