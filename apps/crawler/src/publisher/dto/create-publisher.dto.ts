import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePublisherDto {
  @ApiProperty({ example: 'baomoi.vn' })
  @IsString()
  hostname: string;

  @ApiProperty({ example: 'Báo mới' })
  @IsString()
  name: string;
}
