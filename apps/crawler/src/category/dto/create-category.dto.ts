import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Chính trị' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Bài viết chính trị', required: false })
  description?: string;
}
