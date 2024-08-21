import { Document } from 'mongoose';

export interface User extends Document {
  readonly email: string;
  password: string;
  readonly fullName?: string;
  readonly phoneNumber?: string;
  readonly position?: string;
  readonly dateJoined?: string;
  readonly role?: "Admin" | "Manager" | "Finance" | "Animal Manger" | "Crop Management";
  readonly permissions?: string[];
  readonly farmArea?: string;
}
