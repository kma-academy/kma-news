import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { LastestProcessor } from './lastest.processor';
import { CronService } from './cron.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'lastest_news',
    }),
    BullModule.registerQueue({
      name: 'news',
    }),
  ],
  controllers: [],
  providers: [CronService, LastestProcessor],
})
export class CronModule {}
