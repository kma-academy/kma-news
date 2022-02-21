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
import { number } from 'joi';

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
  findAll() {
    return this.reactPostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reactPostService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReactPostDto: UpdateReactPostDto
  ) {
    return this.reactPostService.update(+id, updateReactPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reactPostService.remove(+id);
  }
}
