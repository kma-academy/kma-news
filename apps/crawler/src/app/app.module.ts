import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CronModule } from '../cron/cron.module';
import { CrawlModule } from '../crawl/crawl.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    CronModule,
    CrawlModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
