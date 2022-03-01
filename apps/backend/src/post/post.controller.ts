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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RecentPostDto } from './dto/recent-post.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { hasRoles, UserRole } from '../common/decorators/role.decorator';
import { SearchPostDto } from './dto/search-post.dto';
import { CurrentUserId } from '../common/decorators/current-user.decorator';

@Controller('posts')
@ApiTags('post')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
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
  @Get('top')
  findTop(
    @Query(new ValidationPipe({ transform: true }))
    findTopDto: RecentPostDto
  ) {
    return this.postService.findTop(findTopDto.page, findTopDto.limit);
  }

  @Get('save')
  @UseGuards(JwtAuthGuard)
  findAllSavePost(@CurrentUserId() userId: number) {
    return this.postService.findAllSavePost(userId);
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

  @Post(':id/save')
  @UseGuards(JwtAuthGuard)
  savePost(
    @CurrentUserId() userId: number,
    @Param('id', ParseIntPipe) postId: number
  ) {
    return this.postService.savePost(userId, postId);
  }
  @Get(':id/save')
  @UseGuards(JwtAuthGuard)
  findSavePost(
    @CurrentUserId() userId: number,
    @Param('id', ParseIntPipe) postId: number
  ) {
    return this.postService.findSavePost(postId, userId);
  }

  @Delete(':id/save')
  @UseGuards(JwtAuthGuard)
  removeSavePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.removeSavePost(id);
  }

  @Post(':id/view')
  increaseView(@Param('id', ParseIntPipe) id: number) {
    return this.postService.increaseView(id);
  }
}
