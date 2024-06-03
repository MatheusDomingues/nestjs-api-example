import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { PagedResponse } from '@/domain/common/paged-response';
import { PaginationParams } from '@/domain/common/pagination-params';
import { UserDto } from '@/domain/dtos/user.dto';
import { PayloadUser } from '@/domain/models/payload-user.model';
import { UserModel } from '@/domain/models/user.model';

import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class GetAllUserUseCase {
  private readonly logger = new Logger(GetAllUserUseCase.name);

  constructor(private userRepository: UserRepository) {}

  async execute(loggedUser: PayloadUser, query?: PaginationParams): Promise<PagedResponse<UserDto[]>> {
    let response: PagedResponse<UserModel[]>;
    if (query?.all) {
      this.logger.debug('Searching users ALL');
      response = await this.userRepository.getAllAsync(query);

      if (!response?.data) {
        this.logger.error('Users not found');
        throw new NotFoundException('Usuários não encontrados');
      }
    } else {
      this.logger.debug('Searching users NOT ADMIN');
      response = await this.userRepository.getAllNotAdminAsync(loggedUser, query);

      if (!response?.data) {
        this.logger.error('Users not found');
        throw new NotFoundException('Usuários não encontrados');
      }
    }

    this.logger.debug('Returning users');
    const usersDto = response.data.map((user) => new UserDto(user));
    return new PagedResponse<UserDto[]>(usersDto, response.count);
  }
}
