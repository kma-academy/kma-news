import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    private readonly userRepository: Repository<User>
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
