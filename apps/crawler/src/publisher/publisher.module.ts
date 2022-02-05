import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './entities/publisher.entity';

@Module({
  providers: [PublisherService],
  imports: [TypeOrmModule.forFeature([Publisher])],
  exports: [PublisherService],
})
export class PublisherModule {}
