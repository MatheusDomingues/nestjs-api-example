import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { UserDto } from '@/domain/dtos/user.dto';
import { PayloadUser } from '@/domain/models/payload-user.model';

import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class GetUserByEmailUseCase {
  private readonly logger = new Logger(GetUserByEmailUseCase.name);

  constructor(private userRepository: UserRepository) {}

  async execute(loggedUser: PayloadUser): Promise<UserDto> {
    this.logger.debug('Searching for user');
    const user = await this.userRepository.getByEmailAsync(loggedUser.email);

    if (!user) {
      this.logger.error('User not found');
      throw new UnauthorizedException('Usuário não encontrado');
    }

    this.logger.debug('Returning user');
    return new UserDto(user);
  }
}
