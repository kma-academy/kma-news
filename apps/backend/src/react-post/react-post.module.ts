import { Module } from '@nestjs/common';
import { ReactPostService } from './react-post.service';
import { ReactPostController } from './react-post.controller';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
import { ReactPost } from './entities/react-post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ReactPostController],
  providers: [ReactPostService],
  imports: [PostModule, UserModule, TypeOrmModule.forFeature([ReactPost])],
})
export class ReactPostModule {}
