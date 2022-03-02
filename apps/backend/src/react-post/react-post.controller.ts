import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ReactPostService } from './react-post.service';
import { CreateReactPostDto } from './dto/create-react-post.dto';
import { UpdateReactPostDto } from './dto/update-react-post.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUserId } from '../common/decorators/current-user.decorator';
import { PaginationDto } from '../common/dto/PaginationDto';

@Controller('react-post')
export class ReactPostController {
  constructor(private readonly reactPostService: ReactPostService) {}

  @Post(':postId')
  @UseGuards(JwtAuthGuard)
  create(
    @CurrentUserId() userId: number,
    @Param('postId', ParseIntPipe) postId: number
  ) {
    return this.reactPostService.create(userId, postId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @CurrentUserId() userId: number,
    @Query(new ValidationPipe({ transform: true })) pagination: PaginationDto
  ) {
    return this.reactPostService.findAll(
      userId,
      pagination.page,
      pagination.limit
    );
  }

  @Get(':postId')
  @UseGuards(JwtAuthGuard)
  findOne(
    @CurrentUserId() userId: number,
    @Param('postId', ParseIntPipe) postId: number
  ) {
    return this.reactPostService.findOne(userId, postId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReactPostDto: UpdateReactPostDto
  ) {
    return this.reactPostService.update(+id, updateReactPostDto);
  }

  @Delete(':id')
  remove(id: number) {
    return this.reactPostService.remove(id);
  }
}
