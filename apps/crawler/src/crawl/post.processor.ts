import {
  InjectQueue,
  OnQueueActive,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job, Queue } from 'bull';
import { Repository } from 'typeorm';
import { Post } from '../post/entities/post.entity';
import { ParagraphService } from '../post/paragraph.service';
import { PublisherService } from '../publisher/publisher.service';
import { BaseHandler } from './handler/base.handler';

@Processor('news')
export class PostProcessor {
  private readonly logger = new Logger(PostProcessor.name);

  constructor(
    @Inject('VNEXPRESS_HANDLER')
    private readonly vnexpress: BaseHandler,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly paragraphService: ParagraphService,
    private readonly publisherService: PublisherService,
    @InjectQueue('add_category_to_post')
    private readonly categoryQueue: Queue
  ) {}

  @Process('vnexpress')
  async handleVNExpress(job: Job<string>) {
    //
    const post = await this.vnexpress.getNewDetail(job.data);
    if (!post) return;
    const { categories, paragraphs, publisherHostname, ...data } = post;
    const paragraphData = await this.paragraphService.createBatch(paragraphs);
    const publisher = await this.publisherService.findOne(publisherHostname);
    const postData = await this.postRepository.save({
      ...data,
      paragraphs: paragraphData,
      publisher,
      categories: [],
    });
    this.categoryQueue.add('add_to_post', {
      postId: postData.id,
      categories,
    });
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
