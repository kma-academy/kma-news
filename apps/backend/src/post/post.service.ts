import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { SlugHelper } from '../common/helpers/slug.helper';
import { Publisher } from '../publisher/entities/publisher.entity';
import { User } from '../user/entities/user.entity';
import { In, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostStatus } from './entities/post.entity';
import { ParagraphService } from './paragraph.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly slugHelper: SlugHelper,
    private readonly paragraphService: ParagraphService
  ) {}

  async create(createPostDto: CreatePostDto) {
    const { categories, writterId, publisher, paragraphs, ...fieldToCreate } =
      createPostDto;
    const slug = this.slugHelper.slugify(fieldToCreate.title);
    const post = this.postRepository.create({
      ...fieldToCreate,
      slug,
    });
    post.paragraphs = await this.paragraphService.createBatch(paragraphs);
    post.publisher = await this.publisherRepository.findOne(publisher);
    post.categories = await this.categoryRepository.find({
      where: {
        id: In(categories),
      },
    });
    if (writterId > 0) {
      post.writter = await this.userRepository.findOne(writterId);
    }
    return await this.postRepository.save(post);
  }

  findAll(page: number, limit: number) {
    // Pagination
    return this.postRepository.find({
      relations: ['publisher'],
      order: {
        publishedAt: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findOne(id: number) {
    return this.postRepository.findOne(id, {
      relations: ['publisher', 'paragraphs', 'categories'],
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post with ${JSON.stringify(
      updatePostDto
    )}`;
  }

  remove(id: number) {
    return this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({ status: PostStatus.DRAFT })
      .where('id = :id', { id })
      .execute();
  }
}
