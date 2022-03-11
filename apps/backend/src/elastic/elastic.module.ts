import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { Module } from '@nestjs/common';
import { ElasticService } from './elastic.service';
import { ElasticController } from './elastic.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../post/entities/post.entity';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          node: configService.get('ELASTICSEARCH_URL'),
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Post])
  ],
  controllers: [ElasticController],
  providers: [ElasticService],
})
export class ElasticModule {}
