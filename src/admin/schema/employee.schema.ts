import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  perms: {
    type: [String],
    required: true
  },
  role: {
    type: String, enum: [
      'Admin',
      'Finance',
      'Animal Manager',
      'Crop Management',
      'Farm Manager',
      'Asset Manager',
      'Eggs Hatchery Manager',
      'Communication Manager',
      'Farm Worker',
      'Veterinarian'], required: true
  },
}, { timestamps: true });

