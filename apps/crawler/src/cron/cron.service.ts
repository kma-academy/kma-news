import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  constructor(
    @InjectQueue('lastest_news') private readonly lastestQueue: Queue
  ) {
    this.setUp();
  }

  async setUp() {
    await this.lastestQueue.removeRepeatable({
      cron: '* * * * *',
    });
    await this.lastestQueue.add('vnexpress', '', {
      repeat: {
        cron: '* * * * *',
      },
    });
    await this.lastestQueue.add('vietnamnet', '', {
      repeat: {
        cron: '* * * * *',
      },
    });
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async cleanTask() {
    this.logger.log('Clean lastest news queue');
    const preCount = await this.lastestQueue.getJobCounts();
    this.logger.debug(
      `Prev clean ${preCount.completed} completed, ${preCount.failed} failed`
    );
    await this.lastestQueue.clean(1000, 'completed');
    await this.lastestQueue.clean(3600 * 1000, 'failed');
    const afterCount = await this.lastestQueue.getJobCounts();
    this.logger.debug(
      `After clean ${afterCount.completed} completed, ${afterCount.failed} failed`
    );
  }
}
