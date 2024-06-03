import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { Formatter } from '@/shared/utils/formatter';

export const ApiCommonResponse = <TModel extends Type<any>>(
  status: number,
  type?: 'object' | 'array',
  model?: TModel,
) => {
  const formatter = new Formatter();
  const description = `${formatter.capitalizeWords(HttpStatus[status]?.replace('_', ' '))}`;

  // if (type === 'string')
  //   return applyDecorators(
  //     ApiResponse({
  //       description,
  //       status: status,
  //       schema: {
  //         type: 'object',
  //         properties: {
  //           message: {
  //             type: 'string',
  //           },
  //         },
  //       },
  //     }),
  //   );

  if (type === 'array' && !model)
    return applyDecorators(
      ApiResponse({
        description,
        status: status,
        schema: {
          type,
          default: [],
        },
      }),
    );

  if (type === 'object' && !model)
    return applyDecorators(
      ApiResponse({
        description,
        status: status,
        schema: {
          type,
          default: {},
        },
      }),
    );

  return applyDecorators(
    ApiExtraModels(model),
    ApiResponse({
      description,
      status: status,
      schema: {
        type,
        $ref: type === 'object' ? getSchemaPath(model) : undefined,
        items: type === 'array' ? { $ref: getSchemaPath(model) } : undefined,
      },
    }),
  );
};
