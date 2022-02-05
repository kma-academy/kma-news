import { BadRequestException, Injectable } from '@nestjs/common';
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
    return `This action returns a #${id} channel`;
  }

  update(id: number, updateChannelDto: UpdateChannelDto) {
    return `This action updates a #${id} channel`;
  }

  remove(id: number) {
    return `This action removes a #${id} channel`;
  }
}
