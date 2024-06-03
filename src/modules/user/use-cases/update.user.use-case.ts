import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';

import { UserDto } from '@/domain/dtos/user.dto';
import { PayloadUser } from '@/domain/models/payload-user.model';
import { UserModel } from '@/domain/models/user.model';

import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UpdateUserUseCase {
  private readonly logger = new Logger(UpdateUserUseCase.name);

  constructor(private userRepository: UserRepository) {}

  async execute(loggedUser: PayloadUser, id: string, request: UpdateUserDto): Promise<UserDto> {
    if (id !== loggedUser.sub) {
      this.logger.error('User has no permission to do this actions');
      throw new ForbiddenException('Usuário não tem permissão para realizar esta ação');
    }

    this.logger.debug('Searching user');
    const user = await this.userRepository.getByIdAsync(id);

    if (!user) {
      this.logger.error('User not found');
      throw new NotFoundException('Usuário não encontrado');
    }

    const filteredRequest = Object.fromEntries(Object.entries(request).filter(([, v]) => v != null));

    this.logger.debug('Updating user');
    const updatedUser = await this.userRepository.updateAsync(id, new UserModel({ ...user, ...filteredRequest }));

    this.logger.debug('User updated successfully');
    return new UserDto(updatedUser);
  }
}
