import { Document } from 'mongoose';

export interface Employee extends Document {
  readonly email: string;
  readonly fullName: string;
  readonly phoneNumber: string;
  readonly password: string;
  readonly adminId: string;
  readonly perms: string[];
  readonly role?: 'Admin' |
  'Finance' |
  'Animal Manager' |
  'Crop Management' |
  'Farm Manager' |
  'Asset Manager' |
  'Eggs Hatchery Manager' |
  'Communication Manager' |
  'Farm Worker' |
  'Veterinarian';
}
