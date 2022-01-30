import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class CronService {
  constructor(
    @InjectQueue('lastest_news') private readonly lastestQueue: Queue
  ) {
    this.lastestQueue.empty();

    this.lastestQueue.add('vnexpress', '', {
      repeat: {
        cron: '* * * * *',
      },
    });
  }
}
