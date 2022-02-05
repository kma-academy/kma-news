import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUserId } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Controller('channels')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('channel')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  create(
    @CurrentUserId() userId: number,
    @Body() createChannelDto: CreateChannelDto
  ) {
    return this.channelService.create(userId, createChannelDto);
  }

  @Get()
  findAll(@CurrentUserId() userId: number) {
    return this.channelService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChannelDto: UpdateChannelDto
  ) {
    return this.channelService.update(id, updateChannelDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.channelService.remove(id);
  }
}
