import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 40 },
    username: { type: String, required: true, unique: true, minlength: 6, maxlength: 40 },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
