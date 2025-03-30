import mongoose, { Schema, Document } from "mongoose";

export interface IFollow extends Document {
  follower: mongoose.Types.ObjectId;
  followee: mongoose.Types.ObjectId;
}

const FollowSchema: Schema = new Schema(
  {
    follower: { type: Schema.Types.ObjectId, ref: "User", required: true },
    followee: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Prevent duplicate follow records
FollowSchema.index({ follower: 1, followee: 1 }, { unique: true });

export default mongoose.model<IFollow>("Follow", FollowSchema);
