import { BullModule } from '@nestjs/bull';
import { CacheModule, Module } from '@nestjs/common';
import { LastestProcessor } from './lastest.processor';
import { CronService } from './cron.service';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'lastest_news',
    }),
    BullModule.registerQueue({
      name: 'news',
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          store: redisStore,
          // Store-specific configuration:
          host: configService.get('REDIS_HOST') || 'localhost',
          port: configService.get('REDIS_PORT') || 6379,
          ttl: 0,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [CronService, LastestProcessor],
})
export class CronModule {}
