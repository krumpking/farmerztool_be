import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const EmployeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false
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


EmployeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  
  next();
});

