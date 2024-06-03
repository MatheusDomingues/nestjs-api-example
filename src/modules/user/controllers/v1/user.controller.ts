import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Put, Query, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';

import { PaginationParams } from '@/domain/common/pagination-params';
import { MessageDto } from '@/domain/dtos/message.dto';
import { UserDto } from '@/domain/dtos/user.dto';
import { PayloadUser } from '@/domain/models/payload-user.model';
import { ApiCommonResponse } from '@/infra/decorators/api-common-response';
import { ApiErrorResponse } from '@/infra/decorators/api-error-response';
import { AuthUser } from '@/infra/decorators/auth-user.decorator';

import { UpdateUserDto } from '../../dtos/update-user.dto';
import { DeleteUserUseCase } from '../../use-cases/delete.user.use-case';
import { GetAllUserUseCase } from '../../use-cases/get-all.user.use-case';
import { GetUserByEmailUseCase } from '../../use-cases/get-by-email.user.use-case';
import { GetUserByIdUseCase } from '../../use-cases/get-by-id.user.use-case';
import { UpdateUserUseCase } from '../../use-cases/update.user.use-case';

@Controller({ path: '/users', version: '1' })
@ApiTags('Users')
@ApiBearerAuth()
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly getAllUserUseCase: GetAllUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiCommonResponse(HttpStatus.OK, 'array', UserDto)
  @ApiCommonResponse(HttpStatus.NO_CONTENT, 'array')
  async getAll(
    @Res() reply: FastifyReply,
    @AuthUser() loggedUser: PayloadUser,
    @Query() query?: PaginationParams & { all?: boolean },
  ): Promise<UserDto[]> {
    this.logger.debug('Initialize controller');
    const response = await this.getAllUserUseCase.execute(loggedUser, query);

    return reply.header('X-Total-Count', response.count).send(response.data);
  }

  @Get('me')
  @ApiOperation({ summary: 'Busca usuário logado através do token' })
  @ApiCommonResponse(HttpStatus.OK, 'object', UserDto)
  @ApiErrorResponse(HttpStatus.NOT_FOUND)
  async getMyUser(@AuthUser() loggedUser: PayloadUser): Promise<UserDto> {
    this.logger.debug('Initialize controller');
    return await this.getUserByEmailUseCase.execute(loggedUser);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um usuário' })
  @ApiCommonResponse(HttpStatus.OK, 'object', UserDto)
  @ApiErrorResponse(HttpStatus.NOT_FOUND)
  async getById(@Param('id') id: string): Promise<UserDto> {
    this.logger.debug('Initialize controller');
    return await this.getUserByIdUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um usuário' })
  @ApiCommonResponse(HttpStatus.OK, 'object', UserDto)
  @ApiErrorResponse(HttpStatus.BAD_REQUEST)
  @ApiErrorResponse(HttpStatus.NOT_FOUND)
  async update(
    @AuthUser() loggedUser: PayloadUser,
    @Param('id') id: string,
    @Body() request: UpdateUserDto,
  ): Promise<UserDto> {
    this.logger.debug('Initialize controller');
    return this.updateUserUseCase.execute(loggedUser, id, request);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete um usuário' })
  @ApiCommonResponse(HttpStatus.NO_CONTENT, 'object', MessageDto)
  @ApiErrorResponse(HttpStatus.NOT_FOUND)
  async delete(@Param('id') id: string): Promise<MessageDto> {
    this.logger.debug('Initialize controller');
    return await this.deleteUserUseCase.execute(id);
  }
}
