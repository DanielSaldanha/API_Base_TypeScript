import { User } from "@prisma/client";
import { AppError } from "../errors/AppError";
import {
  CreateUserDTO,
  UpdateUserDTO,
  UserRepository,
} from "../repositories/user.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  async createUser(data: CreateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new AppError("E-mail já cadastrado", 409);
    }

    return this.userRepository.create(data);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }
    return user;
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    if (data.email && data.email !== user.email) {
      const existingUserWithEmail = await this.userRepository.findByEmail(data.email);
      if (existingUserWithEmail) {
        throw new AppError("E-mail já em uso por outro usuário", 409);
      }
    }

    return this.userRepository.update(id, data);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    await this.userRepository.delete(id);
  }
}
