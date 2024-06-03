import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PaginationParams {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform((param) =>
    param.value != null && param.value != '' && param.value != 'undefined' && param.value != 'null'
      ? +param.value
      : undefined,
  )
  skip?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform((param) =>
    param.value != null && param.value != '' && param.value != 'undefined' && param.value != 'null'
      ? +param.value
      : undefined,
  )
  take?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform((param) =>
    param.value != null && param.value != '' && param.value != 'undefined' && param.value != 'null'
      ? param.value
      : undefined,
  )
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform((param) =>
    param.value != null && param.value != '' && param.value != 'undefined' && param.value != 'null'
      ? param.value === 'true'
        ? true
        : false
      : undefined,
  )
  all?: boolean;
}
