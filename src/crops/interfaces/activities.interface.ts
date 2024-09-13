
import { Schema, Document } from "mongoose";

export interface CropActivity extends Document {
    activityType: string;
    date: Date;
    amountQuantity: number;
    method: string;
    sourcedFrom: string;
    price: number;
    time: string;
    responseFromCrop: string;
    IoTDeviceData: string;
    cropId: Schema.Types.ObjectId;
    adminId: Schema.Types.ObjectId;
    squareFootage: number;
    tonnage: number;
}