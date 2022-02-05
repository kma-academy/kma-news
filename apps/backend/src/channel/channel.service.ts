import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Post, PostStatus } from '../post/entities/post.entity';
import { Publisher } from '../publisher/entities/publisher.entity';
import { User } from '../user/entities/user.entity';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Channel } from './entities/channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}
  async create(userId: number, createChannelDto: CreateChannelDto) {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new BadRequestException('Please login first');

    return await this.channelRepository.save({
      ...createChannelDto,
      owner: user,
    });
  }

  findAll(userId: number) {
    return this.channelRepository.find({
      where: {
        owner: {
          id: userId,
        },
      },
    });
  }
  async findHomePage() {
    const channels = await this.channelRepository.find({
      where: {
        isPublic: true,
      },
    });
    const channelContent = await Promise.all(
      channels.map((e) => this.contentByChannel(e, 1, 5))
    );
    return channelContent;
  }

  async findContentByChannel(id: number, page: number, limit: number) {
    const channel = await this.channelRepository.findOne(id);
    if (!channel) throw new NotFoundException('Channel not found');
    return await this.contentByChannel(channel, page, limit);
  }
  async contentByChannel(channel: Channel, page: number, limit: number) {
    const query = this.postRepository.createQueryBuilder('post');
    query.where('status =:status', { status: PostStatus.PUBLISHED });
    if (channel.keywords.length > 0) {
      query.andWhere(
        new Brackets((qb) => {
          channel.keywords.forEach((keyword, i) => {
            if (i === 0)
              qb.where('keywords LIKE :keyword', {
                keyword: `%${keyword}%`,
              });
            else
              qb.orWhere('keywords LIKE :keyword', {
                keyword: `%${keyword}%`,
              });
          });
        })
      );
    }
    if (channel.excludedKeywords.length > 0) {
      query.andWhere(
        new Brackets((qb) => {
          channel.excludedKeywords.forEach((keyword, i) => {
            if (i === 0)
              qb.where('keywords NOT LIKE :keyword', {
                keyword: `%${keyword}%`,
              });
            else
              qb.andWhere('keywords NOT LIKE :keyword', {
                keyword: `%${keyword}%`,
              });
          });
        })
      );
    }
    query.skip((page - 1) * limit);
    query.take(limit);
    query.orderBy('post.publishedAt', 'DESC');
    query.innerJoinAndMapOne(
      'post.publisher',
      Publisher,
      'publisher',
      'post.publisherHostname = publisher.hostname'
    );
    // console.log(query.getSql());
    const post = await query.getMany();

    return {
      name: channel.name,
      url: channel.url,
      contents: post,
    };
  }

  findOne(id: number) {
    return this.channelRepository.findOne(id);
  }

  async update(userId: number, id: number, updateChannelDto: UpdateChannelDto) {
    const channel = await this.channelRepository.findOne(id, {
      relations: ['owner'],
    });
    if (!channel) throw new NotFoundException('Cannot found channel');
    if (channel.owner.id != userId)
      throw new UnauthorizedException('You can only delete your channel');
    return await this.channelRepository.save({
      id,
      ...channel,
      ...updateChannelDto,
    });
  }

  async remove(userId: number, id: number) {
    const channel = await this.channelRepository.findOne(id, {
      relations: ['owner'],
    });
    if (!channel) throw new NotFoundException('Cannot found channel');
    if (channel.owner.id != userId)
      throw new UnauthorizedException('You can only delete your channel');
    return this.channelRepository.softDelete(channel.id);
  }
}
