import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '@/shared/database/prisma.service';

import { PrismaUserRepository } from '../user/repositories/prisma/prisma.user.repository';
import { UserRepository } from '../user/repositories/user.repository';
import { AuthController } from './controllers/v1/auth.controller';
import { SignInUseCase } from './use-cases/sign-in.use-case';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_VALIDATE,
        mutatePayload: false,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    SignInUseCase,
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class AuthModule {}
