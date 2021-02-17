import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import accessEnv from "#root/helpers/accessEnv";

import setupRoutes from "./routes";

const PORT = parseInt(accessEnv("PORT", "7101"), 10);

const startServer = () => {
  const app = express();

  app.use(express.json());

  app.use(
    cors({
      origin: (_origin, cb) => cb(null, true),
      credentials: true,
    })
  );

  setupRoutes(app);

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    return res.status(500).json({ message: err.message });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.info(`Users service listening on ${PORT}`);
  });
};

export default startServer;
