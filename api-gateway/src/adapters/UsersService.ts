import config from "config";
import got from "got";

const USERS_SERVICE_URI = <string>config.get("USERS_SERVICE_URI");

export interface User {
  _id: string;
  createdAt: string;
  username: string;
}

export interface UserSession {
  _id: string;
  createdAt: string;
  expiresAt: string;
  userId: string;
}

export default class UsersService {
  static async createUser({
    password,
    username,
  }: {
    password: string;
    username: string;
  }): Promise<User | null> {
    const body = await got
      .post(`${USERS_SERVICE_URI}/users`, {
        json: { password, username },
      })
      .json();
    if (!body) return null;
    return <User>body;
  }

  static async createUserSession({
    password,
    username,
  }: {
    password: string;
    username: string;
  }): Promise<UserSession | null> {
    const body = await got
      .post(`${USERS_SERVICE_URI}/sessions`, {
        json: { password, username },
      })
      .json();
    if (!body) return null;
    return <UserSession>body;
  }

  static async fetchUser({ userId }: { userId: string }): Promise<User | null> {
    const body = await got.get(`${USERS_SERVICE_URI}/users/${userId}`).json();
    if (!body) return null;
    return <User>body;
  }

  static async fetchUserSession({
    sessionId,
  }: {
    sessionId: string;
  }): Promise<UserSession | null> {
    const body = await got
      .get(`${USERS_SERVICE_URI}/sessions/${sessionId}`)
      .json();
    if (!body) return null;
    return <UserSession>body;
  }
}
