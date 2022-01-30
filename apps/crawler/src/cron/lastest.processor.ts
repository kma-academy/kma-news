import { Logger } from '@nestjs/common';
import {
  InjectQueue,
  OnQueueActive,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job, Queue } from 'bull';

@Processor('lastest_news')
export class LastestProcessor {
  private readonly logger = new Logger(LastestProcessor.name);
  constructor(@InjectQueue('news') private readonly postQueue: Queue) {}
  @Process('vnexpress')
  async getLastestNew(job: Job) {
    this.postQueue.add('adu', '123');
    return;
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(`Handle job: ${job.name}`);
  }
  @OnQueueFailed()
  onFailed(job: Job, error: Error) {
    this.logger.debug(`Handle job ${job.name} error: ${error.message}`);
  }
}
