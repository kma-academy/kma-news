import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  // @IsNumber()
  // @ApiProperty({ example: 150 })
  // postId: number;

  @IsString()
  @ApiProperty({ example: 'message' })
  message: string;
}
