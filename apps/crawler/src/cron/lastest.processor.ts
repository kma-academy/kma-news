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
  async getLastestNew(rssURL: string, processor: string) {
    const feed = await rssParser.parseURL(rssURL);
    for (const item of feed.items) {
      const link = item.link;
      if (!link) continue;
      // eslint-disable-next-line no-empty
      const isCrawled = await this.cacheManager.get(`CRAWLED_LINK_${link}`);
      if (isCrawled) return;
      this.postQueue.add(processor, link);
      await this.cacheManager.set(
        `CRAWLED_LINK_${link}`,
        new Date().toISOString()
      );
    }
    return;
  }
  @Process('vnexpress')
  getLastestNewVNExpress() {
    return this.getLastestNew(
      'https://vnexpress.net/rss/tin-moi-nhat.rss',
      'vnexpress'
    );
  }

  @Process('vietnamnet')
  getLastestNewVietNamNet() {
    return this.getLastestNew(
      'https://vietnamnet.vn/rss/tin-moi-nhat.rss',
      'vietnamnet'
    );
  }

  @Process('vtcnew')
  getLastestNewVTCNew() {
    return this.getLastestNew('https://vtc.vn/rss/feed.rss', 'vtcnew');
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
