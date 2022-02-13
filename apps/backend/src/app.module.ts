import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { OptionModule } from './option/option.module';
import { PublisherModule } from './publisher/publisher.module';
import { PostModule } from './post/post.module';
import { ChannelModule } from './channel/channel.module';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import { Publisher } from './publisher/entities/publisher.entity';
import { User } from './user/entities/user.entity';
import { Category } from './category/entities/category.entity';
import { Option } from './option/entities/option.entity';
import { Post } from './post/entities/post.entity';
import { Paragraph } from './post/entities/paragraph.entity';
import { Channel } from './channel/entities/channel.entity';
import { EnvValidationSchema } from '@kma-news/env-validation-schema';
import { TokenModule } from './token/token.module';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';
import { HistoryModule } from './history/history.module';
import { History } from './history/entities/history.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
      validationSchema: EnvValidationSchema,
      validationOptions: {},
      ignoreEnvFile: true,
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
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        entities: [
          User,
          Category,
          Publisher,
          Option,
          Post,
          Paragraph,
          Channel,
          Comment,
          History,
        ],
        // entities: ['dist/apps/**/*.entity{.ts,.js}'],
        // autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    OptionModule,
    PublisherModule,
    PostModule,
    ChannelModule,
    TokenModule,
    CommentModule,
    HistoryModule,
  ],
  providers: [],
})
export class AppModule {}
