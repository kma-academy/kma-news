import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post/entities/post.entity';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';
import { History } from './entities/history.entity';

@Injectable()
export class HistoryService {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>
  ) {}
  async create(userId: number, postId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new BadRequestException();
    const post = await this.postService.findOne(postId);
    if (!post) throw new BadRequestException();
    const history = await this.historyRepository.findOne({
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
      await this.historyRepository.save({
        post,
        user,
        visitDate: new Date(),
      });
    } else {
      await this.historyRepository.update(history.id, {
        visitDate: new Date(),
      });
    }
    return {
      message: 'Update view success',
    };
  }

  async findAll(userId: number) {
    const data = await this.historyRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      order: {
        visitDate: 'DESC',
      },
      relations: ['post'],
    });
    return data.map((e) => {
      e.post = new Post(e.post);
      return e;
    });
    // return this.historyRepository.createQueryBuilder('history')
    // .leftJoin('history.post', 'post')
    // .leftJoin('history.user', 'user')
    // .addSelect('use')
  }

  remove(id: number) {
    return this.historyRepository.softDelete(id);
  }
}
