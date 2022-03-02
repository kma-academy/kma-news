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
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUserId } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PaginationDto } from '../common/dto/PaginationDto';

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
  findAll(
    @CurrentUserId() userId: number,
    @Query(new ValidationPipe({ transform: true })) pagination: PaginationDto
  ) {
    return this.historyService.findAll(
      userId,
      pagination.page,
      pagination.limit
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.historyService.remove(id);
  }
}
