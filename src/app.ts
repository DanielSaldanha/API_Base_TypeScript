import express, { Application, Request, Response } from "express";
import cors from "cors";
import { routes } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app: Application = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", routes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: "Rota não encontrada",
  });
});

// Centralized error handler
app.use(errorHandler);

export { app };
