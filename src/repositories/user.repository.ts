import { User } from "@prisma/client";
import { prisma } from "../config/prisma";

export interface CreateUserDTO {
  name: string;
  email: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
}

export class UserRepository {
  async create(data: CreateUserDTO): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}
