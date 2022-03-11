import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Post } from '../post/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ElasticService {
  private readonly logger = new Logger(ElasticService.name);
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}

  async migratePost() {
    try {
      await this.elasticsearchService.indices.create({
        index: 'post',
      });
    } catch (error) {
      //
    }
    this.syncDataPost();
    return 'Please wait some minute!';
  }

  async syncDataPost() {
    let page = 1;
    const limit = 10;
    let posts: Post[];
    do {
      posts = await this.postRepository.find({
        skip: (page - 1) * limit,
        take: limit,
        order: {
          id: 'DESC',
        },
        relations: ['categories', 'publisher'],
        // select: ['categories', 'publisher', 'title', 'description']
      });
      for (const post of posts) {
        this.logger.debug(`Sync post with id ${post.id} to elasticsearch`);
        const { body: postInElasticSearch } =
          await this.elasticsearchService.exists({
            index: 'post',
            id: post.id + '',
          });
        if (postInElasticSearch) continue;
        const { id, title, description, keywords, categories, url } = post;
        await this.elasticsearchService.create({
          index: 'post',
          id: post.id + '',
          refresh: true,
          body: {
            id,
            title,
            description,
            keywords,
            categories,
            url
          },
        });
        this.logger.debug(
          `Sync post with id ${post.id} to elasticsearch success`
        );
      }
      page++;
    } while (posts.length > 0);
  }
}
