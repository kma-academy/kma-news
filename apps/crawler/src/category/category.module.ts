import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { SlugHelper } from '../common/helpers/slug.helper';
import { BullModule } from '@nestjs/bull';
import { CategoryProcessor } from './category.processor';
import { Post } from '../post/entities/post.entity';

@Module({
  providers: [CategoryService, SlugHelper, CategoryProcessor],
  imports: [
    TypeOrmModule.forFeature([Category, Post]),
    BullModule.registerQueue({
      name: 'add_category_to_post',
    }),
  ],
})
export class CategoryModule {}
