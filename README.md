# @yc-w-cn/nest-pagination

一个为 Nest.js 框架设计的分页模块，提供了简洁易用的分页请求和响应数据传输对象，以及 Swagger 文档装饰器。

## 功能特性

- 提供分页请求 DTO，支持页码、每页条数、排序和过滤功能
- 提供分页响应 DTO，统一返回记录总数和数据列表
- 提供 Swagger 文档装饰器，自动生成分页响应的 API 文档
- 完全兼容 Nest.js 和 TypeScript

## 安装

使用 pnpm 安装：

```bash
pnpm add @yc-w-cn/nest-pagination
```

## 使用示例

### 1. 分页请求

```typescript
import { Controller, Get, Query } from '@nestjs/common';
import { PaginationDto } from '@yc-w-cn/nest-pagination';

@Controller('users')
export class UsersController {
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    // paginationDto 包含 page、pageSize、sort、filter 字段
    const { page, pageSize, sort, filter } = paginationDto;
    
    // 解析排序和过滤参数
    const sortOptions = JSON.parse(sort);
    const filterOptions = JSON.parse(filter);
    
    // 执行分页查询...
    return { page, pageSize, sortOptions, filterOptions };
  }
}
```

### 2. 分页响应

```typescript
import { Controller, Get, Query } from '@nestjs/common';
import { PaginationDto, PaginatedResponseDto } from '@yc-w-cn/nest-pagination';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  @Get()
  async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponseDto<User>> {
    // 执行查询获取总数
    const total = await this.userService.count();
    
    // 执行分页查询获取记录
    const records = await this.userService.find(paginationDto);
    
    // 返回分页响应
    return {
      total,
      records
    };
  }
}
```

### 3. 使用 Swagger 装饰器

```typescript
import { Controller, Get, Query } from '@nestjs/common';
import { ApiPaginatedResponse, PaginationDto, PaginatedResponseDto } from '@yc-w-cn/nest-pagination';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  @Get()
  @ApiPaginatedResponse(User) // 自动生成包含 User 类型数组的分页响应文档
  async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponseDto<User>> {
    // 实现代码...
  }
}
```

## API 文档

### PaginationDto

分页请求数据传输对象，包含以下字段：

- `page`: 当前页码，默认为 1，最小值为 1
- `pageSize`: 每页显示的条数，默认为 10，最小值为 1
- `sort`: 排序器，JSON 字符串格式，默认为 `{}`
- `filter`: 过滤器，JSON 字符串格式，默认为 `{}`

### PaginatedResponseDto<T>

分页响应数据传输对象，包含以下字段：

- `total`: 记录总数
- `records`: 返回的记录数组，泛型参数 T 表示记录的类型

### ApiPaginatedResponse(model: Type<any>)

Swagger 文档装饰器，用于自动生成分页响应的 API 文档。

参数：
- `model`: 响应记录的类型

### DEFAULT_PAGINATED_RESPONSE

默认的分页响应对象，包含空的记录数组和总数为 0。

## 依赖

- @nestjs/common
- @nestjs/swagger
- class-transformer
- class-validator

## 许可证

MIT License

## 作者

Yuchen Wang (contact@wangyuchen.cn)
