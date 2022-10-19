import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobileNumber: Number,
  countryCode: Number,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  }
})

export const MessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String
})

export const RolesSchema = new mongoose.Schema({
  roleName: String,
  permission: [String]
})