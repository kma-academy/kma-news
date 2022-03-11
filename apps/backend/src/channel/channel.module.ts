import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { User } from '../user/entities/user.entity';
import { Post } from '../post/entities/post.entity';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [ChannelController],
  providers: [ChannelService],
  imports: [
    TypeOrmModule.forFeature([Channel, User, Post]),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          node: configService.get('ELASTICSEARCH_URL'),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class ChannelModule {}
