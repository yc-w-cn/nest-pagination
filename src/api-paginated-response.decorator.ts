import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { PaginatedResponseDto } from './paginated-response.dto';

export const ApiPaginatedResponse = (model: Type<any>) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseDto) },
          {
            properties: {
              records: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
                default: [],
                example: [],
              },
            },
            required: ['records'], // 指定 records 为必填字段
          },
        ],
      },
    }),
  );
};
