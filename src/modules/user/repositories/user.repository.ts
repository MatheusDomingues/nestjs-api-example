import { Prisma } from '@prisma/client';

import { PagedResponse } from '@/domain/common/paged-response';
import { PaginationParams } from '@/domain/common/pagination-params';
import { PayloadUser } from '@/domain/models/payload-user.model';
import { UserModel } from '@/domain/models/user.model';

export abstract class UserRepository {
  abstract getAllAsync(query?: PaginationParams, where?: Prisma.UserWhereInput): Promise<PagedResponse<UserModel[]>>;
  abstract getAllNotAdminAsync(loggedUser: PayloadUser, query?: PaginationParams): Promise<PagedResponse<UserModel[]>>;
  abstract getByIdAsync(id: string): Promise<UserModel>;
  abstract getByEmailAsync(email: string): Promise<UserModel>;
  abstract updateAsync(id: string, data: UserModel): Promise<UserModel>;
  abstract deleteAsync(id: string): Promise<UserModel>;
  abstract createAsync(model: UserModel): Promise<UserModel>;
}
