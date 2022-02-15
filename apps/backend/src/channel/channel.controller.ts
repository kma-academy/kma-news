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
import { hasRoles, UserRole } from '../common/decorators/role.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ChannelService } from './channel.service';
import { ChannelContentDto } from './dto/channel-content.dto';
import { CreateChannelDto } from './dto/create-channel.dto';
import { CreatePersonalChannelDto } from './dto/create-personal-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Controller('channels')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('channel')
@ApiBearerAuth()
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.ADMIN)
  create(
    @CurrentUserId() userId: number,
    @Body() createChannelDto: CreateChannelDto
  ) {
    return this.channelService.create(userId, createChannelDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUserId() userId: number) {
    return this.channelService.findAll(userId);
  }

  @Get('/homepage')
  findHomePage() {
    return this.channelService.findHomePage();
  }

  @Get('/mychannel')
  @UseGuards(JwtAuthGuard)
  findPersonalChannel(@CurrentUserId() userId) {
    return this.channelService.findPersonalChannel(userId);
  }

  @Post('/mychannel')
  @UseGuards(JwtAuthGuard)
  createPersonalChannel(
    @CurrentUserId() userId,
    @Body() createPersonalChannelDto: CreatePersonalChannelDto
  ) {
    return this.channelService.createPersonalChannel(
      userId,
      createPersonalChannelDto
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.channelService.findOne(id);
  }

  @Get(':id/content')
  findContentByChannel(
    @Param('id', ParseIntPipe) id: number,
    @Param() dto: ChannelContentDto
  ) {
    return this.channelService.findContentByChannel(id, dto.page, dto.limit);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @CurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChannelDto: UpdateChannelDto
  ) {
    return this.channelService.update(userId, id, updateChannelDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(
    @CurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.channelService.remove(userId, id);
  }
}
