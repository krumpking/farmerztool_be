import { Document } from 'mongoose';

export interface User extends Document {
  readonly email: string;
  readonly password: string;
  readonly fullName?: string;
  readonly phoneNumber?: string;
  readonly position?: string;
  readonly adminId?: string;
  readonly dateJoined?: Date;
  readonly role?: "Admin" | "Manager" | "Finance" | "Animal Manger" | "Crop Management";
  readonly permissions?: string[];
  readonly farmArea?: string;
  readonly otp?: string;
  readonly otpCreatedAt?: Date;
}
