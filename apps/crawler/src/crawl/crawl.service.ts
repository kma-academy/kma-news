import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';

@Injectable()
export class CrawlService {
  private readonly logger = new Logger(CrawlService.name);
  constructor(@InjectQueue('news') private readonly postQueue: Queue) {}

  @Cron(CronExpression.EVERY_HOUR)
  async cleanTask() {
    this.logger.log('Clean lastest news queue');
    const preCount = await this.postQueue.getJobCounts();
    this.logger.debug(
      `Prev clean ${preCount.completed} completed, ${preCount.failed} failed`
    );
    await this.postQueue.clean(1000, 'completed');
    await this.postQueue.clean(3600 * 1000, 'failed');
    const afterCount = await this.postQueue.getJobCounts();
    this.logger.debug(
      `After clean ${afterCount.completed} completed, ${afterCount.failed} failed`
    );
  }
}
