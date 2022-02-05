import { CategoryModule } from '../category/category.module';
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CronModule } from '../cron/cron.module';
import { CrawlModule } from '../crawl/crawl.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '../config/database.config';
import jwtConfig from '../config/jwt.config';
import { Post } from '../post/entities/post.entity';
import { Paragraph } from '../post/entities/paragraph.entity';
import { Category } from '../category/entities/category.entity';
import { Publisher } from '../publisher/entities/publisher.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    CronModule,
    CrawlModule,
    CategoryModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        synchronize: false,
        entities: [Post, Paragraph, Category, Publisher, User],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
