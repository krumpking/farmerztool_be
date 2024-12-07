import { Schema } from "mongoose";

export const animalAssetSchema = new Schema({
    adminId: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
    addedBy: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'addedByType'
    },
    addedByType: {
        type: String,
        enum: ['Users', 'Employees'],
        required: true
    },
    animal: { type: Schema.Types.ObjectId, required: true, ref: 'Animal' },
    dateAssigned: {
        type: Date,
        default: Date.now,
        required: true
    },
    dateUpdated: {
        type: Date,
        default: null // This can be set when the asset is no longer associated with the animal
    },
    assetType: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
