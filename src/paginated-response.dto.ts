import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class PaginatedResponseDto<T = any> {
  @ApiProperty({
    type: Number,
    description: '记录总数',
    example: 1,
    required: true,
  })
  @IsInt()
  @Min(0)
  total = 0;

  @ApiProperty({
    type: 'array',
    description: '返回的记录',
    example: [],
    default: [],
    required: true,
  })
  records: T[] = [];
}
