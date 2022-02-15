import { OmitType } from '@nestjs/swagger';
import { CreateChannelDto } from './create-channel.dto';

export class CreatePersonalChannelDto extends OmitType(CreateChannelDto, [
  'isPublic',
]) {}
