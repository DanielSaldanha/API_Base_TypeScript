import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { UserService } from "../services/user.service";

const createUserSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Formato de e-mail inválido"),
});

const updateUserSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").optional(),
  email: z.string().email("Formato de e-mail inválido").optional(),
}).refine((data) => data.name !== undefined || data.email !== undefined, {
  message: "Pelo menos um campo (nome ou email) deve ser informado para atualização",
});

const idParamSchema = z.object({
  id: z.string().uuid("ID inválido, deve ser um UUID"),
});

export class UserController {
  private userService: UserService;

  constructor(userService: UserService = new UserService()) {
    this.userService = userService;
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedBody = createUserSchema.parse(req.body);
      const user = await this.userService.createUser(validatedBody);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = idParamSchema.parse(req.params);
      const user = await this.userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = idParamSchema.parse(req.params);
      const validatedBody = updateUserSchema.parse(req.body);
      const updatedUser = await this.userService.updateUser(id, validatedBody);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = idParamSchema.parse(req.params);
      await this.userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
