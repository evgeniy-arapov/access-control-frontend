import { Schema, Document } from "mongoose";

export const userSchema = new Schema({
  displayName: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  jwt: String,
  role: String
});

export default class UserModel extends Document {
  constructor (obj, fields, skipId, skipInit) {
    super(obj, userSchema, fields, skipId, skipInit);
  }
}