import { Document } from 'mongoose';

export interface Transaction extends Document {
  adminId: string; 
  addedBy: string; 
  type: 'Income' | 'Expense' | 'Asset'; 
  title: string; 
  amount: number; 
  currency?: string; 
  details?: string; 
  category: string; 
  date?: Date; 
  createdAt?: Date;
  updatedAt?: Date; 
}