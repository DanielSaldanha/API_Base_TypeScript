import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AppError } from "../errors/AppError";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      status: "error",
      message: "Erro de validação nos dados enviados",
      errors: err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const target = (err.meta?.target as string[])?.join(", ") || "campo";
      res.status(409).json({
        status: "error",
        message: `Violação de unicidade: já existe um registro com este ${target}`,
      });
      return;
    }

    if (err.code === "P2025") {
      res.status(404).json({
        status: "error",
        message: "Registro não encontrado no banco de dados",
      });
      return;
    }
  }

  console.error("Unhandled Error:", err);

  res.status(500).json({
    status: "error",
    message: "Erro interno do servidor",
  });
}
