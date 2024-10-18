
import { Schema, Document } from "mongoose";

export interface CropActivity extends Document {
    activityType: string;
    cropType: string;
    date: Date;
    amountQuantity: number;
    method: string;
    sourcedFrom: string;
    price: number;
    time: string;
    responseFromCrop: string;
    IoTDeviceData: string;
    crop: Schema.Types.ObjectId;
    adminId: Schema.Types.ObjectId;
    squareFootage: number;
    tonnage: number;
}