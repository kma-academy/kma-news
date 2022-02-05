import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { PostProcessor } from './post.processor';
import { HandlerModule } from './handler.module';
import { ParagraphModule } from '../post/paragraph.module';
import { PublisherModule } from '../publisher/publisher.module';
import { UserModule } from '../user/user.module';
import { SlugHelper } from '../common/helpers/slug.helper';

@Module({
  imports: [
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
