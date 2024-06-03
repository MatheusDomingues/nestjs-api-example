import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'johndoe@email.com' })
  @IsEmail({}, { message: 'O campo deve ser do tipo email' })
  @IsNotEmpty({ message: 'O campo Email é obrigatório' })
  email: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  avatarUrl?: string;
}
