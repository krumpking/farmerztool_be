import { Document } from 'mongoose';

export interface User extends Document {
  readonly email: string;
  readonly password: string;
  readonly fullName?: string;
  readonly phoneNumber?: string;
  readonly position?: string;
  readonly adminId?: string;
  readonly verified?: boolean;
  readonly role?:
  'Admin' |
  'Finance' |
  'Animal Manager' |
  'Crop Management' |
  'Farm Manager' |
  'Asset Manager' |
  'Eggs Hatchery Manager' |
  'Communication Manager' |
  'Farm Worker' |
  'Veterinarian';
  readonly permissions?: string[];
  readonly farmArea?: string;
  readonly otp?: string;
  readonly otpCreatedAt?: Date;
}
