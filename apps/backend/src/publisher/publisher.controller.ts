import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { hasRoles, UserRole } from '../common/decorators/role.decorator';

@Controller('publishers')
@ApiTags('publisher')
@ApiBearerAuth()
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.ADMIN)
  create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publisherService.create(createPublisherDto);
  }

  @Get()
  findAll() {
    return this.publisherService.findAll();
  }

  @Get(':hostname')
  findOne(@Param('hostname') hostname: string) {
    return this.publisherService.findOne(hostname);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.ADMIN)
  @Patch(':hostname')
  update(
    @Param('hostname') hostname: string,
    @Body() updatePublisherDto: UpdatePublisherDto
  ) {
    return this.publisherService.update(hostname, updatePublisherDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.ADMIN)
  @Delete(':hostname')
  remove(@Param('hostname') hostname: string) {
    return this.publisherService.remove(hostname);
  }
}
