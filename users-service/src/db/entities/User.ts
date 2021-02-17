import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  _id: string;
  username: string;
  passwordHash: string;
  createdAt: Date;
}

const UserSchema = new Schema({
  username: {
    type: String,
  },
  passwordHash: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = model<IUser>("users", UserSchema);

export default User;
