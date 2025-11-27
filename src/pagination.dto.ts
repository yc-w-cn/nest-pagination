import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    type: Number,
    description: '当前页码',
    example: 1,
    default: 1,
    required: false,
  })
  @IsInt()
  @Min(1)
  @Optional()
  page = 1;

  @ApiProperty({
    type: Number,
    description: '每页显示的条数',
    example: 10,
    default: 10,
    required: false,
  })
  @IsInt()
  @Min(1)
  @Optional()
  pageSize = 10;

  @ApiProperty({
    type: String,
    description: '排序器',
    required: false,
    example: '{}',
  })
  @Optional()
  sort = '{}';

  @ApiProperty({
    type: String,
    description: '过滤器',
    required: false,
    example: '{}',
  })
  @Optional()
  filter = '{}';
}
