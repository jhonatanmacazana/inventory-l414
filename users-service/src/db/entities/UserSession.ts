import { Document, model, Schema } from "mongoose";

export interface IUserSession extends Document {
  _id: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
}

const UserSessionSchema = new Schema({
  userId: {
    maxLength: 36,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
  },
});

const UserSession = model<IUserSession>("user-sessions", UserSessionSchema);

export default UserSession;
