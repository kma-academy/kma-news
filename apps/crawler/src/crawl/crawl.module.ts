import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { PostProcessor } from './post.processor';
import { HandlerModule } from './handler.module';
import { ParagraphModule } from '../post/paragraph.module';
import { PublisherModule } from '../publisher/publisher.module';
import { UserModule } from '../user/user.module';
import { SlugHelper } from '../common/helpers/slug.helper';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          node: configService.get('ELASTICSEARCH_URL'),
        };
      },
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'news',
      limiter: {
        duration: 1000,
        max: 1,
      },
    }),
    BullModule.registerQueue({
      name: 'add_category_to_post',
    }),
    HandlerModule,
    ParagraphModule,
    PublisherModule,
    UserModule,
  ],
  providers: [PostProcessor, CrawlService, SlugHelper],
})
export class CrawlModule {}
