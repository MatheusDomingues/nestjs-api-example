import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { MessageDto } from '@/domain/dtos/message.dto';

import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  private readonly logger = new Logger(DeleteUserUseCase.name);

  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<MessageDto> {
    this.logger.debug('Searching user');
    const user = await this.userRepository.getByIdAsync(id);

    if (!user) {
      this.logger.error('User not found');
      throw new NotFoundException('Usuário não encontrado');
    }

    this.logger.debug('Deleting user');
    await this.userRepository.deleteAsync(id);

    this.logger.debug('User deleted');
    return new MessageDto('Usuário deletado com sucesso');
  }
}
