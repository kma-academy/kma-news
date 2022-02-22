import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUserId } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('views')
@ApiTags('history')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post(':postId')
  @UseGuards(JwtAuthGuard)
  create(
    @CurrentUserId() userId: number,
    @Param('postId', ParseIntPipe) postId: number
  ) {
    return this.historyService.create(userId, postId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUserId() userId: number) {
    return this.historyService.findAll(userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.historyService.remove(id);
  }
}
