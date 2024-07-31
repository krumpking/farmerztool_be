import { Document } from 'mongoose';

export interface Employee extends Document {
  readonly email: string;
  readonly password: string;
  readonly adminId: string;
  readonly perms: string[];
}
