import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { UserModel } from '@/domain/models/user.model';

export class UserDto {
  @ApiProperty()
  id: string;
  @ApiPropertyOptional()
  name?: string;
  @ApiProperty()
  email: string;
  @ApiPropertyOptional()
  avatarUrl?: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(user: UserModel) {
    this.id = user.id;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.name = user.name;
    this.email = user.email;
    this.avatarUrl = user.avatarUrl;
  }
}
