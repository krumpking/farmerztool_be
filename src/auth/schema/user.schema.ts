import * as mongoose from 'mongoose';
import { Admin } from 'typeorm';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  adminId: String,
});
