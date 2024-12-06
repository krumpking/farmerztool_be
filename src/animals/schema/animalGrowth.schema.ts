import mongoose, { Schema } from 'mongoose';

const AnimalGrowthSchema = new Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Animal",
        required: true
    },
    animalId: { type: String, required: true },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'addedByType'
    },
    addedByType: {
        type: String,
        enum: ['Users', 'Employees'],
        required: true
    },
    weight: { type: Number, required: true },
    lastWeightDate: { type: Date, required: true },
    height: { type: Number, required: true },
    lastHeightDate: { type: Date, required: true },
    length: { type: Number, required: true },
    lastLengthDate: { type: Date, required: true },
}, {
    timestamps: true,
});

export default AnimalGrowthSchema;