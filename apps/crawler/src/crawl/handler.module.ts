import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { VNExpressHandler } from './handler/vnexpress.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../post/entities/post.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Post])],
  providers: [
    {
      provide: 'VNEXPRESS_HANDLER',
      useClass: VNExpressHandler,
    },
  ],
  exports: [
    TypeOrmModule.forFeature([Post]),
    {
      provide: 'VNEXPRESS_HANDLER',
      useClass: VNExpressHandler,
    },
  ],
})
export class HandlerModule {}
