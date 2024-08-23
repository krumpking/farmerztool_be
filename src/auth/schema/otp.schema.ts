import * as mongoose from 'mongoose';

export const OtpSchema = new mongoose.Schema({
  email: {type: String, required: true},
  otp: {type: String, required: true},
  expiresAt: {type: Date, required: true}
});

//this is for automatic deletion of otp using TTL index

OtpSchema.index({expiresAt: 1}, {expireAfterSeconds: 0});
