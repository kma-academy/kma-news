import { OnQueueActive, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { BaseHandler } from './handler/base.handler';

@Processor('news')
export class PostProcessor {
  private readonly logger = new Logger(PostProcessor.name);

  constructor(
    @Inject('VNEXPRESS_HANDLER') private readonly vnexpress: BaseHandler
  ) {
    console.log(vnexpress.getNewDetail);
  }

  @Process('vnexpress')
  async handleVNExpress(job: Job<string>) {
    //
    const post = await this.vnexpress.getNewDetail(job.data);
    this.logger.log(JSON.stringify(post));
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
