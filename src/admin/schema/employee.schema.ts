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
  role: {type: String, enum: ["Admin", "Manager", "Finance", "Animal Manager", "Crop Management"], required: false},
  }, {timestamps: true});

