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
import { SlugHelper } from '../common/helpers/slug.helper';
import { Post } from '../post/entities/post.entity';
import { ParagraphService } from '../post/paragraph.service';
import { PublisherService } from '../publisher/publisher.service';
import { UserRole } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { BaseHandler, PostRaw } from './handler/base.handler';

@Processor('news')
export class PostProcessor {
  private readonly logger = new Logger(PostProcessor.name);

  constructor(
    @Inject('VNEXPRESS_HANDLER')
    private readonly vnexpress: BaseHandler,
    @Inject('VIETNAMNET_HANDLER')
    private readonly vietnamnet: BaseHandler,
    @Inject('VTCNEW_HANDLER')
    private readonly vtcnew: BaseHandler,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly paragraphService: ParagraphService,
    private readonly publisherService: PublisherService,
    private readonly userService: UserService,
    @InjectQueue('add_category_to_post')
    private readonly categoryQueue: Queue,
    private readonly slugHelper: SlugHelper
  ) {}

  async handlePost(post: PostRaw) {
    const { categories, paragraphs, publisherHostname, ...data } = post;
    const paragraphData = await this.paragraphService.createBatch(paragraphs);
    const publisher = await this.publisherService.findOne(publisherHostname);
    const admin = await this.userService.findOneByRole(UserRole.ADMIN);
    const postData = await this.postRepository.save({
      ...data,
      paragraphs: paragraphData,
      publisher,
      categories: [],
      writter: admin,
      slug: this.slugHelper.slugify(data.title),
    });
    this.categoryQueue.add('add_to_post', {
      postId: postData.id,
      categories,
    });
  }

  @Process('vnexpress')
  async handleVNExpress(job: Job<string>) {
    const post = await this.vnexpress.getNewDetail(job.data);
    if (!post) return;
    return await this.handlePost(post);
  }

  @Process('vietnamnet')
  async handleVietnamNet(job: Job<string>) {
    //
    const post = await this.vietnamnet.getNewDetail(job.data);
    if (!post) return;
    return await this.handlePost(post);
  }

  @Process('vtcnew')
  async handlerVTCNew(job: Job<string>) {
    const post = await this.vtcnew.getNewDetail(job.data);
    if (!post) return;
    return await this.handlePost(post);
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
