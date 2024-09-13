import { Schema} from 'mongoose';


export const activitySchema = new Schema({
    activityType: { type: String, required: true },
    date: { type: Date, required: true },
    amountQuantity: { type: Number, required: true },
    method: { type: String, required: true },
    sourcedFrom: { type: String, required: true },
    price: { type: Number, required: true },
    time: { type: String, required: true },
    responseFromCrop: { type: String, required: true },
    IoTDeviceData: { type: String, required: false },
    cropId: { type: Schema.Types.ObjectId, ref: 'Crop', required: true },
    adminId: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
    squareFootage: { type: Number, required: true },
    tonnage: { type: Number, required: true }
}, {
    timestamps: true
});

