import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/database/prisma.service';

import { UserController } from './controllers/v1/user.controller';
import { PrismaUserRepository } from './repositories/prisma/prisma.user.repository';
import { UserRepository } from './repositories/user.repository';
import { DeleteUserUseCase } from './use-cases/delete.user.use-case';
import { GetAllUserUseCase } from './use-cases/get-all.user.use-case';
import { GetUserByEmailUseCase } from './use-cases/get-by-email.user.use-case';
import { GetUserByIdUseCase } from './use-cases/get-by-id.user.use-case';
import { UpdateUserUseCase } from './use-cases/update.user.use-case';

@Module({
  controllers: [UserController],
  providers: [
    GetAllUserUseCase,
    GetUserByIdUseCase,
    GetUserByEmailUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserModule {}
