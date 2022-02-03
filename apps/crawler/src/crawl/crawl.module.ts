import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { PostProcessor } from './post.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'news',
    }),
  ],
  providers: [
    {
      provide: 'VNEXPRESS_CRAWLER',
      useValue: '12235',
    },
    CrawlService,
    PostProcessor,
  ],
  // exports: [CrawlService],
})
export class CrawlModule {}
