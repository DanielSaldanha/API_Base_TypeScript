import { Router } from "express";
import { userRoutes } from "./user.routes";

const routes = Router();

// Health check endpoint
routes.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// User CRUD routes
routes.use("/users", userRoutes);

export { routes };
