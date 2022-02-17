import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/PaginationDto';
export class SearchPostDto extends PaginationDto {
  @IsString()
  @ApiProperty({ example: 'covid' })
  q: string;
}
