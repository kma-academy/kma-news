import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateChannelDto {
  @ApiProperty({ example: 'Covid 19' })
  @IsString()
  name: string;

  @ApiProperty({ default: false, example: true })
  @IsBoolean()
  isPublic: boolean;
  @IsArray()
  @ApiProperty({
    type: String,
    isArray: true,
    example: ['covid19', 'covid-19', 'ncov'],
  })
  keywords: string[];

  @IsArray()
  @ApiProperty({
    type: String,
    isArray: true,
    example: [],
  })
  categories: string[];

  @ApiProperty({
    type: String,
    isArray: true,
    example: [],
  })
  publishers: string[];

  @ApiProperty({ type: String, isArray: true, example: [] })
  @IsArray()
  excludedKeywords: string[];

  @ApiProperty({
    type: String,
    isArray: true,
    example: [],
  })
  @IsArray()
  excludedCategories: string[];

  @ApiProperty({
    type: String,
    isArray: true,
    example: [],
  })
  @IsString({ each: true })
  excludedPublishers: string[];
}
