import { Document } from 'mongoose';

export interface ContactActivity extends Document {
  activityTitle: string;
  activityType: string; 
  activityDetails: string;
  activityNotes?: string;
  activityDate: Date;
  adminId: string;
  addedBy: string;
  contactId: string;
  createdAt: Date;
  updatedAt: Date;
}