import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  post: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  body: string;
}

const CommentSchema: Schema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    body: { type: String, required: true, minlength: 20 },
  },
  { timestamps: true }
);

export default mongoose.model<IComment>("Comment", CommentSchema);
