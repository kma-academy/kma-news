import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParagraphDto } from './dto/paragraph.dto';
import { Paragraph } from './entities/paragraph.entity';

@Injectable()
export class ParagraphService {
  constructor(
    @InjectRepository(Paragraph)
    private readonly paragraphRepository: Repository<Paragraph>,
  ) {}

  createBatch(batchDto: ParagraphDto[]) {
    const paragraphs = batchDto.map((e) => this.paragraphRepository.create(e));
    return Promise.all(paragraphs.map((e) => this.paragraphRepository.save(e)));
  }
}
