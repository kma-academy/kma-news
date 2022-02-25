import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { VNExpressHandler } from './handler/vnexpress.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../post/entities/post.entity';
import { VietNamNetHandler } from './handler/vietnamnet.handler';
import { VTCNewHandler } from './handler/vtcnew.handler';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Post])],
  providers: [
    {
      provide: 'VNEXPRESS_HANDLER',
      useClass: VNExpressHandler,
    },
    {
      provide: 'VIETNAMNET_HANDLER',
      useClass: VietNamNetHandler,
    },
    {
      provide: 'VTCNEW_HANDLER',
      useClass: VTCNewHandler,
    },
  ],
  exports: [
    TypeOrmModule.forFeature([Post]),
    {
      provide: 'VNEXPRESS_HANDLER',
      useClass: VNExpressHandler,
    },
    {
      provide: 'VIETNAMNET_HANDLER',
      useClass: VietNamNetHandler,
    },
    {
      provide: 'VTCNEW_HANDLER',
      useClass: VTCNewHandler,
    },
  ],
})
export class HandlerModule {}
