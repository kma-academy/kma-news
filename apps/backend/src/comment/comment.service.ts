import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post/entities/post.entity';
import { User } from '../user/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}
  async create(
    userId: number,
    postId: number,
    createCommentDto: CreateCommentDto
  ) {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new BadRequestException();
    const post = await this.postRepository.findOne(postId);
    if (!post) throw new NotFoundException('Cannot found post');
    return await this.commentRepository.save({
      author: user,
      content: createCommentDto.message,
      post,
    });
  }

  findAll(postId: number) {
    return this.commentRepository
      .createQueryBuilder('comment')
      .leftJoin('comment.author', 'author')
      .where('comment.postId = :postId', { postId })
      .addSelect([
        'author.id',
        'author.email',
        'author.name',
        'author.avatarURL',
      ])
      .addOrderBy('comment.createAt', 'DESC')
      .printSql()
      .getMany();
  }

  findOne(id: number) {
    return this.commentRepository
      .createQueryBuilder('comment')
      .leftJoin('comment.author', 'author')
      .where('comment.id= :id', { id })
      .addSelect([
        'author.id',
        'author.email',
        'author.name',
        'author.avatarURL',
      ])
      .getOne();
  }

  async update(
    postId: number,
    userId: number,
    id: number,
    updateCommentDto: UpdateCommentDto
  ) {
    const comment = await this.commentRepository.findOne(id, {
      relations: ['post', 'author'],
    });
    if (comment?.post?.id !== postId)
      throw new NotFoundException('Cannot found this comment in currrent post');
    if (comment?.author?.id !== userId)
      throw new UnauthorizedException(
        'You have not access to edit this comment'
      );
    await this.commentRepository.update(id, {
      content: updateCommentDto.message,
    });
    return await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoin('comment.author', 'author')
      .where('comment.id= :id', { id })
      .addSelect([
        'author.id',
        'author.email',
        'author.name',
        'author.avatarURL',
      ])
      .getOne();
  }

  remove(userId: number, id: number) {
    return `This action removes a #${id} comment with ${userId}`;
  }
}
