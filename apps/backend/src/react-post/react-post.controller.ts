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
} from '@nestjs/common';
import { ReactPostService } from './react-post.service';
import { CreateReactPostDto } from './dto/create-react-post.dto';
import { UpdateReactPostDto } from './dto/update-react-post.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUserId } from '../common/decorators/current-user.decorator';

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
  findAll(@CurrentUserId() userId: number) {
    return this.reactPostService.findAll(userId);
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
