import { Document } from 'mongoose';

enum SourceOfDocument {
    IN_HOUSE = 'in-house',
    CLIENT = 'client',
  }
export interface ContactDocument extends Document {
  adminId: string;
  addedBy: string;
  contactId: string;
  contactName: string;
  documentLink: string;
  documentType: string;
  documentTitle: string;
  documentDetails: string;
  sourceOfDocument: SourceOfDocument;
  financialRecordId?: string;
  documentDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}


