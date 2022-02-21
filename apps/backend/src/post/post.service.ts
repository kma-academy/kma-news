import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { SlugHelper } from '../common/helpers/slug.helper';
import { Publisher } from '../publisher/entities/publisher.entity';
import { User } from '../user/entities/user.entity';
import { In, Repository, Brackets } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostStatus } from './entities/post.entity';
import { ParagraphService } from './paragraph.service';
import { SavePost } from './entities/save-post.entity';
import { find } from 'rxjs';

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
    @InjectRepository(SavePost)
    private readonly savePostRepository: Repository<SavePost>,
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

  search(query: string, page: number, limit: number) {
    const builder = this.postRepository.createQueryBuilder('post');
    builder.where('status =:status', { status: PostStatus.PUBLISHED });
    const keywords = query?.split(/\s+/g) || [];
    if (keywords.length > 0) {
      builder.andWhere(
        new Brackets((qb) => {
          const [first, ...other] = keywords;
          qb.where('title LIKE :title', { title: `%${first}%` });
          for (const keyword of other) {
            qb.orWhere('title LIKE :title', { title: `%${keyword}%` });
          }
        })
      );
    }
    builder.skip((page - 1) * limit);
    builder.take(limit);
    builder.orderBy('post.publishedAt', 'DESC');
    builder.innerJoinAndMapOne(
      'post.publisher',
      Publisher,
      'publisher',
      'post.publisherHostname = publisher.hostname'
    );
    return builder.getMany();
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
  async savePost(userId: number, postId: number) {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new BadRequestException();
    const post = await this.findOne(postId);
    if (!post) throw new BadRequestException();
    const history = await this.savePostRepository.findOne({
      where: {
        post: {
          id: postId,
        },
        user: {
          id: userId,
        },
      },
    });
    if (!history) {
      await this.savePostRepository.save({
        post,
        user,
        visitDate: new Date(),
      });
    } else {
      await this.savePostRepository.update(history.id, {
        savedAt: new Date(),
      });
    }
    return {
      message: 'Update view success',
    };
  }

  async findAllSavePost(userId: number) {
    const data = await this.savePostRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['post'],
    });
    return data.map((e) => {
      e.post = new Post(e.post);
      return e;
    });
  }
  async findSavePost(postId: number, userId: number) {
    const data = await this.savePostRepository.find({
      where: {
        user: {
          id: userId,
        },
        post: {
          id: postId,
        },
      },
      relations: ['post'],
    });
    return data[0] ? { isSave: true, idSave: data[0].id } : { isSave: false };
  }
  removeSavePost(id: number) {
    return this.savePostRepository.softDelete(id);
  }
}
