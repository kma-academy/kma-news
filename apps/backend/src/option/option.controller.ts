import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OptionService } from './option.service';
import { UpsertOptionDto } from './dto/upsert-option.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { hasRoles, UserRole } from '../common/decorators/role.decorator';

@Controller('options')
@ApiTags('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Get()
  findAll() {
    return this.optionService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') id: string) {
    return this.optionService.findOne(id);
  }

  @Post(':name')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.ADMIN, UserRole.WRITTER)
  update(
    @Param('name') name: string,
    @Body() upsertOptionDto: UpsertOptionDto
  ) {
    return this.optionService.upsert(name, upsertOptionDto);
  }
}
