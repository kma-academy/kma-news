import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginWithZaloDto {
  @ApiProperty({ example: 'abc' })
  @IsString()
  code: string;
}
