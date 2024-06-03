import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PagedResponse } from '@/domain/common/paged-response';
import { PaginationParams } from '@/domain/common/pagination-params';
import { PayloadUser } from '@/domain/models/payload-user.model';
import { UserModel } from '@/domain/models/user.model';
import { PrismaService } from '@/shared/database/prisma.service';

import { UserRepository } from '../user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async getAllAsync(query?: PaginationParams, where?: Prisma.UserWhereInput): Promise<PagedResponse<UserModel[]>> {
    const count = await this.prisma.user.count({ where });
    const data = await this.prisma.user.findMany({
      where,
      skip: query?.skip,
      take: query?.take,
    });

    return new PagedResponse<UserModel[]>(data, count);
  }

  async getAllNotAdminAsync(_: PayloadUser, query?: PaginationParams): Promise<PagedResponse<UserModel[]>> {
    const where = {};
    const count = await this.prisma.user.count({ where });
    const data = await this.prisma.user.findMany({
      where,
      skip: query?.skip,
      take: query?.take,
    });

    return new PagedResponse<UserModel[]>(data, count);
  }

  async getByIdAsync(id: string): Promise<UserModel> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getByEmailAsync(email: string): Promise<UserModel> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createAsync(model: UserModel): Promise<UserModel> {
    return await this.prisma.user.create({
      data: {
        name: model?.name,
        avatarUrl: model?.avatarUrl,
        email: model?.email,
      },
    });
  }

  async updateAsync(id: string, model: UserModel): Promise<UserModel> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        name: model?.name,
        avatarUrl: model?.avatarUrl,
        email: model?.email,
      },
    });
  }

  async deleteAsync(id: string): Promise<UserModel> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
