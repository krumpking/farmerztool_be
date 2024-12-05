import { Schema } from 'mongoose';

const AnimalGrowthSchema = new Schema({
    animalId: { type: String, required: true },
    addedBy: { type: String, required: true },
    weight: { type: Number, required: true },
    lastWeightDate: { type: String, required: true },
    height: { type: Number, required: true },
    lastHeightDate: { type: String, required: true },
    length: { type: Number, required: true },
    lastLengthDate: { type: String, required: true },
}, {
    timestamps: true,
});

export default AnimalGrowthSchema;