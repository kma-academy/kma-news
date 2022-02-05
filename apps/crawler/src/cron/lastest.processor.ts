import { CACHE_MANAGER, Inject, Logger } from '@nestjs/common';
import {
  InjectQueue,
  OnQueueActive,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { Cache } from 'cache-manager';

import RssParser from 'rss-parser';
const rssParser = new RssParser();

@Processor('lastest_news')
export class LastestProcessor {
  private readonly logger = new Logger(LastestProcessor.name);
  constructor(
    @InjectQueue('news')
    private readonly postQueue: Queue,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {}
  @Process('vnexpress')
  async getLastestNew() {
    const feed = await rssParser.parseURL(
      'https://vnexpress.net/rss/tin-moi-nhat.rss'
    );
    for (const item of feed.items) {
      const link = item.link;
      if (!link) continue;
      // eslint-disable-next-line no-empty
      const isCrawled = await this.cacheManager.get(`CRAWLED_LINK_${link}`);
      if (isCrawled) return;
      this.postQueue.add('vnexpress', link);
      await this.cacheManager.set(
        `CRAWLED_LINK_${link}`,
        new Date().toISOString()
      );
    }
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
