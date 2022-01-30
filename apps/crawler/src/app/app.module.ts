import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CronModule } from '../cron/cron.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    CronModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
