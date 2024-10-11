import {Schema } from 'mongoose';


export const pestDiseaseIssueSchema: Schema = new Schema({
  crop: {
    type: Schema.Types.ObjectId,
    ref: 'Crop',
    required: true
  },
  cropId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  issueType: {
    type: String,
    enum: ['pest', 'disease'],
    required: true
  },
  severity: {
    type: String,
    required: true
  },
  areaAffected: {
    type: String,
    required: true
  },
  notes: {
    type: String
  }
}, {timestamps: true});
