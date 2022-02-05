import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreatePublisherDto } from './create-publisher.dto';

export class UpdatePublisherDto extends OmitType(CreatePublisherDto, [
  'hostname',
]) {
  @ApiProperty({
    example: 'https://photo-baomoi.zadn.vn/e4104227a064493a1075.png',
  })
  logo: string;

  @ApiProperty({
    example: 'https://baomoi.vn',
  })
  home: string;
}
