import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paragraph } from './entities/paragraph.entity';
import { ParagraphService } from './paragraph.service';

@Module({
  imports: [TypeOrmModule.forFeature([Paragraph])],
  providers: [ParagraphService],
  exports: [ParagraphService],
})
export class ParagraphModule {}
