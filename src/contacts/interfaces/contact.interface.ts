import mongoose, { Document } from "mongoose";

  export interface Contacts extends Document {
    adminId: mongoose.Types.ObjectId,
    addedBy: mongoose.Types.ObjectId,
    name: string,
    contactType: string,
    email?: string,
    phoneNumber?: string,
    whatsappNumber?: string,
    city?: string,
    stateProvince?: string,
    country?: string,
    rating?: number,
    createdAt?: Date,
    updatedAt?: Date
  }