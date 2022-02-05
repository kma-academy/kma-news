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

  @ApiProperty({
    type: String,
    isArray: true,
    example: ['covid19', 'covid-19', 'ncov'],
  })
  @IsString({ each: true })
  keywords: string[];

  @ApiProperty({
    type: Number,
    isArray: true,
    example: [],
  })
  @IsNumber({}, { each: true })
  categories: number[];

  @ApiProperty({
    type: String,
    isArray: true,
    example: [],
  })
  @IsString({ each: true })
  publishers: string[];

  @ApiProperty({ type: String, isArray: true, example: [] })
  @IsString({ each: true })
  excludedKeywords: string[];

  @ApiProperty({
    type: Number,
    isArray: true,
    example: [],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  excludedCategories: number[];

  @ApiProperty({
    type: String,
    isArray: true,
    example: [],
  })
  @IsString({ each: true })
  excludedPublishers: string[];
}
