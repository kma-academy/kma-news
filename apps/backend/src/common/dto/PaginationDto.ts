import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Transform((val) => Number.parseInt(val.value || '1'))
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Transform((val) => Number.parseInt(val.value || '5'))
  limit?: number = 5;

  constructor(partial: Partial<PaginationDto>) {
    Object.assign(this, partial);
  }
}
