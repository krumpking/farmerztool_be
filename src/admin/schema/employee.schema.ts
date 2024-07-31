import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
  email: String,
  password: String,
  adminId: String,
  perms: [String],
});
