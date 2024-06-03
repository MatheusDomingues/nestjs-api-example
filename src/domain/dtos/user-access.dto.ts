import { ApiProperty } from '@nestjs/swagger';

import { UserModel } from '../models/user.model';

export class UserAccessDto {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  avatarUrl: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(user: UserModel, access_token: string) {
    this.id = user.id;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.name = user.name;
    this.email = user.email;
    this.avatarUrl = user.avatarUrl;
    this.access_token = access_token;
  }
}
