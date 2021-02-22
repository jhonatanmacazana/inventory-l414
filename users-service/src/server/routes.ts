import config from "config";
import addHours from "date-fns/addHours";
import { Express } from "express";
import omit from "lodash.omit";

import User from "#root/db/entities/User";
import UserSession from "#root/db/entities/UserSession";
// import generateUUID from "#root/helpers/generateUUID";
import hashPassword from "#root/helpers/hashPassword";
import passwordCompareSync from "#root/helpers/passwordCompareSync";

const USER_SESSION_EXPIRY_HOURS = <number>(
  config.get("USER_SESSION_EXPIRY_HOURS")
);

const setupRoutes = (app: Express) => {
  app.post("/sessions", async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      return next(new Error("Invalid body!"));
    }

    const username = req.body.username;
    const password = req.body.password;

    try {
      const user = await User.findOne({ username }).select({
        id: 1,
        passwordHash: 1,
      });

      if (!user) {
        return next(new Error("Invalid username!"));
      }

      if (!passwordCompareSync(password, user.passwordHash)) {
        return next(new Error("Invalid password!"));
      }

      const expiresAt = addHours(
        Date.now(),
        USER_SESSION_EXPIRY_HOURS
      ).toISOString();

      // const sessionToken = generateUUID();

      const userSession = {
        // _id: sessionToken,
        expiresAt,
        userId: user._id,
      };

      const userSessionCreated = await UserSession.create(userSession);

      return res.json(userSessionCreated);
    } catch (err) {
      return next(err);
    }
  });

  app.delete("/sessions/:sessionId", async (req, res, next) => {
    try {
      const sessionId = req.params.sessionId;

      const userSession = await UserSession.findOne({ _id: sessionId });

      if (!userSession) return next(new Error("Invalid session ID"));

      await UserSession.remove({ _id: userSession });

      return res.end();
    } catch (err) {
      return next(err);
    }
  });

  app.get("/sessions/:sessionId", async (req, res, next) => {
    try {
      const sessionId = req.params.sessionId;

      const userSession = await UserSession.findOne({ _id: sessionId });

      if (!userSession) return next(new Error("Invalid session ID"));

      return res.json(userSession);
    } catch (err) {
      return next(err);
    }
  });

  app.post("/users", async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      return next(new Error("Invalid body!"));
    }

    try {
      const username = req.body.username;
      const password = req.body.password;

      const newUser = {
        // _id: generateUUID(),
        passwordHash: hashPassword(password),
        username,
      };

      const newUserCreated = await User.create(newUser);

      return res.json(omit(newUserCreated, ["passwordHash"]));
    } catch (err) {
      return next(err);
    }
  });

  app.get("/users/:userId", async (req, res, next) => {
    try {
      const userId = req.params.userId;

      const user = await User.findOne({ _id: userId });

      if (!user) return next(new Error("Invalid user ID!"));

      return res.json(user);
    } catch (err) {
      return next(err);
    }
  });
};

export default setupRoutes;
