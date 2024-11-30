
import { Document } from "mongoose";

export interface AnimalGrowth extends Document {
    animalId: string; // ID of the animal
    addedBy: string; // ID of the user who added the growth record
    weight: number; // Current weight in kgs
    lastWeightDate: Date; // Last weigh-in date (string)
    height: number; // Current height in metres
    lastHeightDate: Date; // Last height measurement date (string)
    length: number; // Current length in metres
    lastLengthDate: Date; // Last length measurement date (string)
}