import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserAccessDto } from '@/domain/dtos/user-access.dto';
import { ApiCommonResponse } from '@/infra/decorators/api-common-response';
import { ApiErrorResponse } from '@/infra/decorators/api-error-response';
import { IsPublic } from '@/infra/decorators/public.decorator';

import { SignInDto } from '../../dtos/sign-in.dto';
import { SignInUseCase } from '../../use-cases/sign-in.use-case';

@Controller({ path: '/auth', version: '1' })
@ApiTags('Auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly signInUseCase: SignInUseCase) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Realize autenticação de usuário com email e senha',
  })
  @ApiCommonResponse(HttpStatus.OK, 'object', UserAccessDto)
  @ApiErrorResponse(HttpStatus.BAD_REQUEST)
  async signIn(@Body() request: SignInDto): Promise<UserAccessDto> {
    this.logger.debug('Initialize controller');
    return await this.signInUseCase.execute(request);
  }
}
