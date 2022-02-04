import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { ParagraphType } from '../entities/paragraph.entity';

export class ParagraphDto {
  @ApiProperty({ enum: ParagraphType, default: ParagraphType.TEXT })
  @IsEnum(ParagraphType)
  type: ParagraphType;

  @ApiProperty({
    example: [],
  })
  @IsArray()
  imageURL: string[];

  @ApiProperty({
    example: 'Dòng 1',
  })
  @IsString()
  content: string;
}
