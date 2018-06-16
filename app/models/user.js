import { Schema, Document } from "mongoose/browser";

export const userSchema = new Schema({
  displayName: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  jwt: String,
  role: {
    type: String,
    required: true,
    default: "user"
  },
  id: {
    type: Schema.Types.ObjectId,
    required: false
  }
}, { _id: false });

export default class UserModel extends Document {
  constructor (obj, fields, skipId, skipInit) {
    super(obj, userSchema, fields, skipId, skipInit);
  }
}