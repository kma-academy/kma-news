import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  private readonly services = ['vnexpress', 'vietnamnet', 'vtcnew'];
  private readonly cron = {
    cron: '* * * * *',
  };
  constructor(
    @InjectQueue('lastest_news') private readonly lastestQueue: Queue
  ) {
    this.setUp();
  }

  async setUp() {
    await this.lastestQueue.removeRepeatable(this.cron);
    this.services.map((e) => this.lastestQueue.add(e, { repeat: this.cron }));
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
