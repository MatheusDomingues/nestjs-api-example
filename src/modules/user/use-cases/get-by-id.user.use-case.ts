import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { UserDto } from '@/domain/dtos/user.dto';

import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class GetUserByIdUseCase {
  private readonly logger = new Logger(GetUserByIdUseCase.name);

  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<UserDto> {
    this.logger.debug('Searching for user');
    const user = await this.userRepository.getByIdAsync(id);

    if (!user) {
      this.logger.error('User not found');
      throw new NotFoundException('Usuário não encontrado');
    }

    this.logger.debug('Returning user');
    return new UserDto(user);
  }
}
