import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { ParagraphType } from '../entities/paragraph.entity';
import { ParagraphDto } from './paragraph.dto';

const paragraphExample: ParagraphDto[] = [
  {
    type: ParagraphType.TEXT,
    content: 'Dòng 1',
    imageURL: [],
  },
  {
    type: ParagraphType.IMAGE,
    content: 'Ảnh 1',
    imageURL: ['123'],
  },
];
export class CreatePostDto {
  @ApiProperty({ example: 'baomoi.vn' })
  @IsString()
  publisher: string;

  @ApiProperty({ example: 'Học viện kỹ thuật Mật mã giảm 100% học phí' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Đùa thôi' })
  @IsString()
  description: string;

  @ApiProperty({
    required: false,
    example:
      'https://vnexpress.net/cach-tinh-thue-thu-nhap-ca-nhan-voi-tien-thuong-tet-am-lich-2022-4420792.html',
  })
  sourceURL?: string;

  @ApiProperty({
    example:
      'https://photo-baomoi.zadn.vn/w300_r3x2/2022_01_29_20_41638526/04ff1aadb9ef50b109fe.jpg',
  })
  @IsUrl()
  thumbnailURL: string;
  @ApiProperty({
    example: [],
  })
  @IsArray()
  categories: number[];

  @ApiProperty()
  publishedAt?: Date;

  @ApiProperty({
    example: ['kma', 'học phí'],
    type: String,
    isArray: true,
  })
  @IsArray()
  keywords: string[];

  @ApiProperty({ example: 1 })
  @IsNumber()
  writterId: number;

  @ApiProperty({ example: 'Nhật Ánh' })
  @IsString()
  owner: string;

  @ApiProperty({ example: paragraphExample, type: ParagraphDto, isArray: true })
  @Type(() => ParagraphDto)
  @ValidateNested({ each: true })
  @IsArray()
  paragraphs: ParagraphDto[];
}
