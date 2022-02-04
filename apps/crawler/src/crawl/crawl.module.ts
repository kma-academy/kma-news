import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../post/entities/post.entity';
import { CrawlService } from './crawl.service';
import { VNExpressHandler } from './handler/vnexpress.handler';
import { PostProcessor } from './post.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'news',
      limiter: {
        duration: 1000,
        max: 1,
      },
    }),
    TypeOrmModule.forFeature([Post]),
  ],
  providers: [
    PostProcessor,
    {
      provide: 'VNEXPRESS_HANDLER',
      useClass: VNExpressHandler,
    },
    CrawlService,
  ],
  // exports: [CrawlService],
})
export class CrawlModule {}
