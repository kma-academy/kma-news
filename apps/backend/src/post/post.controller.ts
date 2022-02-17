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
  Query,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { RecentPostDto } from './dto/recent-post.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { hasRoles, UserRole } from '../common/decorators/role.decorator';
import { SearchPostDto } from './dto/search-post.dto';

@Controller('posts')
@ApiTags('post')
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.ADMIN, UserRole.WRITTER)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll(
    @Query(new ValidationPipe({ transform: true }))
    findAllDto: RecentPostDto
  ) {
    return this.postService.findAll(findAllDto.page, findAllDto.limit);
  }

  @Get('search')
  search(
    @Query(new ValidationPipe({ transform: true }))
    searchPostDto: SearchPostDto
  ) {
    return this.postService.search(
      searchPostDto.q,
      searchPostDto.page,
      searchPostDto.limit
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.ADMIN, UserRole.WRITTER)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto
  ) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.ADMIN, UserRole.WRITTER)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(id);
  }
}
