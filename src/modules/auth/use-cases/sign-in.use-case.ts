import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserAccessDto } from '@/domain/dtos/user-access.dto';
import { UserModel } from '@/domain/models/user.model';
import { UserRepository } from '@/modules/user/repositories/user.repository';

import { SignInDto } from '../dtos/sign-in.dto';

@Injectable()
export class SignInUseCase {
  private readonly logger = new Logger(SignInUseCase.name);

  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(request: SignInDto): Promise<UserAccessDto> {
    this.logger.debug('Finding if email exist');
    let user = await this.userRepository.getByEmailAsync(request.email);

    if (!user) {
      this.logger.debug('Creating user');
      user = await this.userRepository.createAsync(new UserModel(request));
    } else {
      this.logger.debug('Updating user');
      user = await this.userRepository.updateAsync(user.id, new UserModel(request));
    }

    this.logger.debug('Generating access_token');
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    const access_token = await this.jwtService.signAsync(payload);

    this.logger.debug('Returning user with access_token');
    return new UserAccessDto(user, access_token);
  }
}
