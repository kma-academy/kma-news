import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Post } from '../post/entities/post.entity';
// import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { PostModule } from '../post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
  imports: [PostModule, UserModule, TypeOrmModule.forFeature([History])],
})
export class HistoryModule {}
