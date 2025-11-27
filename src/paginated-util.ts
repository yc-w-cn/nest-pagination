import { DEFAULT_PAGINATED_RESPONSE } from './constants';
import { PaginatedResponseDto } from './paginated-response.dto';

export class PaginatedUtil {
  static empty(): PaginatedResponseDto {
    return DEFAULT_PAGINATED_RESPONSE;
  }
  static records<T = any>(records: T[]): PaginatedResponseDto<T> {
    return {
      total: records.length,
      records,
    };
  }
}
