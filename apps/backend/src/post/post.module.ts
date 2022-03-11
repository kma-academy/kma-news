import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Publisher } from '../publisher/entities/publisher.entity';
import { Category } from '../category/entities/category.entity';
import { User } from '../user/entities/user.entity';
import { SlugHelper } from '../common/helpers/slug.helper';
import { ParagraphService } from './paragraph.service';
import { Paragraph } from './entities/paragraph.entity';
import { SavePost } from './entities/save-post.entity';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [PostController],
  providers: [PostService, SlugHelper, ParagraphService],
  imports: [
    TypeOrmModule.forFeature([
      Post,
      Publisher,
      Category,
      User,
      Paragraph,
      SavePost,
    ]),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          node: configService.get('ELASTICSEARCH_URL'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [PostService],
})
export class PostModule {}
