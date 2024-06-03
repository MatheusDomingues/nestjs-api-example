import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { Formatter } from '@/shared/utils/formatter';

export const ApiErrorResponse = (status: number) => {
  const formatter = new Formatter();
  const errorMessage = formatter.capitalizeWords(HttpStatus[status].replace('_', ' '));
  const description = `Error: ${errorMessage}`;

  return applyDecorators(
    ApiResponse({
      description,
      status: status,
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          statusCode: {
            type: 'number',
            default: status,
          },
        },
      },
    }),
  );
};
