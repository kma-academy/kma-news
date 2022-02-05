import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { Repository } from 'typeorm';
import { Post } from '../post/entities/post.entity';
import { CategoryService } from './category.service';

interface AddToPostJob {
  postId: number;
  categories: string[];
}

@Processor('add_category_to_post')
export class CategoryProcessor {
  private readonly logger = new Logger(CategoryProcessor.name);
  constructor(
    private readonly categoryService: CategoryService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}
  @Process('add_to_post')
  async addCategoryToPost(job: Job<AddToPostJob>) {
    const { postId, categories } = job.data;
    const categoryData = await Promise.all(
      categories.map((e) => this.categoryService.findOrCreate(e))
    );
    const post = await this.postRepository.findOne(postId);
    post.categories = categoryData;
    return await this.postRepository.save(post);
  }
  @OnQueueActive()
  onActive(job: Job<AddToPostJob>) {
    this.logger.debug(`Handle job: ${job.data.postId}`);
  }
  @OnQueueFailed()
  onFailed(job: Job, error: Error) {
    this.logger.debug(`Handle job ${job.name} error: ${error.message}`);
  }
  @OnQueueCompleted()
  onCompleted(job: Job<AddToPostJob>) {
    this.logger.debug(`Add category to post ${job?.data?.postId} success`);
    job.remove();
  }
}
