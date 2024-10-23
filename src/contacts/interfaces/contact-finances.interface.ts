import { Document, Types } from 'mongoose';

export interface Item {
  itemName: string;
  unitPrice: number;
  numberOfItems: number;
}

export interface FinancialActivity extends Document {
  adminId: Types.ObjectId; 
  addedBy: Types.ObjectId; 
  contactId: Types.ObjectId;
  itemsBought: Item[]; 
  itemsSupplied: Item[];
  transactionDetails: string; 
  reason: string; 
  extraNotes?: string; 
  amount: number;
  documentId: string;
  createdAt: Date; 
  updatedAt: Date; 
}